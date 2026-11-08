import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import ChairBuilder, { type ChairVariant } from "@/components/sections/ChairBuilder";
import PlainQuote from "@/components/sections/PlainQuote";
import builders from "@/content/chair-builders.json";
import DocumentList from "@/components/sections/DocumentList";
import { MORE_COLLECTION, QUOTE_PRODUCT } from "@/content/quote";
import { getProduct, getProducts, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Customize Your Seat",
  description: QUOTE_PRODUCT.body,
};

export const revalidate = 300;

/**
 * The catalogue links here with ?product=<slug>. Without one, fall back to the
 * first configurable chair so the page is never empty.
 */
async function resolveProduct(slug?: string) {
  if (slug) {
    const requested = await getProduct(slug);
    if (requested) return requested;
  }

  const listed = await getProducts({ perPage: 1 });
  const first = listed.data[0];
  return first ? await getProduct(first.slug) : null;
}

export default async function SendQuotePage({
  searchParams,
}: PageProps<"/products/quote">) {
  const { product: requestedSlug } = await searchParams;
  const product = await resolveProduct(
    typeof requestedSlug === "string" ? requestedSlug : undefined,
  );

  const [large, ...details] = QUOTE_PRODUCT.gallery;

  const [related, categorySlug] = await Promise.all([
    getProducts({ category: product?.category.slug, perPage: 5 }),
    Promise.resolve(product?.category.slug ?? "casino"),
  ]);

  const configurable = {
    slug: product?.slug ?? "",
    name: product?.name ?? QUOTE_PRODUCT.name,
  };

  const more = related.data
    .filter((item) => item.slug !== product?.slug)
    .slice(0, 4)
    .map((item) => ({
      name: item.name,
      image: imageUrl(item.heroImage, "/images/casino-bella.png"),
      href: `/products/quote?product=${item.slug}`,
    }));

  return (
    <>
      <PageHero
        title="Customize Your Seat"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product?.category.name ?? "Casino", href: `/products/${categorySlug}` },
          { label: configurable.name },
        ]}
      />

      <div className="px-gutter pb-section">
        <div className="mx-auto max-w-[1680px]">
          {product && (builders as Record<string, ChairVariant[]>)[product.slug]?.length ? (
            <ChairBuilder
              productName={product.name}
              productSlug={product.slug}
              fallbackImage={imageUrl(product.heroImage, QUOTE_PRODUCT.preview)}
              variants={(builders as Record<string, ChairVariant[]>)[product.slug]}
            />
          ) : (
            <PlainQuote
              productName={configurable.name}
              productSlug={configurable.slug}
              image={imageUrl(product?.heroImage, QUOTE_PRODUCT.preview)}
            />
          )}

          {/* ===== Product detail ===== */}
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-[740fr_586fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,1.6vw+1.2rem,2.25rem)] font-medium leading-tight text-ink">
                {configurable.name}
              </h2>
              {product?.tagline ? (
                <p className="pt-2 text-copy font-medium leading-normal text-muted-alt">
                  {product.tagline}
                </p>
              ) : null}
              {product?.description ? (
                <p className="whitespace-pre-line pt-6 text-copy leading-relaxed text-muted">
                  {product.description}
                </p>
              ) : null}
              {product?.minOrderQty ? (
                <p className="pt-6 text-copy leading-relaxed text-muted">
                  Minimum order quantity: {product.minOrderQty} units.
                </p>
              ) : null}
            </div>

            <div className="grid grid-cols-2 gap-5">
              {(product?.images?.length
                ? product.images.slice(0, 4).map((image) => imageUrl(image.url))
                : [large.src, ...details.map((image) => image.src)]
              ).map((src) => (
                <div key={src} className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <Image
                    src={src}
                    alt={configurable.name}
                    fill
                    sizes="(max-width: 1023px) 50vw, 18vw"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ===== Instructions, spec sheets - only when staff attached any ===== */}
          <DocumentList
            documents={product?.documents ?? []}
            heading="Downloads"
            intro={`Instructions, specifications and care guidance for the ${configurable.name}.`}
          />

          {/* ===== More from the range ===== */}
          {more.length > 0 ? (
            <div className="pt-section">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <Eyebrow>{MORE_COLLECTION.eyebrow}</Eyebrow>
                  <h2 className="pt-3 font-display text-[clamp(1.75rem,1.6vw+1.2rem,2.25rem)] font-medium leading-tight text-ink">
                    {MORE_COLLECTION.title}
                  </h2>
                </div>
                <ArrowLink href="/products">{MORE_COLLECTION.cta}</ArrowLink>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
                {more.map(({ name, image, href }) => (
                  <Link
                    key={name}
                    href={href}
                    className="flex flex-col border border-card-border bg-white p-5 transition-opacity hover:opacity-90"
                  >
                    <div className="relative aspect-square w-full">
                      <Image
                        src={image}
                        alt={name}
                        width={365}
                        height={362}
                        sizes="(max-width: 1023px) 45vw, 22vw"
                        className="size-full object-contain"
                      />
                    </div>
                    <h3 className="truncate pt-5 font-display text-[clamp(1.125rem,0.9vw+0.9rem,1.5rem)] font-medium leading-tight text-black">
                      {name}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
