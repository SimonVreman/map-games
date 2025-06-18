import { cache } from "react";

export const fetchUSLicensePlatesSprites = cache(async () => ({
  plates: await fetch("/img/sprites/us-plates.png", { cache: "force-cache" })
    .then(async (r) => createImageBitmap(await r.blob()))
    .then((b) => {
      return b;
    }),
}));
