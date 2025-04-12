import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { EllipsisVerticalIcon, XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ControlsBase } from "./controls-base";

export function PinControlsBase({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <ControlsBase>
      <div className="rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center w-full text-lg">
        <p className="text-muted-foreground">Area code:</p>
        <p className="font-semibold ml-2">+55</p>
      </div>

      <div className="flex items-center max-sm:justify-between max-sm:gap-2 gap-4 max-sm:w-full">
        <div className="rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center whitespace-nowrap">
          {children}
        </div>

        <div className="bg-background rounded-md shadow-md size-14 flex items-center justify-center ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVerticalIcon className="size-6 stroke-[1.5]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-8}>
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
