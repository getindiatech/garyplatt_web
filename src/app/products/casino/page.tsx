import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CasinoCatalogue from "@/components/sections/CasinoCatalogue";

export const metadata: Metadata = {
  title: "Casino Seating",
  description:
    "Gary Platt casino seating — Bella, Sedona, Kiara, Lido, Monaco, Genesis and more.",
};

export default function ProductsCasinoPage() {
  return (
    <>
      <PageHero
        title="Products"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Casino" },
        ]}
      />
      <CasinoCatalogue />
    </>
  );
}
