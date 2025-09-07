import { QuizControls } from "../quiz/controls";
import { WebGLMap } from "@/components/web-gl/web-gl-map";
import { InsetMap, InsetMapContainer } from "@/components/web-gl/inset-map";
import { TargetLayer } from "@/components/web-gl/layers/target-layer";
import { spainDialingCodes } from "@/lib/games/meta/spain-dialing-codes-meta";
import { fetchGeoAsset } from "@/lib/games/geo-asset";
import { use } from "react";
import { SubjectLayer } from "@/components/web-gl/layers/subject-layer";
import { HintHandler } from "@/components/web-gl/hint-handler";
import { FeatureCollection } from "geojson";
import { QuizStoreProvider } from "@/lib/store/quiz-provider";
import { createQuizStoreConstructor } from "@/lib/store/quiz-store";

const bounds = {
  north: 46,
  west: -13,
  south: 34,
  east: 6,
  padding: 2,
};

const canariesBounds = {
  north: 30,
  west: -19,
  south: 27,
  east: -12,
  padding: 0,
};

const targetsPromise = fetchGeoAsset("spain-dialing-codes-targets");
const subjectsPromise = fetchGeoAsset("spain-dialing-codes-subjects");

const store = createQuizStoreConstructor(spainDialingCodes, {
  name: "spain-dialing-codes",
});

export default function SpainDialingCodesGame() {
  const targetFeatures = use(targetsPromise);
  const subjectFeatures = use(subjectsPromise);

  return (
    <QuizStoreProvider create={store}>
      <div className="size-full relative">
        <QuizControls label="Area code:" {...spainDialingCodes} />

        <WebGLMap
          bounds={bounds}
          attribution={
            <a
              href="https://data.humdata.org/dataset/whosonfirst-data-admin-esp"
              target="_blank"
            >
              © OCHA
            </a>
          }
        >
          <MapChildren
            targetFeatures={targetFeatures}
            subjectFeatures={subjectFeatures}
          />

          <InsetMapContainer>
            <InsetMap
              bounds={canariesBounds}
              className="col-span-full aspect-[2/1]"
            >
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
      <SubjectLayer subjectFeatures={subjectFeatures} {...spainDialingCodes} />
      <TargetLayer targetFeatures={targetFeatures} {...spainDialingCodes} />
    </>
  );
}
