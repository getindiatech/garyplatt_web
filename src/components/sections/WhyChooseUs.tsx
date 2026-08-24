import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { REASONS } from "@/content/home";

export default function WhyChooseUs() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading eyebrow="The Atelier Difference" title="Why Choose Us" />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:mt-16">
          {REASONS.map(({ icon, title, body }) => (
            <article
              key={title}
              className="flex flex-col items-start text-left md:items-center md:text-center"
            >
              <div className="flex size-8 items-center justify-center border-[0.5px] border-hairline-soft md:size-16 md:border">
                <Image
                  src={icon}
                  alt=""
                  width={32}
                  height={32}
                  className="size-4 md:size-8"
                />
              </div>

              <h3 className="pt-6 font-display text-card-title font-medium leading-tight tracking-tight text-ink">
                {title}
              </h3>
              <p className="pt-1 text-copy leading-relaxed text-muted md:pt-3">
                {body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
