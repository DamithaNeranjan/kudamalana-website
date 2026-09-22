import React, { useEffect, useMemo, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  Factory,
  Leaf,
  Mail,
  MapPin,
  Menu,
  Package,
  Phone,
  Send,
  ShieldCheck,
  Sprout,
  SunMedium,
  X
} from "lucide-react";
import {
  certifications,
  claimRules,
  estate,
  faqs,
  images,
  navItems,
  products,
  seo,
  timeline
} from "./data/siteData";

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}

function PageShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Kudamalana home">
          <span className="brand-mark"><Leaf size={22} aria-hidden="true" /></span>
          <span>
            <strong>Kudamalana</strong>
            <small>Tea Estate</small>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="icon-button menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="footer-brand" to="/">
          <Leaf size={24} aria-hidden="true" />
          <span>{estate.name}</span>
        </Link>
        <p>
          Low-grown Ceylon black tea from Thalgaswala, Galle, presented with careful sourcing and
          claim discipline.
        </p>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Visit</strong>
          <Link to="/our-story">Our Story</Link>
          <Link to="/estate-factory">Estate & Factory</Link>
          <Link to="/quality">Quality</Link>
        </div>
        <div>
          <strong>Enquire</strong>
          <Link to="/teas">Teas</Link>
          <Link to="/trade">Trade & Wholesale</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <strong>Contact</strong>
          <a href={`mailto:${estate.email}`}>{estate.email}</a>
          <a href="tel:+94914203449">091 4203 449</a>
          <a href="tel:+94711254964">071 1254 964</a>
        </div>
      </div>
    </footer>
  );
}

function CTA({ to, children, variant = "primary", icon = true }) {
  return (
    <Link className={`cta ${variant}`} to={to}>
      <span>{children}</span>
      {icon && <ArrowRight size={18} aria-hidden="true" />}
    </Link>
  );
}

