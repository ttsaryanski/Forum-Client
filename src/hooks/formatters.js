import { useMemo } from "react";

export function useFormatters() {
    const formatDate = (date) =>
        new Intl.DateTimeFormat("bg-BG", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "Europe/Sofia",
        }).format(new Date(date));

    const truncateText = (text) =>
        text.length > 100 ? text.slice(0, 100) + "…" : text;

    return useMemo(() => ({ formatDate, truncateText }), []);
}
