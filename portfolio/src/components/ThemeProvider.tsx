"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    React.useEffect(() => {
        try {
            const stored = localStorage.getItem("theme");
            if (stored === "light" || stored === "dark") {
                localStorage.setItem("theme", `sage-${stored}`);
            }
        } catch {}
    }, []);
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
