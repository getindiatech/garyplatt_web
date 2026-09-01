export type OemPartner = {
  logo: string;
  blurb: string;
  since: string;
  /** The fourth logo is squarer than the rest in the design. */
  square?: boolean;
};

export const OEM_INTRO =
  "Gary Platt is proud to partner with many of the top slot manufacturing companies, including:";

export const OEM_PARTNERS: OemPartner[] = [
  {
    logo: "/images/oem-logo-1.png",
    blurb: "Cabinet-matched slot seating across the Orion family.",
    since: "Partnered since 2014",
  },
  {
    logo: "/images/oem-logo-2.png",
    blurb: "Global seating programmes for flagship cabinet launches.",
    since: "Partnered since 2009",
  },
  {
    logo: "/images/oem-logo-3.png",
    blurb: "Ergonomic pairing for large-format vertical cabinets.",
    since: "Partnered since 2012",
  },
  {
    logo: "/images/oem-logo-4.png",
    blurb: "Bank-wide seating standards for premium installs.",
    since: "Partnered since 2016",
    square: true,
  },
  {
    logo: "/images/oem-logo-5.png",
    blurb: "Long-run OEM supply across international markets.",
    since: "Partnered since 2006",
  },
  {
    logo: "/images/oem-logo-6.png",
    blurb: "Electronic table game stools and dealer positions.",
    since: "Partnered since 2018",
  },
  {
    logo: "/images/oem-logo-7.png",
    blurb: "Finish-matched seating for Dimension series floors.",
    since: "Partnered since 2011",
  },
  {
    logo: "/images/oem-logo-8.png",
    blurb: "Co-developed comfort specs for premium leases.",
    since: "Partnered since 2008",
  },
];

export const OEM_WHY = {
  eyebrow: "Why OEMs Choose Us",
  title: "Comfort is the quietest performance metric.",
  body: "Operators measure time on device. We build the seat that earns those minutes — then supply it at the scale your launch calendar demands.",
  primary: "Talk to the OEM Team",
  secondary: "Technical Documents",
  image: "/images/oem-craft.jpg",
  alt: "Hand-stitched upholstery detail",
};

export const IP_INTRO = [
  "At Gary Platt, we pride ourselves on innovation and excellence in chair manufacturing. Our commitment to quality and design is reflected in our robust portfolio of intellectual property, which includes patents, trademarks, and trade secrets that protect our unique products and technologies.",
  "Our patents cover a range of ergonomic designs, ensuring that we remain at the forefront of the industry while providing our customers with the highest level of comfort and functionality. Our trademarks safeguard our brand identity, representing our dedication to craftsmanship and customer satisfaction.",
  "We believe that our intellectual property is a vital asset that not only enhances our competitive edge but also fosters creativity and innovation within our team. By investing in research and development, we continuously strive to push the boundaries of design and technology in the gaming and hospitality chair markets.",
  "Explore our commitment to innovation and discover how our intellectual property drives our mission to deliver exceptional seating solutions for the gaming and hospitality industries.",
];

export const IP_TABLE = {
  eyebrow: "Intellectual property",
  title: "Protected by design.",
  body: "20 granted design and utility patents safeguard the silhouettes, bases and mechanisms we engineer in-house. Every registration below links directly to its public filing.",
  /** Numbering follows the design, which repeats "06" on the last two rows. */
  rows: [
    {
      no: "01",
      name: "Monaco Style Chair",
      detail: "Sculpted shell and swivel geometry",
      patents: ["D829458", "D843763", "D845051", "D879526", "D1016509"],
    },
    {
      no: "02",
      name: "Epic Base",
      detail: "Weighted pedestal engineering",
      patents: ["D832015", "D847549", "D936403"],
    },
    {
      no: "03",
      name: "Sonoma Sound Bench",
      detail: "Integrated acoustic seating",
      patents: ["D911724", "D945196"],
    },
    {
      no: "04",
      name: "Sportsbook Style Chair",
      detail: "Extended-session support frame",
      patents: ["D901202", "D936385"],
    },
    {
      no: "05",
      name: "Sliding Base (Sound Chair)",
      detail: "Utility patents — glide mechanism",
      patents: ["11,241,098", "11,974,674"],
    },
    {
      no: "06",
      name: "Tesla Style Chair",
      detail: "Contoured back and armrest profile",
      patents: ["D861405", "D909112", "D943298", "D977854"],
    },
    {
      no: "06",
      name: "Forum Style Chair",
      detail: "Editorial silhouette",
      patents: ["D1004315"],
    },
  ],
};
