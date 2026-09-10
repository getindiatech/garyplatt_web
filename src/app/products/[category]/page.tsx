import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import CasinoCatalogue from "@/components/sections/CasinoCatalogue";
import { getCategories, getCategory, imageUrl } from "@/lib/api";

type Params = { params: Promise<{ category: string }> };

export const revalidate = 300;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category } = await params;
  const page = await getCategory(category);
  if (!page) return {};

  return {
    title: page.seoTitle ?? `${page.name} Seating`,
    description: page.seoDescription ?? page.intro ?? undefined,
  };
}

export default async function ProductCategoryPage({ params }: Params) {
  const { category } = await params;
  const page = await getCategory(category);
  if (!page) notFound();

  const products = page.products.map((product) => ({
    slug: product.slug,
    name: product.name,
    tier: product.tier,
    image: imageUrl(product.heroImage, "/images/casino-bella.png"),
  }));

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
        {page.intro ? (
          <p className="mx-auto max-w-[900px] pt-4 text-copy leading-relaxed text-muted">
            {page.intro}
          </p>
        ) : null}
      </Container>

      <CasinoCatalogue products={products} categorySlug={page.slug} />
    </>
  );
}
