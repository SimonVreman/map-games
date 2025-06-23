import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  EllipsisVerticalIcon,
  LightbulbIcon,
  LightbulbOffIcon,
  RotateCwIcon,
  XIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ControlsBase } from "./controls-base";
import { useCallback, useEffect } from "react";

export function PinControlsBase({
  stats,
  graphic,
  children,
  onReset,
  onToggleHints,
  hints,
}: {
  stats: React.ReactNode;
  graphic?: React.ReactNode;
  dropdownContent?: React.ReactNode;
  children: React.ReactNode;
  onReset: () => void;
  onToggleHints?: () => void;
  hints?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const quit = useCallback(
    () => router.push(pathname.split("/").slice(0, -1).join("/")),
    [router, pathname]
  );

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "KeyQ") quit();
      if (event.code === "KeyH" && onToggleHints) onToggleHints();
    };

    window.addEventListener("keyup", listener);
    return () => window.removeEventListener("keyup", listener);
  }, [onToggleHints, quit]);

  return (
    <ControlsBase>
      <div className="flex max-sm:gap-2 gap-4 w-full">
        {graphic && (
          <div className="rounded-md shadow-md overflow-hidden relative pointer-events-auto">
            {graphic}
          </div>
        )}
        <div className="relative overflow-hidden rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center grow text-lg pointer-events-auto">
          {children}
        </div>
      </div>

      <div className="flex max-sm:gap-2 gap-4 max-sm:w-full">
        <div className="rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center whitespace-nowrap mr-auto pointer-events-auto">
          {stats}
        </div>

        <div className="bg-background rounded-md shadow-md size-14 flex items-center justify-center pointer-events-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="size-6 stroke-[1.5]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-8}>
              <DropdownMenuItem onClick={onReset}>
                <RotateCwIcon />
                <span>Reset</span>
              </DropdownMenuItem>
              {onToggleHints && (
                <DropdownMenuItem onClick={onToggleHints}>
                  {hints ? <LightbulbOffIcon /> : <LightbulbIcon />}
                  <span>Hints</span>
                  <DropdownMenuShortcut>H</DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={quit}>
                <XIcon />
                <span>Quit</span>
                <DropdownMenuShortcut>Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </ControlsBase>
  );
}
