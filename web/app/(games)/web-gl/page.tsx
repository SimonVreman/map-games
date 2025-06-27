import WebGLMap from "@/components/web-gl/WebGLMap";

const bounds = {
  north: 71,
  west: -25,
  south: 34,
  east: 40,
  padding: 2,
};

export default function WebGLDemoPage() {
  return <WebGLMap bounds={bounds} />;
}
