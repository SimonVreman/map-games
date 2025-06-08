import { GameGrid } from "@/components/browse/game-grid";
import { MdxImage } from "@/components/mdx/image";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { geoguessrGames } from "@/lib/games/geoguessr-registry";
import { regularGames } from "@/lib/games/regular-registry";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const dynamicDescriptionPages = [...geoguessrGames, ...regularGames];

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return dynamicDescriptionPages.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const game = dynamicDescriptionPages.find((g) => g.slug === slug);

  if (!game) notFound();

  return {
    title: game.name,
    description: game.description,
  };
}

function getSuggestions(slug: string) {
  const otherGames = dynamicDescriptionPages.filter((g) => g.slug !== slug);

  // Randomly select games, but deterministically based on the slug
  let seed = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const random = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const shuffledGames = otherGames
    .map((game) => ({ game, sortKey: random(seed++) }))
    .sort((a, b) => a.sortKey - b.sortKey)
    .map(({ game }) => game);

  return shuffledGames.slice(0, 4); // Return the first 4 games as suggestions
}

export default async function DynamicDescriptionPage({ params }: PageProps) {
  const { slug } = await params;
  const game = dynamicDescriptionPages.find((g) => g.slug === slug);

  if (!game) notFound();

  const Description = dynamic(
    () => import(`@/components/game/${slug}/description.mdx`),
    { loading: () => <p>Loading game...</p> }
  );

  const suggestions = getSuggestions(slug);

  return (
    <ProseMdx>
      <MdxImage
        src={`/img/games/${slug}-light.png`}
        srcDark={`/img/games/${slug}-dark.png`}
        alt={`Screenshot of ${game.name} game`}
        width={900}
        height={600}
        priority
      />
      <h1>{game.name}</h1>
      <Description />
      <h2>More games you might like</h2>
      <GameGrid games={suggestions} />
    </ProseMdx>
  );
}
