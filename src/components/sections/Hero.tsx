import Image from "next/image";
import Button from "@/components/ui/Button";
import { HERO } from "@/content/home";
import { HERO_SOCIALS } from "@/content/navigation";

/**
 * Desktop reproduces the 1920x1040 frame, with every child placed in
 * percentages so the composition scales with the viewport rather than being
 * pinned to the design's pixel offsets. Height is floored so the copy is never
 * clipped at mid widths, where type clamps instead of scaling down.
 * Below md it unstacks: copy, actions, then the photo.
 */
export default function Hero() {
  return (
    <section className="relative flex flex-col overflow-visible bg-white md:block md:h-[clamp(55rem,81.25vw,65rem)] md:overflow-hidden md:bg-hero-bg">
      {/* --- Photo --- */}
      <div className="relative order-3 mt-8 h-[clamp(15rem,64vw,17.375rem)] w-full md:absolute md:inset-0 md:mt-0 md:h-auto md:overflow-hidden">
        <Image
          src="/images/hero-interior.png"
          alt="Luxury interior with a dark modular sofa and brass pendant lights"
          width={1920}
          height={1104}
          sizes="100vw"
          className="absolute left-0 top-[-5.86%] h-[106.19%] w-full max-w-none object-cover"
          priority
        />

        {/* Mobile-only framed detail */}
        <div className="absolute left-[68.6%] top-[40.6%] w-[16.2%] md:hidden">
          <div className="relative aspect-[288/384] overflow-hidden rounded-sm border-[2.688px] border-white p-[2.688px] shadow-[0_5.599px_11.198px_-2.688px_rgba(0,0,0,0.25)]">
            <div className="relative size-full overflow-hidden">
              <Image
                src="/images/hero-interior.png"
                alt=""
                width={301}
                height={165}
                aria-hidden
                className="absolute left-[-209.12%] top-[-76.23%] h-[191.67%] w-[466.52%] max-w-none object-cover"
              />
            </div>
          </div>
          <span
            aria-hidden
            className="absolute left-[-5.6%] top-[83.3%] size-[27.8%] border-[0.224px] border-muted-alt"
          />
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none absolute left-[83.333%] top-[30.63%] hidden font-display text-[16.67vw] leading-none text-ink/5 md:block"
      >
        01
      </p>

      {/* --- Copy --- */}
      <div className="order-1 px-4 md:absolute md:inset-x-0 md:top-[15.43%] md:px-gutter md:pb-20 md:pt-24 xl:pt-32">
        <div className="flex flex-col gap-3.5 md:block md:max-w-[46.6vw]">
          <p className="text-eyebrow uppercase leading-normal tracking-[0.06em] text-muted md:tracking-[0.3em]">
            {HERO.eyebrow}
          </p>

          <h1 className="pt-1 font-display text-hero font-medium leading-[0.95] tracking-tight text-black md:max-w-[38.33vw] md:pt-6 md:text-white">
            {HERO.title}
            <span className="block text-muted-alt md:italic">
              {HERO.titleAccent}
            </span>
          </h1>

          <p className="max-w-[28rem] text-lead leading-normal text-muted md:pt-6 md:leading-[1.625]">
            {HERO.lead}
          </p>

          {/* Action row sits in the copy column in V2 */}
          <div className="flex flex-wrap gap-4 pt-6 md:pt-10">
            <Button
              href={HERO.primary.href}
              icon="/images/icon-arrow-right-light.svg"
            >
              {HERO.primary.label}
            </Button>
            <Button href={HERO.secondary.href} variant="outline">
              {HERO.secondary.label}
            </Button>
          </div>
        </div>
      </div>

      {/* --- Mobile socials --- */}
      <div className="order-2 mx-4 mt-6 flex items-center gap-3.5 md:hidden">
        {HERO_SOCIALS.map(({ label, iconDark }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="transition-opacity hover:opacity-70"
          >
            <Image
              src={iconDark}
              alt=""
              width={18}
              height={18}
              className="size-[18px]"
            />
          </a>
        ))}
      </div>

      {/* --- Desktop socials --- */}
      <div className="absolute bottom-[11.25%] left-[5.52%] hidden items-center gap-4 md:flex">
        {HERO_SOCIALS.map(({ label, iconDark }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="transition-opacity hover:opacity-70"
          >
            <Image
              src={iconDark}
              alt=""
              width={20}
              height={20}
              className="size-5"
            />
          </a>
        ))}
      </div>

      {/* --- Desktop framed detail --- */}
      <div className="absolute right-[4.17%] top-[12.12%] hidden w-[15%] md:block">
        <div className="relative aspect-[288/384] overflow-hidden rounded-lg border-[0.625vw] border-white p-[0.625vw] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="relative size-full overflow-hidden">
            <Image
              src="/images/hero-interior.png"
              alt=""
              width={1120}
              height={644}
              aria-hidden
              className="absolute left-[-209.12%] top-[-76.23%] h-[191.67%] w-[466.52%] max-w-none object-cover"
            />
          </div>
        </div>
        <span
          aria-hidden
          className="absolute left-[-5.6%] top-[83.3%] size-[27.8%] border border-muted-alt"
        />
      </div>
    </section>
  );
}
