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
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ControlsBase } from "./controls-base";

export function PinControlsBase({
  stats,
  graphic,
  dropdownContent,
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

        {onToggleHints && (
          <div className="bg-background rounded-md shadow-md size-14 flex items-center justify-center pointer-events-auto">
            <Button variant="ghost" size="icon" onClick={onToggleHints}>
              {hints ? (
                <LightbulbOffIcon className="size-6 stroke-[1.5]" />
              ) : (
                <LightbulbIcon className="size-6 stroke-[1.5]" />
              )}
            </Button>
          </div>
        )}

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
              <DropdownMenuSeparator />
              {dropdownContent && (
                <>
                  {dropdownContent}
                  <DropdownMenuSeparator />
                </>
              )}
              <DropdownMenuItem
                variant="destructive"
                onClick={() =>
                  router.push(pathname.split("/").slice(0, -1).join("/"))
                }
              >
                <XIcon />
                <span>Quit</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </ControlsBase>
  );
}
