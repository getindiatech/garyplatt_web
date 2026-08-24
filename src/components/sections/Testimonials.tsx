"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/content/home";

export default function Testimonials() {
  const [index, setIndex] = useState(1);

  const go = (delta: number) =>
    setIndex(
      (current) => (current + delta + TESTIMONIALS.length) % TESTIMONIALS.length,
    );

  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading eyebrow="Client Experiences" title="What They Say" />

        <div className="mx-auto mt-8 max-w-4xl xl:mt-16">
          {/* Slides peek past the gutter on phones, so bleed then re-pad. */}
          <div className="overflow-hidden max-md:-mx-gutter max-md:px-gutter">
            <div
              className="flex translate-x-[calc(var(--index)*-1*(var(--slide-w)+var(--slide-gap)))] transition-transform duration-[550ms] ease-[cubic-bezier(0.4,0,0.2,1)] [--slide-gap:0.5rem] [--slide-w:min(21.875rem,82vw)] md:[--slide-gap:0px] md:[--slide-w:100%]"
              style={{ "--index": index } as React.CSSProperties}
            >
              {TESTIMONIALS.map(({ quote, name, role, avatar }) => (
                <div
                  key={name}
                  className="mr-[var(--slide-gap)] shrink-0 basis-[var(--slide-w)] md:mr-0 md:px-4"
                >
                  <figure className="relative rounded-[20px] bg-white p-4 md:rounded-none md:p-8 xl:p-12">
                    <Image
                      src="/images/icon-quote.svg"
                      alt=""
                      width={40}
                      height={40}
                      className="hidden size-10 md:block"
                    />

                    <blockquote className="font-display text-[clamp(0.875rem,1vw+0.5rem,1.875rem)] leading-snug text-ink md:pt-6 md:leading-[1.625]">
                      {quote}
                    </blockquote>

                    <figcaption className="flex items-center gap-2 pt-5 md:gap-4 md:pt-8">
                      <Image
                        src={avatar}
                        alt={name}
                        width={56}
                        height={56}
                        className="size-10 shrink-0 rounded-full object-cover md:size-14"
                      />
                      <div>
                        <p className="text-[clamp(1rem,0.3vw+0.92rem,1.125rem)] leading-normal text-ink max-md:text-[#0a0a0a] md:font-display">
                          {name}
                        </p>
                        <p className="text-meta leading-normal text-muted">
                          {role}
                        </p>
                      </div>

                      <div className="absolute bottom-4 right-4 flex items-start gap-0.5 md:static md:ml-auto md:gap-1">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Image
                            key={starIndex}
                            src="/images/icon-star.svg"
                            alt=""
                            width={20}
                            height={20}
                            className="size-[clamp(0.576rem,1vw,1.25rem)]"
                          />
                        ))}
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 pt-6 md:pt-8">
            {[
              { dir: -1, label: "Previous testimonial", icon: "left" },
              { dir: 1, label: "Next testimonial", icon: "right" },
            ].map(({ dir, label, icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => go(dir)}
                aria-label={label}
                className="flex size-[clamp(2.44rem,3.2vw,2.875rem)] items-center justify-center border-[0.87px] border-hairline transition-colors hover:bg-ink/4 md:border"
              >
                <Image
                  src={`/images/icon-chevron-${icon}.svg`}
                  alt=""
                  width={20}
                  height={20}
                  className="size-[clamp(1.087rem,1.4vw,1.25rem)]"
                />
              </button>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
