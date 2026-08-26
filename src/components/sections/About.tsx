import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";

const STATS = [
  { value: "38+", label: "Years of Excellence" },
  { value: "2,500+", label: "Projects Completed" },
  { value: "95%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <Section className="bg-surface" id="about">
      <Container>
        <div className="grid grid-cols-1 items-center gap-[18px] lg:grid-cols-2 lg:gap-10 xl:gap-20">
          {/* --- Visual --- */}
          <div className="relative order-2 md:order-1">
            {/* The 0.8 ratio is identical at every breakpoint in the design. */}
            <div className="relative aspect-[872/1090] overflow-hidden">
              <Image
                src="/images/about-living-space.jpg"
                alt="Luxury living space with a designer swivel chair"
                width={872}
                height={1090}
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="size-full object-cover"
              />
            </div>

            <span
              aria-hidden
              className="absolute bottom-[calc(-1*min(2vw,1.5rem))] right-[calc(-1*min(2vw,1.5rem))] hidden size-[clamp(8.75rem,10vw,12rem)] bg-[rgba(201,169,98,0.1)] md:block"
            />

            <div className="absolute bottom-5 right-6 flex flex-col gap-2 border border-hairline bg-white p-[9px] md:bottom-auto md:left-[calc(-1*min(2vw,1.5rem))] md:right-auto md:top-12 md:w-[clamp(6.5rem,8vw,7.55rem)] md:gap-0 md:p-6">
              <p className="font-display text-[clamp(1.125rem,1vw+0.6rem,1.875rem)] leading-tight text-ink">
                38
              </p>
              <p className="text-meta leading-normal text-muted">
                Years of
                <br className="hidden md:inline" /> Excellence
              </p>
            </div>
          </div>

          {/* --- Copy --- */}
          <div className="order-1 flex flex-col items-stretch py-2.5 md:order-2 md:items-start md:py-0">
            <div className="w-full text-center md:text-left">
              <Eyebrow>About Atelier Luxe</Eyebrow>
              <h2 className="pt-3 font-display text-section font-medium leading-tight tracking-tight text-ink md:pt-4">
                Crafting Timeless
                <span className="block md:italic">Elegance</span>
              </h2>
            </div>

            <p className="pt-8 text-center text-copy leading-relaxed text-muted md:pt-6 md:text-left">
              Founded in 1985, Atelier Luxe has established itself as a premier
              destination for discerning clients seeking exceptional interior
              design and bespoke furniture. Our philosophy centers on the belief
              that true luxury lies in the details — the perfect proportions, the
              finest materials, and the masterful execution.
            </p>
            <p className="hidden pt-6 text-copy leading-relaxed text-muted md:block md:text-left">
              Each project we undertake is a collaborative journey, where your
              vision meets our expertise to create spaces that are not just
              beautiful, but deeply personal and timeless.
            </p>

            <div className="mt-6 grid w-full grid-cols-2 gap-5 md:mt-10 md:grid-cols-3 md:gap-8 md:border-t md:border-[#e5e2dc] md:pt-8">
              {STATS.map(({ value, label }, i) => (
                <div key={label} className={i === 0 ? "col-span-2 md:col-span-1" : ""}>
                  <p className="font-display text-stat leading-tight text-ink">
                    {value}
                  </p>
                  <p className="pt-1 text-meta leading-normal text-muted">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <Button
              href="#"
              icon="/images/icon-arrow-right-light.svg"
              className="mt-10 hidden rounded gap-1 px-6 py-3.5 md:inline-flex"
            >
              Discover Our Story
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
