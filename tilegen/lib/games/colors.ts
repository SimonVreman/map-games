export const mapColors = {
  pastelClay: [
    { light: "#ffb38e", dark: "#00b38e" },
    { light: "#ffcf9d", dark: "#00cf9d" },
    { light: "#ffb26f", dark: "#00b26f" },
    { light: "#de8f5f", dark: "#de8f5f" },
    { light: "#de8f5f", dark: "#de8f5f" },
  ],
  sweet: [
    { light: "hsl(232, 32%, 68%)", dark: "hsl(232, 32%, 20%)" },
    { light: "hsl(341, 92%, 85%)", dark: "hsl(341, 92%, 20%)" },
    { light: "hsl(39, 100%, 81%)", dark: "hsl(39, 100%, 20%)" },
    { light: "hsl(118, 33%, 79%)", dark: "hsl(118, 33%, 20%)" },
    { light: "hsl(169, 24%, 61%)", dark: "hsl(169, 24%, 20%)" },
  ],
  blackWhite: [
    { light: "hsl(0, 0%, 100%)", dark: "hsl(0, 0%, 0%)" },
    { light: "hsl(0, 0%, 95%)", dark: "hsl(0, 0%, 5%)" },
    { light: "hsl(0, 0%, 90%)", dark: "hsl(0, 0%, 10%)" },
    { light: "hsl(0, 0%, 85%)", dark: "hsl(0, 0%, 15%)" },
    { light: "hsl(0, 0%, 80%)", dark: "hsl(0, 0%, 20%)" },
  ],
} as const satisfies Record<string, { light: string; dark: string }[]>;
