export type Value = { icon: string; title: string; body: string };
export type Job = {
  slug: string;
  /** One of JOB_CATEGORIES, minus "All" — drives the category filter. */
  category: string;
  title: string;
  body: string;
  type: string;
  location: string;
  deadline?: string;
};

export const CAREERS_VALUES = {
  eyebrow: "— Six things we build on",
  /** The design reads "Why join Patir?" — Patir is template placeholder text. */
  title: "Why join Gary Platt?",
  /**
   * Icons are not exported in the CSS dump; these reuse the design-system set
   * that carried the same body copy on the V1 home page.
   */
  items: [
    {
      icon: "/images/icon-compass.svg",
      title: "Innovation & Design",
      body: "Bespoke design solutions tailored to your lifestyle, creating harmonious spaces that reflect your unique vision.",
    },
    {
      icon: "/images/icon-palette.svg",
      title: "Engineering Excellence",
      body: "Access to exclusive collections and custom pieces sourced from master craftsmen across Europe.",
    },
    {
      icon: "/images/icon-hammer.svg",
      title: "Global Collaboration",
      body: "Handcrafted furniture made to your exact specifications using premium materials and time-honored techniques.",
    },
  ] as Value[],
};

export const JOB_CATEGORIES = [
  "All",
  "Design & Innovation",
  "Engineering",
  "Manufacturing & Production",
  "Sales & Business Development",
  "Project Management",
  "Administration & Operations",
  "Other",
];

export const OPEN_POSITIONS = {
  title: "Open positions",
  eyebrow: "— Current openings",
  categoriesTitle: "Job Categories",
  jobs: [
    {
      slug: "senior-mechanical-engineer",
      category: "Engineering",
      title: "Senior Mechanical Engineer",
      body: "Design and validate seat frame and recline mechanisms that meet Gary Platt's safety and comfort standards.",
      type: "Full-time",
      location: "Munich / Remote",
      deadline: "Deadline: 14 Jan 2025",
    },
    {
      slug: "master-upholsterer",
      category: "Manufacturing & Production",
      title: "Master Upholsterer",
      body: "Hand-finish premium seating in leather and fabric, upholding the stitching standards Gary Platt is known for.",
      type: "Full-time",
      location: "Munich / Remote",
    },
    {
      slug: "materials-scientist",
      category: "Design & Innovation",
      title: "Materials Scientist",
      body: "Research and qualify foams, fabrics, and leathers that balance durability, sustainability, and feel.",
      type: "Full-time",
      location: "Munich / Remote",
      deadline: "Deadline: 14 Jan 2025",
    },
  ] as Job[],
};
