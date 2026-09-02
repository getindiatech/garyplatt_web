import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import ArrowLink from "@/components/ui/ArrowLink";
import Eyebrow from "@/components/ui/Eyebrow";
import SeatConfigurator from "@/components/sections/SeatConfigurator";
import { MORE_COLLECTION, QUOTE_PRODUCT } from "@/content/quote";

export const metadata: Metadata = {
  title: "Customize Your Seat",
  description: QUOTE_PRODUCT.body,
};

export default function SendQuotePage() {
  const [large, ...details] = QUOTE_PRODUCT.gallery;

  return (
    <>
      <PageHero
        title="Customize Your Seat"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: "Casino", href: "/products/casino" },
          { label: QUOTE_PRODUCT.name },
        ]}
      />

      <div className="px-gutter pb-section">
        <div className="mx-auto max-w-[1680px]">
          <SeatConfigurator />

          {/* ===== Product detail ===== */}
          <div className="grid grid-cols-1 gap-10 pt-16 lg:grid-cols-[740fr_586fr] lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(1.75rem,1.6vw+1.2rem,2.25rem)] font-medium leading-tight text-ink">
                {QUOTE_PRODUCT.name}
              </h2>
              <p className="pt-3 text-[clamp(1.125rem,0.8vw+0.9rem,1.5rem)] leading-snug text-ink">
                {QUOTE_PRODUCT.tagline}
              </p>
              <p className="pt-5 text-copy leading-relaxed text-muted">
                {QUOTE_PRODUCT.body}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div className="relative aspect-[586/320] w-full overflow-hidden">
                <Image
                  src={large.src}
                  alt={`${QUOTE_PRODUCT.name} in a casino setting`}
                  width={large.w}
                  height={large.h}
                  sizes="(max-width: 1023px) 100vw, 35vw"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                {details.map((img, i) => (
                  <div
                    key={img.src}
                    className="relative aspect-[282/154] w-full overflow-hidden"
                  >
                    <Image
                      src={img.src}
                      alt={`${QUOTE_PRODUCT.name} detail ${i + 1}`}
                      width={img.w}
                      height={img.h}
                      sizes="(max-width: 1023px) 50vw, 18vw"
                      className="absolute inset-0 size-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== More collection ===== */}
      <Container className="pb-section">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Eyebrow>{MORE_COLLECTION.eyebrow}</Eyebrow>
            <h2 className="pt-3 font-display text-section font-medium leading-none tracking-tight text-ink md:pt-4">
              {MORE_COLLECTION.title}
            </h2>
          </div>
          <ArrowLink href="/products" className="whitespace-nowrap">
            {MORE_COLLECTION.cta}
          </ArrowLink>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 xl:mt-16 xl:grid-cols-4 xl:gap-6">
          {MORE_COLLECTION.products.map(({ name, image }) => (
            <article
              key={name}
              className="flex flex-col gap-[clamp(0.9rem,1.7vw,2rem)] border-[0.447px] border-card-border bg-white p-[clamp(0.56rem,1vw,1.25rem)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(3,7,18,0.18)] md:border"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image}
                  alt={name}
                  width={392}
                  height={392}
                  sizes="(max-width: 1279px) 45vw, 23vw"
                  className="size-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between gap-3">
                <h3 className="min-w-0 font-display text-[clamp(0.875rem,1.2vw+0.4rem,1.625rem)] font-medium leading-tight text-black md:whitespace-nowrap">
                  {name}
                </h3>
                <Link
                  href="/products/casino"
                  aria-label={name}
                  className="inline-flex size-[clamp(1.34rem,2.5vw,3rem)] shrink-0 items-center justify-center rounded-full border-[0.447px] border-ink-strong bg-button-dark transition-opacity hover:opacity-85 md:border"
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
      </Container>
    </>
  );
}
