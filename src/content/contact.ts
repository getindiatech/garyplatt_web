export const CONTACT_INFO = {
  title: "Contact Info",
  body: "We're here to help. Contact our team for any questions, support, or business inquiries.",
  rows: [
    {
      icon: "/images/icon-contact-phone.svg",
      label: "Phone Number",
      value: "800.969.0999",
      href: "tel:8009690999",
    },
    {
      icon: "/images/icon-contact-phone-alt.svg",
      label: "Phone Number",
      value: "775.824.0999",
      href: "tel:7758240999",
    },
    {
      icon: "/images/icon-contact-fax.svg",
      label: "Fax",
      value: "775.824.0998",
    },
    {
      icon: "/images/icon-contact-email.svg",
      label: "E-mail",
      value: "info@garyplatt.com",
      href: "mailto:info@garyplatt.com",
    },
  ],
};

export const CONTACT_FORM = {
  greeting: "Hey 👋",
  intro:
    "We manufacture high-volume custom products for distributors and wholesale partners. Minimum order quantities are:\n\n48 units for Gaming Chairs\n100 units for Hospitality Chairs.\n\nFill out the form below, and our team will be happy to assist with your inquiry and provide additional information.",
  consent: "Sign up to receive email communications",
  submit: "Submit",
};

export const REP_LOCATIONS = {
  /** The design reads "Gray Platt" here; the brand is always "Gary Platt". */
  title: "Gary Platt Rep Locations",
  tabs: ["Casino", "Hospitality"],
  domesticLabel: "Domestic",
  domesticPlaceholder: "Select State / Province",
  divider: "Or",
  internationalLabel: "International",
  internationalPlaceholder: "Select Country",
  note: "To find your rep. for non-casino, hospitality sales, please see www.garyplatthospitality.com",
  cta: "Find Rep Location",
};

/** Option lists for the rep locator. Domestic covers the US and Canada. */
export const US_STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
];

export const CA_PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan",
  "Yukon",
];

export const REP_COUNTRIES = [
  "Australia", "Austria", "Bahamas", "Belgium", "Brazil", "Canada", "Chile",
  "Colombia", "Czech Republic", "Denmark", "Finland", "France", "Germany",
  "Greece", "Ireland", "Italy", "Japan", "Macau SAR", "Malaysia", "Mexico",
  "Netherlands", "New Zealand", "Norway", "Peru", "Philippines", "Poland",
  "Portugal", "Singapore", "South Africa", "South Korea", "Spain", "Sweden",
  "Switzerland", "United Arab Emirates", "United Kingdom", "Vietnam",
];
