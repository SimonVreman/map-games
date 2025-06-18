"use client";

import dynamic from "next/dynamic";
import GameLoading from "../../loading";

export function DynamicPlayClientPage({ slug }: { slug: string }) {
  const Game = dynamic(() => import(`@/components/game/${slug}/game`), {
    ssr: false,
    loading: () => <GameLoading />,
  });

  return <Game />;
}
