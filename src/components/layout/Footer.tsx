import Image from "next/image";
import Button from "@/components/ui/Button";
import IconCircle from "@/components/ui/IconCircle";
import {
  FOOTER_COLUMNS,
  FOOTER_SOCIALS,
  LEGAL_LINKS,
} from "@/content/navigation";

export default function Footer() {
  return (
    <footer className="bg-dark pt-15" id="contact">
      <div className="mx-auto w-full max-w-shell md:px-[15px]">
        {/* ===== Top row: pitch / chair / links ===== */}
        <div className="flex flex-col xl:flex-row xl:items-center">
          {/* Chair leads on mobile, sits centre on desktop */}
          <div className="order-1 flex w-full flex-col items-center justify-center xl:order-2 xl:h-[389.594px] xl:w-auto xl:flex-1 xl:border xl:border-footer-line xl:p-20">
            {/* Taller than the cell's content box by design; must not shrink,
                or the absolutely-placed ellipse drops onto the socials row. */}
            <div className="relative h-[367px] w-[249px] shrink-0">
              <Image
                src="/images/footer-chair.png"
                alt="Soraya Flex Stacker chair"
                width={213}
                height={352}
                className="absolute left-[19px] top-0 h-[352px] w-[213px] object-contain"
              />
              <Image
                src="/images/footer-chair-ellipse.svg"
                alt=""
                aria-hidden
                width={249}
                height={64}
                className="absolute left-0 top-[303px] h-[64px] w-[249px]"
              />
            </div>
          </div>

          <div className="order-2 flex w-full flex-col items-start px-4 pt-10 xl:order-1 xl:h-[389.594px] xl:w-auto xl:flex-1 xl:border xl:border-footer-line xl:px-10 xl:py-20">
            <p className="font-display text-[1.25rem] font-medium leading-7 text-white">
              Experience Exceptional Comfort
            </p>
            <p className="max-w-[474px] pt-3 text-copy leading-relaxed text-white/80">
              Explore premium gaming and hospitality seating designed with
              unmatched craftsmanship, innovative engineering, and timeless
              comfort.
            </p>
            <Button
              href="#"
              variant="light"
              icon="/images/icon-arrow-up-right-dark.svg"
              className="mt-6 h-11 w-54 md:h-14 md:w-auto"
            >
              Explore Collection
            </Button>
          </div>

          <div className="order-3 flex w-full items-center justify-center px-4 pt-10 xl:h-[389.594px] xl:w-auto xl:flex-1 xl:border xl:border-footer-line xl:px-10 xl:py-20">
            <div className="flex w-full items-start justify-between xl:w-84">
              {FOOTER_COLUMNS.map(({ heading, links }) => (
                <div key={heading} className="flex w-40 flex-col gap-4 xl:w-auto xl:gap-6">
                  <p className="font-display text-[1.25rem] font-medium leading-7 text-neutral-100">
                    {heading}
                  </p>
                  <nav className="flex flex-col gap-4 text-copy leading-normal text-brand-300 md:gap-[18px]">
                    {links.map((label) => (
                      <a key={label} href="#" className="transition-colors hover:text-white">
                        {label}
                      </a>
                    ))}
                  </nav>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== Socials ===== */}
        {/* Phones get brand glyphs with no labels; wide viewports get the
            labelled cell strip from the 1920 frame. */}
        <div className="flex flex-col gap-5 px-4 pt-10 xl:hidden">
          <p className="text-base font-medium text-white">
            Also available on socials :
          </p>
          <div className="flex items-center gap-2">
            {FOOTER_SOCIALS.map(({ name, icon }) => (
              <a key={name} href="#" aria-label={name} className="group">
                <IconCircle className="group-hover:bg-white/20">
                  <Image src={icon} alt="" width={20} height={20} className="size-5" />
                </IconCircle>
              </a>
            ))}
          </div>
        </div>

        <div className="hidden items-center border-b border-footer-line xl:flex">
          <div className="flex h-20 flex-[518.62_0_0] items-center justify-center border-x border-footer-line px-5 py-6">
            <p className="whitespace-nowrap text-center text-xl font-medium leading-8 text-white">
              Also available on socials :
            </p>
          </div>
          {FOOTER_SOCIALS.map(({ name }, i) => (
            <div
              key={name}
              className="flex h-20 min-w-0 flex-[212_0_0] items-center justify-center border-r border-footer-line px-5 py-6 data-[wide=true]:flex-[248_0_0]"
              data-wide={i >= 2}
            >
              <a href="#" className="group flex items-center gap-5">
                <span className="whitespace-nowrap text-copy font-medium text-brand-400 xl:text-base">
                  {name}
                </span>
                <IconCircle className="group-hover:bg-white/20">
                  <Image
                    src="/images/icon-social-arrow.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="size-4"
                  />
                </IconCircle>
              </a>
            </div>
          ))}
        </div>

        {/* ===== Bottom row ===== */}
        <div className="flex flex-col items-center gap-4 pb-6 xl:h-[222px] xl:flex-row xl:items-start xl:justify-between xl:gap-0 xl:pb-0">
          <Image
            src="/images/wordmark-gary-platt-seating.svg"
            alt=""
            aria-hidden
            width={1039}
            height={70}
            className="mx-4 mt-10 w-[calc(100%-2rem)] self-start md:w-[54.1vw] xl:-ml-[15px] xl:mr-0 xl:mt-[50px]"
          />

          <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 text-copy leading-normal text-brand-400 max-xl:pt-4 xl:w-auto xl:max-w-[550px] xl:justify-center xl:gap-[15px] xl:whitespace-nowrap xl:px-0 xl:py-[30px]">
            <div className="flex items-center gap-4 xl:contents">
              {LEGAL_LINKS.map((label, i) => (
                <span key={label} className="contents">
                  {i > 0 ? (
                    <span aria-hidden className="hidden h-6 w-px bg-brand-400/40 xl:block" />
                  ) : null}
                  <a href="#" className="transition-colors hover:text-white">
                    {label}
                  </a>
                </span>
              ))}
            </div>
            <span aria-hidden className="hidden h-6 w-px bg-brand-400/40 xl:block" />
            <p>© 2026 Gary Platt Seating</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
