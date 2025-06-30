export type Layer = {
  name: string;
  properties: string[];
  zoomOffset?: { min?: number; max?: number };
  includeTiles?: boolean;
};

export const layers: Layer[] = [
  { name: "countries", properties: ["name"], includeTiles: false },
  { name: "land", properties: ["min_zoom"] },
  { name: "country-boundaries", properties: ["min_zoom"] },
  { name: "lakes", properties: ["min_zoom"] },
  {
    name: "places",
    properties: ["min_zoom", "name", "scalerank", "adm0cap"],
    zoomOffset: { min: -1 },
  },
  { name: "railroads", properties: ["min_zoom", "scalerank"] },
  { name: "rivers", properties: ["min_zoom"] },
  { name: "roads", properties: ["min_zoom", "scalerank", "name"] },
  {
    name: "state-boundaries",
    properties: ["min_zoom"],
    zoomOffset: { min: -2 },
  },
  { name: "geo-lines", properties: ["name"] },
];
