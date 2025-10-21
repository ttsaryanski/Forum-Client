import { useMemo } from "react";

export function useFormatters() {
    const formatDate = (date) =>
        new Intl.DateTimeFormat("bg-BG", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "Europe/Sofia",
        }).format(new Date(date));

    const truncateText = (text, length) =>
        text.length > length ? text.slice(0, length) + "…" : text;

    return useMemo(() => ({ formatDate, truncateText }), []);
}
