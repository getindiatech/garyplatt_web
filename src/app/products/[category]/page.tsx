import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CasinoCatalogue from "@/components/sections/CasinoCatalogue";
import {
  PRODUCT_CATEGORY_PAGES,
  type ProductCategorySlug,
} from "@/content/products";

type Params = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return Object.keys(PRODUCT_CATEGORY_PAGES).map((category) => ({ category }));
}

function getCategory(slug: string) {
  return PRODUCT_CATEGORY_PAGES[slug as ProductCategorySlug];
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const page = getCategory(category);
  if (!page) return {};
  return { title: `${page.name} Seating`, description: page.intro };
}

export default async function ProductCategoryPage({ params }: Params) {
  const { category } = await params;
  const page = getCategory(category);
  if (!page) notFound();

  return (
    <>
      <PageHero
        title="Products"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: page.name },
        ]}
      />

      <Container className="pb-8 text-center">
        <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {page.name} Seating
        </h2>
        <p className="mx-auto max-w-[900px] pt-4 text-copy leading-relaxed text-muted">
          {page.intro}
        </p>
      </Container>

      <CasinoCatalogue />
    </>
  );
}
