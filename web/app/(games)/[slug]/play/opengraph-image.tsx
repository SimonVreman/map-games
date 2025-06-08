import { generateOgImage, ogImageConfig } from "@/components/game/og-image";

export const contentType = ogImageConfig.contentType;
export const size = ogImageConfig.size;

export default async function Image({ params }: { params: { slug: string } }) {
  return generateOgImage({ slug: params.slug });
}
