export type ThemeMode = "light" | "dark";

export const isDarkTheme = (t: string | undefined) => !!t && t.endsWith("-dark");
