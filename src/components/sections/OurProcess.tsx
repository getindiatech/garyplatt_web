import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS_STEPS } from "@/content/home";

export default function OurProcess() {
  return (
    <Section className="bg-surface">
      <Container>
        <SectionHeading eyebrow="How We Work" title="Our Process" />

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-x-3 gap-y-5 lg:grid-cols-4 lg:gap-8 xl:mt-16 xl:gap-6">
          {PROCESS_STEPS.map(({ number, title, body }) => (
            <article key={number}>
              <p className="font-display text-step leading-none text-muted-alt/30">
                {number}
              </p>
              <h3 className="font-display text-card-title font-medium leading-tight tracking-tight text-ink lg:pt-4">
                {title}
              </h3>
              <p className="pt-4 text-copy leading-relaxed text-muted lg:pt-3">
                {body}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
