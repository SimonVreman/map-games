export const mapColors = {
  pastelClay: [
    { light: "#ffb38e", dark: "#00b38e" },
    { light: "#ffcf9d", dark: "#ffcf9d" },
    { light: "#ffb26f", dark: "#ffb26f" },
    { light: "#de8f5f", dark: "#de8f5f" },
  ],
} as const satisfies Record<string, { light: string; dark: string }[]>;
