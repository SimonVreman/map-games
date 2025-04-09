import { cn } from "@/lib/utils";

export function ProseMdx({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("prose prose-neutral dark:prose-invert mx-auto", className)}
    >
      {children}
    </div>
  );
}
