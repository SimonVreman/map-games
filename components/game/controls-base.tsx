import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { EllipsisVerticalIcon, LanguagesIcon, XIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { languages, validatedLanguage } from "@/lib/geonames/language";
import Link from "next/link";

export function ControlsBase({
  inputValue,
  handleInputChange,
  children,
}: {
  inputValue: string;
  handleInputChange: (value: string) => void;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const language = validatedLanguage(searchParams.get("language"));

  return (
    <div className="absolute inset-x-0 top-0 z-10 p-6 max-sm:p-2 flex items-center justify-center">
      <div className="max-sm:flex-col-reverse flex items-center max-sm:gap-2 gap-4 w-full max-w-screen-md">
        <Input
          value={inputValue}
          placeholder="Enter city name"
          className="bg-background dark:bg-background shadow-md h-14 grow md:text-md"
          onChange={(e) => handleInputChange(e.target.value)}
        />

        <div className="flex items-center max-sm:justify-between max-sm:gap-2 gap-4 max-sm:w-full">
          <div className="rounded-md shadow-md bg-background px-3 py-2 h-14 flex items-center whitespace-nowrap">
            {children}
          </div>

          <div className="bg-background rounded-md shadow-md size-14 flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <EllipsisVerticalIcon className="size-6 stroke-[1.5]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" alignOffset={-8}>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <LanguagesIcon />
                    <span>Language</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuLabel>Input language</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuRadioGroup value={language}>
                        {languages.map(({ value, label }) => (
                          <DropdownMenuRadioItem key={value} value={value}>
                            <Link
                              href={`${pathname}?language=${value}`}
                              prefetch={false}
                            >
                              {label}
                            </Link>
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
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
      </div>
    </div>
  );
}
