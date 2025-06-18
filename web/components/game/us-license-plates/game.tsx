import { USLicensePlatesControls } from "./controls";
import { CanvasMap } from "@/components/canvas/canvas-map";
import { cache, use } from "react";
import { USLicensePlatesRendering } from "./rendering";

const bounds = {
  north: 53,
  south: 10,
  east: -67,
  west: -127,
  padding: 2,
};

const fetchSprites = cache(async () => ({
  plates: await fetch("/img/sprites/us-plates.png").then(async (r) => {
    const blob = await r.blob();
    return {
      bitmap: await createImageBitmap(blob),
      objectUrl: URL.createObjectURL(blob),
    };
  }),
}));

const spritesPromise = fetchSprites();

export default function USLicensePlatesGame() {
  const sprites = use(spritesPromise);

  return (
    <div className="size-full relative">
      <USLicensePlatesControls sprites={sprites} />

      <CanvasMap
        bounds={bounds}
        attribution={
          <>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth.
            </a>
          </>
        }
      >
        <USLicensePlatesRendering sprites={sprites} />
      </CanvasMap>
    </div>
  );
}
