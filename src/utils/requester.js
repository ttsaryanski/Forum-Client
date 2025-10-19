const host = `${import.meta.env.VITE_APP_SERVER_URL}/api`;

async function requester(method, url, data, signal) {
    const option = {
        method,
        credentials: "include",
        headers: {},
        signal,
    };

    if (data != undefined) {
        if (data instanceof FormData) {
            option.body = data;
        } else {
            option.headers["Content-Type"] = "application/json";
            option.body = JSON.stringify(data);
        }
    }

    try {
        const response = await fetch(host + url, option);

        if (!response.ok) {
            const error = await response.json();

            if (response.status === 429) {
                throw new Error(
                    error.message || "Too many requests. Try again later."
                );
            }

            throw new Error(error.message || "Something went wrong!");
        }

        if (response.status === 204) {
            return;
        }

        return response.json();
    } catch (error) {
        if (error.name === "AbortError") {
            throw new Error("Request was aborted");
        }
        throw error;
    }
}

async function get(url, signal) {
    return requester("GET", url, undefined, signal);
}

export const api = {
    get,
};
