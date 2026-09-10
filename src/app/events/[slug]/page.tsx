import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getEvent, getEvents, imageUrl } from "@/lib/api";

export const revalidate = 300;

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  return { title: event?.name ?? "Event Details", description: event?.intro ?? undefined };
}

export default async function EventDetailPage({
  params,
}: PageProps<"/events/[slug]">) {
  const { slug } = await params;
  const record = await getEvent(slug);
  if (!record) notFound();

  const starts = new Date(record.startsOn);

  // The date card wants the parts split out.
  const event = {
    title: record.name,
    image: imageUrl(record.image, "/images/event-san-diego.jpg"),
    alt: record.imageAlt ?? `${record.name} venue`,
    intro: record.intro,
    sections: record.sections,
    when: {
      day: starts.getUTCDate().toString(),
      month: starts.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }).toUpperCase(),
      weekday: starts.toLocaleString("en-GB", { weekday: "long", timeZone: "UTC" }),
      time: record.timeLabel ?? record.dateLabel,
    },
    address: record.address ?? record.location,
  };

  return (
    <>
      <PageHero
        title="Event Details"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/events" },
          { label: "Event Details" },
        ]}
      />

      <Container className="pb-section">
        <div className="relative aspect-[1680/620] w-full overflow-hidden">
          <Image
            src={event.image}
            alt={event.alt}
            width={1680}
            height={620}
            sizes="100vw"
            className="absolute inset-0 size-full object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 gap-10 pt-12 lg:grid-cols-[1150fr_346fr] lg:gap-16">
          {/* ===== Description ===== */}
          <div>
            <h2 className="font-display text-[clamp(1.75rem,1.8vw+1.1rem,2.75rem)] font-medium leading-tight text-ink">
              {event.title}
            </h2>
            {event.intro ? (
              <p className="pt-5 text-copy leading-relaxed text-muted">
                {event.intro}
              </p>
            ) : null}

            {(event.sections ?? []).map(({ title, items }) => (
              <section key={title} className="pt-10">
                <h3 className="font-display text-[clamp(1.125rem,0.8vw+0.95rem,1.5rem)] font-medium leading-tight text-ink">
                  {title}
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-6 pt-4">
                  {items.map((item, i) => (
                    <li key={i} className="text-copy leading-relaxed text-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* ===== When & where ===== */}
          <aside className="h-fit bg-surface p-6 md:p-8">
            <div className="flex items-center gap-5">
              <div className="text-center">
                <p className="font-display text-[clamp(1.75rem,1.2vw+1.3rem,2.125rem)] leading-none text-ink">
                  {event.when.day}
                </p>
                <p className="pt-1 text-[clamp(0.625rem,0.2vw+0.58rem,0.625rem)] uppercase tracking-wide text-muted">
                  {event.when.month}
                </p>
              </div>
              <div>
                <p className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                  {event.when.weekday}
                </p>
                {event.when.time ? (
                  <p className="pt-1 text-copy leading-normal text-muted">
                    {event.when.time}
                  </p>
                ) : null}
              </div>
            </div>

            <hr className="my-6 border-hairline-soft" />

            <p className="flex items-start gap-3 text-copy leading-relaxed text-ink">
              <span
                aria-hidden
                className="mt-1 size-5 shrink-0 rounded-full border border-hairline-soft"
              />
              {event.address}
            </p>
          </aside>
        </div>
      </Container>
    </>
  );
}
