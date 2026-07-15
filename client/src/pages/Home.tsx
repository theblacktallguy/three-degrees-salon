import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { useInView } from "react-intersection-observer";
import { Star, ArrowRight, MapPin, Phone, Clock, Instagram, ChevronDown } from "lucide-react";
import { BUSINESS, SERVICES, STYLISTS, REVIEWS, STATS } from "@/lib/data";

// Animated number component
function AnimatedStat({ number, suffix, label, decimal }: { number: number; suffix: string; label: string; decimal?: boolean }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || !countRef.current) return;
    const start = 0;
    const end = number;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * eased;
      if (countRef.current) {
        countRef.current.textContent = decimal ? current.toFixed(1) : Math.floor(current).toString();
      }
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, number, decimal]);

  return (
    <div ref={ref} className="text-center">
      <div
        className="flex items-baseline justify-center gap-1"
        style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, color: "var(--charcoal)", lineHeight: 1 }}
      >
        <span ref={countRef}>{decimal ? "0.0" : "0"}</span>
        <span style={{ color: "var(--gold)", fontSize: "0.6em" }}>{suffix}</span>
      </div>
      <div
        className="mt-2"
        style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--charcoal-light)", textTransform: "uppercase" }}
      >
        {label}
      </div>
    </div>
  );
}

