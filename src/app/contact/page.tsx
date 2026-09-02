import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { CONTACT_FORM, CONTACT_INFO, REP_LOCATIONS } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: CONTACT_INFO.body,
};

export default function ContactPage() {
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
              {CONTACT_INFO.rows.map(({ icon, label, value, href }, i) => (
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

            <form className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2">
              <Field label="Full Name" required htmlFor="fullName">
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="Enter Full Name"
                />
              </Field>
              <Field label="Email Address" required htmlFor="email">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter Email Address"
                />
              </Field>
              <Field label="Contact Number" required htmlFor="phone">
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="Enter Contact Number"
                />
              </Field>
              <Field label="Zip Code" required htmlFor="zip">
                <Input id="zip" name="zip" required placeholder="Enter Zip Code" />
              </Field>

              <Field label="Subject" htmlFor="subject" className="sm:col-span-2">
                <Input id="subject" name="subject" placeholder="Enter Subject" />
              </Field>

              {/* The design labels this "Subject" as well; kept as drawn. */}
              <Field label="Subject" htmlFor="message" className="sm:col-span-2">
                <Textarea
                  id="message"
                  name="message"
                  rows={7}
                  placeholder="Write Here ..."
                />
              </Field>

              <Field label="How did you hear of us?" required htmlFor="source">
                <Select id="source" name="source" required defaultValue="Google">
                  <option>Google</option>
                  <option>Referral</option>
                  <option>Trade show</option>
                  <option>Social media</option>
                  <option>Other</option>
                </Select>
              </Field>

              <label
                htmlFor="consent"
                className="flex items-start gap-3 self-end pb-3 text-[clamp(0.8125rem,0.3vw+0.74rem,0.875rem)] leading-normal text-ink"
              >
                <input
                  id="consent"
                  name="consent"
                  type="checkbox"
                  className="mt-0.5 size-4 shrink-0 accent-ink"
                />
                {CONTACT_FORM.consent}
              </label>

              <div className="sm:col-span-2">
                <Button
                  type="submit"
                  className="w-full justify-center sm:w-auto sm:px-16"
                >
                  {CONTACT_FORM.submit}
                </Button>
              </div>
            </form>
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

          <div>
            <h2 className="font-display text-[clamp(1.75rem,1.5vw+1.2rem,2.5rem)] font-medium leading-tight text-ink">
              {REP_LOCATIONS.title}
            </h2>

            <div className="flex gap-8 pt-6">
              {REP_LOCATIONS.tabs.map((tab, i) => (
                <button
                  key={tab}
                  type="button"
                  className={
                    i === 0
                      ? "border-b-2 border-ink pb-2 text-copy font-medium text-ink"
                      : "border-b-2 border-transparent pb-2 text-copy font-medium text-muted transition-colors hover:text-ink"
                  }
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4 pt-6">
              <Field label={REP_LOCATIONS.domesticLabel} htmlFor="state">
                <Select id="state" name="state" defaultValue="">
                  <option value="" disabled>
                    {REP_LOCATIONS.domesticPlaceholder}
                  </option>
                </Select>
              </Field>

              <p className="text-copy leading-normal text-muted">
                {REP_LOCATIONS.divider}
              </p>

              <Field label={REP_LOCATIONS.internationalLabel} htmlFor="country">
                <Select id="country" name="country" defaultValue="">
                  <option value="" disabled>
                    {REP_LOCATIONS.internationalPlaceholder}
                  </option>
                </Select>
              </Field>
            </div>

            <p className="pt-6 text-copy leading-relaxed text-muted">
              {REP_LOCATIONS.note}
            </p>

            <Button href="/representatives" className="mt-6">
              {REP_LOCATIONS.cta}
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}
