import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import FinishTabs, { type FinishItem } from "@/components/sections/FinishTabs";
import { getFinishes, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Finishes",
  description:
    "Metal finishes, protective edge moldings, handle finishers and powder coats.",
};

export const revalidate = 300;

export default async function FinishesPage() {
  const finishes = await getFinishes();

  const by = (kind: string): FinishItem[] =>
    finishes
      .filter((finish) => finish.kind === kind)
      .map((finish) => ({
        name: finish.name,
        image: imageUrl(finish.image, "/images/finish-copper-vein.jpg"),
      }));

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
        <FinishTabs
          swatches={by("SWATCH")}
          edgeMoldings={by("EDGE_MOLDING")}
          handles={by("HANDLE")}
          powderCoats={by("POWDER_COAT")}
        />
      </Container>
    </>
  );
}
