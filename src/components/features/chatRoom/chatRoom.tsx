import { useEffect, useRef, useState } from "react";
import { socket } from "../../../utils/socket";

import { useAuth } from "../../../contexts/AuthContext";
import { useError } from "../../../contexts/ErrorContext";

import { messageServices } from "../../../services/messageService";

import Spinner from "../../shared/spinner/Spinner";

import { useFormatters } from "../../../hooks/formatters";

import { Message } from "../../../interfaces/Messages";

interface ChatRoomProps {
    categoryName: string;
    categoryId: string;
}

export default function ChatRoom({ categoryName, categoryId }: ChatRoomProps) {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const { isAuthenticated, user, accessToken } = useAuth();
    const { setError } = useError();
    const { formatDate } = useFormatters();

    const [messages, setMessages] = useState<Message[]>([]);
    const [totalMessages, setTotalMessages] = useState(0);
    const [inputMessage, setInputMessage] = useState("");
    const [errors, setErrors] = useState({
        inputMessage: "",
    });

    const [curPage, setCurPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [isLoading, setIsLoading] = useState(true);
    const [pending, setPending] = useState(false);

    useEffect(() => {
        if (!accessToken) {
            if (socket.connected) {
                socket.disconnect();
            }
            return;
        }

        socket.auth = { token: accessToken };

        if (!socket.connected) {
            socket.connect();
        }

        const connectHandler = (): void => {
            console.log("Connected to chat server");
        };
        const disconnectHandler = (): void => {
            console.log("Disconnected from chat server");
        };
        const connectErrorHandler = (error: Error): void => {
            console.error("Chat connection error:", error.message);
            setError(error.message);
        };

        socket.on("connect", connectHandler);
        socket.on("disconnect", disconnectHandler);
        socket.on("connect_error", connectErrorHandler);

        return () => {
            socket.off("connect", connectHandler);
            socket.off("disconnect", disconnectHandler);
            socket.off("connect_error", connectErrorHandler);

            socket.disconnect();
        };
    }, [accessToken, setError]);
    
    useEffect(() => {
        if (!categoryId) {
            return;
        }

        const joinRoom = (): void => {
            console.log("JOINING ROOM:", categoryId);
            socket.emit("join_room", Number(categoryId));
        };

        if (socket.connected) {
            joinRoom();
        }
        socket.on("connect", joinRoom);

        return () => {
            socket.off("connect", joinRoom);
            socket.emit("leave_room", categoryId);
        };
    }, [categoryId]);

    useEffect(() => {
        const messageHandler = (message: Message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("receive_message", messageHandler);

        return () => {
            socket.off("receive_message", messageHandler);
        };
    }, []);

    useEffect(() => {
        if (!messages.length) {
            return;
        }

        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    }, [messages]);

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;

        fetchMessages(signal);

        return () => {
            abortController.abort();
        };
    }, [categoryId, curPage]);

    const fetchMessages = async (signal?: AbortSignal): Promise<void> => {
        if (!categoryId) {
            setError("Category ID is missing. Cannot load chat messages.");
            setIsLoading(false);
            return;
        }

        const query = {
            categoryId: Number(categoryId),
            page: curPage,
            limit: 50,
        };

        setError(null);
        setIsLoading(true);
        try {
            const paginatedRes = await messageServices.getPaginatedByCategoryId(query, signal);

            setMessages(paginatedRes.data);
            setTotalPages(paginatedRes.pagination.pages);
            setTotalMessages(paginatedRes.pagination.total);
        } catch (error) {
            if (!signal || !signal.aborted) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        if (!isFormValid) return;

        socket.emit("send_message", {
            categoryId: Number(categoryId),
            content: inputMessage,
        });

        setInputMessage("");
    };

    // Input message handlers and validation
    const messageChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        const value = event.target.value;
        setInputMessage(value);
        setErrors({ inputMessage: validateMessage(value) });
    };
    const validateMessage = (value: string): string => {
        if (!value.trim()) {
            return "Your message cannot be empty.";
        }
        if (value.length < 2) {
            return "Message must be at least 2 characters long.";
        }
        if (value.length > 200) {
            return "Message cannot exceed 200 characters.";
        }   
        return "";
    };

    const isFormValid = !errors.inputMessage && inputMessage.trim() !== "";

    return (
        <div className="aside">
            <div className="chat-room">
                <div className="chat-room-header">
                    <h2>Chat Room</h2>
                    <p>
                        Welcome to the{" "}
                        <span style={{ color: "#ff9d00d7" }}>{categoryName}</span>{" "}
                        chat room!
                    </p>
                </div>

                <div className="chat-messages">
                    {isLoading && <Spinner />}

                    {messages.length > 0 && messages.map((message) => (
                        <div
                            key={message.id}
                            className={`chat-message ${Number(user?.id) === message.author.id
                                ? "chat-message--self"
                                : "chat-message--other"
                                }`}
                        >
                            <div className="chat-message-header">
                                <div className="chat-message-avatar">
                                    <img
                                        src={message.author.avatar_url}
                                        alt={message.author.username}
                                    />
                                </div>
                                <div className="chat-message-meta">
                                    <span className="chat-message-author">
                                        {message.author.username}
                                    </span>
                                    <span className="chat-message-time">
                                        {formatDate(message.createdAt)}
                                    </span>
                                </div>
                            </div>
                            <div className="chat-message-body">
                                <p>{message.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chat-room-footer">
                    {/* <button
                        type="button"
                        className="chat-history-button"
                        onClick={handleLoadHistory}
                    >
                        Виж историята
                    </button> */}

                    <form className="chat-input-form" onSubmit={submitHandler}>
                        <textarea
                            disabled={!isAuthenticated}
                            className="chat-input-field"
                            placeholder="Напишете съобщение..."
                            value={inputMessage}
                            onChange={messageChangeHandler}
                        />
                        <button className="chat-input-submit"
                            disabled={!isFormValid || pending}
                            style={
                                !isFormValid || pending
                                    ? {
                                        cursor: "not-allowed",
                                        backgroundColor: "#999",
                                        padding: "0.08rem 0.4rem",
                                    }
                                : {padding: "0.08rem 0.4rem"}
                            }>
                            Изпрати
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}