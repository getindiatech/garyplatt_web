import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ArrowLink from "@/components/ui/ArrowLink";
import { SERVICES } from "@/content/home";

export default function PremiumServices() {
  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading eyebrow="Our Expertise" title="Premium Services" />

        <div className="mt-8 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-3 xl:mt-16 xl:gap-12">
          {SERVICES.map(({ icon, title, body }) => (
            <article
              key={title}
              className="flex min-h-[clamp(11.625rem,17vw,18.5rem)] flex-col items-start gap-4 bg-surface p-3 md:gap-0 md:p-7 xl:p-10"
            >
              <div>
                <Image
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                  className="size-8 md:size-12"
                />
                <h3 className="pt-6 font-display text-card-title font-medium leading-tight tracking-tight text-ink">
                  {title}
                </h3>
                <p className="pt-1 text-copy leading-relaxed text-muted md:pt-4">
                  {body}
                </p>
              </div>

              <ArrowLink href="#" className="mt-auto md:pt-6">
                Learn more
              </ArrowLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
