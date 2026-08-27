import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { PRODUCT_CATEGORIES } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium seating for casinos, hospitality, gaming and service settings.",
};

export default function ProductsPage() {
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

      <Container className="pb-section">
        <div className="mx-auto grid w-full max-w-[1680px] grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {PRODUCT_CATEGORIES.map((item) => (
            <ExperienceCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </>
  );
}
