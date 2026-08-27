import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { FABRIC_BRANDS } from "@/content/resources";

export const metadata: Metadata = {
  title: "Upholstery",
  description:
    "Performance upholstery from Ultrafabrics, Momentum, Designtex, Brentano and more.",
};

export default function UpholsteryPage() {
  return (
    <>
      <PageHero
        title="Upholstery"
        crumbs={[{ label: "Home", href: "/" }, { label: "Upholstery" }]}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {FABRIC_BRANDS.map(({ name, body, logo }) => (
            <article key={name} className="flex flex-col items-center text-center">
              <div className="flex aspect-square w-full items-center justify-center overflow-hidden bg-surface p-8">
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  width={240}
                  height={240}
                  sizes="(max-width: 639px) 100vw, 22vw"
                  className="max-h-full w-auto object-contain"
                />
              </div>

              <h2 className="pt-6 text-[clamp(1.125rem,0.8vw+0.9rem,1.5rem)] font-semibold leading-tight text-ink">
                {name}
              </h2>
              <p className="pt-2 text-copy leading-relaxed text-muted">{body}</p>

              <Button href="#" variant="outline" className="mt-5 h-11 text-sm">
                View Collection
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
