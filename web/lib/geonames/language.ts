export const languageCodes = ["en", "nl", "es", "fr", "de"] as const;

export type GeonamesLanguage = (typeof languageCodes)[number];

export const languages = [
  { value: "en", label: "English" },
  { value: "nl", label: "Dutch" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
] as const;

export const validatedLanguage = (
  language?: string | null
): GeonamesLanguage => {
  if (!language) return "en";
  if (languageCodes.includes(language as GeonamesLanguage))
    return language as GeonamesLanguage;
  return "en";
};
