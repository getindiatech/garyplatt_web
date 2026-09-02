import Image from "next/image";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button from "@/components/ui/Button";
import { CRAFT } from "@/content/home";

export default function ArtOfCraftsmanship() {
  return (
    <Section className="bg-dark">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start">
            <Eyebrow className="text-muted-alt">{CRAFT.eyebrow}</Eyebrow>

            <h2 className="pt-3 font-display text-section font-medium leading-tight tracking-tight text-white md:pt-4">
              {CRAFT.title}
              <span className="block">{CRAFT.titleAccent}</span>
            </h2>

            <p className="pt-6 text-copy leading-relaxed text-muted">
              {CRAFT.body}
            </p>

            <ul className="flex flex-col gap-4 pb-10 pt-8">
              {CRAFT.points.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-muted-alt"
                  />
                  <span className="text-copy leading-normal text-[#e5e2dc]">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

            <Button href="/products/quote" icon="/images/icon-arrow-right-light.svg">
              {CRAFT.cta}
            </Button>
          </div>

          <div className="relative aspect-[872/654] w-full overflow-hidden">
            <Image
              src={CRAFT.image}
              alt={CRAFT.alt}
              width={872}
              height={654}
              sizes="(max-width: 1023px) 100vw, 45vw"
              className="absolute inset-0 size-full object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
