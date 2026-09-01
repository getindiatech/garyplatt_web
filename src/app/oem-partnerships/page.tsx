import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { OEM_INTRO, OEM_PARTNERS, OEM_WHY } from "@/content/oem";

export const metadata: Metadata = {
  title: "OEM Partnerships",
  description: OEM_INTRO,
};

export default function OemPartnershipsPage() {
  return (
    <>
      <PageHero title="OEM Partnerships" />

      <Container className="pb-section">
        <h2 className="mx-auto max-w-[1180px] text-center font-display text-[clamp(1.75rem,2.2vw+1.1rem,3.125rem)] font-medium leading-tight text-ink">
          {OEM_INTRO}
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {OEM_PARTNERS.map(({ logo, blurb, since, square }) => (
            <article key={blurb} className="flex flex-col items-start">
              <div className="flex h-[126px] w-full items-center justify-start">
                <Image
                  src={logo}
                  alt=""
                  width={square ? 132 : 210}
                  height={square ? 131 : 126}
                  className="max-h-full w-auto object-contain"
                />
              </div>
              <p className="pt-5 font-display text-[clamp(1rem,0.6vw+0.9rem,1.25rem)] leading-snug text-ink">
                {blurb}
              </p>
              <p className="pt-3 text-[clamp(0.75rem,0.2vw+0.7rem,0.8125rem)] leading-normal text-muted">
                {since}
              </p>
            </article>
          ))}
        </div>

        {/* Why OEMs choose us */}
        <div className="mt-16 grid grid-cols-1 items-center gap-10 lg:grid-cols-[794fr_1fr] lg:gap-16">
          <div className="relative aspect-[794/480] w-full overflow-hidden">
            <Image
              src={OEM_WHY.image}
              alt={OEM_WHY.alt}
              width={794}
              height={480}
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="size-full object-cover"
            />
          </div>

          <div>
            <p className="text-[clamp(1rem,0.5vw+0.9rem,1.25rem)] font-medium leading-normal text-muted-alt">
              {OEM_WHY.eyebrow}
            </p>
            <h3 className="pt-3 font-display text-[clamp(1.5rem,1.6vw+1rem,2.5rem)] font-medium leading-tight text-ink">
              {OEM_WHY.title}
            </h3>
            <p className="pt-5 text-copy leading-relaxed text-muted">
              {OEM_WHY.body}
            </p>
            <div className="flex flex-wrap gap-4 pt-8">
              <Button href="/contact" icon="/images/icon-arrow-right-light.svg">
                {OEM_WHY.primary}
              </Button>
              <Button href="#" variant="outline">
                {OEM_WHY.secondary}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
