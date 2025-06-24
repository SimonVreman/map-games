import { games } from "@/lib/games/registry";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import * as jwt from "jsonwebtoken";
import { z } from "zod";
import { SharedScore } from "@/components/game/quiz/results/schema";
import { QuizStatistics } from "@/components/game/quiz/results/statistics";
import { ProseMdx } from "@/components/mdx/prose-mdx";
import { MdxImage } from "@/components/mdx/image";
import dynamic from "next/dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) notFound();

  return {
    title: "Beat my score on " + game.name,
    description: game.description,
  };
}

export default async function SharedPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const game = games.find((g) => g.slug === slug);

  if (!game) notFound();

  let score: z.infer<typeof SharedScore>;
  try {
    const encodedScore = (await searchParams).s;
    const payload = jwt.verify(encodedScore + "", process.env.SHARING_SECRET!);
    score = SharedScore.parse(payload);
  } catch (e) {
    console.error("Invalid score token:", e);
    return notFound();
  }

  const Description = dynamic(
    () => import(`@/components/game/${slug}/description.mdx`),
    { loading: () => <p>Loading game...</p> }
  );

  return (
    <ProseMdx>
      <div className="w-full relative overflow-hidden">
        <MdxImage
          src={`/img/games/${slug}-light.png`}
          srcDark={`/img/games/${slug}-dark.png`}
          alt={`Screenshot of ${game.name} game`}
          width={900}
          height={600}
          priority
        />
        <div
          className="absolute inset-0 bg-background/50 backdrop-blur-md"
          style={{
            maskImage: "linear-gradient(to top, #000 40%, transparent 90%)",
          }}
        />
        <div className="absolute bottom-0 w-full p-6 pb-12 pt-32 z-10">
          <QuizStatistics statistics={score} />
        </div>
      </div>
      <h1>Can you beat me at {game.name}?</h1>
      <Description />
    </ProseMdx>
  );
}
