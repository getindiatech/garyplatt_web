export type Experience = {
  title: string;
  body: string;
  cta: string;
  icon: string;
  image: string;
  alt: string;
};
export type Product = { title: string; image: string; alt: string };
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};
export type Project = { title: string; meta: string; image: string };
export type Reason = { icon: string; title: string; body: string };
export type ProcessStep = { number: string; title: string; body: string };

/** Hero copy — V2 headline and the two-button action row. */
export const HERO = {
  eyebrow: "Est. 1985",
  title: "Sit down and feel",
  titleAccent: "the difference",
  lead: "Where European craftsmanship meets contemporary design. We curate exceptional interiors that tell your unique story.",
  primary: { label: "Explore Services", href: "#services" },
  secondary: { label: "View Projects", href: "#projects" },
};

/** "Designed For Every Experience" — replaces the old Premium Services trio. */
export const EXPERIENCES: Experience[] = [
  {
    title: "Gaming",
    body: "Seating solutions built for casinos, sportsbooks, gaming lounges and more.",
    cta: "Explore Gaming",
    icon: "/images/icon-experience-gaming.svg",
    image: "/images/experience-gaming.jpg",
    alt: "Casino gaming floor lined with slot machines",
  },
  {
    title: "Hospitality",
    body: "Elevating comfort in hotels, restaurants, lounges, theatres and beyond.",
    cta: "Explore Hospitality",
    icon: "/images/icon-experience-hospitality.svg",
    image: "/images/experience-hospitality.jpg",
    alt: "Hotel ballroom set for a banquet",
  },
];

export const PRODUCTS: Product[] = [
  {
    title: "Nyx Armchair",
    image: "/images/product-nyx-armchair.png",
    alt: "Nyx armchair in dark upholstery",
  },
  {
    title: "SORAYA FLEX STACKER",
    image: "/images/product-soraya-flex-stacker.png",
    alt: "Soraya Flex Stacker chair in cream upholstery",
  },
  {
    title: "Sedona Series",
    image: "/images/product-sedona-series.jpg",
    alt: "Sedona bar stool with epic swivel and footrest",
  },
  {
    title: "SORAYA FLEX",
    image: "/images/product-soraya-flex.jpg",
    alt: "Soraya Flex chair, front view",
  },
];

/** "The Art of Craftsmanship" — replaces the old Four Principles grid. */
export const CRAFT = {
  eyebrow: "Uncompromising Quality",
  title: "The Art of",
  titleAccent: "Craftsmanship",
  body: "Every piece we create is a testament to our unwavering commitment to quality, from the initial sketch to the final stitch.",
  points: [
    "Hand-selected materials from sustainable sources",
    "Master craftsmen with decades of experience",
    "Rigorous quality control at every stage",
    "Lifetime warranty on all custom pieces",
  ],
  cta: "Start Customization",
  image: "/images/craft-lounge.jpg",
  alt: "Casino bar and lounge with blue accent lighting",
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "\"Atelier Luxe transformed our home into a sanctuary. Their attention to detail and understanding of our lifestyle was exceptional.\"",
    name: "Victoria Ashford",
    role: "Private Client, New York",
    avatar: "/images/avatar-victoria.jpg",
  },
  {
    quote:
      "\"The custom furniture pieces are beyond our expectations. True artistry combined with functionality and comfort.\"",
    name: "James Thornton",
    role: "CEO, Thornton Holdings",
    avatar: "/images/avatar-james.jpg",
  },
  {
    quote:
      "\"Working with their design team was a revelation. They captured our vision perfectly and exceeded every expectation.\"",
    name: "Sofia Martinez",
    role: "Interior Designer",
    avatar: "/images/avatar-sofia.jpg",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Resorts World Las Vegas",
    meta: "Las Vegas · 2023",
    image: "/images/project-resorts-world.jpg",
  },
  {
    title: "San Manuel Casino, CA",
    meta: "Las Vegas · 2023",
    image: "/images/project-san-manuel-1.jpg",
  },
  {
    title: "San Manuel Casino, CA",
    meta: "Las Vegas · 2023",
    image: "/images/project-san-manuel-2.jpg",
  },
  {
    title: "Soaring Eagle Casino & Resort, MI",
    meta: "Las Vegas · 2023",
    image: "/images/project-soaring-eagle.jpg",
  },
];

export const REASONS: Reason[] = [
  {
    icon: "/images/icon-hammer.svg",
    title: "Master Craftsmanship",
    body: "Every piece handcrafted by skilled artisans using time-honored techniques.",
  },
  {
    icon: "/images/icon-palette.svg",
    title: "Bespoke Design",
    body: "Fully customized solutions tailored to your unique vision and requirements.",
  },
  {
    icon: "/images/icon-heart.svg",
    title: "Sustainable Practices",
    body: "Ethically sourced materials and environmentally conscious production methods.",
  },
  {
    icon: "/images/icon-compass.svg",
    title: "Expert Consultation",
    body: "Personalized guidance from initial concept to final installation.",
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation",
    body: "We begin with an in-depth consultation to understand your vision, lifestyle, and requirements.",
  },
  {
    number: "02",
    title: "Design",
    body: "Our designers create detailed proposals, material selections, and 3D visualizations for your approval.",
  },
  {
    number: "03",
    title: "Production",
    body: "Skilled craftsmen bring the designs to life using premium materials and meticulous attention to detail.",
  },
  {
    number: "04",
    title: "Delivery",
    body: "Professional installation and styling, ensuring every element is perfectly placed and finished.",
  },
];
