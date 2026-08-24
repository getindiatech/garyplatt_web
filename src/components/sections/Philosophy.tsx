import Image from "next/image";
import Section from "@/components/ui/Section";
import { PRINCIPLES } from "@/content/home";

export default function Philosophy() {
  return (
    <Section className="bg-dark" id="sustainability">
      <div className="mx-auto w-full max-w-page px-gutter xl:px-30">
        <p className="text-center text-eyebrow uppercase text-white md:text-left md:tracking-[0.2em] md:text-muted-alt">
          Our Philosophy
        </p>

        <div className="flex flex-col items-center gap-4 pt-3 text-center md:pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:text-left">
          <h2 className="font-display text-section font-medium leading-tight tracking-tight text-white lg:max-w-xl">
            Built on Four Principles
          </h2>
          <p className="w-full text-copy leading-relaxed text-white lg:w-96 lg:shrink-0">
            Every Gary Platt chair is thoughtfully designed around four core
            principles that define exceptional seating.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-5 md:gap-8 lg:mt-14 xl:grid-cols-4 xl:gap-10 xl:px-4">
          {PRINCIPLES.map(({ title, body, image, alt }) => (
            <article key={title} className="flex flex-col items-start">
              {/* aspect-ratio keeps the tile proportional instead of pinning a height */}
              <div className="w-full overflow-hidden bg-warm-panel aspect-[416/520]">
                <Image
                  src={image}
                  alt={alt}
                  width={416}
                  height={520}
                  sizes="(max-width: 1279px) 45vw, 22vw"
                  className="size-full object-cover"
                />
              </div>

              <div className="mt-3 w-full border-b-[0.464px] border-warm-line pb-1 md:mt-6 md:border-b md:pb-[7px]">
                <h3 className="font-display text-[clamp(1rem,1.2vw+0.4rem,1.875rem)] font-medium leading-snug text-cream">
                  {title}
                </h3>
              </div>

              <p className="pt-2 text-[clamp(0.75rem,0.5vw+0.6rem,1rem)] leading-snug text-body-dark md:pt-4 md:leading-normal">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
