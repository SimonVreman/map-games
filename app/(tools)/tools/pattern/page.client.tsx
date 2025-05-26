"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function PatternTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSvg = (input: string) => {
    let trimmed = input.trim();
    if (!trimmed) return;
    if (!trimmed.startsWith("<svg")) trimmed = `<svg>${trimmed}</svg>`;

    const parser = new DOMParser();
    const doc = parser.parseFromString(trimmed, "image/svg+xml");
    const svg = doc.querySelector("svg");

    if (!svg) {
      setOutput("Invalid SVG input");
      return;
    }

    let output = "[\n";
    svg.childNodes.forEach((n) => {
      // If it is a path node, convert
      if (n.nodeName === "path") {
        const path = n as SVGPathElement;
        const d = path.getAttribute("d") ?? "";
        const fill = path.getAttribute("fill");

        output += " {\n";
        output += `  path: new Path2D("${d}"),\n`;
        if (fill) output += `  fill: "${fill}",\n`;
        output += " },\n";
      } else if (n.nodeName === "rect") {
        const rect = n as SVGRectElement;
        const x = rect.getAttribute("x") ?? "0";
        const y = rect.getAttribute("y") ?? "0";
        const width = rect.getAttribute("width") ?? "0";
        const height = rect.getAttribute("height") ?? "0";
        const fill = rect.getAttribute("fill");

        output += " {\n";
        output += `  path: new Path2D("M${x} ${y} h${width} v${height} h-${width} Z"),\n`;
        if (fill) output += `  fill: "${fill}",\n`;
        output += " },\n";
      } else if (n.nodeName === "circle") {
        const circle = n as SVGCircleElement;
        const cx = circle.getAttribute("cx") ?? "0";
        const cy = circle.getAttribute("cy") ?? "0";
        const r = circle.getAttribute("r") ?? "0";
        const fill = circle.getAttribute("fill");

        output += " {\n";
        output += `  path: new Path2D("M${cx} ${cy} m-${r}, 0 a${r},${r} 0 1,0 ${
          2 * +r
        },0 a${r},${r} 0 1,0 -${2 * +r},0"),\n`;
        if (fill) output += `  fill: "${fill}",\n`;
        output += " },\n";
      } else if (n.nodeName === "ellipse") {
        const ellipse = n as SVGEllipseElement;
        const cx = ellipse.getAttribute("cx") ?? "0";
        const cy = ellipse.getAttribute("cy") ?? "0";
        const rx = ellipse.getAttribute("rx") ?? "0";
        const ry = ellipse.getAttribute("ry") ?? "0";
        const fill = ellipse.getAttribute("fill");

        output += " {\n";
        output += `  path: new Path2D("M${cx} ${cy} m-${rx}, 0 a${rx},${ry} 0 1,0 ${
          2 * +rx
        },0 a${rx},${ry} 0 1,0 -${2 * +rx},0"),\n`;
        if (fill) output += `  fill: "${fill}",\n`;
        output += " },\n";
      }
    });
    setOutput(output + "]");
  };

  return (
    <div className="w-full space-y-4">
      <Input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleSvg(e.target.value);
        }}
      />
      <div className="w-full font-mono bg-neutral-100 rounded-md p-2 text-xs">
        <pre>{output}</pre>
      </div>
      <Button
        onClick={() => {
          window.navigator.clipboard.writeText(output);
          toast("Copied to clipboard!");
        }}
      >
        copy
      </Button>
    </div>
  );
}
