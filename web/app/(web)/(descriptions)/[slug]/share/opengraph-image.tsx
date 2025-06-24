import { generateOgImage, ogImageConfig } from "@/components/game/og-image";
import { games } from "@/lib/games/registry";

export function generateStaticParams() {
  return games.map((g) => ({ slug: g.slug }));
}

export const contentType = ogImageConfig.contentType;
export const size = ogImageConfig.size;

export default async function Image({ params }: { params: { slug: string } }) {
  return generateOgImage({
    slug: params.slug,
    title: "Can you beat my score?",
    subtitle: games.find((g) => g.slug === params.slug)?.name,
  });
}
