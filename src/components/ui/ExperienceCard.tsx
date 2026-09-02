import Image from "next/image";
import Button from "./Button";

export type ExperienceCardProps = {
  title: string;
  body: string;
  cta: string;
  href: string;
  icon?: string;
  image: string;
  alt: string;
};

/**
 * Wide photo card with an ink wash and copy over the left third. Shared by the
 * home page's "Designed For Every Experience" band and the Products grid.
 * 820x310 in the design; height is a floor so the copy can never be clipped.
 */
export default function ExperienceCard({
  title,
  body,
  cta,
  href,
  icon,
  image,
  alt,
}: ExperienceCardProps) {
  return (
    <article className="relative flex items-center overflow-hidden rounded-[14px] border border-card-border md:min-h-[16.15vw]">
      <Image
        src={image}
        alt={alt}
        width={820}
        height={310}
        sizes="(max-width: 1023px) 100vw, 45vw"
        className="absolute inset-0 size-full object-cover"
      />
      {/* The design wash fades out by 74% of the width, which on a phone-width
          card lands under the copy. Compress it below md so text stays legible. */}
      <span
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(90deg,#1F1F1F_0%,rgba(31,31,31,0.92)_55%,rgba(31,31,31,0.6)_100%)] md:bg-[linear-gradient(89.8deg,#1F1F1F_0.17%,rgba(31,31,31,0.92)_34.19%,rgba(31,31,31,0.09)_73.96%)]"
      />

      <div className="relative flex w-full max-w-[414px] flex-col gap-6 p-5 md:gap-10 md:pl-10">
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="flex items-center gap-4">
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={46}
                height={46}
                className="size-8 shrink-0 md:size-[46px]"
              />
            ) : null}
            <h3 className="font-display text-[clamp(1.375rem,1vw+1rem,1.875rem)] font-medium leading-tight text-white">
              {title}
            </h3>
          </div>
          <p className="text-copy leading-normal text-white">{body}</p>
        </div>

        <Button href={href} icon="/images/icon-arrow-right-light.svg" className="w-fit">
          {cta}
        </Button>
      </div>
    </article>
  );
}
