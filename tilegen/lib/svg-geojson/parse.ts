import { Window } from "happy-dom";
import type { Svg } from "./types";
import { polyfillPathData } from "./polyfill";
import { svgPathProperties } from "svg-path-properties";

export function parseSvg(svg: string): Svg {
  const window = new Window();
  polyfillPathData(window);
  const parser = new window.DOMParser();
  const element = parser.parseFromString(svg, "image/svg+xml").documentElement;
  const paths = element.querySelectorAll("path");

  const result: Svg = [];

  paths.forEach((p) => {
    p.getPathData = window.SVGPathElement.prototype.getPathData;
    const rawData = p.getPathData({ normalize: true });
    const data = reducePathSegCurveComplexity(rawData, 10);

    const coords = data.map((item) => {
      if (item.type === "Z")
        /**
         * If Close Path command found, copy first pathData value
         * into last position, as per GeoJSON requirements for
         * closed polygons.
         */
        return [data[0].values[0], data[0].values[1]];
      return [item.values[0], item.values[1]];
    });

    result.push({
      coords,
      fill: p.getAttribute("fill") || undefined,
    });
  });

  return result;
}

//https://github.com/davecranwell/svg-to-geojson/blob/master/source/index.js#L14
function reducePathSegCurveComplexity(
  pathSegList: SVGPathSegment[],
  complexity: number
) {
  const newSegs: SVGPathSegment[] = [];
  let lastSeg: SVGPathSegment;

  // Loop through segments, processing each
  pathSegList.forEach((seg) => {
    let tmpPathLength, lengthStep, d, len, point;

    if (seg.type === "C") {
      /**
       * Create new isolate path element with only this C (and a starting M) present,
       * so we only need to divide the curve itself (not whole svg's path)
       * into lines
       */
      const lastSegCoords = lastSeg.values.slice(-2).join(",");
      const pathProperties = new svgPathProperties(
        `M ${lastSegCoords}C${seg.values.join(",")}`
      );

      /**
       * step along its length at the provided sample rate, finding
       * the x,y at each point, creating an L command for each.
       */

      tmpPathLength = pathProperties.getTotalLength();
      lengthStep = tmpPathLength / complexity;

      // Can't do anything with zero-length curves
      if (!tmpPathLength || !lengthStep) return;

      for (d = lengthStep, len = tmpPathLength; d <= len; d += lengthStep) {
        point = pathProperties.getPointAtLength(d);
        newSegs.push({ type: "L", values: [point.x, point.y] });
      }

      /**
       * Lastly, add an L at the final coords: We've divided a curve into N
       * items, sampling at each N along the length, but the loop ends
       * before it gets to the final point.
       *
       * The Normalized C command object provides these target coords
       * in 'values' positions 4 and 5.
       */
      newSegs.push({
        type: "L",
        values: [seg.values[4], seg.values[5]],
      });
    } else {
      // We don't care about non-curve commands.
      newSegs.push(seg);
    }

    /**
     * Record the segment just passed so its values can be used in determining
     * starting position of the next seg
     */
    lastSeg = seg;
  });

  return newSegs;
}
