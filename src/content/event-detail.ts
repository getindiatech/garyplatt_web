export type EventDetail = {
  slug: string;
  title: string;
  image: string;
  alt: string;
  intro?: string;
  sections?: { title: string; items: string[] }[];
  when: { day: string; month: string; weekday: string; time?: string };
  address: string;
};

/**
 * Only IGA is written out in the design. The date card below reads
 * 30 December / Washington DC, which disagrees with the listing page
 * (March 30 – April 2, San Diego) — both kept as drawn.
 */
export const EVENT_DETAILS: EventDetail[] = [
  {
    slug: "iga",
    title: "IGA-Indian Gaming Association",
    image: "/images/event-san-diego.jpg",
    alt: "San Diego Convention Center at golden hour",
    intro:
      "The premier event organized by the Indian Gaming Association (IGA) is the annual Indian Gaming Tradeshow & Convention, widely recognized as the largest gathering of tribal leaders, casino executives, gaming operators, and regulators in North America.",
    sections: [
      {
        title: "Key Highlights of the Indian Gaming Tradeshow & Convention",
        items: [
          "Tribal Sovereignty & Economic Self-Reliance: More than just an industry trade show, the convention serves as a cultural and political gathering celebrating Native American success, tribal sovereignty, and economic development funded by gaming.",
          "The Exhibition Floor: Features hundreds of exhibitors showcasing the latest in gaming technology, slot machine innovations, casino management systems, security, and hospitality solutions.",
          "Digital Play Summit: Features hundreds of exhibitors showcasing the latest in gaming technology, slot machine innovations, casino management systems, security, and hospitality solutions.",
          "The Exhibition Floor: Features hundreds of exhibitors showcasing the latest in gaming technology, slot machine innovations, casino management systems, security, and hospitality solutions.",
          "Education & Legislative Sessions: Dozens of workshops cover regulatory compliance, legislative threats, tribal-state compacts, marketing, and operational best practices.",
          "Networking & Cultural Events: Includes major events such as the Chairman's Leadership Awards Luncheon, tribal golf classics raising money for scholarship funds, and cultural performances.",
        ],
      },
      {
        title: "Other Major IGA Events",
        items: [
          "IGA Mid-Year Conference & Expo: A smaller, focused fall gathering to review legislative progress and discuss mid-year strategies.",
          "Summer Legislative Summit: Held in Washington, D.C., bringing tribal leaders together to advocate directly on Capitol Hill regarding federal policies affecting tribal gaming.",
        ],
      },
    ],
    when: {
      day: "30",
      month: "December",
      weekday: "Thursday",
      time: "08:00 PM Pacific Time",
    },
    address: "224 2nd Street SE Washington DC 20003",
  },
  {
    // The design only writes out IGA; HD carries its listing data so the
    // card's View Details still resolves. Body copy pending.
    slug: "hd",
    title: "HD Expo + Conference",
    image: "/images/event-mandalay-bay.jpg",
    alt: "Mandalay Bay Resort in Las Vegas at dusk",
    when: { day: "05", month: "May", weekday: "Tuesday" },
    address: "Mandalay Bay, Las Vegas",
  },
];
