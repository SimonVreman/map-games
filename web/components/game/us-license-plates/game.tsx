import { CanvasMap } from "@/components/canvas/canvas-map";
import { cache, use } from "react";
import { QuizControls } from "../quiz/controls";
import { PatternPreview } from "@/components/canvas/game/pattern-preview";
import { usLicensePlates } from "@/lib/mapping/registry/us-license-plates";
import { Outlines } from "@/components/canvas/game/outlines";
import { PatternedTargets } from "@/components/canvas/game/patterned-targets";
import { usPaths } from "@/lib/mapping/paths/united-states/country";
import { usStatesPaths } from "@/lib/mapping/paths/united-states/state-boundaries";
import { usDivider } from "@/lib/mapping/paths/united-states/divider";

const bounds = {
  north: 53,
  south: 10,
  east: -67,
  west: -127,
  padding: 2,
};

const outlinesRenderKey = {
  key: "us-license-plates:outlines",
  order: 3,
  layer: 0,
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
      <QuizControls
        store="usLicensePlates"
        label="Where is it seen?"
        graphic={({ subject }) => (
          <PatternPreview
            {...usLicensePlates}
            pattern={subject}
            sprites={sprites}
          />
        )}
      />

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
        <PatternedTargets
          {...usLicensePlates}
          store="usLicensePlates"
          sprites={sprites}
        />
        <Outlines
          renderKey={outlinesRenderKey}
          external={usPaths}
          internal={usStatesPaths}
          divider={usDivider}
        />
      </CanvasMap>
    </div>
  );
}
