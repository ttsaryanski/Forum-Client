import { io, Socket } from "socket.io-client";

const host = import.meta.env.VITE_APP_SERVER_URL;

export const socket: Socket = io(host, {
    autoConnect: false,
});
