import { useMemo } from "react";

export function useFormatters() {
    const formatDate = (date: string) =>
        new Intl.DateTimeFormat("bg-BG", {
            dateStyle: "short",
            timeStyle: "short",
            timeZone: "Europe/Sofia",
        }).format(new Date(date));

    const truncateText = (text: string, length: number) =>
        text.length > length ? text.slice(0, length) + "…" : text;

    return useMemo(() => ({ formatDate, truncateText }), []);
}
