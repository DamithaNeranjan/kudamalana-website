export const estate = {
  name: "Kudamalana Tea Estate",
  formalName: "Kudamalana Tea Estate Factory",
  companyName: "Kudamalana (Pvt) Ltd",
  location: "Thalgaswala, Galle, Sri Lanka",
  region: "Ruhuna low-grown tea region",
  factoryRegistration: "MF0259",
  founded: "1919",
  phones: ["091 4203 449", "071 1254 964"],
  email: "kudamalana@gmail.com",
  stats: [
    { label: "Factory history", value: "Since 1919" },
    { label: "Factory registration", value: "MF0259" },
    { label: "Tea region", value: "Ruhuna" },
    { label: "Food safety", value: "ISO 22000:2018" },
    { label: "Staff", value: "30+" },
    { label: "Supplier network", value: "300+" }
  ]
};

export const images = {
  landscape: {
    src: "/factory-ai/kudamalana-homepage-hero-v2.webp",
    alt: "Aerial view of Kudamalana Tea Factory surrounded by greenery",
    caption: "Kudamalana Tea Factory in Thalgaswala, Galle.",
    source: "Kudamalana Tea Estate"
  },
  hills: {
    src: "/factory-ai/kudamalana-estate-panorama.webp",
    alt: "Kudamalana Tea Factory among coconut palms and tea fields",
    caption: "Kudamalana Tea Factory and the surrounding Ruhuna landscape.",
    source: "Kudamalana Tea Estate"
  },
  factoryExterior: {
    src: "/factory-ai/kudamalana-factory-exterior.webp",
    alt: "Exterior of Kudamalana Tea Factory",
    caption: "The exterior of Kudamalana Tea Factory.",
    source: "Kudamalana Tea Estate"
  }
};

export const factoryGallery = [
  {
    src: "/factory-ai/kudamalana-factory-aerial-hero.webp",
    alt: "Aerial view of Kudamalana Tea Factory surrounded by greenery",
    title: "Factory in the Ruhuna landscape"
  },
  {
    src: "/factory-ai/kudamalana-factory-aerial-wide.webp",
    alt: "Wide drone view of Kudamalana Tea Factory and surrounding vegetation",
    title: "Aerial factory approach"
  },
  {
    src: "/factory-ai/kudamalana-solar-roof-aerial.webp",
    alt: "Aerial view of Kudamalana Tea Factory roof with solar panels",
    title: "Solar roof and production buildings"
  },
  {
    src: "/factory-ai/kudamalana-solar-roof-close.webp",
    alt: "Closer drone view of Kudamalana Tea Factory roof and solar panels",
    title: "Modernized factory roofline"
  },
  {
    src: "/factory-ai/kudamalana-estate-panorama.webp",
    alt: "Kudamalana Tea Factory among tea fields, palms and hills",
    title: "Estate panorama"
  },
  {
    src: "/factory-ai/kudamalana-factory-exterior.webp",
    alt: "Ground-level exterior view of Kudamalana Tea Factory",
    title: "Factory exterior"
  }
];

export const navItems = [
  { path: "/", label: "Home" },
  { path: "/our-story", label: "Our Story" },
  { path: "/estate-factory", label: "Estate & Factory" },
  { path: "/teas", label: "Teas" },
  { path: "/sustainability", label: "Sustainability" },
  { path: "/quality", label: "Quality" },
  { path: "/trade", label: "Trade" },
  { path: "/visit", label: "Visit" },
  { path: "/contact", label: "Contact" }
];

export const seo = {
  "/": {
    title: "Kudamalana Tea Estate | Low-Grown Ceylon Tea Since 1919",
    description:
      "Discover Kudamalana in Thalgaswala, Galle: a heritage tea factory dating to 1919, producing orthodox low-grown Ceylon black tea in Sri Lanka's Ruhuna region."
  },
  "/our-story": {
    title: "Our Story | Kudamalana Tea Estate Since 1919",
    description:
      "Explore Kudamalana's heritage from its original 1919 tea factory to today's modern MF0259 operation in Thalgaswala, Galle."
  },
  "/estate-factory": {
    title: "Kudamalana Tea Factory MF0259 | Galle, Sri Lanka",
    description:
      "Learn how Kudamalana produces orthodox black tea at its modernized MF0259 factory in Thalgaswala, within Sri Lanka's Ruhuna low-grown tea region."
  },
  "/teas": {
    title: "Kudamalana Teas | Ruhuna Low-Grown Ceylon Black Tea",
    description:
      "Explore Kudamalana's black teas, including Brew by Charles, Charles Brew, Eddy's Taste and Kudamalana Kahata."
  },
  "/sustainability": {
    title: "Sustainability | Kudamalana Tea Estate",
    description:
      "Learn about Kudamalana's reported organic farming practices, mixed cultivation, soil and water stewardship and renewable-energy ambitions."
  },
  "/quality": {
    title: "ISO 22000 Quality & Food Safety | Kudamalana Tea",
    description:
      "Review Kudamalana Tea Factory's food-safety credentials, including active ISO 22000:2018 certification for black-tea manufacturing."
  },
  "/trade": {
    title: "Wholesale Ceylon Tea | Kudamalana MF0259",
    description:
      "Enquire about wholesale supply from Kudamalana, a Ruhuna low-grown black-tea factory with monthly capacity of up to 20,000 kg."
  },
  "/visit": {
    title: "Visit Kudamalana Tea Factory | Galle, Sri Lanka",
    description:
      "Enquire about visiting Kudamalana Tea Factory in Thalgaswala, Galle, and discover the story behind its orthodox Ceylon tea."
  },
  "/contact": {
    title: "Contact Kudamalana Tea Estate | Thalgaswala, Galle",
    description:
      "Contact Kudamalana for tea purchases, wholesale enquiries, product information or a proposed factory visit in Thalgaswala, Galle."
  }
};

