export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 min-h-dvh flex flex-col w-full">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="max-w-prose mx-auto text-muted-foreground mt-12 w-full">
        <div className="flex items-center">
          <a
            className="hover:text-primary transition-all"
            href="https://simonvreman.nl"
            target="_blank"
          >
            Simon Vreman
          </a>
          <div className="text-sm ml-auto">Copyright 2025</div>
        </div>
      </div>
    </div>
  );
}
