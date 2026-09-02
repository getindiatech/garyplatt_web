import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { WARRANTY } from "@/content/resources";
import { DOCUMENT_REQUEST_HREF } from "@/content/navigation";

export const metadata: Metadata = {
  title: "Warranty",
  description: WARRANTY.intro,
};

export default function WarrantyPage() {
  return (
    <>
      <PageHero
        title="Warranty"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Warranty" },
        ]}
      />

      <Container className="pb-section">
        <h2 className="font-display text-[clamp(2rem,2.2vw+1.2rem,3.125rem)] font-medium leading-tight text-ink">
          {WARRANTY.title}
        </h2>
        <p className="max-w-[1400px] pt-6 text-[clamp(1rem,0.4vw+0.9rem,1.125rem)] leading-relaxed text-ink">
          {WARRANTY.intro}
        </p>

        <ul className="mt-8 divide-y divide-hairline-soft border-y border-hairline-soft">
          {WARRANTY.items.map(({ title, body }) => (
            <li key={title} className="py-5">
              <h3 className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium leading-tight text-ink">
                {title}
              </h3>
              {body ? (
                <p className="pt-2 text-copy leading-relaxed text-muted">{body}</p>
              ) : null}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-6 pt-8">
          <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="h-14">
            {WARRANTY.formLink}
          </Button>
          <span className="text-[clamp(1rem,0.5vw+0.85rem,1.25rem)] font-medium text-ink">
            {WARRANTY.divider}
          </span>
          <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="h-14">
            {WARRANTY.download}
          </Button>
        </div>

        {/* ===== Preventive maintenance ===== */}
        <h2 className="pt-14 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {WARRANTY.maintenanceTitle}
        </h2>
        <h3 className="pt-6 font-display text-[clamp(1rem,0.5vw+0.9rem,1.125rem)] font-medium leading-tight text-ink">
          {WARRANTY.inspectionTitle}
        </h3>
        <p className="whitespace-pre-line pt-3 text-copy leading-relaxed text-muted">
          {WARRANTY.inspection}
        </p>
        <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="mt-6 h-11 text-sm">
          {WARRANTY.download}
        </Button>

        {/* ===== Care and cleaning ===== */}
        <h2 className="pt-14 font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
          {WARRANTY.careTitle}
        </h2>

        {WARRANTY.careGroups.map(({ title, steps }) => (
          <div key={title} className="pt-8">
            <h3 className="font-display text-[clamp(1rem,0.5vw+0.9rem,1.125rem)] font-medium leading-tight text-ink">
              {title}
            </h3>
            {steps.length ? (
              <ul className="flex flex-col gap-4 pt-4">
                {steps.map((step) => (
                  <li key={step.title}>
                    <p className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium leading-tight text-ink">
                      {step.title}
                    </p>
                    {step.body ? (
                      <p className="pt-2 text-copy leading-relaxed text-muted">
                        {step.body}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}

        <Button href={DOCUMENT_REQUEST_HREF} variant="outline" className="mt-8 h-11 text-sm">
          {WARRANTY.download}
        </Button>
      </Container>
    </>
  );
}
