import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { ArrowRight, Award, MapPin, Star } from "lucide-react";
import { BUSINESS } from "@/lib/data";

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

const TIMELINE = [
  { year: "2019", title: "Three Degrees Opens", desc: "Kei Hirata opens Three Degrees Salon at 204 E 6th Street in East Village, bringing Japanese precision hairdressing to NYC." },
  { year: "2021", title: "Team Expands", desc: "Saeko and Shawn Nakamura join the team, bringing expertise in color, textured cuts, and international salon experience." },
  { year: "2022", title: "Featured in Refinery29", desc: "Three Degrees is recognized by Refinery29 as one of NYC's standout salons, cementing its reputation in the city's beauty scene." },
  { year: "2023", title: "Best Salon Award", desc: "Named Best Salon in NYC by Hairdressr.com and featured by Fox34 News and ABC6 News. Team grows to 7 expert stylists." },
  { year: "2024", title: "384+ Five-Star Reviews", desc: "Surpassing 384 five-star reviews on Google, Three Degrees continues to be one of East Village's most beloved luxury salons." },
];

const VALUES = [
  {
    title: "Japanese Precision",
    desc: "Every cut is informed by Japanese hairdressing philosophy — meticulous technique, deep attention to hair texture, and a commitment to lasting results.",
    icon: "✦",
  },
  {
    title: "Client-Centered",
    desc: "We start every appointment with a thorough consultation. Your hair type, lifestyle, and vision guide every decision we make.",
    icon: "◇",
  },
  {
    title: "Minimal Damage",
    desc: "We carefully assess your hair condition before every color or chemical service, selecting products that achieve beautiful results with minimal damage.",
    icon: "○",
  },
  {
    title: "Ongoing Education",
    desc: "Our stylists regularly train in Japan and internationally, staying ahead of techniques and trends to bring you the best.",
    icon: "△",
  },
];

