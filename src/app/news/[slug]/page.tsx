import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import PageHero from "@/components/ui/PageHero";
import { getNews, getPost, imageUrl } from "@/lib/api";

export const revalidate = 300;

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateStaticParams() {
  const posts = await getNews();
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  return { title: post?.title ?? "News", description: post?.excerpt ?? undefined };
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const [post, others] = await Promise.all([getPost(slug), getNews(4)]);
  if (!post) notFound();

  // Scraped articles arrive as one run of text; anything staff write in the
  // dashboard separates paragraphs with a blank line.
  const paragraphs = post.body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  const more = others.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PageHero
        title="News"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "News & Events", href: "/events" },
          { label: post.title },
        ]}
      />

      <Container className="pb-section">
        <article className="mx-auto max-w-[860px]">
          <p className="text-meta uppercase tracking-[0.16em] text-muted-alt">
            {DATE.format(new Date(post.publishedAt))}
            {post.author ? ` · ${post.author}` : ""}
          </p>
          <h1 className="pt-3 font-display text-[clamp(1.75rem,2vw+1.2rem,3rem)] font-medium leading-tight text-ink">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="pt-5 text-[clamp(1rem,0.4vw+0.9rem,1.25rem)] leading-relaxed text-muted">
              {post.excerpt}
            </p>
          ) : null}

          {post.coverImage ? (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden bg-surface">
              <Image
                src={imageUrl(post.coverImage)}
                alt={post.coverImageAlt ?? post.title}
                width={1200}
                height={675}
                sizes="(max-width: 1023px) 100vw, 860px"
                className="absolute inset-0 size-full object-cover"
                priority
              />
            </div>
          ) : null}

          <div className="mt-10 flex flex-col gap-5">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-copy leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {more.length > 0 ? (
          <section className="mx-auto mt-16 max-w-[860px] border-t border-hairline-soft pt-10">
            <h2 className="font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
              More news
            </h2>
            <ul className="mt-5 flex flex-col gap-4">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link href={`/news/${p.slug}`} className="group flex flex-col gap-1">
                    <span className="text-meta uppercase tracking-[0.16em] text-muted-alt">
                      {DATE.format(new Date(p.publishedAt))}
                    </span>
                    <span className="text-copy font-medium text-ink underline-offset-4 group-hover:underline">
                      {p.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Container>
    </>
  );
}
