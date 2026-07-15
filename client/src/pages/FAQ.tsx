import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { FAQS, BUSINESS } from "@/lib/data";
import { Link } from "wouter";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: "1px solid rgba(201,169,110,0.15)" }}>
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={onToggle}
      >
        <span style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.4, paddingRight: "1rem" }}>
          {q}
        </span>
        <div
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center transition-all duration-300"
          style={{ background: isOpen ? "var(--gold)" : "transparent", border: `1px solid ${isOpen ? "var(--gold)" : "rgba(201,169,110,0.3)"}` }}
        >
          {isOpen
            ? <Minus size={12} color="white" />
            : <Plus size={12} style={{ color: "var(--gold)" }} />
          }
        </div>
      </button>
      <div
        style={{
          maxHeight: isOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 400ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <p
          className="pb-5 text-sm leading-relaxed"
          style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}
        >
          {a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Need Help?</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              Frequently Asked<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Questions</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Everything you need to know before your appointment. Can't find your answer? Email us at info@threedegreesnyc.com.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {FAQS.map((category, ci) => (
              <FadeUp key={category.category} delay={ci * 100} className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="gold-rule" />
                  <span className="section-label">{category.category}</span>
                </div>
                <div>
                  {category.questions.map((item, qi) => {
                    const key = `${ci}-${qi}`;
                    return (
                      <AccordionItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions */}
      <section className="py-20" style={{ background: "var(--charcoal)" }}>
        <div className="container text-center">
          <FadeUp>
            <h2 className="text-section-title mb-4" style={{ color: "rgba(249,246,240,0.95)" }}>
              Still Have <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Questions?</em>
            </h2>
            <p className="mb-8 max-w-md mx-auto" style={{ color: "rgba(249,246,240,0.5)", fontFamily: "var(--font-body)", fontWeight: 300 }}>
              Our team is happy to help. Reach out by email or phone and we'll get back to you promptly.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href={`mailto:${BUSINESS.email}`} className="btn-gold flex items-center gap-2">
                Email Us <ArrowRight size={14} />
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
