import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { IP_INTRO, IP_TABLE } from "@/content/oem";

export const metadata: Metadata = {
  title: "Intellectual Property",
  description: IP_INTRO[0],
};

export default function IntellectualPropertyPage() {
  return (
    <>
      <PageHero title="Intellectual Property" />

      <Container className="pb-section">
        <div className="flex max-w-[1680px] flex-col gap-6">
          {IP_INTRO.map((para) => (
            <p
              key={para.slice(0, 32)}
              className="text-[clamp(1rem,0.7vw+0.85rem,1.5rem)] leading-relaxed text-ink"
            >
              {para}
            </p>
          ))}
        </div>

        {/* ===== Patent register ===== */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-[1056fr_560fr] lg:gap-16">
          <div>
            <p className="text-[clamp(1rem,0.7vw+0.85rem,1.5rem)] font-medium leading-normal text-muted-alt">
              {IP_TABLE.eyebrow}
            </p>
            <h2 className="pt-2 font-display text-[clamp(2rem,2.6vw+1.1rem,3.75rem)] font-medium leading-tight text-ink">
              {IP_TABLE.title}
            </h2>
          </div>
          <p className="self-end text-copy leading-relaxed text-muted">
            {IP_TABLE.body}
          </p>
        </div>

        <ul className="mt-10 divide-y divide-hairline-soft border-y border-hairline-soft">
          {IP_TABLE.rows.map(({ no, name, detail, patents }) => (
            <li
              key={name}
              className="grid grid-cols-1 gap-3 py-6 lg:grid-cols-[3rem_1fr_minmax(0,42%)] lg:items-baseline lg:gap-8"
            >
              <span className="text-meta leading-normal text-muted">{no}</span>

              <div>
                <h3 className="font-display text-[clamp(1.25rem,1vw+1rem,1.875rem)] leading-tight text-ink">
                  {name}
                </h3>
                <p className="pt-1 text-meta font-light leading-normal text-muted">
                  {detail}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-6 gap-y-2 lg:justify-end">
                {patents.map((p) => (
                  <li key={p} className="text-meta leading-normal text-ink">
                    {p}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