export const products = [
  {
    id: "KDM-CB-BLK-SO",
    slug: "brew-by-charles",
    name: "Brew by Charles",
    eyebrow: "Single-source low-grown tea",
    theme: "green",
    summary:
      "A premium, high-liquor, low-grown, single-source and non-blended black tea from Kudamalana.",
    details:
      "Its name honors Telikada Palliya Guruge Charles, who the estate says took stewardship of Kudamalana after its founder.",
    facts: ["Black tea", "Unblended", "Single-source", "High liquor"],
    aliases: [],
    images: [
      {
        src: "/product-photos/brew-by-charles-tin-150g.png",
        alt: "Brew by Charles premium quality Pure Ceylon Tea tin"
      }
    ]
  },
  {
    id: "KDM-CB-BLK-SO-PCH",
    slug: "charles-brew",
    name: "Charles Brew",
    eyebrow: "Single-source low-grown tea",
    theme: "green charles-pouch",
    summary:
      "A premium, high-liquor, low-grown, single-source and non-blended black tea from Kudamalana, presented in pouch packaging.",
    details:
      "Its name honors Telikada Palliya Guruge Charles, who the estate says took stewardship of Kudamalana after its founder.",
    facts: ["Black tea", "Unblended", "Single-source", "High liquor"],
    aliases: [],
    images: [
      {
        src: "/product-photos/charles-brew-pouch.png",
        alt: "Charles Brew premium quality Pure Ceylon Tea pouch"
      }
    ]
  },
  {
    id: "KDM-ET-BLK-BLD",
    slug: "eddys-taste",
    name: "Eddy's Taste",
    eyebrow: "Blended black tea",
    theme: "copper",
    summary:
      "A blended black tea named for Eddy Premasiri in Kudamalana's family story.",
    details:
      "The estate describes the tea around distinctive taste, richness and fresh-tea aroma.",
    facts: ["Black tea", "Blended", "Fresh-tea aroma"],
    aliases: ["Eddie's Taste"],
    images: [
      {
        src: "/product-photos/eddys-taste-pouch-200g.png",
        alt: "Eddy's Taste premium quality Pure Ceylon Tea packet"
      }
    ]
  },
  {
    id: "KDM-KK-BLK-DLY",
    slug: "kudamalana-kahata",
    name: "Kudamalana Kahata",
    eyebrow: "Everyday black tea",
    theme: "ruby",
    summary:
      "An everyday black tea positioned by Kudamalana around a strong, high-liquor cup and fresh black-tea character.",
    details:
      "Kudamalana Kahata is created for a full-bodied everyday cup with the bold character associated with low-grown Ceylon black tea.",
    facts: ["Black tea", "Everyday cup", "High liquor"],
    aliases: [],
    images: [
      {
        src: "/product-photos/kudamalana-kahata-50g.png",
        alt: "Kudamalana Kahata BOPF tea packet"
      }
    ]
  }
];

export const timeline = [
  {
    year: "Early 1900s",
    title: "A planter identifies tea potential",
    text:
      "The estate's history says Scottish planter Mr. Easkin recognized the area's potential for black tea."
  },
  {
    year: "1919",
    title: "Original factory built",
    text: "Kudamalana dates its original tea factory to 1919."
  },
  {
    year: "Later",
    title: "Charles family stewardship",
    text:
      "The estate says stewardship passed to Telikada Palliya Guruge Charles and later to his son Eddy Premasiri."
  },
  {
    year: "2018-2020",
    title: "Modernization program",
    text:
      "A revitalization program began in 2018, followed by comprehensive factory modernization in 2020."
  },
  {
    year: "Today",
    title: "Modern orthodox black-tea factory",
    text:
      "Kudamalana operates as MF0259 in the Ruhuna tea-growing region, with ISO 22000:2018 food-safety certification publicly listed."
  }
];

export const certifications = [
  {
    name: "ISO 22000:2018 Food Safety Management System",
    status: "Active",
    body: "CEYCERT (Private) Limited",
    certificate: "CCFS 076",
    scope: "Manufacturing of Black Tea",
    treatment: "Food-safety management certification for the black-tea manufacturing facility."
  },
  {
    name: "Sri Lanka Tea Board factory listing",
    status: "Factory registration",
    body: "Sri Lanka Tea Board",
    certificate: "MF0259",
    scope: "Kudamalana, Galle, Ruhuna",
    treatment: "Kudamalana's factory registration in Sri Lanka's Ruhuna tea-growing region."
  }
];

export const faqs = [
  {
    q: "Where is Kudamalana Tea Estate?",
    a:
      "Kudamalana is in Thalgaswala, Galle, Sri Lanka, within the Ruhuna low-grown tea region."
  },
  {
    q: "When was Kudamalana Tea Factory established?",
    a: "Kudamalana's history dates the original factory to 1919."
  },
  {
    q: "What kind of tea does Kudamalana make?",
    a:
      "Kudamalana produces orthodox black tea, with product lines that include blended, unblended and everyday black teas."
  },
  {
    q: "Can I visit the factory?",
    a:
      "Yes. Factory visits can be arranged in advance by contacting the Kudamalana team."
  }
];
