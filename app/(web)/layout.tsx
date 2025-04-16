import { HeartIcon } from "lucide-react";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 min-h-dvh flex flex-col w-full">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="max-w-prose mx-auto text-muted-foreground mt-12 w-full">
        <div className="flex items-center">
          <span className="flex items-center">
            <a
              className="hover:text-primary transition-all mr-4"
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
          </span>
          <div className="text-sm ml-auto">&copy; 2025</div>
        </div>
      </div>
    </div>
  );
}
