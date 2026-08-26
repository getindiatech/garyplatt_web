import Image from "next/image";
import Section from "@/components/ui/Section";
import { TRADE_SHOWS } from "@/content/home";

export default function TradeShows() {
  return (
    <Section className="bg-white">
      {/* The 1920 frame insets this band by 320px each side; centring a 1280
          column reproduces that and stays fluid below it. */}
      <div className="px-gutter">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 lg:gap-10">
        <div className="flex flex-col items-center justify-center gap-4 text-center lg:gap-5">
          <h2 className="font-display text-section font-medium leading-none tracking-tight text-ink">
            Upcoming Trade Shows
          </h2>
          <p className="text-copy leading-relaxed text-muted">
            Meet the studio and experience our latest collections in person at
            these premier industry events.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-8">
          {TRADE_SHOWS.map(({ code, name, date, location, image, alt }) => (
            <article
              key={code}
              className="relative flex flex-col overflow-hidden border-[0.638px] border-[rgba(57,49,44,0.3)] bg-[rgba(23,17,14,0.4)] p-px pt-[23.5%] shadow-[0_15.946px_31.891px_-7.654px_rgba(0,0,0,0.25)] md:border md:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]"
            >
              <Image
                src={image}
                alt={alt}
                width={624}
                height={468}
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="absolute inset-0 size-full object-cover"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-dark-warm via-dark-warm/60 to-dark-warm/20"
              />

              <div className="relative p-4 md:p-8">
                <div className="relative overflow-hidden bg-[rgba(23,17,14,0.1)] p-[15.308px] md:min-h-64 md:p-6">
                  <span
                    aria-hidden
                    className="absolute inset-x-px top-px h-px bg-linear-to-r from-transparent via-gold/60 to-transparent"
                  />

                  <div className="flex items-end justify-between gap-2 md:gap-4">
                    <div>
                      <p className="text-[clamp(0.75rem,0.5vw+0.6rem,1rem)] leading-normal text-gold">
                        Upcoming Event
                      </p>

                      <div className="relative flex items-center gap-2 md:gap-4 md:pt-4">
                        <p className="font-display text-[clamp(2rem,2.4vw+0.8rem,3.75rem)] leading-tight text-cream">
                          {code}
                        </p>
                        <span
                          aria-hidden
                          className="h-px w-[clamp(1.9rem,2.5vw,3rem)] bg-gold/40"
                        />
                      </div>

                      <h3 className="pt-3 text-[clamp(0.875rem,0.7vw+0.7rem,1.25rem)] leading-snug text-cream md:pt-4">
                        {name}
                      </h3>

                      <div className="pt-4">
                        {[
                          { label: "Date:", value: date },
                          { label: "Location:", value: location },
                        ].map(({ label, value }) => (
                          <p
                            key={label}
                            className="text-[clamp(0.75rem,0.3vw+0.68rem,0.875rem)] leading-snug text-gold md:leading-normal"
                          >
                            {label}
                            <span className="text-white"> {value}</span>
                          </p>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#"
                      className="inline-flex h-8 shrink-0 items-center justify-center gap-[5px] whitespace-nowrap border-[0.638px] border-ink-strong bg-button-dark pl-3 pr-2 text-[clamp(0.75rem,0.4vw+0.65rem,1rem)] font-medium text-[#f5f5f5] transition-opacity hover:opacity-88 md:h-14 md:gap-2 md:border md:px-6"
                    >
                      View Details
                      <Image
                        src="/images/icon-arrow-up-right.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="size-[clamp(0.8rem,1.2vw,1.25rem)]"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
