import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { HOME_LINEUP, PRODUCTS } from "@/content/home";
import { getProducts, imageUrl } from "@/lib/api";

export default async function FeaturedCollection() {
  const catalogue = await getProducts({ perPage: 100 });
  const bySlug = new Map(catalogue.data.map((product) => [product.slug, product]));
  const lineup = HOME_LINEUP.map((slug) => bySlug.get(slug)).filter((product) => product != null);

  // The homepage order matches garyplatt.com. Fall back only if the API is empty.
  const items =
    lineup.length > 0
      ? lineup.map((product) => ({
          title: product.name,
          tagline: product.tagline,
          image: imageUrl(product.heroImage, "/images/product-nyx-armchair.png"),
          alt: product.tagline ?? product.name,
          href: `/products/quote?product=${product.slug}`,
        }))
      : PRODUCTS.map((product) => ({ ...product, tagline: null, href: "/products/casino" }));

  return (
    <Section className="bg-white" id="products">
      <Container>
        <SectionHeading
          align="start"
          eyebrow="Curated Selection"
          title="Featured Collection"
          className="max-md:items-center max-md:text-center"
          action={
            <ArrowLink href="/products" className="max-md:hidden whitespace-nowrap">
              View All Products
            </ArrowLink>
          }
        />

        <div className="mt-8 grid grid-cols-2 gap-3 xl:mt-16 xl:grid-cols-4 xl:gap-6">
          {items.map(({ title, tagline, image, alt, href }) => (
            <article
              key={title}
              className="flex flex-col gap-[clamp(0.9rem,1.7vw,2rem)] border-[0.447px] border-card-border bg-white p-[clamp(0.56rem,1vw,1.25rem)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(3,7,18,0.18)] md:border"
            >
              <Link href={href} className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image}
                  alt={alt}
                  width={392}
                  height={392}
                  sizes="(max-width: 1279px) 45vw, 23vw"
                  className="size-full object-contain"
                />
              </Link>

              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-[clamp(0.875rem,1.2vw+0.4rem,1.625rem)] font-medium leading-tight text-black">
                    {title}
                  </h3>
                  {tagline ? (
                    <p className="pt-1 text-[11px] uppercase tracking-[0.14em] text-muted">{tagline}</p>
                  ) : null}
                </div>
                <Link
                  href={href}
                  aria-label={title}
                  className="relative inline-flex size-[clamp(1.34rem,2.5vw,3rem)] shrink-0 items-center justify-center rounded-full border-[0.447px] border-ink-strong bg-button-dark transition-opacity after:absolute after:-inset-1.5 after:content-[''] hover:opacity-85 md:border md:after:hidden"
                >
                  <Image
                    src="/images/icon-arrow-up-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-[clamp(0.56rem,1vw,1.25rem)]"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <ArrowLink
          href="/products"
          className="mx-auto mt-5 flex h-11 w-fit justify-center px-5 text-ink-strong md:hidden"
        >
          View All Products
        </ArrowLink>
      </Container>
    </Section>
  );
}
