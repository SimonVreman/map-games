// Depens on python project
export const mercatorConstants = {
  reach: 85.05112877980659,
  domain: 1000,
};

export function projectMercator({ lat, lng }: { lat: number; lng: number }) {
  const latRadians = (lat * Math.PI) / 180;
  const lngRadians = (lng * Math.PI) / 180;

  const x = Math.PI + lngRadians;
  const y = Math.PI - Math.log(Math.tan(Math.PI / 4 + latRadians / 2));

  const scaledX = (x * mercatorConstants.domain) / (2 * Math.PI);
  const scaledY = (y * mercatorConstants.domain) / (2 * Math.PI);

  return { x: scaledX, y: scaledY };
}
