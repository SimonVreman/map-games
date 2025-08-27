// https://github.com/maplibre/maplibre-gl-js/blob/main/src/geo/mercator_coordinate.ts
const mercatorXfromLng = (lng: number) => (180 + lng) / 360;
const mercatorYfromLat = (lat: number) =>
  (180 -
    (180 / Math.PI) * Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 360))) /
  360;
const lngFromMercatorX = (x: number) => x * 360 - 180;
const latFromMercatorY = (y: number) =>
  (360 / Math.PI) * Math.atan(Math.exp(((180 - y * 360) * Math.PI) / 180)) - 90;

export const projectToMercator = (lng: number, lat: number) => [
  mercatorXfromLng(lng),
  mercatorYfromLat(lat),
];

export const unprojectFromMercator = (x: number, y: number) => [
  lngFromMercatorX(x),
  latFromMercatorY(y),
];
