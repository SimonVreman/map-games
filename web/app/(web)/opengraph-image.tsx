import { generateOgImage, ogImageConfig } from "@/components/game/og-image";

export const contentType = ogImageConfig.contentType;
export const size = ogImageConfig.size;

export default async function Image() {
  return generateOgImage({
    slug: "european-chevrons",
    title: "Map Games",
    subtitle: "By Simon Vreman",
  });
}
