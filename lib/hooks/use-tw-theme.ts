import { useCallback, useEffect, useState } from "react";

const darkCache = new Map<string, string>();
const lightCache = new Map<string, string>();

export function useTwTheme() {
  const [theme, setTheme] = useState<"dark" | "light">(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  useEffect(() => {
    const matches = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matches.addEventListener("change", listener);
    return () => matches.removeEventListener("change", listener);
  });

  const twColor = useCallback(
    (base: string, dark?: string) => {
      if (theme === "light") {
        const cached = lightCache.get(base);
        if (cached) return cached;
        const color = getComputedStyle(document.body).getPropertyValue(
          "--color-" + base
        );
        lightCache.set(base, color);
        return color;
      } else {
        const cached = darkCache.get(dark ?? base);
        if (cached) return cached;
        const color = getComputedStyle(document.body).getPropertyValue(
          "--color-" + (dark ?? base)
        );
        darkCache.set(base, color);
        return color;
      }
    },
    [theme]
  );

  return { theme, twColor };
}
