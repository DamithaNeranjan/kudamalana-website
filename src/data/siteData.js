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
  ],
  claimNote:
    "Commercial details that are not yet documented are intentionally left unclaimed."
};

export const images = {
  landscape: {
    src: "https://images.pexels.com/photos/36847094/pexels-photo-36847094.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Green tea landscape in Sri Lanka",
    caption: "Tea landscape in Sri Lanka. Illustrative stock photograph; not photographed at Kudamalana.",
    source: "Pexels photograph by Thilina Alagiyawanna"
  },
  hills: {
    src: "https://images.pexels.com/photos/36847090/pexels-photo-36847090.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Lush Sri Lankan tea plantation landscape",
    caption: "Sri Lankan tea landscape. Illustrative image; not photographed at Kudamalana.",
    source: "Pexels photograph by Thilina Alagiyawanna"
  }
};

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
      "Explore Kudamalana's black teas, including Easkin's Choice, Eddy's Taste, Charles Brew and Kudamalana Kahata."
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
      "Enquire about wholesale supply from Kudamalana, a Ruhuna low-grown black-tea factory with stated monthly capacity of up to 20,000 kg."
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
    id: "KDM-EC-BLK-ORG",
    slug: "easkins-choice",
    name: "Easkin's Choice",
    eyebrow: "Heritage black tea",
    theme: "gold",
    summary:
      "A black-tea collection named for the planter whom Kudamalana credits with building its original factory in 1919.",
    details:
      "Kudamalana describes Easkin's Choice as 100% organic black tea. Third-party organic certificate details are not shown until the certifier, scope, number and validity dates are available.",
    facts: ["Black tea", "Organic practice claim", "Package sizes to be confirmed"],
    aliases: [],
    brew: "Detailed brewing guidance should be confirmed from current product documentation.",
    images: []
  },
  {
    id: "KDM-CB-BLK-SO",
    slug: "charles-brew",
    name: "Charles Brew",
    eyebrow: "Single-source low-grown tea",
    theme: "green",
    summary:
      "A premium, high-liquor, low-grown, single-source and non-blended black tea in Kudamalana's published product language.",
    details:
      "Its name honors Telikada Palliya Guruge Charles, who the estate says took stewardship of Kudamalana after its founder.",
    facts: ["Black tea", "Unblended", "Single-source", "High liquor"],
    aliases: ["Brew by Charles"],
    brew: "Use approved cupping notes before adding precise sensory descriptors.",
    images: [
      {
        src: "/product-photos/brew-by-charles-tin-150g.png",
        alt: "Brew by Charlie's premium quality Pure Ceylon Tea tin"
      },
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
      "A blended black tea named for Eddy Premasiri in Kudamalana's published family history.",
    details:
      "The estate describes the tea around distinctive taste, richness and fresh-tea aroma.",
    facts: ["Black tea", "Blended", "Fresh-tea aroma", "Retail spelling to confirm from packaging"],
    aliases: ["Eddie's Taste"],
    brew: "Exact grade, ingredients and package formats remain to be confirmed.",
    images: [
      {
        src: "/product-photos/eddys-taste-pouch-200g.png",
        alt: "Eddy's Taste premium quality Pure Ceylon Tea packet"
      },
      {
        src: "/product-photos/eddies-taste-kraft-pouch.png",
        alt: "Eddie's Taste Kudamalana Tea Factory kraft pouch"
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
      "Package format, grades and current retail pricing are not listed in the reviewed public material.",
    facts: ["Black tea", "Everyday cup", "High liquor", "Pricing to be confirmed"],
    aliases: [],
    brew: "Add serving guidance after the estate confirms product-specific brewing advice.",
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
      "Published estate material describes revitalization beginning in 2018 and a comprehensive modernization in 2020."
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
    treatment: "Verified food-safety certification for the manufacturing facility."
  },
  {
    name: "Sri Lanka Tea Board factory listing",
    status: "Factory registration",
    body: "Sri Lanka Tea Board",
    certificate: "MF0259",
    scope: "Kudamalana, Galle, Ruhuna",
    treatment: "Factory registration and regional identity, not a quality award."
  },
  {
    name: "Organic agricultural practice",
    status: "First-party claim",
    body: "Certifier unspecified",
    certificate: "Not displayed",
    scope: "Estate states that it follows fully organic agricultural practices.",
    treatment:
      "Do not display a third-party organic certification seal until documentary proof is supplied."
  }
];

export const claimRules = [
  "Do not invent price, tea grade, pack size, acreage, exact elevation or certificate dates.",
  "Do not assert uninterrupted legal ownership from 1919 without resolving the 2011/12 broker record.",
  "Do not present ISO 22000 as an organic or product-quality award.",
  "Do not label stock photography as Kudamalana Estate, factory, staff or products."
];

export const faqs = [
  {
    q: "Where is Kudamalana Tea Estate?",
    a:
      "Kudamalana is in Thalgaswala, Galle, Sri Lanka. Public Tea Board information places MF0259 in the Ruhuna tea-growing region."
  },
  {
    q: "When was Kudamalana Tea Factory established?",
    a: "The estate's published history dates the original factory to 1919."
  },
  {
    q: "What kind of tea does Kudamalana make?",
    a:
      "Kudamalana describes its production as orthodox black-tea making, with public product lines that include blended, unblended and everyday black teas."
  },
  {
    q: "Is Kudamalana organic?",
    a:
      "Kudamalana states that its plantation follows fully organic agricultural practices. A public third-party organic certificate number and certifier are not currently shown here."
  },
  {
    q: "Can I visit the factory?",
    a:
      "Kudamalana invites enquiries about factory visits. Public opening times, ticket prices and a guaranteed walk-in schedule are not specified."
  }
];
