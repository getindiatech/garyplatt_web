import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { LOOK_BOOKS } from "@/content/resources";

export const metadata: Metadata = {
  title: "Look Book",
  description: "Browse the Gary Platt Seating look books.",
};

export default function LookBookPage() {
  return (
    <>
      <PageHero
        title="Look Book"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Lookbook" },
        ]}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-16">
          {LOOK_BOOKS.map(({ image, pages }, i) => (
            <figure key={image} className="flex flex-col items-center">
              <div className="relative aspect-[374/500] w-full max-w-[520px] overflow-hidden bg-surface">
                <Image
                  src={image}
                  alt={`Look book ${i + 1} cover`}
                  width={374}
                  height={500}
                  sizes="(max-width: 639px) 100vw, 45vw"
                  className="size-full object-contain"
                />
              </div>
              <figcaption className="pt-4 text-copy font-medium text-ink">
                {pages}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
