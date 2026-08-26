import Image from "next/image";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import { EXPERIENCES } from "@/content/home";

export default function DesignedForEveryExperience() {
  return (
    <Section className="bg-white" id="services">
      <div className="px-gutter">
        <div className="mx-auto flex w-full max-w-[1680px] flex-col items-center gap-8 lg:gap-10">
          <div className="flex flex-col items-center gap-3 text-center lg:gap-5">
          <h2 className="font-display text-[clamp(2rem,2.6vw+1.1rem,3.75rem)] font-medium leading-tight text-[#0a0a0a]">
            Designed For Every Experience
          </h2>
            <p className="max-w-[762px] text-copy leading-normal text-[#0a0a0a]/60">
            Premium seating crafted for comfort, style, and performance ..
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-10">
          {EXPERIENCES.map(({ title, body, cta, icon, image, alt }) => (
            <article
              key={title}
              className="relative flex items-center overflow-hidden rounded-[14px] border border-card-border md:min-h-[16.15vw]"
            >
              <Image
                src={image}
                alt={alt}
                width={820}
                height={310}
                sizes="(max-width: 1023px) 100vw, 45vw"
                className="absolute inset-0 size-full object-cover"
              />
              {/* Ink wash from the left so the copy stays legible over the photo */}
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(90deg,#1F1F1F_0%,rgba(31,31,31,0.92)_55%,rgba(31,31,31,0.6)_100%)] md:bg-[linear-gradient(89.8deg,#1F1F1F_0.17%,rgba(31,31,31,0.92)_34.19%,rgba(31,31,31,0.09)_73.96%)]"
              />

              <div className="relative flex w-full max-w-[414px] flex-col gap-6 p-5 md:gap-10 md:pl-10">
                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={icon}
                      alt=""
                      width={46}
                      height={46}
                      className="size-8 shrink-0 md:size-[46px]"
                    />
                    <h3 className="font-display text-[clamp(1.375rem,1vw+1rem,1.875rem)] font-medium leading-tight text-white">
                      {title}
                    </h3>
                  </div>
                  <p className="text-copy leading-normal text-white">{body}</p>
                </div>

                <Button href="#" icon="/images/icon-arrow-right-light.svg" className="w-fit">
                  {cta}
                </Button>
              </div>
            </article>
          ))}
        </div>
        </div>
      </div>
    </Section>
  );
}
