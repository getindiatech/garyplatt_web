import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { USER_GUIDE } from "@/content/resources";
import { DOCUMENT_REQUEST_HREF } from "@/content/navigation";

export const metadata: Metadata = {
  title: "User Guides",
  description: "Chair adjustment guide and mechanism instructions.",
};

export default function UserGuidesPage() {
  return (
    <>
      <PageHero
        title="User Guides"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "User Guides" },
        ]}
      />

      <Container className="pb-section">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-ink">
            {USER_GUIDE.title}
          </h2>
          <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="h-11 text-sm">
            {USER_GUIDE.download}
          </Button>
        </div>

        <ul className="flex flex-col gap-3 pt-8">
          {USER_GUIDE.mechanisms.map((m) => (
            <li
              key={m}
              className="text-[clamp(1rem,0.5vw+0.85rem,1.125rem)] font-medium leading-normal text-ink"
            >
              {m}
            </li>
          ))}
        </ul>
        <p className="pt-4 text-copy leading-relaxed text-muted">
          {USER_GUIDE.note}
        </p>

        <div className="relative mx-auto mt-10 aspect-[1024/630] w-full max-w-[1024px] overflow-hidden">
          <Image
            src="/images/user-guide-diagram.jpg"
            alt="Diagram showing the two-way and six-way chair adjustment mechanisms"
            width={1024}
            height={630}
            sizes="(max-width: 1023px) 100vw, 1024px"
            className="size-full object-contain"
          />
        </div>

        <p className="pt-8 text-[clamp(1rem,0.5vw+0.85rem,1.125rem)] font-medium leading-normal text-ink">
          {USER_GUIDE.diagramNote}
        </p>

        <h3 className="pt-10 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {USER_GUIDE.instructionsTitle}
        </h3>
        <ol className="flex list-decimal flex-col gap-4 pl-6 pt-5">
          {USER_GUIDE.instructions.map((step) => (
            <li
              key={step}
              className="text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-relaxed text-ink"
            >
              {step}
            </li>
          ))}
        </ol>

        <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="mt-8 h-11 text-sm">
          {USER_GUIDE.download}
        </Button>
      </Container>
    </>
  );
}
