import { readFile } from "node:fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";
import { geoguessrGames } from "@/lib/games/geoguessr-registry";
import { regularGames } from "@/lib/games/regular-registry";
import { notFound } from "next/navigation";

const contentType = "image/png";
const size = { width: 1200, height: 630 };

const dynamicDescriptionPages = [...geoguessrGames, ...regularGames];
const assetBase = `${
  process.env.NODE_ENV === "development" ? "http" : "https"
}://${process.env.VERCEL_BRANCH_URL}`;

export const ogImageConfig = {
  contentType,
  size,
} as const;

export async function generateOgImage({
  slug,
  title,
  subtitle,
}: {
  slug: string;
  title?: string;
  subtitle?: string;
}) {
  const game = dynamicDescriptionPages.find((g) => g.slug === slug);

  if (!game) notFound();

  const figtreeRegular = await readFile(
    join(process.cwd(), "assets/Figtree-Regular.ttf")
  );
  const figtreeBold = await readFile(
    join(process.cwd(), "assets/Figtree-Bold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
          backgroundColor: "#000000",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${assetBase}/img/opengraph-bg.png`}
          alt="icon"
          width={1658 / 2}
          height={1260 / 2}
          style={{ position: "absolute" }}
        />

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${assetBase}/img/games/${game.slug}-dark.png`}
            alt="screenshot"
            width={900}
            height={600}
            style={{
              position: "absolute",
              top: "250px",
              borderRadius: "20px",
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            maskImage: "radial-gradient(transparent 20%, black 150%)",
            background: "black",
          }}
        />

        <div
          style={{
            top: "48px",
            position: "absolute",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "64px",
              fontFamily: "Figtree",
              color: "#FFFFFF",
            }}
          >
            {title ?? game.name}
          </h1>
          <p
            style={{
              fontSize: "28px",
              fontFamily: "Figtree",
              color: "#CCCCCC",
              marginTop: "-16px",
            }}
          >
            {subtitle ?? "Map Games by Simon Vreman"}
          </p>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Figtree", data: figtreeRegular, style: "normal", weight: 400 },
        { name: "Figtree", data: figtreeBold, style: "normal", weight: 700 },
      ],
    }
  );
}
