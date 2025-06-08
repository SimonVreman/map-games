import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

const customComponents: MDXComponents = {
  a: ({ href, ...props }: ComponentPropsWithoutRef<"a">) => {
    if (href?.startsWith("/")) return <Link href={href} {...props} />;
    if (href?.startsWith("#")) return <a href={href} {...props} />;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    );
  },
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}
