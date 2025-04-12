import { BrazilTelephoneCodesGame } from "@/components/game/brazil-telephone-codes/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brazil Telephone Codes",
};

export default async function BrazilTelephoneCodesPlayPage() {
  return <BrazilTelephoneCodesGame />;
}
