import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";

const STATEMENT =
  "At Gary Platt we believe that comfort and responsibility go hand in hand. As a leading manufacturer of casino and hospitality chairs, we are committed to sustainability at every stage of our production process. We prioritize eco-friendly materials, utilizing responsibly sourced wood and recycled fabrics to minimize our environmental footprint. Our manufacturing practices focus on reducing waste and energy consumption, ensuring that our products not only provide exceptional comfort but also contribute to a healthier planet. By choosing Gary Platt, you are investing in quality and sustainability, creating spaces that are as kind to the environment as they are inviting to your guests.";

export const metadata: Metadata = {
  title: "Sustainability",
  description:
    "Eco-friendly materials, responsibly sourced wood and recycled fabrics — sustainability at every stage of production.",
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero title="Sustainability" />

      <Container className="pb-section">
        <p className="text-[clamp(1rem,0.7vw+0.85rem,1.5rem)] leading-relaxed text-ink">
          {STATEMENT}
        </p>

        <div className="relative mt-10 aspect-[1680/2174] w-full overflow-hidden">
          <Image
            src="/images/sustainability-hero.jpg"
            alt="Gary Platt sustainability practices across materials and manufacturing"
            width={1680}
            height={2174}
            sizes="100vw"
            className="size-full object-cover"
          />
        </div>
      </Container>
    </>
  );
}
