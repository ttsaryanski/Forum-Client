export const host = `${import.meta.env.VITE_APP_SERVER_URL}/api`;

import { refreshAccessToken } from "./refresher";

let accessToken: string | null = null;
export function setAccessToken(token: string | null): void {
    accessToken = token;
}

async function requester<T>(
    method: string,
    url: string,
    data?: unknown,
    signal?: AbortSignal,
): Promise<T> {
    if (!url.includes("/auth/refresh") && !url.includes("/auth/logout")) {
        await loadCsrfToken();
    }

    const option: RequestInit = {
        method,
        credentials: "include" as RequestCredentials,
        headers: {} as Record<string, string>,
        signal,
    };

    if (accessToken) {
        (option.headers as Record<string, string>)["Authorization"] =
            `Bearer ${accessToken}`;
    }

    const shouldSkipCSRF =
        url.includes("/auth/refresh") || url.includes("/auth/logout");

    if (method !== "GET" && csrfToken && !shouldSkipCSRF) {
        (option.headers as Record<string, string>)["X-CSRF-Token"] = csrfToken;
    }

    if (data != undefined) {
        if (data instanceof FormData) {
            option.body = data;
        } else {
            (option.headers as Record<string, string>)["Content-Type"] =
                "application/json";
            option.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(host + url, option);

        if (!response.ok) {
            if (response.status === 401) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    return requester<T>(method, url, data, signal);
                }
            }

            const error = await response.json();
            if (response.status === 429) {
                throw new Error(
                    error.message || "Too many requests. Try again later.",
                );
            }

            throw new Error(error.message || "Something went wrong!");
        }

        if (response.status === 204) {
            return undefined as T;
        }

        return response.json() as Promise<T>;
    } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
            throw new Error("Request was aborted");
        }
        throw error;
    }
}

async function get<T>(url: string, signal?: AbortSignal): Promise<T> {
    return requester<T>("GET", url, undefined, signal);
}

async function post<T>(
    url: string,
    data?: unknown,
    signal?: AbortSignal,
): Promise<T> {
    return requester<T>("POST", url, data, signal);
}

async function put<T>(
    url: string,
    data?: unknown,
    signal?: AbortSignal,
): Promise<T> {
    return requester<T>("PUT", url, data, signal);
}

async function del<T>(url: string, signal?: AbortSignal): Promise<T> {
    return requester<T>("DELETE", url, undefined, signal);
}

async function patch<T>(url: string, signal?: AbortSignal): Promise<T> {
    return requester<T>("PATCH", url, undefined, signal);
}

export const api = {
    get,
    post,
    put,
    del,
    patch,
};

let csrfToken: string | undefined = undefined;

export function clearCsrfToken(): void {
    csrfToken = undefined;
}

async function loadCsrfToken(): Promise<void> {
    if (!csrfToken) {
        const res = await fetch(host + "/csrf-token", {
            credentials: "include",
        });

        const data = await res.json();
        csrfToken = data.csrfToken;
    }
}
