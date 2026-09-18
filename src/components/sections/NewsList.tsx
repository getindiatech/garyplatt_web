import Image from "next/image";
import Link from "next/link";
import { imageUrl, type NewsPost } from "@/lib/api";

const DATE = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Latest announcements. The first post runs wide with its cover; the rest sit
 * in a grid. Renders nothing when there is no news, so the page still reads
 * cleanly as trade shows alone.
 */
export default function NewsList({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) return null;

  const [lead, ...rest] = posts;

  return (
    <section className="pt-section">
      <div className="mx-auto max-w-[1100px] text-center">
        <p className="text-eyebrow uppercase tracking-[0.2em] text-muted-alt">Latest news</p>
        <h2 className="pt-3 font-display text-[clamp(1.75rem,1.8vw+1.2rem,3rem)] font-medium leading-tight text-ink">
          From the factory floor
        </h2>
      </div>

      <Link
        href={`/news/${lead.slug}`}
        className="group mt-10 grid grid-cols-1 overflow-hidden bg-surface lg:grid-cols-[3fr_2fr]"
      >
        {lead.coverImage ? (
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[360px]">
            <Image
              src={imageUrl(lead.coverImage)}
              alt={lead.coverImageAlt ?? lead.title}
              width={1000}
              height={560}
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <div className="hidden bg-dark-warm lg:block" aria-hidden />
        )}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <p className="text-meta uppercase tracking-[0.16em] text-muted-alt">
            {DATE.format(new Date(lead.publishedAt))}
          </p>
          <h3 className="pt-3 font-display text-[clamp(1.5rem,1.5vw+1.1rem,2.25rem)] font-medium leading-tight text-ink">
            {lead.title}
          </h3>
          {lead.excerpt ? (
            <p className="line-clamp-3 pt-4 text-copy leading-relaxed text-muted">{lead.excerpt}</p>
          ) : null}
          <span className="pt-6 text-copy font-medium text-ink underline-offset-4 group-hover:underline">
            Read more →
          </span>
        </div>
      </Link>

      {rest.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {rest.map((post) => (
            <Link key={post.slug} href={`/news/${post.slug}`} className="group flex flex-col">
              {post.coverImage ? (
                <div className="relative aspect-[402/250] w-full overflow-hidden bg-surface">
                  <Image
                    src={imageUrl(post.coverImage)}
                    alt={post.coverImageAlt ?? post.title}
                    width={402}
                    height={250}
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ) : null}
              <p className="pt-5 text-meta uppercase tracking-[0.16em] text-muted-alt">
                {DATE.format(new Date(post.publishedAt))}
              </p>
              <h3 className="pt-2 font-display text-[clamp(1.25rem,0.9vw+1rem,1.5rem)] font-medium leading-tight text-ink">
                {post.title}
              </h3>
              {post.excerpt ? (
                <p className="line-clamp-2 pt-3 text-copy leading-relaxed text-muted">{post.excerpt}</p>
              ) : null}
              <span className="pt-4 text-copy font-medium text-ink underline-offset-4 group-hover:underline">
                Read more →
              </span>
            </Link>
          ))}
        </div>
      ) : null}
    </section>
  );
}
