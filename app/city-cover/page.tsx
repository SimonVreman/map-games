import { ProseMdx } from "@/components/mdx/ProseMdx";
import DescriptionMdx from "@/components/game/city-cover/description.mdx";

export default function CityCoverPage() {
  return (
    <div className="p-6">
      <ProseMdx>
        <DescriptionMdx />
      </ProseMdx>
    </div>
  );
}
