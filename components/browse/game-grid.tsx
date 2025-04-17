import { GameDefinition } from "@/lib/games/types";
import Image from "next/image";
import Link from "next/link";

export function GameGrid({ games }: { games: GameDefinition[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-6 not-prose mt-8">
      {games.map(({ name, description, slug }) => (
        <Link
          key={slug}
          href={slug}
          className="shadow-sm hover:shadow-md transition-all rounded-md overflow-hidden cursor-pointer group"
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
            <h3 className="text-xl font-medium">{name}</h3>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
