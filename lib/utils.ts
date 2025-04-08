import { clsx, type ClassValue } from "clsx";
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
