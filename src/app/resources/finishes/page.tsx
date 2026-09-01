import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import FinishTabs from "@/components/sections/FinishTabs";

export const metadata: Metadata = {
  title: "Finishes",
  description:
    "Metal finishes, protective edge moldings, handle finishers and powder coats.",
};

export default function FinishesPage() {
  return (
    <>
      <PageHero
        title="Finishes"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Finishes" },
        ]}
      />

      <Container className="pb-section">
        <FinishTabs />
      </Container>
    </>
  );
}
