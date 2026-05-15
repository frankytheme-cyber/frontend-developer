export type ThemeMode = "light" | "dark";

export const isDarkTheme = (t: string | undefined) => !!t && t.endsWith("-dark");
export const isLightTheme = (t: string | undefined) => !!t && t.endsWith("-light");
