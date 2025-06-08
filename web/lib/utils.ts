import { clsx, type ClassValue } from "clsx";
import { Oklch } from "culori";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalize(string: string) {
  return string
    .normalize("NFD") // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .toLowerCase(); // Convert to lower case
}

export function documentTime() {
  return (document.timeline.currentTime ?? performance.now()) as number;
}

export function oklchEqual(a: Oklch, b: Oklch) {
  return (
    a.l === b.l &&
    a.c === b.c &&
    a.h === b.h &&
    a.alpha === b.alpha &&
    a.mode === b.mode
  );
}

export function isMobileWidth() {
  return window.innerWidth < 640;
}
