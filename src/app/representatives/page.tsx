import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import RepresentativeList from "@/components/sections/RepresentativeList";
import { REPRESENTATIVES_INTRO } from "@/content/company";

export const metadata: Metadata = {
  title: "Representatives",
  description: REPRESENTATIVES_INTRO,
};

export default function RepresentativesPage() {
  return (
    <>
      <PageHero title="Representatives" />

      <Container className="pb-section">
        <h2 className="mx-auto max-w-[1180px] text-center font-display text-[clamp(1.75rem,2.2vw+1.1rem,3.125rem)] font-medium leading-tight text-ink">
          {REPRESENTATIVES_INTRO}
        </h2>

        <Suspense fallback={null}>
          <RepresentativeList />
        </Suspense>

        <div className="relative mx-auto mt-16 aspect-[1520/579] w-full max-w-[1520px] overflow-hidden">
          <Image
            src="/images/contact-rep-map.jpg"
            alt="World map highlighting Gary Platt representative regions"
            width={1520}
            height={579}
            sizes="100vw"
            className="size-full object-contain"
          />
        </div>
      </Container>
    </>
  );
}
