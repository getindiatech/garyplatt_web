export type LegalSection = { title: string; body: string };

export type LegalDocument = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

/**
 * The design does not include legal copy, so these carry standard boilerplate
 * for the footer's Privacy Policy and Disclaimer links. Replace the wording
 * with the client's approved text before launch.
 */
export const PRIVACY_POLICY: LegalDocument = {
  title: "Privacy Policy",
  updated: "Last updated: January 2026",
  intro:
    "Gary Platt Seating respects your privacy. This policy explains what information we collect when you use this website or contact us, how we use it, and the choices you have.",
  sections: [
    {
      title: "Information we collect",
      body: "We collect the details you give us directly — your name, company, email address, phone number, and the content of any enquiry or quote request you submit. We also collect basic technical information such as browser type, device, and pages visited, which helps us understand how the site is used.",
    },
    {
      title: "How we use your information",
      body: "We use your details to respond to enquiries, prepare quotes, provide product and warranty support, and — where you have asked for it — send news about our collections and trade show appearances. We do not sell your personal information.",
    },
    {
      title: "Sharing",
      body: "We share information only with the service providers who help us operate the site and our business, such as hosting and email providers, and only to the extent they need it. We may also disclose information where the law requires it.",
    },
    {
      title: "Cookies",
      body: "This site uses cookies and similar technologies to keep the site working and to measure traffic. You can block or delete cookies through your browser settings, though some parts of the site may not work as intended if you do.",
    },
    {
      title: "Data retention and security",
      body: "We keep enquiry and order records for as long as we need them for the purpose they were collected and to meet our legal obligations. We use reasonable technical and organisational measures to protect the information we hold.",
    },
    {
      title: "Your choices",
      body: "You can ask us to access, correct, or delete the personal information we hold about you, and you can unsubscribe from marketing email at any time using the link in the message.",
    },
    {
      title: "Contact",
      body: "Questions about this policy can be sent through our Contact page and we will respond as soon as we can.",
    },
  ],
};

export const DISCLAIMER: LegalDocument = {
  title: "Disclaimer",
  updated: "Last updated: January 2026",
  intro:
    "The information on this website is provided for general reference about Gary Platt Seating products and services. Please read the following before relying on it.",
  sections: [
    {
      title: "Product information",
      body: "Specifications, dimensions, and available options are subject to change as our products are developed. Details shown here are indicative; the specification confirmed in your written quote or order acknowledgement is the one that applies.",
    },
    {
      title: "Colours and finishes",
      body: "Upholstery, wood, and metal finishes are shown as photographs and screen renderings. Screen calibration and lighting affect how colour appears, so please request physical samples before making a final selection.",
    },
    {
      title: "Imagery",
      body: "Installation photography and renderings illustrate the range of work we do. Individual projects are built to their own specification and may differ from what is pictured.",
    },
    {
      title: "External links",
      body: "Where we link to another organisation's website, we do so for convenience. We do not control that content and are not responsible for it.",
    },
    {
      title: "Limitation of liability",
      body: "To the extent permitted by law, Gary Platt Seating is not liable for any loss arising from use of this website. Nothing here limits the warranty we provide with our products — see the Warranty page for those terms.",
    },
  ],
};