function Eyebrow({ children }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionIntro({ eyebrow, title, children, center = false }) {
  return (
    <div className={`section-intro ${center ? "center" : ""}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function ImagePanel({ image, className = "" }) {
  return (
    <figure className={`image-panel ${className}`}>
      <img src={image.src} alt={image.alt} loading="lazy" />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function Home() {
  usePageMeta(seo["/"].title, seo["/"].description);

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${images.landscape.src})` }}>
        <div className="hero-overlay" />
        <div className="hero-content">
          <Eyebrow>{estate.location} • {estate.factoryRegistration}</Eyebrow>
          <h1>{estate.name}</h1>
          <p>
            A century of low-grown Ceylon tea craftsmanship, rooted in 1919 in Sri Lanka's
            Ruhuna tea country.
          </p>
          <div className="hero-actions">
            <CTA to="/teas">Explore Our Teas</CTA>
            <CTA to="/our-story" variant="ghost">Discover Our Story</CTA>
            <CTA to="/trade" variant="dark">Wholesale Enquiries</CTA>
          </div>
          <p className="hero-caption">{images.landscape.caption}</p>
        </div>
      </section>

      <section className="trust-strip" aria-label="Kudamalana facts">
        {estate.stats.map((stat) => (
          <div key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="page-section split-section">
        <div>
          <SectionIntro eyebrow="Heritage & Evidence" title="A careful story, not a loose claim">
            Kudamalana's public story has strong foundations: a 1919 factory history, Ruhuna
            regional identity, MF0259 registration and active ISO 22000:2018 food-safety
            certification. The site also avoids overstating details that still need documents.
          </SectionIntro>
          <div className="rule-list">
            {claimRules.slice(0, 3).map((rule) => (
              <div key={rule} className="rule-item">
                <ShieldCheck size={20} aria-hidden="true" />
                <span>{rule}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="feature-panel">
          <span className="panel-icon"><Factory size={26} /></span>
          <h3>Orthodox black tea from MF0259</h3>
          <p>
            The site presents Kudamalana as a modernized Ruhuna low-grown black-tea factory while
            keeping equipment, acreage, grades and commercial terms clearly unclaimed until verified.
          </p>
          <CTA to="/estate-factory" variant="text">See the Factory</CTA>
        </div>
      </section>

      <section className="page-section muted">
        <SectionIntro center eyebrow="Tea Portfolio" title="Four public product lines, no invented SKUs">
          The first catalog focuses on the named teas that can be supported from the research.
        </SectionIntro>
        <ProductGrid limit={4} />
      </section>

      <section className="page-section split-section">
        <ImagePanel image={images.hills} />
        <div>
          <SectionIntro eyebrow="Sustainability" title="Environmental copy with the right boundaries">
            Kudamalana's own material describes organic agricultural practices, mixed cultivation,
            soil and water stewardship and renewable-energy ambitions. The website treats those as
            estate-stated practices, not third-party certification badges.
          </SectionIntro>
          <CTA to="/sustainability">Read the Sustainability Story</CTA>
        </div>
      </section>
    </>
  );
}

function Story() {
  usePageMeta(seo["/our-story"].title, seo["/our-story"].description);
  return (
    <StandardPage
      eyebrow="Our Story"
      title="Tea rooted in more than a century of place and people"
      intro="Kudamalana's published history begins with a 1919 factory in Thalgaswala and continues through generations of stewardship, modernization and orthodox black-tea making."
    >
      <section className="page-section split-section top-align">
        <div className="story-copy">
          <p>
            According to the estate's records, Scottish planter Mr. Easkin recognized the area's
            potential for black tea and built the original Kudamalana Tea Factory in 1919.
            Stewardship later passed to factory officer Telikada Palliya Guruge Charles and then to
            his son, Eddy Premasiri.
          </p>
          <p>
            Today, Kudamalana (Pvt) Ltd describes the estate as family-run, with later generations
            of the Charles family carrying the story forward. The public site should not make a
            definitive legal-ownership timeline beyond the evidence currently available.
          </p>
          <div className="notice">
            <BadgeCheck size={20} aria-hidden="true" />
            <span>
              A 2011/12 broker record connects another named party with MF0259. This site keeps the
              ownership language careful until estate records resolve that detail.
            </span>
          </div>
        </div>
        <Timeline />
      </section>
    </StandardPage>
  );
}

function EstateFactory() {
  usePageMeta(seo["/estate-factory"].title, seo["/estate-factory"].description);
  const stages = ["Leaf reception", "Withering", "Rolling", "Oxidation", "Drying", "Grading"];
  return (
    <StandardPage
      eyebrow="Estate & Factory"
      title="MF0259 in Sri Lanka's Ruhuna low-grown tea country"
      intro="Kudamalana is presented as a Ruhuna orthodox black-tea factory with a modernized production story and intentionally modest equipment claims."
    >
      <section className="page-section split-section">
        <ImagePanel image={images.landscape} />
        <div className="info-stack">
          <FactRow icon={<MapPin />} label="Location" value={estate.location} />
          <FactRow icon={<Factory />} label="Factory registration" value={estate.factoryRegistration} />
          <FactRow icon={<Leaf />} label="Tea region" value={estate.region} />
          <FactRow icon={<Building2 />} label="Production" value="16,000-18,000 kg/month estate-stated output" />
          <FactRow icon={<Award />} label="Capacity" value="20,000 kg/month estate-stated full capacity" />
        </div>
      </section>
      <section className="page-section muted">
        <SectionIntro center eyebrow="Orthodox Process" title="A transparent production framework">
          These are the standard orthodox black-tea stages used for education. Machine models and
          capacities remain to be confirmed from Kudamalana records.
        </SectionIntro>
        <div className="process-grid">
          {stages.map((stage, index) => (
            <div key={stage} className="process-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage}</h3>
              <p>Specific Kudamalana equipment details are to be confirmed before publication.</p>
            </div>
          ))}
        </div>
      </section>
    </StandardPage>
  );
}

function Teas() {
  usePageMeta(seo["/teas"].title, seo["/teas"].description);
  return (
    <StandardPage
      eyebrow="Teas"
      title="Kudamalana black teas"
      intro="The catalog starts with the four named public product lines. Unknown grades, pack sizes and prices are not invented."
    >
      <section className="page-section">
        <ProductGrid />
      </section>
    </StandardPage>
  );
}

function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.slug === slug);

  useEffect(() => {
    if (!product) navigate("/teas", { replace: true });
  }, [navigate, product]);

  const title = product ? `${product.name} | Kudamalana Black Tea` : seo["/teas"].title;
  const description = product ? product.summary : seo["/teas"].description;
  usePageMeta(title, description);

  if (!product) return null;

  return (
    <StandardPage eyebrow={product.eyebrow} title={product.name} intro={product.summary}>
      <section className="page-section product-detail">
        <ProductVisual product={product} large />
        <div className="product-copy">
          <p>{product.details}</p>
          {product.aliases.length > 0 && (
            <p className="muted-text">Also seen as: {product.aliases.join(", ")}</p>
          )}
          <div className="tag-list">
            {product.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
          </div>
          <div className="detail-box">
            <h3>To be confirmed before commerce</h3>
            <p>
              Leaf grade, ingredients, net weight, retail pricing, wholesale case size, batch
              details and final package photography should be added only after official product
              documentation is supplied.
            </p>
          </div>
          <div className="detail-box">
            <h3>Brewing note</h3>
            <p>{product.brew}</p>
          </div>
          <CTA to="/contact">Enquire About This Tea</CTA>
        </div>
      </section>
    </StandardPage>
  );
}

function Sustainability() {
  usePageMeta(seo["/sustainability"].title, seo["/sustainability"].description);
  const pillars = [
    {
      icon: <Sprout />,
      title: "Organic-practice story",
      text:
        "The estate states that it follows fully organic agricultural practices. This is not shown as a third-party certification seal."
    },
    {
      icon: <Leaf />,
      title: "Mixed cultivation",
      text:
        "Kudamalana's published material describes tea grown alongside coconut, Ceylon cinnamon and medicinal herbs."
    },
    {
      icon: <SunMedium />,
      title: "Energy ambition",
      text:
        "The safer public wording is that Kudamalana is working toward supplying around 30% of its energy needs from renewable sources."
    }
  ];
  return (
    <StandardPage
      eyebrow="Sustainability"
      title="A grounded environmental story"
      intro="The sustainability page separates estate-stated practice from third-party certification, giving buyers a clearer basis for trust."
    >
      <section className="page-section split-section">
        <div className="pillar-grid single-column">
          {pillars.map((pillar) => (
            <article className="pillar-card" key={pillar.title}>
              {pillar.icon}
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </article>
          ))}
        </div>
        <ImagePanel image={images.hills} />
      </section>
    </StandardPage>
  );
}

function Quality() {
  usePageMeta(seo["/quality"].title, seo["/quality"].description);
  return (
    <StandardPage
      eyebrow="Quality & Certifications"
      title="Food-safety evidence, clearly separated from farming claims"
      intro="This page treats ISO 22000 as a food-safety management certification for black-tea manufacturing, not as a product award or organic certificate."
    >
      <section className="page-section certification-grid">
        {certifications.map((cert) => (
          <article className="cert-card" key={cert.name}>
            <span className="cert-icon"><ShieldCheck size={24} /></span>
            <p className="status-pill">{cert.status}</p>
            <h3>{cert.name}</h3>
            <dl>
              <div><dt>Body</dt><dd>{cert.body}</dd></div>
              <div><dt>Reference</dt><dd>{cert.certificate}</dd></div>
              <div><dt>Scope</dt><dd>{cert.scope}</dd></div>
            </dl>
            <p>{cert.treatment}</p>
          </article>
        ))}
      </section>
      <section className="page-section muted">
        <SectionIntro eyebrow="Claim Guardrails" title="What this site will not overstate" />
        <div className="rule-list wide">
          {claimRules.map((rule) => (
            <div className="rule-item" key={rule}>
              <Check size={18} />
              <span>{rule}</span>
            </div>
          ))}
        </div>
      </section>
    </StandardPage>
  );
}

function Trade() {
  usePageMeta(seo["/trade"].title, seo["/trade"].description);
  const tradeCards = [
    ["Wholesale buyers", "Discuss volume needs, black-tea supply and factory documentation."],
    ["Importers & distributors", "Request information on capacity, food-safety certification and sample pathways."],
    ["Private-label enquiries", "Use the enquiry route while MOQs, case sizes and commercial terms are confirmed."]
  ];
  return (
    <StandardPage
      eyebrow="Trade & Wholesale"
      title="A clear enquiry path for buyers"
      intro="Kudamalana's stated capacity and auction participation make a trade pathway useful, while exact MOQs, destinations and case sizes remain quote-specific."
    >
      <section className="page-section trade-layout">
        <div className="trade-panel">
          <h2>Trade facts available now</h2>
          <ul>
            <li>Factory registration: MF0259</li>
            <li>Region: Ruhuna low-grown tea country</li>
            <li>Process: orthodox black tea</li>
            <li>Estate-stated full capacity: 20,000 kg/month</li>
            <li>Food-safety certification: ISO 22000:2018, CCFS 076</li>
          </ul>
          <CTA to="/contact">Start a Trade Enquiry</CTA>
        </div>
        <div className="trade-cards">
          {tradeCards.map(([title, text]) => (
            <article key={title}>
              <Package size={24} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
    </StandardPage>
  );
}

function Visit() {
  usePageMeta(seo["/visit"].title, seo["/visit"].description);
  return (
    <StandardPage
      eyebrow="Visit"
      title="Plan a factory visit enquiry"
      intro="Kudamalana invites visitors to contact the estate about planning a factory visit. Walk-in hours, fees and a guaranteed schedule are not specified."
    >
      <section className="page-section split-section">
        <div className="visit-card">
          <MapPin size={32} />
          <h2>Thalgaswala, Galle</h2>
          <p>
            Send an enquiry with your preferred date, group size and reason for visiting. The team
            can confirm availability directly.
          </p>
          <CTA to="/contact">Send Visit Enquiry</CTA>
        </div>
        <ImagePanel image={images.landscape} />
      </section>
    </StandardPage>
  );
}

function Contact() {
  usePageMeta(seo["/contact"].title, seo["/contact"].description);
  return (
    <StandardPage
      eyebrow="Contact"
      title="Talk to Kudamalana"
      intro="Use the enquiry form for tea purchases, wholesale sourcing, samples, visit planning or general questions."
    >
      <section className="page-section contact-layout">
        <div className="contact-card">
          <h2>{estate.companyName}</h2>
          <p>{estate.location}</p>
          <a href={`mailto:${estate.email}`}><Mail size={18} /> {estate.email}</a>
          {estate.phones.map((phone) => (
            <a key={phone} href={`tel:+94${phone.replace(/\D/g, "").slice(1)}`}>
              <Phone size={18} /> {phone}
            </a>
          ))}
          <p className="muted-text">
            The form opens your email app with a prepared message. It does not store or send data on
            its own.
          </p>
        </div>
        <EnquiryForm />
      </section>
    </StandardPage>
  );
}

function StandardPage({ eyebrow, title, intro, children }) {
  return (
    <>
      <section className="page-hero">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{intro}</p>
      </section>
      {children}
    </>
  );
}

function ProductGrid({ limit }) {
  const visibleProducts = limit ? products.slice(0, limit) : products;
  return (
    <div className="product-grid">
      {visibleProducts.map((product) => (
        <Link className="product-card" to={`/teas/${product.slug}`} key={product.id}>
          <ProductVisual product={product} />
          <div>
            <p>{product.eyebrow}</p>
            <h3>{product.name}</h3>
            <span>
              View tea <ChevronRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ProductVisual({ product, large = false }) {
  return (
    <div className={`product-visual ${product.theme} ${large ? "large" : ""}`} aria-hidden="true">
      <span>{product.name.split(" ")[0]}</span>
      <Leaf size={large ? 58 : 38} />
    </div>
  );
}

function Timeline() {
  return (
    <div className="timeline">
      {timeline.map((item) => (
        <article key={`${item.year}-${item.title}`}>
          <span>{item.year}</span>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function FactRow({ icon, label, value }) {
  return (
    <div className="fact-row">
      {icon}
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function EnquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    type: "General enquiry",
    message: ""
  });
  const [errors, setErrors] = useState({});

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(`Kudamalana ${form.type}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nEnquiry type: ${form.type}\n\n${form.message}`
    );
    return `mailto:${estate.email}?subject=${subject}&body=${body}`;
  }, [form]);

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (form.message.trim().length < 12) {
      nextErrors.message = "Please add a short message.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      window.location.href = mailto;
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <label>
        Name
        <input name="name" value={form.name} onChange={updateField} autoComplete="name" />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </label>
      <label>
        Email
        <input name="email" value={form.email} onChange={updateField} autoComplete="email" />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </label>
      <label>
        Enquiry type
        <select name="type" value={form.type} onChange={updateField}>
          <option>General enquiry</option>
          <option>Retail purchase</option>
          <option>Wholesale / export</option>
          <option>Request a sample</option>
          <option>Factory visit</option>
          <option>Media / photography</option>
        </select>
      </label>
      <label>
        Message
        <textarea name="message" value={form.message} onChange={updateField} rows="6" />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </label>
      <button className="submit-button" type="submit">
        <Send size={18} />
        Prepare Email
      </button>
    </form>
  );
}

function NotFound() {
  usePageMeta("Page not found | Kudamalana Tea Estate", "The requested Kudamalana page could not be found.");
  return (
    <StandardPage eyebrow="Not Found" title="This page is not available" intro="Use the main navigation to continue exploring Kudamalana.">
      <section className="page-section center-only">
        <CTA to="/">Return Home</CTA>
      </section>
    </StandardPage>
  );
}

export default function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<Story />} />
        <Route path="/estate-factory" element={<EstateFactory />} />
        <Route path="/teas" element={<Teas />} />
        <Route path="/teas/:slug" element={<ProductDetail />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/visit" element={<Visit />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageShell>
  );
}
