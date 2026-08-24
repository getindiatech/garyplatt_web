import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { PRODUCTS } from "@/content/home";

export default function FeaturedCollection() {
  return (
    <Section className="bg-white" id="products">
      <Container>
        <SectionHeading
          align="start"
          eyebrow="Curated Selection"
          title="Featured Collection"
          className="max-md:items-center max-md:text-center"
          action={
            <ArrowLink href="#" className="max-lg:hidden whitespace-nowrap">
              View All Products
            </ArrowLink>
          }
        />

        <div className="mt-8 grid grid-cols-2 gap-3 xl:mt-16 xl:grid-cols-4 xl:gap-6">
          {PRODUCTS.map(({ title, image }) => (
            <article
              key={title}
              className="flex flex-col gap-[clamp(0.9rem,1.7vw,2rem)] border-[0.447px] border-card-border bg-white p-[clamp(0.56rem,1vw,1.25rem)] transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(3,7,18,0.18)] md:border"
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={image}
                  alt={title}
                  width={392}
                  height={392}
                  sizes="(max-width: 1279px) 45vw, 23vw"
                  className="size-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <h3 className="whitespace-nowrap font-display text-[clamp(0.875rem,1.2vw+0.4rem,1.625rem)] font-medium leading-tight text-black">
                  {title}
                </h3>
                <a
                  href="#"
                  aria-label={title}
                  className="inline-flex size-[clamp(1.34rem,2.5vw,3rem)] shrink-0 items-center justify-center rounded-full border-[0.447px] border-ink-strong bg-button-dark transition-opacity hover:opacity-85 md:border"
                >
                  <Image
                    src="/images/icon-arrow-up-right.svg"
                    alt=""
                    width={20}
                    height={20}
                    className="size-[clamp(0.56rem,1vw,1.25rem)]"
                  />
                </a>
              </div>
            </article>
          ))}
        </div>

        <ArrowLink
          href="#"
          className="mx-auto mt-5 flex h-11 w-fit justify-center px-5 text-ink-strong lg:hidden"
        >
          View All Products
        </ArrowLink>
      </Container>
    </Section>
  );
}
