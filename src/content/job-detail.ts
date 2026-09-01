/**
 * Job detail content.
 *
 * NOTE: every heading and paragraph below is verbatim from the design, which
 * is still carrying template placeholder text — the section headings all read
 * "taittel", and the copy describes a wellness retreat and graphic-design
 * tasks rather than a seating role. Kept as drawn; needs real copy from the
 * client before launch.
 */
export type JobSection = { title: string; body?: string; bullets?: string[] };

const BULLETS = [
  "Create visually appealing designs for branding, including logos, business cards, and packaging.",
  "Collaborate with the marketing team to ensure designs align with campaign goals and brand guidelines.",
  "Stay updated on design trends and tools to bring fresh ideas to the team.",
  "Design digital assets such as social media graphics, website banners, and email templates.",
  "Prepare print-ready files and liaise with vendors to ensure quality production.",
  "Create visually appealing designs for branding, including logos, business cards, and packaging.",
];

export const JOB_SECTIONS: JobSection[] = [
  {
    title: "taittel",
    body: "Global Wellness Retreat is a transformative sanctuary designed to rejuvenate the mind, body, and soul. Set in serene, nature-rich locations around the world, it offers a blend of holistic healing practices, wellness workshops, yoga and meditation sessions, nutritious cuisine, and personalized wellness programs. Whether you're seeking relaxation, spiritual growth, or a health reset",
  },
  { title: "taittel", bullets: BULLETS },
  { title: "taittel", bullets: BULLETS },
  { title: "taittel", bullets: BULLETS.slice(0, 2).concat(BULLETS[3]) },
  { title: "taittel", bullets: BULLETS.slice(0, 2).concat(BULLETS[3]) },
];

export const JOB_INFO_LABELS = {
  heading: "Job Information",
  rows: [
    { label: "Job Category", key: "category" },
    { label: "Job Position", key: "position" },
    { label: "Job Type", key: "type" },
    { label: "Salary", key: "salary" },
    { label: "Job Location", key: "location" },
    { label: "Deadline", key: "deadline" },
  ],
};

export const JOB_INFO_DEFAULTS = {
  position: "Senior",
  type: "Full Time",
  salary: "60,000-90,000",
  location: "Las Vegas | NV 89123 | USA",
  deadline: "April 30, 2026",
};