// Fade-up section
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.4}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const featuredReviews = REVIEWS.slice(0, 3);

  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image with parallax */}
        <div
          ref={heroRef}
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url('/manus-storage/hero-main.png')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,24,0.75) 0%, rgba(26,26,24,0.4) 60%, rgba(26,26,24,0.2) 100%)" }} />

        {/* Hair strand SVG decoration */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d="M 1200 0 Q 1100 200 1300 400 Q 1400 550 1200 700 Q 1000 850 1100 900"
            fill="none"
            stroke="rgba(201,169,110,0.2)"
            strokeWidth="1"
            className="hair-strand"
            style={{ animationDelay: "0s" }}
          />
          <path
            d="M 1350 0 Q 1200 150 1400 350 Q 1500 500 1300 650 Q 1100 800 1250 900"
            fill="none"
            stroke="rgba(201,169,110,0.15)"
            strokeWidth="1"
            className="hair-strand"
            style={{ animationDelay: "2s" }}
          />
        </svg>

        {/* Hero Content */}
        <div className="container relative z-10 pt-20">
          <div className="max-w-3xl">
            <div
              className="mb-6"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                letterSpacing: "0.35em",
                color: "var(--gold)",
                opacity: 0,
                animation: "fadeInUp 800ms cubic-bezier(0.16,1,0.3,1) 200ms forwards",
              }}
            >
              EAST VILLAGE · NEW YORK CITY · EST. 2019
            </div>

            <h1
              className="text-display text-white mb-6"
              style={{
                opacity: 0,
                animation: "fadeInUp 900ms cubic-bezier(0.16,1,0.3,1) 400ms forwards",
              }}
            >
              Where Your<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Hair</em> Finds<br />
              Its Style
            </h1>

            <p
              className="text-lg mb-10 max-w-xl"
              style={{
                fontFamily: "var(--font-body)",
                color: "rgba(255,255,255,0.75)",
                lineHeight: 1.7,
                fontWeight: 300,
                opacity: 0,
                animation: "fadeInUp 900ms cubic-bezier(0.16,1,0.3,1) 600ms forwards",
              }}
            >
              Japanese-concept luxury hair salon in East Village, NYC. Specializing in cuts, color, balayage, digital perms, and Japanese straightening.
            </p>

            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: 0,
                animation: "fadeInUp 900ms cubic-bezier(0.16,1,0.3,1) 800ms forwards",
              }}
            >
              <a
                href={BUSINESS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex items-center gap-2"
              >
                Book Appointment
                <ArrowRight size={14} />
              </a>
              <Link href="/services">
                <button className="btn-outline-gold flex items-center gap-2" style={{ borderColor: "rgba(201,169,110,0.6)", color: "rgba(201,169,110,0.9)" }}>
                  View Services
                </button>
              </Link>
            </div>

            {/* Rating badge */}
            <div
              className="flex items-center gap-3 mt-10"
              style={{
                opacity: 0,
                animation: "fadeInUp 900ms cubic-bezier(0.16,1,0.3,1) 1000ms forwards",
              }}
            >
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <span style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.6)" }}>
                4.9 · 384+ REVIEWS
              </span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0, animation: "fadeInUp 900ms cubic-bezier(0.16,1,0.3,1) 1200ms forwards" }}
        >
          <span style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.4)" }}>SCROLL</span>
          <ChevronDown size={16} color="rgba(255,255,255,0.4)" className="animate-bounce" />
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section style={{ background: "var(--ivory)", borderBottom: "1px solid rgba(201,169,110,0.15)" }}>
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">Our Expertise</span>
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)", maxWidth: "500px" }}>
              Services Crafted<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>for You</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, i) => (
              <FadeUp key={service.id} delay={i * 100}>
                <Link href="/services">
                  <div
                    className="luxury-card group cursor-pointer overflow-hidden"
                    style={{ background: "white", border: "1px solid rgba(201,169,110,0.15)" }}
                  >
                    <div className="img-reveal h-56 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          style={{
                            fontFamily: "var(--font-heading)",
                            fontSize: "1.3rem",
                            fontWeight: 400,
                            color: "var(--charcoal)",
                          }}
                        >
                          {service.name}
                        </h3>
                        <span
                          style={{
                            fontFamily: "var(--font-label)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.15em",
                            color: "var(--gold)",
                          }}
                        >
                          FROM {service.startingPrice}
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-4"
                        style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)" }}
                      >
                        {service.tagline}
                      </p>
                      <div
                        className="flex items-center gap-2 text-xs group-hover:gap-3 transition-all duration-300"
                        style={{ color: "var(--gold)", fontFamily: "var(--font-label)", letterSpacing: "0.15em" }}
                      >
                        <span>LEARN MORE</span>
                        <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={300} className="mt-12 text-center">
            <Link href="/services">
              <button className="btn-outline-dark">View All Services & Pricing</button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* Hair strand divider */}
      <div className="relative h-12 overflow-hidden pointer-events-none" style={{ background: "var(--ivory)" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 24 Q180 8 360 24 Q540 40 720 24 Q900 8 1080 24 Q1260 40 1440 24" fill="none" stroke="rgba(201,169,110,0.3)" strokeWidth="1"/>
          <path d="M0 32 Q240 16 480 32 Q720 48 960 32 Q1200 16 1440 32" fill="none" stroke="rgba(201,169,110,0.15)" strokeWidth="1"/>
        </svg>
      </div>

      {/* ─── ABOUT STRIP ─── */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--charcoal)" }}
      >
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div
                className="relative"
                style={{ aspectRatio: "4/5", overflow: "hidden" }}
              >
                <img
                  src="/manus-storage/hero-stylist.png"
                  alt="Three Degrees Salon"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-6 left-6 right-6 glass-card p-4"
                  style={{ background: "rgba(26,26,24,0.8)", border: "1px solid rgba(201,169,110,0.3)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontStyle: "italic",
                      color: "rgba(249,246,240,0.9)",
                      lineHeight: 1.4,
                    }}
                  >
                    "Crafted in East Village.<br />Inspired by Tokyo."
                  </div>
                </div>
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={100}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="gold-rule" />
                  <span className="section-label">Our Story</span>
                </div>
              </FadeUp>
              <FadeUp delay={200}>
                <h2
                  className="text-section-title mb-6"
                  style={{ color: "rgba(249,246,240,0.95)" }}
                >
                  Japanese Precision<br />
                  <em style={{ fontStyle: "italic", color: "var(--gold)" }}>New York Soul</em>
                </h2>
              </FadeUp>
              <FadeUp delay={300}>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "rgba(249,246,240,0.6)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  Founded in 2019 by Kei Hirata — a Tokyo-trained master stylist with 20+ years of experience — Three Degrees Salon brings the art of Japanese hairdressing to the heart of East Village.
                </p>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ color: "rgba(249,246,240,0.6)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                >
                  Our team of internationally trained stylists specializes in cuts, color, digital perms, and Japanese straightening — all tailored to your unique hair type, texture, and lifestyle.
                </p>
              </FadeUp>
              <FadeUp delay={400}>
                <div className="flex flex-wrap gap-4">
                  <Link href="/about">
                    <button
                      className="btn-outline-gold"
                      style={{ borderColor: "rgba(201,169,110,0.5)", color: "var(--gold)" }}
                    >
                      Our Story
                    </button>
                  </Link>
                  <Link href="/team">
                    <button
                      className="btn-outline-gold"
                      style={{ borderColor: "rgba(201,169,110,0.5)", color: "var(--gold)" }}
                    >
                      Meet the Team
                    </button>
                  </Link>
                </div>
              </FadeUp>

              {/* Awards */}
              <FadeUp delay={500} className="mt-12">
                <div
                  className="flex items-center gap-4 mb-4"
                  style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "1.5rem" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.25em",
                      color: "rgba(249,246,240,0.3)",
                    }}
                  >
                    AS SEEN IN
                  </span>
                </div>
                <div className="flex flex-wrap gap-6">
                  {["Hair.com", "Refinery29", "Hairdressr.com", "Fox34 News"].map((press) => (
                    <span
                      key={press}
                      style={{
                        fontFamily: "var(--font-label)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.15em",
                        color: "rgba(249,246,240,0.4)",
                      }}
                    >
                      {press.toUpperCase()}
                    </span>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Hair strand divider */}
      <div className="relative h-12 overflow-hidden pointer-events-none" style={{ background: "var(--ivory)" }}>
        <svg viewBox="0 0 1440 48" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 16 Q360 32 720 16 Q1080 0 1440 16" fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="1"/>
          <path d="M0 28 Q360 44 720 28 Q1080 12 1440 28" fill="none" stroke="rgba(201,169,110,0.1)" strokeWidth="1"/>
        </svg>
      </div>

      {/* ─── TEAM PREVIEW ─── */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="gold-rule" />
                <span className="section-label">The Artisans</span>
              </div>
              <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
                Meet Our<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Stylists</em>
              </h2>
            </div>
            <Link href="/team">
              <button className="btn-outline-dark flex items-center gap-2">
                View All <ArrowRight size={12} />
              </button>
            </Link>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {STYLISTS.slice(0, 4).map((stylist, i) => (
              <FadeUp key={stylist.id} delay={i * 80}>
                <Link href="/team">
                  <div className="group cursor-pointer">
                    <div
                      className="overflow-hidden mb-4"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <img
                        src={stylist.photo}
                        alt={stylist.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = (stylist as any).photoFallback || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=533&fit=crop";
                        }}
                      />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "1.1rem",
                          fontWeight: 400,
                          color: "var(--charcoal)",
                        }}
                      >
                        {stylist.name}
                      </h3>
                      <p
                        style={{
                          fontFamily: "var(--font-label)",
                          fontSize: "0.6rem",
                          letterSpacing: "0.15em",
                          color: "var(--gold)",
                          marginTop: "4px",
                        }}
                      >
                        {stylist.role.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS PREVIEW ─── */}
      <section
        className="py-24 md:py-32"
        style={{ background: "var(--beige)" }}
      >
        <div className="container">
          <FadeUp className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">Client Love</span>
              <div className="gold-rule" />
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              What Our Clients<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Say</em>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} fill="var(--gold)" color="var(--gold)" />
              ))}
              <span
                className="ml-2"
                style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--charcoal-light)" }}
              >
                4.9 AVERAGE · 384+ REVIEWS
              </span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map((review, i) => (
              <FadeUp key={review.id} delay={i * 100}>
                <div className="review-card h-full flex flex-col">
                  <div className="flex mb-4">
                    {[1,2,3,4,5].map(j => (
                      <Star key={j} size={12} fill="var(--gold)" color="var(--gold)" />
                    ))}
                  </div>
                  <p
                    className="text-sm leading-relaxed flex-1 mb-6"
                    style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontStyle: "italic" }}
                  >
                    "{review.text.length > 200 ? review.text.slice(0, 200) + "..." : review.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--font-heading)",
                          fontSize: "0.95rem",
                          color: "var(--charcoal)",
                          fontWeight: 500,
                        }}
                      >
                        {review.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "var(--font-label)",
                          fontSize: "0.55rem",
                          letterSpacing: "0.15em",
                          color: "var(--gold)",
                          marginTop: "2px",
                        }}
                      >
                        {review.service.toUpperCase()} · {review.source.toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={300} className="mt-12 text-center">
            <Link href="/testimonials">
              <button className="btn-outline-dark flex items-center gap-2 mx-auto">
                Read All Reviews <ArrowRight size={12} />
              </button>
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ─── INSTAGRAM FEED ─── */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="gold-rule" />
                <span className="section-label">Follow Our Work</span>
              </div>
              <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>@threedegreessalon</em>
              </h2>
            </div>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--charcoal)",
              }}
            >
              <Instagram size={16} />
              FOLLOW US
            </a>
          </FadeUp>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {[
              "https://threedegreesnyc.com/wp-content/uploads/2024/01/Medium-Textured-Cut.jpg",
              "https://threedegreesnyc.com/wp-content/uploads/2023/10/Balayage.jpg",
              "https://threedegreesnyc.com/wp-content/uploads/2024/01/Digital-Perm.png",
              "https://threedegreesnyc.com/wp-content/uploads/2024/01/Subtle-Angle-Bob.jpg",
              "https://threedegreesnyc.com/wp-content/uploads/2024/08/IMG_9474.jpg",
              "https://threedegreesnyc.com/wp-content/uploads/2024/08/Keratin-Treatment.jpg",
            ].map((img, i) => (
              <FadeUp key={i} delay={i * 60}>
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden group"
                  style={{ aspectRatio: "1/1" }}
                >
                  <img
                    src={img}
                    alt="Three Degrees Salon work"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </a>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section
        className="py-24 md:py-32 relative overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        <div className="absolute inset-0 opacity-10">
          <img
            src="/manus-storage/salon-interior.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 text-center">
          <FadeUp>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Book Today</span>
              <div className="gold-rule" />
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h2
              className="text-display mb-6"
              style={{ color: "rgba(249,246,240,0.95)" }}
            >
              Ready for Your<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Transformation?</em>
            </h2>
          </FadeUp>
          <FadeUp delay={200}>
            <p
              className="text-base mb-10 mx-auto"
              style={{
                color: "rgba(249,246,240,0.5)",
                fontFamily: "var(--font-body)",
                fontWeight: 300,
                maxWidth: "500px",
                lineHeight: 1.7,
              }}
            >
              Book your appointment online or email us for a consultation. Walk-ins welcome based on availability.
            </p>
          </FadeUp>
          <FadeUp delay={300} className="flex flex-wrap gap-4 justify-center">
            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center gap-2"
            >
              Book Appointment <ArrowRight size={14} />
            </a>
            <a
              href={`mailto:${BUSINESS.email}`}
              className="btn-outline-gold"
              style={{ borderColor: "rgba(201,169,110,0.4)", color: "var(--gold)" }}
            >
              Email for Consultation
            </a>
          </FadeUp>

          {/* Info strip */}
          <FadeUp delay={400} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {[
              { icon: MapPin, label: "204 E 6th Street, East Village" },
              { icon: Phone, label: "(212) 254-8174" },
              { icon: Clock, label: "Mon – Sun: 9AM – 7PM" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center justify-center gap-3">
                <Icon size={14} style={{ color: "var(--gold)" }} />
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.1em",
                    color: "rgba(249,246,240,0.5)",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </FadeUp>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