export default function About() {
  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section
        className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "var(--charcoal)" }}
      >
        <div className="absolute inset-0 opacity-20">
          <img
            src="/manus-storage/salon-interior.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Our Story</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1
              className="text-display mb-6"
              style={{ color: "rgba(249,246,240,0.95)", maxWidth: "700px" }}
            >
              Japanese Craft.<br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>New York Spirit.</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p
              className="text-lg max-w-xl"
              style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}
            >
              Three Degrees Salon was born from a belief that exceptional hair is the result of exceptional craft — and that every client deserves to leave feeling genuinely transformed.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="relative">
                <div
                  className="overflow-hidden"
                  style={{ aspectRatio: "4/5" }}
                >
                  <img
                    src="https://threedegreesnyc.com/wp-content/uploads/2023/11/Kei-Hirata_low-res.jpg"
                    alt="Kei Hirata — Owner & Lead Stylist"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/manus-storage/hero-stylist.png";
                    }}
                  />
                </div>
                <div
                  className="absolute -bottom-4 -right-4 p-6"
                  style={{ background: "var(--charcoal)", minWidth: "200px" }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>20+</div>
                  <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(249,246,240,0.5)", marginTop: "4px" }}>YEARS EXPERIENCE</div>
                </div>
              </div>
            </FadeUp>

            <div>
              <FadeUp delay={100}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="gold-rule" />
                  <span className="section-label">The Founder</span>
                </div>
              </FadeUp>
              <FadeUp delay={200}>
                <h2 className="text-section-title mb-6" style={{ color: "var(--charcoal)" }}>
                  Kei Hirata<br />
                  <em style={{ fontStyle: "italic", color: "var(--gold)", fontSize: "0.7em" }}>Owner & Lead Stylist</em>
                </h2>
              </FadeUp>
              <FadeUp delay={300}>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                  Kei Hirata began cutting hair at age 13 and never stopped. After training at the Nihon Beauty Academy and refining his craft at HEAVENS in Harajuku, Tokyo, he moved to Vancouver where he worked on editorial projects for fashion, TV, and advertising.
                </p>
                <p className="text-base leading-relaxed mb-4" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                  In 2011, he moved to New York City — and in 2019, he opened Three Degrees Salon in East Village with a singular vision: to bring the precision and philosophy of Japanese hairdressing to New York, without the pretension.
                </p>
                <p className="text-base leading-relaxed mb-8" style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
                  Today, Three Degrees is home to seven internationally trained stylists, each bringing their own expertise and cultural perspective to the chair.
                </p>
              </FadeUp>
              <FadeUp delay={400}>
                <blockquote
                  className="border-l-2 pl-6 mb-8"
                  style={{ borderColor: "var(--gold)" }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.2rem",
                      fontStyle: "italic",
                      color: "var(--charcoal)",
                      lineHeight: 1.5,
                    }}
                  >
                    "He is truly an artist and the work he does is something you can feel confident leaving the salon with."
                  </p>
                  <footer
                    className="mt-3"
                    style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)" }}
                  >
                    — GOOGLE REVIEW
                  </footer>
                </blockquote>
              </FadeUp>
              <FadeUp delay={500}>
                <a
                  href={BUSINESS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center gap-2 inline-flex"
                >
                  Book with Kei <ArrowRight size={14} />
                </a>
              </FadeUp>
            </div>
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

      {/* Values */}
      <section className="py-24 md:py-32" style={{ background: "var(--beige)" }}>
        <div className="container">
          <FadeUp className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">What We Stand For</span>
              <div className="gold-rule" />
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              Our <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Philosophy</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {VALUES.map((v, i) => (
              <FadeUp key={v.title} delay={i * 100}>
                <div
                  className="p-8"
                  style={{ background: "white", border: "1px solid rgba(201,169,110,0.15)" }}
                >
                  <div
                    className="mb-4"
                    style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "var(--gold)", opacity: 0.6 }}
                  >
                    {v.icon}
                  </div>
                  <h3
                    className="mb-3"
                    style={{ fontFamily: "var(--font-heading)", fontSize: "1.3rem", fontWeight: 400, color: "var(--charcoal)" }}
                  >
                    {v.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                  >
                    {v.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">Our Journey</span>
            </div>
            <h2 className="text-section-title" style={{ color: "var(--charcoal)" }}>
              The <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Story So Far</em>
            </h2>
          </FadeUp>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: "rgba(201,169,110,0.2)", transform: "translateX(-50%)" }}
            />

            <div className="space-y-12">
              {TIMELINE.map((item, i) => (
                <FadeUp key={item.year} delay={i * 100}>
                  <div className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                    {/* Year dot */}
                    <div
                      className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-2"
                      style={{ background: "var(--gold)" }}
                    />

                    <div className={`md:w-1/2 pl-8 md:pl-0 ${i % 2 === 0 ? "md:pr-16" : "md:pl-16"}`}>
                      <div
                        className="p-6"
                        style={{ background: "white", border: "1px solid rgba(201,169,110,0.15)" }}
                      >
                        <div
                          className="mb-2"
                          style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}
                        >
                          {item.year}
                        </div>
                        <h3
                          className="mb-2"
                          style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 400, color: "var(--charcoal)" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                        >
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-1/2" />
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Press */}
      <section className="py-24 md:py-32" style={{ background: "var(--charcoal)" }}>
        <div className="container">
          <FadeUp className="mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="gold-rule" />
              <span className="section-label">Recognition</span>
              <div className="gold-rule" />
            </div>
            <h2 className="text-section-title" style={{ color: "rgba(249,246,240,0.95)" }}>
              Awards & <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Press</em>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { title: "Best Salon in NYC", source: "Hairdressr.com", year: "2023", icon: Award },
              { title: "Top Hair Salon", source: "Best Pros In Town", year: "2023", icon: Star },
              { title: "Featured Salon", source: "Hair.com", year: "2024", icon: Award },
            ].map((award, i) => (
              <FadeUp key={award.title} delay={i * 100}>
                <div
                  className="p-8 text-center"
                  style={{ border: "1px solid rgba(201,169,110,0.2)" }}
                >
                  <award.icon size={24} style={{ color: "var(--gold)", margin: "0 auto 1rem" }} />
                  <div
                    style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 400, color: "rgba(249,246,240,0.9)", marginBottom: "0.5rem" }}
                  >
                    {award.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                    {award.source.toUpperCase()} · {award.year}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={300}>
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "2rem" }}>
              <div
                className="text-center mb-8"
                style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.25em", color: "rgba(249,246,240,0.3)" }}
              >
                AS SEEN IN
              </div>
              <div className="flex flex-wrap items-center justify-center gap-10">
                {["Refinery29", "Hair.com", "Hairdressr.com", "Fox34 News", "ABC6 News", "Shukan NY Seikatsu"].map((press) => (
                  <span
                    key={press}
                    style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "rgba(249,246,240,0.4)" }}
                  >
                    {press.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeUp>
              <div className="flex items-center gap-4 mb-6">
                <div className="gold-rule" />
                <span className="section-label">Find Us</span>
              </div>
              <h2 className="text-section-title mb-6" style={{ color: "var(--charcoal)" }}>
                East Village,<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>New York City</em>
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  { label: "Address", value: "204 E 6th Street, New York, NY 10003" },
                  { label: "Phone", value: "(212) 254-8174" },
                  { label: "Email", value: "info@threedegreesnyc.com" },
                  { label: "Hours", value: "Mon – Sun: 9:00 AM – 7:00 PM" },
                ].map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span
                      style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", minWidth: "80px", paddingTop: "2px" }}
                    >
                      {item.label.toUpperCase()}
                    </span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal-light)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={BUSINESS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold flex items-center gap-2"
                >
                  Reserve Your Chair <ArrowRight size={14} />
                </a>
                <a
                  href={BUSINESS.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark flex items-center gap-2"
                >
                  <MapPin size={14} /> Get Directions
                </a>
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div
                className="overflow-hidden"
                style={{ aspectRatio: "4/3", background: "var(--beige)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.5!2d-73.9868!3d40.7264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2599b6e3b0c7f%3A0x1a4e5a3e2b1c0d5e!2s204%20E%206th%20St%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "grayscale(30%) contrast(1.1)" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Three Degrees Salon Location"
                />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
