"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { Field, Input, Textarea } from "@/components/ui/Field";
import { API_URL } from "@/lib/api";

/**
 * Posts to the backend as multipart so a CV can travel with the application.
 * The API accepts JSON too, but a file part is the common case here.
 */
export default function JobApplyForm({ slug, title }: { slug: string; title: string }) {
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError(null);

    const form = new FormData(event.currentTarget);

    // An empty file input still serialises a zero-byte part; drop it.
    const resume = form.get("resume");
    if (resume instanceof File && resume.size === 0) form.delete("resume");

    try {
      const response = await fetch(`${API_URL}/jobs/${slug}/applications`, {
        method: "POST",
        body: form,
      });

      const payload = (await response.json().catch(() => ({}))) as {
        message?: string | string[];
      };

      if (!response.ok) {
        const message = Array.isArray(payload.message)
          ? payload.message.join(" ")
          : payload.message;
        setError(message ?? "We could not submit that. Please check your details.");
        setState("idle");
        return;
      }

      setState("sent");
    } catch {
      setError("Could not reach the server. Please try again.");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="mt-8 border border-card-border bg-white p-6">
        <h3 className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium text-ink">
          Application received
        </h3>
        <p className="pt-2 text-copy leading-relaxed text-muted">
          Thank you for applying for {title}. Our team will be in touch if your
          experience matches what we are looking for.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-5 border border-card-border bg-white p-6">
      <h3 className="font-display text-[clamp(1.125rem,0.6vw+1rem,1.25rem)] font-medium text-ink">
        Apply for this position
      </h3>

      {error ? (
        <p role="alert" className="bg-surface p-3 text-meta leading-normal text-ink">
          {error}
        </p>
      ) : null}

      <Field label="Full Name" required htmlFor="a-name">
        <Input id="a-name" name="fullName" required placeholder="Enter Full Name" />
      </Field>

      <Field label="Email Address" required htmlFor="a-email">
        <Input id="a-email" name="email" type="email" required placeholder="Enter Email Address" />
      </Field>

      <Field label="Phone Number" htmlFor="a-phone">
        <Input id="a-phone" name="phone" type="tel" placeholder="Enter Phone Number" />
      </Field>

      <Field label="LinkedIn Profile" htmlFor="a-linkedin">
        <Input id="a-linkedin" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/..." />
      </Field>

      <Field label="Why you?" htmlFor="a-cover">
        <Textarea id="a-cover" name="coverLetter" rows={5} placeholder="Tell us about your experience..." />
      </Field>

      <Field label="CV / Resume (PDF or Word)" htmlFor="a-resume">
        <input
          id="a-resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf"
          className="w-full border border-card-border bg-white p-3 text-copy text-ink file:mr-4 file:border-0 file:bg-surface file:px-4 file:py-2 file:text-meta file:text-ink"
        />
      </Field>

      <Button type="submit" disabled={state === "sending"} className="w-full justify-center">
        {state === "sending" ? "Sending..." : "Submit Application"}
      </Button>
    </form>
  );
}
