import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { ArrowRight, Instagram, X } from "lucide-react";
import { STYLISTS, BUSINESS } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Team() {
  const [selected, setSelected] = useState<typeof STYLISTS[0] | null>(null);

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="absolute inset-0 opacity-15">
          <img src="/manus-storage/hero-stylist.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">The Artisans</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              Meet Our<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Stylists</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Seven internationally trained stylists, each bringing unique expertise and cultural perspective to every appointment.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {STYLISTS.map((stylist, i) => (
              <FadeUp key={stylist.id} delay={i * 80}>
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelected(stylist)}
                >
                  <div className="overflow-hidden mb-5 relative" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={stylist.photo}
                      alt={stylist.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = (stylist as any).photoFallback || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=533&fit=crop";
                      }}
                    />
                    <div
                      className="absolute inset-0 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                      style={{ background: "linear-gradient(to top, rgba(26,26,24,0.85) 0%, transparent 60%)" }}
                    >
                      <div>
                        <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "0.25rem" }}>
                          SPECIALIZES IN
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {stylist.specialties.slice(0, 3).map((sp) => (
                            <span
                              key={sp}
                              className="px-2 py-0.5 text-xs"
                              style={{ background: "rgba(201,169,110,0.2)", color: "rgba(249,246,240,0.9)", fontFamily: "var(--font-body)", fontSize: "0.7rem" }}
                            >
                              {sp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "1.2rem", fontWeight: 400, color: "var(--charcoal)", marginBottom: "4px" }}>
                      {stylist.name}
                    </h3>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", marginBottom: "4px" }}>
                      {stylist.role.toUpperCase()}
                    </div>
                    <div style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--charcoal-light)", opacity: 0.6 }}>
                      {stylist.origin} · {stylist.experience}
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Stylist Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(26,26,24,0.9)", backdropFilter: "blur(10px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            style={{ background: "var(--ivory)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 transition-colors"
              onClick={() => setSelected(null)}
              style={{ color: "var(--charcoal)" }}
            >
              <X size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="overflow-hidden" style={{ aspectRatio: "3/4", maxHeight: "500px" }}>
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = (selected as any).photoFallback || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=533&fit=crop";
                  }}
                />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="gold-rule" />
                  <span className="section-label">{selected.role}</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "2rem", fontWeight: 400, color: "var(--charcoal)", marginBottom: "0.25rem" }}>
                  {selected.name}
                </h2>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--charcoal-light)", marginBottom: "1.5rem" }}>
                  {selected.origin} · {selected.experience}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                  {selected.bio}
                </p>

                <div className="mb-6">
                  <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "0.75rem" }}>
                    SPECIALTIES
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selected.specialties.map((sp) => (
                      <span
                        key={sp}
                        className="px-3 py-1 text-xs"
                        style={{ background: "var(--beige)", color: "var(--charcoal)", fontFamily: "var(--font-body)", border: "1px solid rgba(201,169,110,0.2)" }}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>

                <blockquote className="border-l-2 pl-4 mb-6" style={{ borderColor: "var(--gold)" }}>
                  <p style={{ fontFamily: "var(--font-display)", fontSize: "0.95rem", fontStyle: "italic", color: "var(--charcoal)", lineHeight: 1.5 }}>
                    "{selected.quote}"
                  </p>
                </blockquote>

                <div className="flex flex-wrap gap-3">
                  <a href={selected.bookingUrl} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2" style={{ fontSize: "0.65rem", padding: "0.75rem 1.5rem" }}>
                    Book with {selected.name.split(" ")[0]} <ArrowRight size={12} />
                  </a>
                  {selected.instagram && selected.instagram !== BUSINESS.instagram && (
                    <a href={selected.instagram} target="_blank" rel="noopener noreferrer" className="btn-outline-dark flex items-center gap-2" style={{ fontSize: "0.65rem", padding: "0.75rem 1.5rem" }}>
                      <Instagram size={12} /> Instagram
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-20" style={{ background: "var(--charcoal)" }}>
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-section-title mb-6" style={{ color: "rgba(249,246,240,0.95)" }}>
              Find Your Perfect <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Stylist</em>
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(249,246,240,0.5)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
              Each of our stylists brings unique expertise. Browse their profiles, then book directly with the one who's right for you.
            </p>
            <a href={BUSINESS.booking} target="_blank" rel="noopener noreferrer" className="btn-gold flex items-center gap-2 inline-flex mx-auto">
              Book an Appointment <ArrowRight size={14} />
            </a>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
