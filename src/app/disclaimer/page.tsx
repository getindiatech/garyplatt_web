import type { Metadata } from "next";
import LegalDocument from "@/components/sections/LegalDocument";
import { DISCLAIMER } from "@/content/legal";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: DISCLAIMER.intro,
};

export default function DisclaimerPage() {
  return <LegalDocument doc={DISCLAIMER} />;
}
