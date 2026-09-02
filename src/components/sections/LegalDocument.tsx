import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import type { LegalDocument as Doc } from "@/content/legal";

/** Shared layout for the footer's Privacy Policy and Disclaimer pages. */
export default function LegalDocument({ doc }: { doc: Doc }) {
  return (
    <>
      <PageHero title={doc.title} />

      <Container className="pb-section">
        <div className="mx-auto max-w-[900px]">
          <p className="text-meta leading-normal text-muted">{doc.updated}</p>
          <p className="pt-4 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-relaxed text-ink">
            {doc.intro}
          </p>

          {doc.sections.map(({ title, body }) => (
            <section key={title} className="pt-10">
              <h2 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                {title}
              </h2>
              <p className="pt-3 text-copy leading-relaxed text-muted">{body}</p>
            </section>
          ))}
        </div>
      </Container>
    </>
  );
}
