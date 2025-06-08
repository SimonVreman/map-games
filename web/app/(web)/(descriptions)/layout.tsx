import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function GameDescriptionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="max-w-prose mx-auto mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeftIcon /> Back
        </Link>
      </div>
      {children}
    </>
  );
}
