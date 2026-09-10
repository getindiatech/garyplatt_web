import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { getCategories, imageUrl } from "@/lib/api";
import { PRODUCT_CATEGORIES } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Premium seating for casinos, hospitality, gaming and service settings.",
};

export const revalidate = 300;

export default async function ProductsPage() {
  const categories = await getCategories();

  // The design's cards are the fallback if the API has nothing published yet.
  const cards =
    categories.length > 0
      ? categories.map((category) => ({
          title: category.name,
          body: category.cardBody ?? category.intro ?? "",
          cta: category.cardCta ?? `Explore ${category.name}`,
          href: `/products/${category.slug}`,
          image: imageUrl(category.cardImage ?? category.heroImage, "/images/product-cat-casino.jpg"),
          alt: category.cardImageAlt ?? `${category.name} seating`,
        }))
      : PRODUCT_CATEGORIES;

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
          {cards.map((item) => (
            <ExperienceCard key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </>
  );
}
