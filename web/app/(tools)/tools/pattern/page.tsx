import { notFound } from "next/navigation";
import { PatternTool } from "./page.client";

export default function PatternToolPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return <PatternTool />;
}
