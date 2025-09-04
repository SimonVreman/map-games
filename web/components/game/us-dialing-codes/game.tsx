import { QuizControls } from "../quiz/controls";
import { usDialingCodeSubsets } from "@/lib/mapping/registry/us-dialing-codes";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { InsetMap } from "@/components/web-gl/inset-map";

const bounds = {
  north: 53,
  south: 10,
  east: -65,
  west: -134,
  padding: 2,
};

const alaskaBounds = {
  north: 72,
  west: -170,
  south: 51,
  east: -130,
};

const hawaiiBounds = {
  north: 23,
  west: -161,
  south: 18,
  east: -154,
};

const guamNmiBounds = {
  north: 16.5,
  west: 144,
  south: 13,
  east: 147,
};

const amSamoaBounds = {
  north: -11,
  west: -173,
  south: -15,
  east: -169,
};

export default function USDialingCodesGame() {
  return (
    <div className="size-full relative">
      <QuizControls
        store="usDialingCodes"
        label="Area code:"
        subsets={usDialingCodeSubsets}
      />

      <WebGLMap
        bounds={bounds}
        attribution={
          <>
            <a href="https://www.naturalearthdata.com/" target="_blank">
              Made with Natural Earth
            </a>
            <span className="mx-1">-</span>
            <span>
              Sources: Esri; TomTom North America, Inc.; Pitney Bowes Software
              Inc.; iconectiv
            </span>
          </>
        }
      >
        <div className="absolute bottom-0 left-0 w-full p-8 flex gap-8 items-baseline pointer-events-none">
          <InsetMap
            bounds={alaskaBounds}
            className="aspect-square max-w-64 pointer-events-auto"
          ></InsetMap>
          <InsetMap
            bounds={hawaiiBounds}
            className="aspect-[6/4] max-w-64 pointer-events-auto"
          ></InsetMap>
          <InsetMap
            bounds={guamNmiBounds}
            className="aspect-[2/3] max-w-48 pointer-events-auto"
          ></InsetMap>
          <InsetMap
            bounds={amSamoaBounds}
            className="aspect-[3/2] max-w-48 pointer-events-auto"
          ></InsetMap>
        </div>
      </WebGLMap>
    </div>
  );
}
