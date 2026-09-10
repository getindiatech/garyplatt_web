import { redirect } from "next/navigation";

/**
 * The design shipped a single hard-coded case study at this URL. Installations
 * now have their own pages at /gallery/<slug>, so this keeps old links working.
 */
export default function LegacyProjectPage() {
  redirect("/gallery");
}
