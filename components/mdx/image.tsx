import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

export function MdxImage({
  src,
  srcDark,
  alt,
  className,
  ...props
}: ImageProps & { alt: string; className?: string; srcDark?: string }) {
  return (
    <div className="w-full">
      <Image
        src={src}
        alt={alt}
        className={cn("rounded-md", srcDark && "dark:hidden", className)}
        {...props}
      />
      {srcDark && (
        <Image
          src={srcDark}
          alt={alt}
          className={cn(
            "rounded-md hidden",
            srcDark && "dark:block",
            className
          )}
          {...props}
        />
      )}
    </div>
  );
}
