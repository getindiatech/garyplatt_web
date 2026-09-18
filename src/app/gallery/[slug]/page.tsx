import { redirect } from "next/navigation";

/** Installation write-ups now live under Resources as case studies. */
export default async function LegacyGalleryDetail({
  params,
}: PageProps<"/gallery/[slug]">) {
  const { slug } = await params;
  redirect(`/resources/case-studies/${slug}`);
}
