"use client";

import { GameDefinition } from "@/lib/games/types";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { XIcon } from "lucide-react";

export function GameGrid({
  games,
  filter,
}: {
  games: GameDefinition[];
  filter?: boolean;
}) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const tags = games
    .flatMap((game) => game.tags ?? [])
    .filter((t, i, a) => a.indexOf(t) === i);

  const activeGames = games.filter(
    (game) =>
      activeTags.length === 0 ||
      activeTags.every((tag) => game.tags?.includes(tag))
  );

  return (
    <>
      {tags.length > 0 && filter && (
        <GameTags
          tags={tags}
          activeTags={activeTags}
          setActiveTags={setActiveTags}
        />
      )}
      <div className="grid sm:grid-cols-2 gap-6 not-prose mt-8">
        {activeGames.length === 0 && (
          <div className="h-64 rounded-md border-dashed border flex items-center justify-center">
            No games found
          </div>
        )}
        {activeGames.map(({ name, description, slug }) => (
          <Link
            key={slug}
            href={slug}
            className="shadow-sm hover:shadow-md transition-all rounded-md overflow-hidden cursor-pointer group dark:border"
          >
            <div className="overflow-hidden">
              <Image
                src={`/img/games/${slug}-light.png`}
                width={900}
                height={600}
                alt={`Screenshot of ${name}`}
                className="dark:hidden group-hover:scale-105 transition-all duration-500"
              />
              <Image
                src={`/img/games/${slug}-dark.png`}
                width={900}
                height={600}
                alt={`Screenshot of ${name}`}
                className="hidden dark:block group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <div className="p-4">
              <h3 className="text-xl font-medium group-hover:underline">
                {name}
              </h3>
              <p className="text-muted-foreground mt-1">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

function GameTags({
  tags,
  activeTags,
  setActiveTags,
}: {
  tags: string[];
  activeTags: string[];
  setActiveTags: (tags: string[]) => void;
}) {
  const inactiveTags = tags.filter((tag) => !activeTags.includes(tag));

  return (
    <div className="flex flex-wrap gap-2">
      {activeTags.toSorted().map((t) => (
        <GameTag
          key={t}
          tag={t}
          onClick={() => setActiveTags(activeTags.filter((tag) => tag !== t))}
          active={true}
        />
      ))}
      {inactiveTags.toSorted().map((tag) => (
        <GameTag
          key={tag}
          tag={tag}
          onClick={() => setActiveTags([...activeTags, tag])}
          active={activeTags.includes(tag)}
        />
      ))}
    </div>
  );
}

function GameTag({
  tag,
  onClick,
  active,
}: {
  tag: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <Badge
      key={tag}
      size="lg"
      variant={active ? "default" : "secondary"}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {tag}
      {active && <XIcon className="" />}
    </Badge>
  );
}
