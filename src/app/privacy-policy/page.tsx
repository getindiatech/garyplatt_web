import type { Metadata } from "next";
import LegalDocument from "@/components/sections/LegalDocument";
import { PRIVACY_POLICY } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PRIVACY_POLICY.intro,
};

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={PRIVACY_POLICY} />;
}
