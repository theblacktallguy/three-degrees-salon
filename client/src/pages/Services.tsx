import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { SERVICES, BUSINESS } from "@/lib/data";

// Champagne SVG service icons — monochrome linework
const SERVICE_ICONS: Record<string, React.ReactNode> = {
  haircut: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="8" r="3"/>
      <circle cx="7" cy="20" r="3"/>
      <line x1="10" y1="8" x2="22" y2="20"/>
      <line x1="10" y1="20" x2="22" y2="8"/>
      <line x1="14" y1="14" x2="22" y2="14"/>
    </svg>
  ),
  color: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 4 Q18 10 18 15 A4 4 0 0 1 10 15 Q10 10 14 4Z"/>
      <path d="M8 20 Q14 17 20 20"/>
      <line x1="14" y1="22" x2="14" y2="25"/>
    </svg>
  ),
  perm: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 14 Q8 8 14 8 Q20 8 22 14 Q20 20 14 20 Q8 20 6 14"/>
      <path d="M10 14 Q12 10 14 14 Q16 18 18 14"/>
    </svg>
  ),
  styling: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 22 Q8 14 14 10 Q20 14 20 22"/>
      <path d="M11 16 Q14 13 17 16"/>
      <line x1="14" y1="4" x2="14" y2="8"/>
      <line x1="10" y1="5" x2="12" y2="8"/>
      <line x1="18" y1="5" x2="16" y2="8"/>
    </svg>
  ),
  treatment: (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--gold)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 5 Q20 9 20 16 A6 6 0 0 1 8 16 Q8 9 14 5Z"/>
      <path d="M11 16 Q14 12 17 16"/>
      <line x1="14" y1="19" x2="14" y2="22"/>
    </svg>
  ),
};

// Hair strand SVG divider
function HairStrandDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative h-12 overflow-hidden pointer-events-none ${className}`}>
      <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <path d="M0 24 Q180 8 360 24 Q540 40 720 24 Q900 8 1080 24 Q1260 40 1440 24" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="1"/>
        <path d="M0 32 Q240 16 480 32 Q720 48 960 32 Q1200 16 1440 32" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="1"/>
      </svg>
    </div>
  );
}
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Services() {
  const [activeService, setActiveService] = useState(SERVICES[0].id);
  const current = SERVICES.find(s => s.id === activeService) || SERVICES[0];

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="absolute inset-0 opacity-15">
          <img src="/manus-storage/hero-color.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">What We Offer</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              Services &<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Pricing</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Every service is tailored to your unique hair type, texture, and goals. Pricing reflects each stylist's experience level.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Service Tabs */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          {/* Tab Nav */}
          <FadeUp className="mb-12">
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className="px-6 py-3 transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    background: activeService === s.id ? "var(--charcoal)" : "transparent",
                    color: activeService === s.id ? "var(--ivory)" : "var(--charcoal-light)",
                    border: `1px solid ${activeService === s.id ? "var(--charcoal)" : "rgba(26,26,24,0.15)"}`,
                  }}
                >
                  {s.name.toUpperCase()}
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Service Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeUp>
              <div className="overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  key={current.id}
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  style={{ transition: "opacity 400ms" }}
                />
              </div>
              <div className="mt-6 p-6" style={{ background: "var(--beige)", border: "1px solid rgba(201,169,110,0.2)" }}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "0.5rem" }}>INCLUDES</div>
                <ul className="space-y-2">
                  {current.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-3">
                      <Check size={12} style={{ color: "var(--gold)" }} />
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal-light)" }}>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={100}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="gold-rule" />
                  <span className="section-label">{current.tagline}</span>
                </div>
                <h2 className="text-section-title mb-4" style={{ color: "var(--charcoal)" }}>
                  {current.name}
                </h2>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                  {current.description}
                </p>
              </FadeUp>

              {/* Pricing Table */}
              <FadeUp delay={200}>
                <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)" }}>
                  <div
                    className="py-4 flex justify-between"
                    style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)" }}
                  >
                    <span>SERVICE</span>
                    <span>PRICE</span>
                  </div>
                  {current.pricing.map((row) => (
                    <div key={row.item} className="price-row">
                      <span style={{ fontFamily: "var(--font-body)", fontSize: "0.85rem", color: "var(--charcoal)", flex: 1, paddingRight: "1rem" }}>
                        {row.item}
                      </span>
                      <span style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 500, color: "var(--charcoal)", whiteSpace: "nowrap" }}>
                        {row.price}
                      </span>
                    </div>
                  ))}
                </div>
                {current.note && (
                  <p className="mt-4 text-xs leading-relaxed" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontStyle: "italic", opacity: 0.7 }}>
                    * {current.note}
                  </p>
                )}
              </FadeUp>

              <FadeUp delay={300} className="mt-8 flex flex-wrap gap-4">
                <a href={BUSINESS.booking} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2">
                  Book This Service <ArrowRight size={14} />
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="btn-outline-dark">
                  Email for Consultation
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      <HairStrandDivider />

      {/* All Services Overview */}
      <section className="py-24 md:py-32" style={{ background: "var(--beige)" }}>
        <div className="container">
          <FadeUp className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">All Services</span>
              <div className="gold-rule" />
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              Complete <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Menu</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <FadeUp key={service.id} delay={i * 80}>
                <div
                  className="p-8 cursor-pointer group"
                  style={{ background: "white", border: "1px solid rgba(201,169,110,0.15)", transition: "all 400ms cubic-bezier(0.16,1,0.3,1)" }}
                  onClick={() => { setActiveService(service.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>{SERVICE_ICONS[service.id] || SERVICE_ICONS.haircut}</div>
                    <span style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                      FROM {service.startingPrice}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                    {service.name}
                  </h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                    {service.tagline}
                  </p>
                  <div className="flex items-center gap-2 text-xs group-hover:gap-3 transition-all duration-300" style={{ color: "var(--gold)", fontFamily: "var(--font-label)", letterSpacing: "0.15em" }}>
                    <span>VIEW PRICING</span>
                    <ArrowRight size={12} />
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20" style={{ background: "var(--charcoal)" }}>
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-section-title mb-6" style={{ color: "rgba(249,246,240,0.95)" }}>
              Ready to Book?
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(249,246,240,0.5)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
              Book online, call us, or email for a consultation. Walk-ins welcome based on availability.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={BUSINESS.booking} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2">
                Book Online <ArrowRight size={14} />
              </a>
              <a href={`tel:${BUSINESS.phone}`} className="btn-outline-gold" style={{ borderColor: "rgba(201,169,110,0.4)", color: "var(--gold)" }}>
                Call {BUSINESS.phone}
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
