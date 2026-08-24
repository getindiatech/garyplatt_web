export type Service = { icon: string; title: string; body: string };
export type Product = { title: string; image: string };
export type Principle = {
  title: string;
  body: string;
  image: string;
  alt: string;
};
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};
export type Project = { title: string; meta: string; image: string };
export type Reason = { icon: string; title: string; body: string };
export type TradeShow = {
  code: string;
  name: string;
  date: string;
  location: string;
  image: string;
  alt: string;
};
export type ProcessStep = { number: string; title: string; body: string };

export const SERVICES: Service[] = [
  {
    icon: "/images/icon-compass.svg",
    title: "Interior Design",
    body: "Bespoke design solutions tailored to your lifestyle, creating harmonious spaces that reflect your unique vision.",
  },
  {
    icon: "/images/icon-palette.svg",
    title: "Furniture Curation",
    body: "Access to exclusive collections and custom pieces sourced from master craftsmen across Europe.",
  },
  {
    icon: "/images/icon-hammer.svg",
    title: "Custom Manufacturing",
    body: "Handcrafted furniture made to your exact specifications using premium materials and time-honored techniques.",
  },
];

export const PRODUCTS: Product[] = [
  { title: "The Angela Series", image: "/images/product-angela.png" },
  { title: "The Troya Series", image: "/images/product-troya.png" },
  { title: "The Callista Series", image: "/images/product-callista.png" },
  { title: "The Helena Series", image: "/images/product-helena.png" },
];

export const PRINCIPLES: Principle[] = [
  {
    title: "Form",
    body: "Beautifully engineered forms that combine timeless aesthetics with ergonomic excellence.",
    image: "/images/principle-form.jpg",
    alt: "Aniline hide lounge chair close-up",
  },
  {
    title: "Fit",
    body: "Designed for exceptional comfort, providing superior support during extended seating experiences.",
    image: "/images/principle-fit.jpg",
    alt: "Cast bronze tufted upholstery close-up",
  },
  {
    title: "Function",
    body: "Expertly handcrafted using premium materials with meticulous attention to every detail.",
    image: "/images/principle-function.jpg",
    alt: "Artisan hand-stitching a wool boucle seat",
  },
  {
    title: "PERFORMANCE",
    body: "Built for durability, reliability, and long-term performance in demanding gaming and hospitality ",
    image: "/images/principle-performance.jpg",
    alt: "Casino floor lined with gaming chairs under chandeliers",
  },
];

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
    title: "Manhattan Penthouse",
    meta: "Las Vegas · 2023",
    image: "/images/project-manhattan.jpg",
  },
  {
    title: "The Hudson Loft",
    meta: "Las Vegas · 2023",
    image: "/images/project-hudson.jpg",
  },
  {
    title: "Park Avenue Residence",
    meta: "Las Vegas · 2023",
    image: "/images/project-park-avenue.jpg",
  },
  {
    title: "Tribeca Townhouse",
    meta: "Las Vegas · 2023",
    image: "/images/project-tribeca.jpg",
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

export const TRADE_SHOWS: TradeShow[] = [
  {
    code: "IGA",
    name: "Indian Gaming Association",
    date: "March 30 – April 2, 2026",
    location: "San Diego, CA",
    image: "/images/event-san-diego.jpg",
    alt: "San Diego Convention Center at golden hour",
  },
  {
    code: "HD",
    name: "HD Expo + Conference",
    date: "May 5 – May 7, 2026",
    location: "Mandalay Bay, Las Vegas",
    image: "/images/event-mandalay-bay.jpg",
    alt: "Mandalay Bay Resort in Las Vegas at dusk",
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
