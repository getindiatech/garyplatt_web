import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import CustomConfigurator from "@/components/sections/CustomConfigurator";
import { ABOUT_INTRO, FUN_FACTS, WHY_GARY_PLATT } from "@/content/about";

export const metadata: Metadata = {
  title: "About Us",
  description: ABOUT_INTRO.body,
};

export default function AboutPage() {
  const [wide, left, right] = ABOUT_INTRO.images;

  return (
    <>
      <PageHero title="About US" crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />

      {/* ===== Intro ===== */}
      <Container className="pb-section">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_774fr] lg:gap-10">
          <div>
            <p className="text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] font-semibold leading-normal text-ink">
              {ABOUT_INTRO.eyebrow}
            </p>
            <h2 className="pt-3 font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-ink">
              {ABOUT_INTRO.title}
            </h2>
          </div>

          <div className="relative aspect-[774/383] w-full overflow-hidden">
            <Image
              src={wide.src}
              alt={wide.alt}
              width={wide.width}
              height={wide.height}
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="size-full object-cover"
            />
          </div>
        </div>

        <p className="max-w-[1026px] pt-8 text-copy leading-relaxed text-muted">
          {ABOUT_INTRO.body}
        </p>

        <div className="grid grid-cols-1 gap-5 pt-10 md:grid-cols-[1026fr_614fr] md:gap-10">
          {[left, right].map((img) => (
            <div
              key={img.src}
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: `${img.width} / ${img.height}` }}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(max-width: 767px) 100vw, 45vw"
                className="size-full object-cover"
              />
            </div>
          ))}
        </div>
      </Container>

      {/* ===== Fun facts ===== */}
      <Container>
        <div className="relative overflow-hidden bg-dark">
          <Image
            src="/images/about-funfacts-bg.jpg"
            alt=""
            aria-hidden
            width={1680}
            height={376}
            className="absolute inset-0 size-full object-cover"
          />
          <div className="relative grid grid-cols-1 gap-8 p-8 md:p-14 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-white">
                {FUN_FACTS.title}
              </h2>
              <p className="pt-5 text-copy leading-relaxed text-white">
                {FUN_FACTS.body}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-6">
              {FUN_FACTS.stats.map(({ value, suffix, label }) => (
                <div key={label}>
                  <p className="flex items-start font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-semibold leading-tight text-[#f5f4f5]">
                    {value}
                    <span className="pt-1 text-[0.4em] font-semibold text-gold-deep">
                      {suffix}
                    </span>
                  </p>
                  <p className="text-copy leading-normal text-white">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* ===== Why Gary Platt ===== */}
      <Section className="relative mt-section overflow-hidden">
        <Image
          src="/images/about-why-bg.jpg"
          alt=""
          aria-hidden
          width={1920}
          height={957}
          sizes="100vw"
          className="absolute inset-0 size-full object-cover"
        />
        <span aria-hidden className="absolute inset-0 bg-white/80" />

        <Image
          src="/images/about-philosophy-2.jpg"
          alt=""
          aria-hidden
          width={219}
          height={227}
          className="absolute right-[2%] top-[5%] hidden w-[11.4vw] max-w-[219px] object-cover lg:block"
        />
        <Image
          src="/images/about-philosophy-1.jpg"
          alt=""
          aria-hidden
          width={241}
          height={248}
          className="absolute bottom-[5%] left-[3%] hidden w-[12.5vw] max-w-[241px] object-cover lg:block"
        />

        <Container className="relative text-center">
          <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">
            {WHY_GARY_PLATT.eyebrow}
          </p>
          <p className="mx-auto max-w-[1500px] pt-8 font-display text-[clamp(1.5rem,2vw+0.9rem,2.75rem)] font-medium leading-snug text-ink">
            {WHY_GARY_PLATT.statement}
          </p>
        </Container>
      </Section>

      <CustomConfigurator />
    </>
  );
}
