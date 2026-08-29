export type Representative = { name: string; image: string };

export const REPRESENTATIVES_INTRO =
  "Gary Platt is proud to partner with some of the   finest industry representatives in the world";

export const REPRESENTATIVE_TABS = ["Casino", "Hospitality"];

export const REPRESENTATIVES: Representative[] = [
  { name: "Foo Shee Design", image: "/images/rep-01.jpg" },
  { name: "Gitchi Gaming", image: "/images/rep-02.jpg" },
  { name: "Phat Sourching", image: "/images/rep-03.jpg" },
  { name: "Ken Deemer", image: "/images/rep-04.jpg" },
  { name: "Sean Smith", image: "/images/rep-05.jpg" },
  { name: "Michael Strader", image: "/images/rep-06.jpg" },
  { name: "Kimberli Strader", image: "/images/rep-07.jpg" },
  { name: "R2 Gaming", image: "/images/rep-08.jpg" },
];

export type TradeShow = {
  code: string;
  name: string;
  date: string;
  location: string;
  image: string;
  alt: string;
};

export const EVENTS_INTRO = {
  title: "Upcoming Trade Shows",
  body: "Meet the studio and experience our latest collections in person at these premier industry events.",
};

/** The design shows the same two shows twice over a 2x2 grid. */
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

export const PROJECT_OVERVIEW = {
  name: "Bellagio Casino",
  location: "Las Vegas, USA",
  /**
   * Mosaic from the design (1680 wide, 20px gaps):
   *   block A  1166x608  +  two stacked 494x294
   *   block B  two stacked 679x294  +  981x608
   */
  gallery: {
    blockA: {
      large: "/images/gallery-06.jpg",
      stack: ["/images/gallery-02.jpg", "/images/gallery-03.jpg"],
    },
    blockB: {
      stack: ["/images/gallery-05.jpg", "/images/gallery-07.jpg"],
      large: "/images/gallery-04.jpg",
    },
  },
  sections: [
    {
      title: "Bellagio Casino Overview",
      body: "Bellagio Casino is one of the world's most iconic luxury casino resorts, featuring premium gaming, hospitality, and entertainment experiences. Gary Platt Seating was selected to provide high-performance seating solutions designed for long-term comfort, durability, and an elevated guest experience across the gaming floor.",
    },
    {
      title: "Project Highlights",
      list: [
        "Premium gaming floor seating installation",
        "Luxury upholstery with custom finishes",
        "Ergonomic comfort for extended play",
        "Commercial-grade durability",
        "Custom design matching Bellagio's interior aesthetic",
      ],
    },
    {
      title: "Seating Solutions",
      list: [
        "Gaming Chairs",
        "Slot Seating",
        "Poker Seating",
        "VIP Gaming Seating",
        "Bar Seating",
      ],
    },
    {
      title: "Why This Project Matters",
      body: "Bellagio Casino represents one of Gary Platt Seating's flagship gaming installations, demonstrating the company's ability to deliver premium seating solutions for world-class casino environments while maintaining exceptional comfort, durability, and luxury aesthetics.",
    },
  ] as { title: string; body?: string; list?: string[] }[],
};
