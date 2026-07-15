import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, ArrowRight, Send } from "lucide-react";
import { BUSINESS } from "@/lib/data";
import { toast } from "sonner";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    // Compose mailto link
    const subject = encodeURIComponent(`Inquiry from ${form.name}${form.service ? ` — ${form.service}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "N/A"}\nService Interest: ${form.service || "N/A"}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:info@threedegreesnyc.com?subject=${subject}&body=${body}`, "_blank");
    setTimeout(() => {
      setSending(false);
      toast.success("Your email client has been opened. Please send the email to complete your inquiry.");
      setForm({ name: "", email: "", phone: "", service: "", message: "" });
    }, 500);
  };

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="absolute inset-0 opacity-15">
          <img src="/manus-storage/salon-interior.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Reach Out</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              Get in<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Touch</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Questions about services, pricing, or a special event? We'd love to hear from you.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24 md:py-32" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <FadeUp>
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-rule" />
                <span className="section-label">Contact Information</span>
              </div>

              <div className="space-y-6 mb-10">
                {[
                  { icon: MapPin, label: "Address", value: "204 E 6th Street, New York, NY 10003", href: BUSINESS.googleMaps, note: "East Village, Manhattan" },
                  { icon: Phone, label: "Phone", value: "(212) 254-8174", href: `tel:${BUSINESS.phone}`, note: null },
                  { icon: Mail, label: "Email", value: "info@threedegreesnyc.com", href: `mailto:${BUSINESS.email}`, note: "For consultations & special events" },
                  { icon: Clock, label: "Hours", value: "Mon – Sun: 9:00 AM – 7:00 PM", href: null, note: "Open 7 days a week" },
                ].map(({ icon: Icon, label, value, href, note }) => (
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
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="hover:text-[var(--gold)] transition-colors"
                          style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)" }}
                        >
                          {value}
                        </a>
                      ) : (
                        <span style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal)" }}>{value}</span>
                      )}
                      {note && (
                        <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--charcoal-light)", opacity: 0.6, marginTop: "2px" }}>
                          {note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div style={{ borderTop: "1px solid rgba(201,169,110,0.15)", paddingTop: "2rem" }}>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "1rem" }}>
                  FOLLOW US
                </div>
                <div className="flex gap-4">
                  <a
                    href={BUSINESS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                    style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--charcoal)" }}
                  >
                    <Instagram size={16} />
                    @threedegreessalon
                  </a>
                  <a
                    href={BUSINESS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors hover:text-[var(--gold)]"
                    style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--charcoal)" }}
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>
                </div>
              </div>

              {/* Map */}
              <div className="mt-10 overflow-hidden" style={{ aspectRatio: "16/9", border: "1px solid rgba(201,169,110,0.15)" }}>
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

            {/* Contact Form */}
            <FadeUp delay={200}>
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-rule" />
                <span className="section-label">Send a Message</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "0.5rem" }}>
                      NAME *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                      placeholder="Your name"
                      className="luxury-input"
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "0.5rem" }}>
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="your@email.com"
                      className="luxury-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "0.5rem" }}>
                      PHONE
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                      placeholder="(optional)"
                      className="luxury-input"
                    />
                  </div>
                  <div>
                    <label style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "0.5rem" }}>
                      SERVICE INTEREST
                    </label>
                    <input
                      type="text"
                      value={form.service}
                      onChange={e => setForm(p => ({ ...p, service: e.target.value }))}
                      placeholder="e.g. Digital Perm, Balayage"
                      className="luxury-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "0.5rem" }}>
                    MESSAGE *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="Tell us about your hair goals, questions, or special requests..."
                    rows={5}
                    className="luxury-input resize-none"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-gold flex items-center gap-2"
                  >
                    {sending ? "Opening Email..." : "Send Message"}
                    <Send size={14} />
                  </button>
                  <a
                    href={BUSINESS.booking}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark flex items-center gap-2"
                  >
                    Book Online <ArrowRight size={14} />
                  </a>
                </div>

                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--charcoal-light)", opacity: 0.6 }}>
                  * This form opens your email client to send a message to info@threedegreesnyc.com. For immediate bookings, use our online booking system.
                </p>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>
    </main>
  );
}
