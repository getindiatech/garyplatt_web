import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import SeatConfigurator from "@/components/sections/SeatConfigurator";
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
    views: [
      imageUrl(product?.heroImage, QUOTE_PRODUCT.preview),
      ...(product?.images ?? []).map((image) => imageUrl(image.url)),
    ].filter(Boolean),
    optionGroups: (product?.optionGroups ?? []).map((group) => ({
      ...group,
      values: group.values.map((value) => ({
        ...value,
        image: value.image ? imageUrl(value.image) : null,
      })),
    })),
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
          <SeatConfigurator product={configurable} />

          {/* ===== Product detail ===== */}
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-[740fr_586fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,1.6vw+1.2rem,2.25rem)] font-medium leading-tight text-ink">
                {configurable.name}
              </h2>
              <p className="pt-2 text-copy font-medium leading-normal text-muted-alt">
                {product?.tagline ?? QUOTE_PRODUCT.tagline}
              </p>
              <p className="whitespace-pre-line pt-6 text-copy leading-relaxed text-muted">
                {product?.description ?? QUOTE_PRODUCT.body}
              </p>
              {product?.minOrderQty ? (
                <p className="pt-6 text-copy leading-relaxed text-muted">
                  Minimum order quantity: {product.minOrderQty} units.
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative aspect-[586/320] w-full overflow-hidden">
                <Image
                  src={large.src}
                  alt={configurable.name}
                  width={large.w}
                  height={large.h}
                  sizes="(max-width: 1023px) 100vw, 35vw"
                  className="size-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {details.map((image) => (
                  <div key={image.src} className="relative aspect-[282/154] overflow-hidden">
                    <Image
                      src={image.src}
                      alt={`${configurable.name} detail`}
                      width={image.w}
                      height={image.h}
                      sizes="(max-width: 1023px) 50vw, 18vw"
                      className="size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

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
