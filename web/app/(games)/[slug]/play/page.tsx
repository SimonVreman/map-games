import { games } from "@/lib/games/registry";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { DynamicPlayClientPage } from "./page.client";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return games
    .filter((g) => !["city-cover", "city-blocks"].includes(g.slug))
    .map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) notFound();

  return {
    title: game.name,
    description: game.description,
  };
}

export default async function DynamicPlayPage({ params }: PageProps) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) notFound();

  return <DynamicPlayClientPage slug={slug} />;
}
