import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import ResponsiveImage from "./ResponsiveImage";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Building2,
  ChevronLeft,
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
  estate,
  factoryGallery,
  faqs,
  headerArt,
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

function useScrollReveal(pathname) {
  useLayoutEffect(() => {
    const selector = [
      ".trust-strip > div",
      ".heritage-band > *",
      ".section-intro",
      ".story-copy > p",
      ".heritage-archive",
      ".feature-panel",
      ".image-panel",
      ".product-card",
      ".product-photo.large",
      ".product-copy",
      ".process-step",
      ".factory-gallery-item",
      ".timeline article",
      ".fact-row",
      ".pillar-card",
      ".cert-card",
      ".trade-panel",
      ".trade-cards article",
      ".visit-card",
      ".location-copy",
      ".map-frame",
      ".contact-card",
      ".enquiry-form",
      ".site-footer > div"
    ].join(",");
    const nodes = [...document.querySelectorAll(selector)];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const siblingCounts = new Map();
    nodes.forEach((node) => {
      const parent = node.parentElement;
      const order = siblingCounts.get(parent) || 0;
      siblingCounts.set(parent, order + 1);
      node.classList.add("scroll-reveal");
      node.style.setProperty("--reveal-delay", `${Math.min(order, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7%" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [pathname]);
}

function PageShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const location = useLocation();
  useScrollReveal(location.pathname);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1101px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Kudamalana home">
          <span className="brand-mark">
            <ResponsiveImage src="/brand/kudamalana-logo.png" alt="" sizes="64px" loading="eager" aria-hidden="true" />
          </span>
          <span>
            <strong>Kudamalana</strong>
            <small>Tea Estate</small>
          </span>
        </Link>
        <span className="header-registration">MF0259 / LOW-GROWN RUHUNA</span>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button
          className="icon-button menu-button"
          ref={menuButton}
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {menuOpen && (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === "/"} onClick={() => setMenuOpen(false)}>
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
          <span className="footer-logo">
            <ResponsiveImage src="/brand/kudamalana-logo.png" alt="" sizes="64px" aria-hidden="true" />
          </span>
          <span>{estate.name}</span>
        </Link>
        <p>
          Ceylon black tea from Thalgaswala, Galle, crafted in the Low-Grown Ruhuna tradition.
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
          {estate.phones.map((phone) => (
            <a key={phone.href} href={phone.href}>{phone.display}</a>
          ))}
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
      <ResponsiveImage src={image.src} alt={image.alt} sizes="(max-width: 900px) 100vw, 50vw" />
      <figcaption>{image.caption}</figcaption>
    </figure>
  );
}

function Home() {
  usePageMeta(seo["/"].title, seo["/"].description);

  return (
    <>
      <section className="hero">
        <ResponsiveImage className="hero-image" src={images.landscape.src} alt="" sizes="(max-width: 700px) 1100px, 100vw" loading="eager" fetchPriority="high" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <Eyebrow>{estate.location} • {estate.factoryRegistration}</Eyebrow>
          <h1>{estate.name}</h1>
          <p>
            A century of low-grown Ceylon tea craftsmanship, rooted in 1919 in Sri Lanka's
            Low-Grown Ruhuna tea country.
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

      <section className="heritage-band" aria-label="Kudamalana heritage statement">
        <p>"Since 1919, Ceylon tea crafted in the Low-Grown Ruhuna tradition."</p>
        <span>Thalgaswala, Galle • Orthodox Black Tea • MF0259</span>
      </section>

      <section className="page-section split-section">
        <div>
          <SectionIntro eyebrow="Our Heritage" title="A century in Low-Grown Ruhuna tea country">
            From its beginnings in 1919, Kudamalana has grown around generations of tea making in
            Thalgaswala, Galle. Today the factory operates as MF0259 and continues its focus on
            low-grown orthodox black tea.
          </SectionIntro>
        </div>
        <div className="feature-panel">
          <span className="panel-icon"><Factory size={26} /></span>
          <h3>Orthodox black tea from MF0259</h3>
          <p>
            A modernized factory in Sri Lanka's Low-Grown Ruhuna region, producing Ceylon black tea
            through the traditional orthodox process.
          </p>
          <CTA to="/estate-factory" variant="text">See the Factory</CTA>
        </div>
      </section>

      <section className="page-section muted">
        <SectionIntro center eyebrow="Tea Collection" title="Discover four Kudamalana tea products">
          From heritage-inspired collections to robust everyday teas, explore the character of
          Kudamalana's low-grown Ceylon black tea.
        </SectionIntro>
        <ProductGrid limit={4} />
      </section>

      <section className="page-section split-section image-story-section">
        <ImagePanel image={images.hills} />
        <div className="image-story-copy">
          <SectionIntro eyebrow="Sustainability" title="Growing with care for the land">
            Kudamalana's approach brings together organic farming practices, mixed cultivation,
            soil and water stewardship, and a growing commitment to renewable energy.
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
      intro="Kudamalana's story begins with a 1919 factory in Thalgaswala and continues through generations of stewardship, modernization and orthodox black-tea making."
      artwork={{ variant: "story", image: headerArt.story, icon: <Award /> }}
    >
      <section id="story-chronicle" className="page-section split-section top-align">
        <div className="story-copy">
          <p>
            According to the estate's records, Scottish planter Mr. Easkin recognized the area's
            potential for black tea and built the original Kudamalana Tea Factory in 1919.
            Stewardship later passed to factory officer Telikada Palliya Guruge Charles and then to
            his son, Eddy Premasiri.
          </p>
          <p>
            Today, Kudamalana (Pvt) Ltd continues as a family-run tea business, with later
            generations carrying the estate's tea-making tradition forward.
          </p>
          <aside className="heritage-archive" aria-label="Kudamalana origin record">
            <div className="archive-heading">
              <span>Estate archive</span>
              <small>Origin record 01</small>
            </div>
            <div className="archive-year">
              <span>Original factory</span>
              <strong>1919</strong>
            </div>
            <dl className="archive-facts">
              <div>
                <dt>Place</dt>
                <dd>Thalgaswala, Galle</dd>
              </div>
              <div>
                <dt>Craft</dt>
                <dd>Orthodox black tea</dd>
              </div>
              <div>
                <dt>Factory</dt>
                <dd>MF0259</dd>
              </div>
            </dl>
            <span className="archive-mark" aria-hidden="true">
              <Leaf />
            </span>
          </aside>
        </div>
        <Timeline />
      </section>
    </StandardPage>
  );
}

function EstateFactory() {
  usePageMeta(seo["/estate-factory"].title, seo["/estate-factory"].description);
  const stages = [
    ["Leaf reception", "Freshly gathered tea leaves arrive at the factory for careful inspection."],
    ["Withering", "The leaves are gently withered to reduce moisture and prepare them for rolling."],
    ["Rolling", "Rolling shapes the leaf and begins the development of its distinctive character."],
    ["Oxidation", "Controlled oxidation develops the color, aroma and body of the black tea."],
    ["Drying", "The oxidized leaf is dried to preserve its finished character and quality."],
    ["Grading", "The finished tea is sorted into grades ready for tasting and selection."]
  ];
  return (
    <StandardPage
      eyebrow="Estate & Factory"
      title="MF0259 in Sri Lanka's Low-Grown Ruhuna tea country"
      intro="Kudamalana is a modernized orthodox black-tea factory in Sri Lanka's Low-Grown Ruhuna tea country."
      artwork={{ variant: "factory", image: headerArt.factory, icon: <Factory /> }}
    >
      <section className="page-section split-section image-story-section">
        <ImagePanel image={images.landscape} />
        <div className="info-stack">
          <FactRow icon={<MapPin />} label="Location" value={estate.location} />
          <FactRow icon={<Factory />} label="Factory registration" value={estate.factoryRegistration} />
          <FactRow icon={<Leaf />} label="Tea region" value={estate.region} />
          <FactRow icon={<Building2 />} label="Monthly production" value="16,000-18,000 kg" />
          <FactRow icon={<Award />} label="Full capacity" value="20,000 kg/month" />
        </div>
      </section>
      <section className="page-section muted">
        <SectionIntro center eyebrow="Orthodox Process" title="From fresh leaf to finished tea">
          Kudamalana follows the key stages of orthodox black-tea production to shape the leaf's
          color, aroma and character.
        </SectionIntro>
        <div className="process-grid">
          {stages.map(([stage, description], index) => (
            <div key={stage} className="process-step">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{stage}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="page-section">
        <SectionIntro eyebrow="Factory Photography" title="Kudamalana from above and on site">
          Explore the factory, solar-panel roofline and surrounding Low-Grown Ruhuna landscape.
        </SectionIntro>
        <FactoryGallery />
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
      intro="Explore four Kudamalana black-tea products, each with its own place in the estate's story."
      artwork={{ variant: "teas", image: headerArt.teas, icon: <Leaf /> }}
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

  const title = product ? `${product.name} ${product.grade} | Kudamalana Ceylon Tea` : seo["/teas"].title;
  const description = product ? product.summary : seo["/teas"].description;
  usePageMeta(title, description);

  if (!product) return null;

  return (
    <StandardPage
      eyebrow={product.eyebrow}
      title={product.name}
      intro={product.summary}
      artwork={{ variant: "product", image: headerArt.teas, icon: <Leaf /> }}
    >
      <section className="page-section product-detail">
        <ProductVisual product={product} large />
        <div className="product-copy">
          <p className="product-tagline">{product.tagline}</p>
          <div className="product-grade">
            <span>Tea grade</span>
            <strong>{product.grade} <small>({product.gradeName})</small></strong>
          </div>
          <p>{product.details}</p>
          {product.aliases.length > 0 && (
            <p className="muted-text">Also seen as: {product.aliases.join(", ")}</p>
          )}
          <div className="tag-list">
            {product.facts.map((fact) => (
              <span key={fact}>{fact}</span>
            ))}
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
      title: "Organic farming practices",
      text:
        "Kudamalana follows organic agricultural practices designed to work in harmony with the surrounding land."
    },
    {
      icon: <Leaf />,
      title: "Mixed cultivation",
      text:
        "Tea grows alongside coconut, Ceylon cinnamon and medicinal herbs across the estate landscape."
    },
    {
      icon: <SunMedium />,
      title: "Renewable energy",
      text:
        "Kudamalana is working toward supplying around 30% of its energy needs from renewable sources."
    }
  ];
  return (
    <StandardPage
      eyebrow="Sustainability"
      title="Cultivating tea with care"
      intro="Kudamalana combines thoughtful cultivation, mixed planting and renewable-energy goals in its approach to the land."
      artwork={{ variant: "sustainability", image: headerArt.sustainability, icon: <Sprout /> }}
    >
      <section className="page-section split-section image-story-section">
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
      title="Quality and food safety at every stage"
      intro="Kudamalana's black-tea manufacturing is supported by ISO 22000:2018 food-safety management certification and factory registration MF0259."
      artwork={{ variant: "quality", image: headerArt.quality, icon: <ShieldCheck /> }}
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
    </StandardPage>
  );
}

function Trade() {
  usePageMeta(seo["/trade"].title, seo["/trade"].description);
  const tradeCards = [
    ["Wholesale buyers", "Discuss volume needs, black-tea supply and factory documentation."],
    ["Importers & distributors", "Request information on capacity, food-safety certification and sample pathways."],
    ["Private-label enquiries", "Discuss packaging needs, order volumes and commercial requirements with the Kudamalana team."]
  ];
  return (
    <StandardPage
      eyebrow="Trade & Wholesale"
      title="A clear enquiry path for buyers"
      intro="Connect with Kudamalana for wholesale supply, distribution, samples and private-label enquiries."
      artwork={{ variant: "trade", image: headerArt.trade, icon: <Package /> }}
    >
      <section className="page-section trade-layout">
        <div className="trade-panel">
          <h2>Trade at a glance</h2>
          <ul>
            <li>Factory registration: MF0259</li>
            <li>Region: Low-Grown Ruhuna tea country</li>
            <li>Process: orthodox black tea</li>
            <li>Full capacity: 20,000 kg/month</li>
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
      intro="Discover Kudamalana in Thalgaswala by arranging a factory visit with the estate team."
      artwork={{ variant: "visit", image: headerArt.visit, icon: <MapPin /> }}
    >
      <section className="page-section split-section image-story-section">
        <div className="visit-card">
          <MapPin size={32} />
          <h2>Thalgaswala, Galle</h2>
          <p>
            Send an enquiry with your preferred date, group size and reason for visiting. The team
            can confirm availability directly.
          </p>
          <CTA to="/contact">Send Visit Enquiry</CTA>
        </div>
        <ImagePanel image={images.factoryExterior} />
      </section>
      <section id="location" className="page-section location-section">
        <div className="location-copy">
          <Eyebrow>Find the Factory</Eyebrow>
          <h2>Kudamalana in Thalgaswala</h2>
          <p>{estate.mapAddress}</p>
          <a className="cta primary" href={estate.mapUrl} target="_blank" rel="noreferrer">
            <span>Open in Google Maps</span>
            <MapPin size={18} aria-hidden="true" />
          </a>
        </div>
        <div className="map-frame">
          <iframe
            title="Google Map showing Kudamalana Tea Factory in Thalgaswala"
            src={estate.mapEmbedUrl}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
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
      artwork={{ variant: "contact", image: headerArt.contact, icon: <Mail /> }}
    >
      <section className="page-section contact-layout">
        <div className="contact-card">
          <h2>{estate.companyName}</h2>
          <p>{estate.location}</p>
          <a href={`mailto:${estate.email}`}><Mail size={18} /> {estate.email}</a>
          {estate.phones.map((phone) => (
            <a key={phone.href} href={phone.href}>
              <Phone size={18} /> {phone.display}
            </a>
          ))}
          <a href={estate.mapUrl} target="_blank" rel="noreferrer">
            <MapPin size={18} /> Open in Google Maps
          </a>
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

function StandardPage({ eyebrow, title, intro, artwork, children }) {
  return (
    <>
      <section
        className={`page-hero ${artwork ? `page-hero-${artwork.variant}` : ""}`}
      >
        {artwork && (
          <div className="page-hero-art" aria-hidden="true">
            <ResponsiveImage
              className="page-hero-art-image"
              src={artwork.image.src}
              alt=""
              sizes="100vw"
              loading="eager"
            />
            <span className="page-hero-art-icon">{artwork.icon}</span>
          </div>
        )}
        <div className="page-hero-inner">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
        <div className="page-hero-meta" aria-label="Estate details">
          <span>Factory <strong>MF0259</strong></span>
          <span>Origin <strong>Low-Grown Ruhuna</strong></span>
          <span>Since <strong>1919</strong></span>
        </div>
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
            <small className="product-card-grade">Grade {product.grade}</small>
            <span>
              View tea <ChevronRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

function FactoryGallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const dialog = useRef(null);
  const openingTrigger = useRef(null);
  const isOpen = activeIndex !== null;
  const activePhoto = activeIndex === null ? null : factoryGallery[activeIndex];

  useEffect(() => {
    if (!isOpen) return undefined;
    const trigger = openingTrigger.current;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
      }
      if (event.key === "Tab") {
        const buttons = [...dialog.current.querySelectorAll("button")];
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((index) => (index === 0 ? factoryGallery.length - 1 : index - 1));
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((index) => (index === factoryGallery.length - 1 ? 0 : index + 1));
      }
    }

    document.body.classList.add("lightbox-open");
    dialog.current.querySelector("button").focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", handleKeyDown);
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <>
      <div className="factory-gallery">
        {factoryGallery.map((photo, index) => (
          <figure key={photo.src} className="factory-gallery-item">
            <button type="button" onClick={(event) => {
              openingTrigger.current = event.currentTarget;
              setActiveIndex(index);
            }}>
              <ResponsiveImage src={photo.src} alt={photo.alt} sizes="(max-width: 820px) 100vw, (max-width: 1100px) 50vw, 33vw" />
              <span>View large</span>
            </button>
            <figcaption>{photo.title}</figcaption>
          </figure>
        ))}
      </div>
      {activePhoto && (
        <div ref={dialog} className="photo-lightbox" role="dialog" aria-modal="true" aria-label={`${activePhoto.title} enlarged photo`}>
          <button className="lightbox-close" type="button" onClick={() => setActiveIndex(null)} aria-label="Close enlarged photo">
            <X size={24} />
          </button>
          <button
            className="lightbox-nav previous"
            type="button"
            onClick={() => setActiveIndex((index) => (index === 0 ? factoryGallery.length - 1 : index - 1))}
            aria-label="Previous photo"
          >
            <ChevronLeft size={28} />
          </button>
          <figure className="lightbox-figure">
            <ResponsiveImage key={activePhoto.src} src={activePhoto.src} alt={activePhoto.alt} sizes="(max-width: 820px) 95vw, 85vw" loading="eager" fetchPriority="high" />
            <figcaption>{activePhoto.title}</figcaption>
          </figure>
          <button
            className="lightbox-nav next"
            type="button"
            onClick={() => setActiveIndex((index) => (index === factoryGallery.length - 1 ? 0 : index + 1))}
            aria-label="Next photo"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </>
  );
}

function ProductVisual({ product, large = false }) {
  const primaryImage = product.images?.[0];

  if (primaryImage) {
    return (
      <figure className={`product-photo ${product.theme} ${large ? "large" : ""}`}>
        <div className="product-photo-stage">
          <ResponsiveImage src={primaryImage.src} alt={primaryImage.alt} sizes={large ? "(max-width: 820px) 80vw, 430px" : "(max-width: 820px) 80vw, (max-width: 1100px) 26vw, 20vw"} loading={large ? "eager" : "lazy"} fetchPriority={large ? "high" : "auto"} />
        </div>
        {large && product.images.length > 1 && (
          <div className="product-photo-strip" aria-label={`${product.name} product images`}>
            {product.images.map((image) => (
              <ResponsiveImage key={image.src} src={image.src} alt={image.alt} sizes="160px" />
            ))}
          </div>
        )}
      </figure>
    );
  }

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
      const emailLink = document.createElement("a");
      emailLink.href = mailto;
      emailLink.click();
    } else {
      event.currentTarget.elements.namedItem(Object.keys(nextErrors)[0])?.focus();
    }
  }

  return (
    <form className="enquiry-form" onSubmit={submit} noValidate>
      <label>
        <span id="name-label">Name</span>
        <input name="name" value={form.name} onChange={updateField} autoComplete="name" aria-labelledby="name-label" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
        {errors.name && <span id="name-error" className="form-error" role="alert">{errors.name}</span>}
      </label>
      <label>
        <span id="email-label">Email</span>
        <input type="email" inputMode="email" name="email" value={form.email} onChange={updateField} autoComplete="email" aria-labelledby="email-label" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
        {errors.email && <span id="email-error" className="form-error" role="alert">{errors.email}</span>}
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
        <span id="message-label">Message</span>
        <textarea name="message" value={form.message} onChange={updateField} rows="6" aria-labelledby="message-label" aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
        {errors.message && <span id="message-error" className="form-error" role="alert">{errors.message}</span>}
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
    <StandardPage
      eyebrow="Not Found"
      title="This page is not available"
      intro="Use the main navigation to continue exploring Kudamalana."
      artwork={{ variant: "contact", image: headerArt.contact, icon: <Leaf /> }}
    >
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
