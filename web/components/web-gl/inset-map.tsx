import { cn } from "@/lib/utils";
import { LatLngBounds } from "./types";
import { WebGLMap } from "./web-gl-map";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export function InsetMap({
  bounds,
  className,
  children,
}: {
  bounds: LatLngBounds;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn("size-full overflow-hidden pointer-events-auto", className)}
    >
      <WebGLMap bounds={bounds} inset>
        {children}
      </WebGLMap>
    </div>
  );
}

export function InsetMapContainer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopover, setIsPopover] = useState(false);

  useEffect(() => {
    const matcher = window.matchMedia("(max-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsPopover(e.matches);

    matcher.addEventListener("change", handler);
    setIsPopover(matcher.matches);
    setIsOpen(!matcher.matches);

    return () => matcher.removeEventListener("change", handler);
  }, []);

  return (
    <div className="absolute bottom-4 md:bottom-0 left-0 w-full md:w-sm pointer-events-none max-md:flex justify-center">
      <Container
        data-state={isOpen ? "open" : "closed"}
        className={cn(
          "data-[state=open]:opacity-100 data-[state=closed]:opacity-0 transition-opacity",
          className,
          { "absolute w-full max-w-sm bottom-16": isPopover }
        )}
      >
        {children}
      </Container>
      {isPopover ? (
        <Button
          variant="outline"
          className="w-full max-w-sm pointer-events-auto"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? "Hide" : "Show"} overseas
        </Button>
      ) : (
        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-2 left-2 pointer-events-auto"
          onClick={() => setIsOpen((o) => !o)}
        >
          {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
        </Button>
      )}
    </div>
  );
}

function Container({
  className,
  children,
  ...props
}: {
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 max-md:border border-t border-r bg-neutral-100 dark:bg-neutral-600 border-neutral-100 dark:border-neutral-600 gap-[1px] shadow-xl max-md:rounded-lg rounded-tr-lg overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
