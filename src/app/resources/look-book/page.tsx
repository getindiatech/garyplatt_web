import type { Metadata } from "next";
import Image from "next/image";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { LOOK_BOOKS } from "@/content/resources";
import { API_URL, getDocuments, imageUrl } from "@/lib/api";

export const metadata: Metadata = {
  title: "Look Book",
  description: "Browse the Gary Platt Seating look books.",
};

export const revalidate = 300;

export default async function LookBookPage() {
  const documents = await getDocuments("LOOK_BOOK");

  // Download links go through the API so each pull is counted.
  const books =
    documents.length > 0
      ? documents.map((doc, i) => ({
          image: imageUrl(doc.coverImage, LOOK_BOOKS[i % LOOK_BOOKS.length].image),
          pages: doc.pageCount ? `01/${String(doc.pageCount).padStart(2, "0")}` : doc.title,
          title: doc.title,
          href: `${API_URL}/documents/${doc.slug}/download`,
        }))
      : LOOK_BOOKS.map((book, i) => ({ ...book, title: `Look book ${i + 1}`, href: "" }));

  return (
    <>
      <PageHero
        title="Look Book"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Resources" },
          { label: "Lookbook" },
        ]}
      />

      <Container className="pb-section">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-16">
          {books.map(({ image, pages, title, href }) => (
            <figure key={image} className="flex flex-col items-center">
              <div className="relative aspect-[374/500] w-full max-w-[520px] overflow-hidden bg-surface">
                <Image
                  src={image}
                  alt={`${title} cover`}
                  width={374}
                  height={500}
                  sizes="(max-width: 639px) 100vw, 45vw"
                  className="size-full object-contain"
                />
              </div>
              <figcaption className="flex flex-col items-center pt-4 text-copy font-medium text-ink">
                <span>{pages}</span>
                {href ? (
                  <Link
                    href={href}
                    className="pt-2 text-copy font-medium text-ink underline underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    Download {title}
                  </Link>
                ) : null}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </>
  );
}
