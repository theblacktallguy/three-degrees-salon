import { useInView } from "react-intersection-observer";
import { ArrowRight, Clock, MapPin, Phone, Mail, Calendar, Check } from "lucide-react";
import { BUSINESS, STYLISTS, SERVICES } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

const BOOKING_STEPS = [
  { step: "01", title: "Choose Your Stylist", desc: "Browse our team profiles and select the stylist whose expertise matches your needs." },
  { step: "02", title: "Select a Service", desc: "Choose from haircut, color, perm, styling, or treatment — or combine multiple services." },
  { step: "03", title: "Pick a Date & Time", desc: "Select from available slots that work for your schedule. Same-day appointments may be available." },
  { step: "04", title: "Confirm & Arrive", desc: "Receive a confirmation email. Arrive a few minutes early and enjoy complimentary tea." },
];

export default function Book() {
  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="absolute inset-0 opacity-20">
          <img src="/manus-storage/hero-main.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Reserve Your Chair</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              Book Your<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Appointment</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Book online in minutes. Walk-ins are welcome based on availability, but we recommend reserving your spot in advance.
            </p>
          </FadeUp>
          <FadeUp delay={300}>
            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2 inline-flex"
              style={{ fontSize: "0.75rem", padding: "1rem 2.5rem" }}
            >
              <Calendar size={16} />
              Book Online Now
              <ArrowRight size={16} />
            </a>
          </FadeUp>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">The Process</span>
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              How to <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Book</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BOOKING_STEPS.map((step, i) => (
              <FadeUp key={step.step} delay={i * 100}>
                <div className="relative">
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "4rem",
                      fontWeight: 300,
                      color: "var(--charcoal)",
                      opacity: 0.06,
                      lineHeight: 1,
                      marginBottom: "-1rem",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    className="w-8 h-8 flex items-center justify-center mb-4"
                    style={{ background: "var(--gold)", color: "white" }}
                  >
                    <span style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", fontWeight: 600 }}>
                      {step.step}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 400, color: "var(--charcoal)", marginBottom: "0.5rem" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Hair strand divider */}
      <div className="relative h-12 overflow-hidden pointer-events-none" style={{ background: "var(--ivory)" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 24 Q180 8 360 24 Q540 40 720 24 Q900 8 1080 24 Q1260 40 1440 24" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="1"/>
          <path d="M0 32 Q240 16 480 32 Q720 48 960 32 Q1200 16 1440 32" fill="none" stroke="rgba(201,169,110,0.12)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Book by Stylist */}
      <section className="py-24 md:py-32" style={{ background: "var(--beige)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">Book with a Specific Stylist</span>
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              Choose Your <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Stylist</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {STYLISTS.map((stylist, i) => (
              <FadeUp key={stylist.id} delay={i * 80}>
                <div
                  className="flex gap-4 p-5"
                  style={{ background: "white", border: "1px solid rgba(201,169,110,0.15)", transition: "all 300ms" }}
                >
                  <div className="overflow-hidden flex-shrink-0" style={{ width: "72px", height: "72px" }}>
                    <img
                      src={stylist.photo}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = (stylist as any).photoFallback || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=100&h=100&fit=crop";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "var(--charcoal)" }}>
                      {stylist.name}
                    </h3>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--gold)", marginBottom: "4px" }}>
                      {stylist.role.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--charcoal-light)", opacity: 0.6, marginBottom: "8px" }}>
                      {stylist.priceRange}
                    </div>
                    <a
                      href={stylist.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs transition-colors hover:text-[var(--gold)]"
                      style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--charcoal)" }}
                    >
                      BOOK <ArrowRight size={10} />
                    </a>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Policies */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-rule" />
                <span className="section-label">Good to Know</span>
              </div>
              <h2 className="text-section-title mb-8" style={{ color: "var(--charcoal)" }}>
                Booking <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Policies</em>
              </h2>
              <div className="space-y-4">
                {[
                  "Appointments are strongly recommended. Walk-ins accepted based on availability.",
                  "Please cancel or reschedule at least 24 hours in advance.",
                  "Late cancellations or no-shows may be subject to a fee.",
                  "For color corrections, email us first with photos for a consultation.",
                  "Clients with bleached hair are not eligible for perm services.",
                  "Shampoo & blow-dry included with all haircut services (except Bang/Neck Trim).",
                  "We accept credit cards, debit cards, and NFC payments.",
                  "Complimentary beverages (green tea) offered during your appointment.",
                ].map((policy, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check size={14} style={{ color: "var(--gold)", marginTop: "3px", flexShrink: 0 }} />
                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal-light)", fontWeight: 300, lineHeight: 1.6 }}>
                      {policy}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-rule" />
                <span className="section-label">Contact Us</span>
              </div>
              <h2 className="text-section-title mb-8" style={{ color: "var(--charcoal)" }}>
                Get in <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Touch</em>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Address", value: "204 E 6th Street, New York, NY 10003", href: BUSINESS.googleMaps },
                  { icon: Phone, label: "Phone", value: "(212) 254-8174", href: `tel:${BUSINESS.phone}` },
                  { icon: Mail, label: "Email", value: "info@threedegreesnyc.com", href: `mailto:${BUSINESS.email}` },
                  { icon: Clock, label: "Hours", value: "Mon – Sun: 9:00 AM – 7:00 PM", href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--beige)", border: "1px solid rgba(201,169,110,0.2)" }}
                    >
                      <Icon size={16} style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", marginBottom: "2px" }}>
                        {label.toUpperCase()}
                      </div>
                      {href ? (
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                          style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)", textDecoration: "none" }}
                          className="hover:text-[var(--gold)] transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)" }}>
                          {value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <a
                  href={BUSINESS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center gap-2 inline-flex"
                >
                  <Calendar size={14} />
                  Book Online Now
                  <ArrowRight size={14} />
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
