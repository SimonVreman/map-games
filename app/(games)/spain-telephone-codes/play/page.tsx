import { SpainTelephoneCodesGame } from "@/components/game/spain-telephone-codes/game";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spain Telephone Codes",
};

export default async function SpainTelephoneCodesPlayPage() {
  return <SpainTelephoneCodesGame />;
}
