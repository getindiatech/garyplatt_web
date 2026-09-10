import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import RepLocator from "@/components/sections/RepLocator";
import ContactForm from "@/components/sections/ContactForm";
import { CONTACT_FORM, CONTACT_INFO } from "@/content/contact";
import { getContactSettings, getTerritories } from "@/lib/api";

export const metadata: Metadata = {
  title: "Contact Us",
  description: CONTACT_INFO.body,
};

export const revalidate = 300;

export default async function ContactPage() {
  const [contact, territories] = await Promise.all([
    getContactSettings(),
    getTerritories(),
  ]);

  // Numbers come from site settings so staff can change them without a deploy.
  const rows = CONTACT_INFO.rows.map((row) => {
    const value =
      row.label === "Fax"
        ? contact.fax ?? row.value
        : row.label === "E-mail"
          ? contact.email ?? row.value
          : row.value === CONTACT_INFO.rows[0].value
            ? contact.phone ?? row.value
            : contact.phoneAlt ?? row.value;

    const href = row.href
      ? row.href.startsWith("mailto:")
        ? `mailto:${value}`
        : `tel:${value.replace(/[^0-9+]/g, "")}`
      : undefined;

    return { ...row, value, href };
  });

  return (
    <>
      <PageHero title="Contact Us" />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[600fr_1064fr] lg:gap-16">
          {/* ===== Contact info ===== */}
          <div>
            <h2 className="font-display text-[clamp(1.5rem,1.2vw+1.1rem,1.875rem)] font-medium leading-tight text-ink">
              {CONTACT_INFO.title}
            </h2>
            <p className="pt-4 text-copy leading-relaxed text-muted">
              {CONTACT_INFO.body}
            </p>

            <dl className="flex flex-col gap-6 pt-8">
              {rows.map(({ icon, label, value, href }, i) => (
                <div key={`${label}-${i}`} className="flex items-center gap-5">
                  <span className="flex size-[60px] shrink-0 items-center justify-center rounded-full bg-surface">
                    <Image
                      src={icon}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11"
                    />
                  </span>
                  <div>
                    <dt className="text-copy leading-normal text-muted">
                      {label}
                    </dt>
                    <dd className="text-[clamp(1rem,0.5vw+0.85rem,1.25rem)] font-semibold leading-normal text-ink">
                      {href ? (
                        <a
                          href={href}
                          className="transition-opacity hover:opacity-70"
                        >
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>

            <div className="relative mt-10 aspect-[520/334] w-full overflow-hidden rounded-md">
              <Image
                src="/images/contact-office.jpg"
                alt="Map showing the Gary Platt Seating facility location"
                width={520}
                height={334}
                sizes="(max-width: 1023px) 100vw, 30vw"
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* ===== Enquiry form ===== */}
          <div>
            <h2 className="font-display text-[clamp(1.75rem,1.5vw+1.2rem,2.5rem)] font-semibold leading-tight text-ink">
              {CONTACT_FORM.greeting}
            </h2>
            <p className="whitespace-pre-line pt-4 text-copy leading-relaxed text-muted">
              {CONTACT_FORM.intro}
            </p>

            <ContactForm />
          </div>
        </div>
      </Container>

      {/* ===== Rep locations ===== */}
      <Container className="pb-section">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[900fr_600fr] lg:gap-16">
          <div className="relative aspect-[900/540] w-full overflow-hidden">
            <Image
              src="/images/contact-rep-map.jpg"
              alt="World map highlighting Gary Platt representative regions"
              width={900}
              height={540}
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="size-full object-contain"
            />
          </div>

          <RepLocator territories={territories} />
        </div>
      </Container>
    </>
  );
}
