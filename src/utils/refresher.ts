import { setAccessToken, getAccessToken, host } from "./requester";

let isRefreshing = false;

const refreshListeners: ((token: string) => void)[] = [];
export function onTokenRefreshed(callback: (token: string) => void) {
    refreshListeners.push(callback);

    return () => {
        const index = refreshListeners.indexOf(callback);
        if (index > -1) {
            refreshListeners.splice(index, 1);
        }
    };
}

export async function refreshAccessToken(): Promise<boolean> {
    if (isRefreshing) return true;

    isRefreshing = true;
    try {
        const response = await fetch(host + "/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            authFailureHandler();
            isRefreshing = false;
            return false;
        }

        const data = await response.json();

        setAccessToken(data.accessToken);

        refreshListeners.forEach((callback) => callback(data.accessToken));

        scheduleRefresh();

        isRefreshing = false;
        return true;
    } catch {
        isRefreshing = false;
        return false;
    }
}

let refreshTimeout: ReturnType<typeof setTimeout> | null = null;
export function scheduleRefresh() {
    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
    }

    const accessToken = getAccessToken();
    if (!accessToken) return;

    try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]!));
        const expiresInMs = payload.exp * 1000 - Date.now();
        const refreshBefore = expiresInMs - 60_000;

        if (refreshBefore <= 0) {
            refreshAccessToken();
            return;
        }

        refreshTimeout = setTimeout(() => {
            refreshAccessToken();
        }, refreshBefore);
    } catch {
        authFailureHandler();
    }
}

function authFailureHandler() {
    setAccessToken(null);

    if (refreshTimeout) {
        clearTimeout(refreshTimeout);
        refreshTimeout = null;
    }
}
