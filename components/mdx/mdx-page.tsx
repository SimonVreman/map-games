import { ComponentProps } from "react";
import { ProseMdx } from "./prose-mdx";

export function MdxPage(props: ComponentProps<typeof ProseMdx>) {
  return (
    <div className="p-6">
      <ProseMdx {...props} />
    </div>
  );
}
