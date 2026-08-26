import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { PROJECTS } from "@/content/home";

export default function FeaturedProjects() {
  return (
    <Section className="bg-white" id="gallery">
      <Container>
        <SectionHeading
          align="start"
          eyebrow="Portfolio"
          title="Featured Projects"
          className="max-md:items-center max-md:text-center"
          action={
            <ArrowLink href="#" className="max-md:hidden whitespace-nowrap">
              View All Projects
            </ArrowLink>
          }
        />

        <div className="mt-8 grid grid-cols-2 gap-3 xl:mt-16 xl:gap-5 2xl:gap-8">
          {PROJECTS.map(({ title, meta, image }) => (
            <a
              key={title}
              href="#"
              className="group relative aspect-[193/144] overflow-hidden md:aspect-[896/672]"
            >
              <Image
                src={image}
                alt={title}
                width={896}
                height={672}
                sizes="45vw"
                className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.03]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60"
              />
              <span className="absolute inset-x-0 bottom-0 flex h-[clamp(9rem,20vw,15.625rem)] flex-col justify-end gap-1 bg-linear-to-t from-black to-[rgba(27,27,27,0)] px-3 pb-4 md:gap-2 md:px-6 md:pb-6 2xl:px-10 2xl:pb-10">
                <span className="font-display text-[clamp(1rem,1.4vw+0.5rem,1.875rem)] font-medium leading-tight tracking-tight text-white">
                  {title}
                </span>
                <span className="text-[clamp(0.75rem,0.3vw+0.68rem,0.875rem)] uppercase leading-tight tracking-[0.16em] text-white">
                  {meta}
                </span>
              </span>
            </a>
          ))}
        </div>

        <ArrowLink
          href="#"
          className="mx-auto mt-6 flex h-11 w-fit justify-center px-5 text-ink-strong md:hidden"
        >
          View All Projects
        </ArrowLink>
      </Container>
    </Section>
  );
}
