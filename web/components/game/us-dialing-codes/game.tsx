import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { InsetMap, InsetMapContainer } from "@/components/web-gl/inset-map";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { FeatureCollection } from "geojson";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { usDialingCodes } from "@/lib/games/meta/us-dialing-codes-meta";
import { use } from "react";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";

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
  north: -13,
  west: -171.5,
  south: -15,
  east: -169,
};

const targetsPromise = fetchGeoAsset("us-dialing-codes-targets");
const subjectsPromise = fetchGeoAsset("us-dialing-codes-subjects");

const store = createQuizStoreConstructor(usDialingCodes, {
  name: "us-dialing-codes",
});

export default function USDialingCodesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls label="Area code:" {...usDialingCodes} />

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
          <MapChildren
            targetFeatures={targetFeatures}
            subjectFeatures={subjectFeatures}
          />
          <InsetMapContainer>
            <InsetMap
              bounds={alaskaBounds}
              className="aspect-square col-span-2"
            >
              <MapChildren
                targetFeatures={targetFeatures}
                subjectFeatures={subjectFeatures}
              />
            </InsetMap>
            <InsetMap bounds={guamNmiBounds}>
              <MapChildren
                targetFeatures={targetFeatures}
                subjectFeatures={subjectFeatures}
              />
            </InsetMap>
            <InsetMap bounds={hawaiiBounds} className="aspect-[3/2] col-span-2">
              <MapChildren
                targetFeatures={targetFeatures}
                subjectFeatures={subjectFeatures}
              />
            </InsetMap>
            <InsetMap bounds={amSamoaBounds}>
              <MapChildren
                targetFeatures={targetFeatures}
                subjectFeatures={subjectFeatures}
              />
            </InsetMap>
          </InsetMapContainer>
        </WebGLMap>
      </div>
    </QuizStoreProvider>
  );
}

function MapChildren({
  targetFeatures,
  subjectFeatures,
}: {
  targetFeatures: FeatureCollection;
  subjectFeatures: FeatureCollection;
}) {
  return (
    <>
      <HintHandler />
      <SubjectLayer subjectFeatures={subjectFeatures} {...usDialingCodes} />
      <TargetLayer targetFeatures={targetFeatures} {...usDialingCodes} />
    </>
  );
}
