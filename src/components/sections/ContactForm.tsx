"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { CONTACT_FORM } from "@/content/contact";
import { submitContact } from "@/lib/api";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);

    const form = new FormData(event.currentTarget);
    const result = await submitContact({
      fullName: String(form.get("fullName") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      zip: String(form.get("zip") ?? "") || undefined,
      subject: String(form.get("subject") ?? "") || undefined,
      message: String(form.get("message") ?? ""),
      hearAboutUs: String(form.get("source") ?? "") || undefined,
      consentToEmail: form.get("consent") === "on",
    });

    if (!result.ok) {
      setError(result.message);
      setState("idle");
      return;
    }

    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="mt-8 bg-surface p-8">
        <h3 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
          Thank you — your enquiry is with us
        </h3>
        <p className="pt-3 text-copy leading-relaxed text-muted">
          A member of the team will be in touch shortly. For anything urgent,
          call us on 800.969.0999.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-5 pt-8 sm:grid-cols-2">
      {error ? (
        <p
          role="alert"
          className="bg-surface p-4 text-copy leading-relaxed text-ink sm:col-span-2"
        >
          {error}
        </p>
      ) : null}

      <Field label="Full Name" required htmlFor="fullName">
        <Input id="fullName" name="fullName" required placeholder="Enter Full Name" />
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

      <Field label="Message" htmlFor="message" className="sm:col-span-2">
        <Textarea
          id="message"
          name="message"
          rows={7}
          required
          minLength={10}
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
          disabled={state === "sending"}
          className="w-full justify-center sm:w-auto sm:px-16"
        >
          {state === "sending" ? "Sending..." : CONTACT_FORM.submit}
        </Button>
      </div>
    </form>
  );
}
