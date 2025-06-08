import { geoguessrGames } from "@/lib/games/geoguessr-registry";
import { regularGames } from "@/lib/games/regular-registry";
import { Metadata } from "next";
import { notFound } from "next/navigation";

const dynamicGamePages = [...geoguessrGames, ...regularGames].filter(
  (g) => g.pages.Game
);

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dynamicGamePages.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = dynamicGamePages.find((g) => g.slug === slug);

  if (!game) notFound();

  return {
    title: game.name,
    description: game.description,
  };
}

export default async function DynamicPlayPage({ params }: PageProps) {
  const { slug } = await params;
  const Game = dynamicGamePages.find((g) => g.slug === slug)?.pages.Game;

  if (!Game) notFound();

  return <Game />;
}
