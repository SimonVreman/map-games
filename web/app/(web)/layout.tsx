import { GithubIcon, HeartIcon } from "lucide-react";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 min-h-dvh flex flex-col w-full">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="max-w-prose mx-auto text-muted-foreground mt-12 w-full">
        <div className="flex max-sm:flex-col sm:items-center gap-2 sm:gap-4">
          <a
            className="hover:text-primary transition-all"
            href="https://simonvreman.nl"
            target="_blank"
          >
            Simon Vreman
          </a>

          <a
            className="text-pink-400 hover:text-pink-700 transition-all flex items-center text-sm"
            href="https://donate.stripe.com/8wM6oC3K36oP2Ig8ww"
            target="_blank"
          >
            <HeartIcon className="size-3 mr-1" /> Support development
          </a>

          <a
            className="text-neutral-400 hover:text-neutral-700 transition-all flex items-center text-sm"
            href="https://github.com/simonvreman/map-games"
            target="_blank"
          >
            <GithubIcon className="size-3 mr-1" /> Source
          </a>
          <div className="text-sm sm:ml-auto max-sm:mt-2">&copy; 2025</div>
        </div>
      </div>
    </div>
  );
}
