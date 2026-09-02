import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  REPRESENTATIVES,
  REPRESENTATIVES_INTRO,
  REPRESENTATIVE_TABS,
} from "@/content/company";

export const metadata: Metadata = {
  title: "Representatives",
  description: REPRESENTATIVES_INTRO,
};

export default function RepresentativesPage() {
  return (
    <>
      <PageHero title="Representatives" />

      <Container className="pb-section">
        <h2 className="mx-auto max-w-[1180px] text-center font-display text-[clamp(1.75rem,2.2vw+1.1rem,3.125rem)] font-medium leading-tight text-ink">
          {REPRESENTATIVES_INTRO}
        </h2>

        <div className="flex justify-center gap-10 pt-8">
          {REPRESENTATIVE_TABS.map((tab, i) => (
            <button
              key={tab}
              type="button"
              className={
                i === 0
                  ? "border-b-2 border-ink pb-2 text-copy font-medium text-ink"
                  : "border-b-2 border-transparent pb-2 text-copy font-medium text-muted transition-colors hover:text-ink"
              }
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {REPRESENTATIVES.map(({ name, image }) => (
            <article key={name} className="flex flex-col">
              <div className="relative aspect-[354/322] w-full overflow-hidden bg-surface">
                <Image
                  src={image}
                  alt={name}
                  width={354}
                  height={322}
                  sizes="(max-width: 639px) 100vw, 22vw"
                  className="size-full object-cover"
                />
              </div>
              <h3 className="pt-5 font-display text-[clamp(1.125rem,0.8vw+0.95rem,1.5rem)] font-semibold leading-tight text-ink">
                {name}
              </h3>
              <Button href="/contact" variant="outline" className="mt-4 h-11 w-fit text-sm">
                View Details
              </Button>
            </article>
          ))}
        </div>

        <div className="relative mx-auto mt-16 aspect-[1520/579] w-full max-w-[1520px] overflow-hidden">
          <Image
            src="/images/contact-rep-map.jpg"
            alt="World map highlighting Gary Platt representative regions"
            width={1520}
            height={579}
            sizes="100vw"
            className="size-full object-contain"
          />
        </div>
      </Container>
    </>
  );
}
