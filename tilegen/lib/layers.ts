export type Layer = {
  name: string;
  properties: string[];
  type: "ne" | "landcover" | "custom";
  zoomOffset?: { min?: number; max?: number };
  includeTiles?: boolean;
};

export const layers: Layer[] = [
  { name: "countries", type: "ne", properties: ["name"], includeTiles: false },
  { name: "land", type: "ne", properties: ["min_zoom"] },
  { name: "country-boundaries", type: "ne", properties: ["min_zoom"] },
  { name: "lakes", type: "ne", properties: ["min_zoom"] },
  {
    name: "places",
    type: "ne",
    properties: ["min_zoom", "name", "scalerank", "adm0cap"],
    zoomOffset: { min: -1 },
  },
  { name: "railroads", type: "ne", properties: ["min_zoom", "scalerank"] },
  { name: "rivers", type: "ne", properties: ["min_zoom"] },
  { name: "roads", type: "ne", properties: ["min_zoom", "scalerank", "name"] },
  {
    name: "state-boundaries",
    type: "ne",
    properties: ["min_zoom"],
    zoomOffset: { min: -2 },
  },
  { name: "geo-lines", type: "ne", properties: ["name"] },
  { name: "landcover", type: "landcover", properties: [], includeTiles: false },
  { name: "labels", type: "custom", properties: [] },
];
