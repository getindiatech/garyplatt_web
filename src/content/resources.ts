export type FabricBrand = {
  name: string;
  body: string;
  logo: string;
};

export const FABRIC_BRANDS: FabricBrand[] = [
  {
    name: "Ultrafabrics",
    body: "Premium performance fabrics designed for durability, comfort and style.",
    logo: "/images/fabric-ultrafabrics.png",
  },
  {
    name: "GMF  Fabrics",
    body: "Innovative & Sustainable upholstery fabrics for the gaming & hospitality industries",
    logo: "/images/fabric-gmf.png",
  },
  {
    name: "Momentum",
    body: "High-performance textiles that combine design, comfort and long-lasting quality.",
    logo: "/images/fabric-momentum.png",
  },
  {
    name: "Anzea",
    body: "elegant and reliable upholstery solutions for sophisticated environments",
    logo: "/images/fabric-anzea.png",
  },
  {
    name: "Omnova",
    body: "Advanced coated fabrics and materials Crafted for performance and sustainability.",
    logo: "/images/fabric-omnova.png",
  },
  {
    name: "Uniroyal Global",
    body: "Engineered upholstery products delivering exceptional value, performance and reliability.",
    logo: "/images/fabric-uniroyal.png",
  },
  {
    name: "Designtex",
    body: "Designtex delivers high-performance textiles that seamlessly combine cutting-edge design.",
    logo: "/images/fabric-designtex.png",
  },
  {
    name: "Brentano",
    body: "Brentano delivers high-performance textiles that seamlessly combine cutting-edge design.",
    logo: "/images/fabric-brentano.png",
  },
];

export const LOOK_BOOKS = [
  { image: "/images/lookbook-01.jpg", pages: "01/32", wide: true },
  { image: "/images/lookbook-02.jpg", pages: "01/32", wide: false },
  { image: "/images/lookbook-03.jpg", pages: "01/32", wide: false },
  { image: "/images/lookbook-04.jpg", pages: "01/32", wide: false },
];

export const USER_GUIDE = {
  title: "Chair Adjustment Guide",
  mechanisms: [
    "2 WAY MECHANISM - SEE 1 BELOW",
    "6 WAY MECHANISM - SEE 2-4 BELOW",
  ],
  note: "Both mechanisms equipped with 180° / 360° swivel",
  diagramNote:
    "THE PADDLES ARE SITUATED ON THE RIGHT SIDE WHILE SEATED.",
  instructionsTitle: "Chair Adjustment Instructions :",
  instructions: [
    "Seat & Back Paddle - Adjust seat and back angle together by raising the paddle.",
    "Seat Height Paddle - To raise seat height, lift out of the chair and pull paddle upward. To lower seat height, sit in the chair then pull upward on the paddle.",
    "Back Tilt Paddle - Raise paddle to enable the chair's backrest to tilt forward and backward freely in both directions.",
    "Tilt Tension Knob - Adjust knob to increase or decrease tilt tension.",
  ],
  download: "Download PDF",
};

export const WARRANTY = {
  title: "Warranty Details",
  intro:
    "Gary Platt offers a limited warranty on each product it manufactures for a period of one year from date of shipment, to be free from defects in material and workmanship under normal use and maintenance. Under this warranty, any product proven to be defective shall be repaired or replaced at our option, free of charge, provided it is returned as directed.",
  /** Only the foam item carries a description in the design. */
  items: [
    {
      title: "Foam Warranty",
      body: "GPS warrants that the foam will keep its original shape, elasticity, and comfort for a period of ten (10) years.",
    },
    { title: "Seat Wood and Back Wood" },
    { title: "Understructure/Frame" },
    { title: "Back Bar" },
    { title: "Gas Cylinders and Swivels" },
    { title: "Upholstery" },
  ] as { title: string; body?: string }[],
  formLink: "Click Here for our Warranty Form",
  divider: "Or",
  download: "Download PDF",
  maintenanceTitle: "Preventive Maintenance",
  inspectionTitle: "Periodic Inspection:",
  inspection:
    "All bolts should be periodically inspected to ensure there are no loose connections.\n\nSwivels should be periodically inspected to ensure that adequate grease is present on all bearing surfaces. Grease swivels as needed.\n\nGlides should be periodically inspected for wear, and worn glides should be replaced as needed.\n\nFrame welds should be periodically inspected for wear.  Any damaged frames should be noted and removed from the floor for replacement.",
  careTitle: "Care and Cleaning Instructions",
  careGroups: [
    {
      title: "Vinyl/Polyurethane",
      steps: [
        {
          title: "Step 1",
          body: "For light soiling, use a solution of 10% household liquid soap in warm water, apply with a damp cloth. Rinse with a water-dampened cloth and dry with a soft cloth.",
        },
        { title: "Step 2" },
        { title: "Step 3" },
      ],
    },
    { title: "Sherpa/Shire Fabric", steps: [] },
    { title: "Metal Understructures", steps: [] },
  ] as { title: string; steps: { title: string; body?: string }[] }[],
};
