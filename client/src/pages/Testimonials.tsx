import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Star, ExternalLink } from "lucide-react";
import { REVIEWS, BUSINESS, STYLISTS } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

const STYLIST_FILTERS = ["All", ...Array.from(new Set(REVIEWS.map(r => r.stylist))).filter(s => s !== "Team").sort()];
const SERVICE_FILTERS = ["All", ...Array.from(new Set(REVIEWS.map(r => r.service))).sort()];

export default function Testimonials() {
  const [stylistFilter, setStylistFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered = REVIEWS.filter(r => {
    const stylistMatch = stylistFilter === "All" || r.stylist === stylistFilter;
    const serviceMatch = serviceFilter === "All" || r.service === serviceFilter;
    return stylistMatch && serviceMatch;
  });

  const displayed = showAll ? filtered : filtered.slice(0, 12);

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Client Love</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              What Our Clients<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Say</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <div className="flex flex-wrap gap-8 mt-8">
              {[
                { value: "4.9", label: "Average Rating", suffix: "★" },
                { value: "384+", label: "Google Reviews", suffix: "" },
                { value: "100%", label: "5-Star Reviews", suffix: "" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>
                    {stat.value}{stat.suffix}
                  </div>
                  <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(249,246,240,0.4)", marginTop: "4px" }}>
                    {stat.label.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Hair strand accent */}
      <div className="relative h-10 overflow-hidden pointer-events-none" style={{ background: "var(--ivory)" }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 20 Q360 4 720 20 Q1080 36 1440 20" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="1"/>
          <path d="M0 30 Q360 14 720 30 Q1080 46 1440 30" fill="none" stroke="rgba(201,169,110,0.1)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Filters & Reviews */}
      <section className="py-16 md:py-24" style={{ background: "var(--ivory)" }}>
        <div className="container">
          {/* Filters */}
          <FadeUp className="mb-10">
            <div className="flex flex-col md:flex-row gap-6">
              <div>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  FILTER BY STYLIST
                </div>
                <div className="flex flex-wrap gap-2">
                  {STYLIST_FILTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStylistFilter(s)}
                      className="px-4 py-1.5 transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        background: stylistFilter === s ? "var(--charcoal)" : "transparent",
                        color: stylistFilter === s ? "var(--ivory)" : "var(--charcoal-light)",
                        border: `1px solid ${stylistFilter === s ? "var(--charcoal)" : "rgba(26,26,24,0.15)"}`,
                      }}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "0.5rem" }}>
                  FILTER BY SERVICE
                </div>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_FILTERS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setServiceFilter(s)}
                      className="px-4 py-1.5 transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        background: serviceFilter === s ? "var(--charcoal)" : "transparent",
                        color: serviceFilter === s ? "var(--ivory)" : "var(--charcoal-light)",
                        border: `1px solid ${serviceFilter === s ? "var(--charcoal)" : "rgba(26,26,24,0.15)"}`,
                      }}
                    >
                      {s.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--charcoal-light)", marginTop: "1rem", opacity: 0.6 }}>
              SHOWING {filtered.length} REVIEW{filtered.length !== 1 ? "S" : ""}
            </div>
          </FadeUp>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((review, i) => (
              <FadeUp key={review.id} delay={(i % 6) * 60}>
                <div className="review-card h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex">
                      {[1,2,3,4,5].map(j => (
                        <Star key={j} size={12} fill="var(--gold)" color="var(--gold)" />
                      ))}
                    </div>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "rgba(26,26,24,0.3)" }}>
                      {review.source.toUpperCase()}
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-5"
                    style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 300 }}
                  >
                    "{review.text}"
                  </p>
                  <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "1rem" }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", color: "var(--charcoal)", fontWeight: 500 }}>
                      {review.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--gold)" }}>
                        {review.service.toUpperCase()}
                      </span>
                      <span style={{ color: "rgba(201,169,110,0.4)" }}>·</span>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--charcoal-light)", opacity: 0.5 }}>
                        {review.stylist.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Load More */}
          {!showAll && filtered.length > 12 && (
            <FadeUp className="mt-12 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="btn-outline-dark"
              >
                Load All {filtered.length} Reviews
              </button>
            </FadeUp>
          )}

          {/* Google CTA */}
          <FadeUp className="mt-16">
            <div
              className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: "var(--charcoal)", border: "1px solid rgba(201,169,110,0.2)" }}
            >
              <div>
                <div className="flex mb-3">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={18} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.5rem", fontWeight: 400, color: "rgba(249,246,240,0.95)", marginBottom: "0.5rem" }}>
                  Love Three Degrees?
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "rgba(249,246,240,0.5)", fontWeight: 300 }}>
                  Share your experience on Google and help others discover us.
                </p>
              </div>
              <a
                href={BUSINESS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center gap-2 whitespace-nowrap"
              >
                Write a Review <ExternalLink size={14} />
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
