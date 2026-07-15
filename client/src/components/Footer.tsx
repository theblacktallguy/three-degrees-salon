import { Link } from "wouter";
import { Instagram, Facebook, MapPin, Phone, Mail, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--charcoal)",
        color: "rgba(249,246,240,0.7)",
        fontFamily: "var(--font-body)",
      }}
    >
      {/* Main Footer */}
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/manus-storage/logo-icon.png"
                alt="Three Degrees Salon"
                className="w-10 h-10 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    color: "rgba(249,246,240,0.9)",
                    fontWeight: 600,
                  }}
                >
                  THREE DEGREES
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.2em",
                    color: "var(--gold)",
                  }}
                >
                  SALON · NEW YORK
                </div>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(249,246,240,0.5)", maxWidth: "240px" }}
            >
              Japanese-concept luxury hair salon in East Village, NYC. Where your hair finds its style.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                style={{ borderColor: "rgba(249,246,240,0.2)", color: "rgba(249,246,240,0.5)" }}
              >
                <Instagram size={15} />
              </a>
              <a
                href={BUSINESS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                style={{ borderColor: "rgba(249,246,240,0.2)", color: "rgba(249,246,240,0.5)" }}
              >
                <Facebook size={15} />
              </a>
              <a
                href={BUSINESS.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)]"
                style={{ borderColor: "rgba(249,246,240,0.2)", color: "rgba(249,246,240,0.5)" }}
              >
                <MapPin size={15} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--gold)",
                fontWeight: 600,
              }}
            >
              NAVIGATE
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/services", label: "Services & Pricing" },
                { href: "/team", label: "Meet the Team" },
                { href: "/gallery", label: "Gallery" },
                { href: "/testimonials", label: "Reviews" },
                { href: "/blog", label: "Hair Care Blog" },
                { href: "/faq", label: "FAQ" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm transition-colors duration-200 hover:text-[var(--gold)] cursor-pointer"
                      style={{ color: "rgba(249,246,240,0.5)", fontFamily: "var(--font-body)" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--gold)",
                fontWeight: 600,
              }}
            >
              SERVICES
            </h4>
            <ul className="space-y-3">
              {["Haircut", "Color", "Balayage", "Highlights", "Digital Perm", "Cold Perm", "Japanese Straightening", "Keratin Treatment", "Bridal Styling", "Treatments"].map((s) => (
                <li key={s}>
                  <Link href="/services">
                    <span
                      className="text-sm transition-colors duration-200 hover:text-[var(--gold)] cursor-pointer"
                      style={{ color: "rgba(249,246,240,0.5)", fontFamily: "var(--font-body)" }}
                    >
                      {s}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="mb-6"
              style={{
                fontFamily: "var(--font-label)",
                fontSize: "0.65rem",
                letterSpacing: "0.25em",
                color: "var(--gold)",
                fontWeight: 600,
              }}
            >
              VISIT US
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <div className="text-sm" style={{ color: "rgba(249,246,240,0.7)" }}>204 E 6th Street</div>
                  <div className="text-sm" style={{ color: "rgba(249,246,240,0.7)" }}>New York, NY 10003</div>
                  <div className="text-xs mt-1" style={{ color: "rgba(249,246,240,0.4)" }}>East Village</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <a
                  href={`tel:${BUSINESS.phone}`}
                  className="text-sm transition-colors hover:text-[var(--gold)]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                >
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={14} className="flex-shrink-0" style={{ color: "var(--gold)" }} />
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="text-sm transition-colors hover:text-[var(--gold)]"
                  style={{ color: "rgba(249,246,240,0.7)" }}
                >
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={14} className="mt-0.5 flex-shrink-0" style={{ color: "var(--gold)" }} />
                <div>
                  <div className="text-sm" style={{ color: "rgba(249,246,240,0.7)" }}>Mon – Sun</div>
                  <div className="text-sm" style={{ color: "rgba(249,246,240,0.7)" }}>9:00 AM – 7:00 PM</div>
                </div>
              </li>
            </ul>

            <a
              href={BUSINESS.booking}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-8 inline-block text-center"
              style={{ padding: "0.75rem 2rem", fontSize: "0.65rem" }}
            >
              Book Appointment
            </a>
          </div>
        </div>
      </div>

      {/* Gold divider */}
      <div style={{ height: "1px", background: "rgba(201,169,110,0.15)" }} />

      {/* Bottom bar */}
      <div className="container py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(249,246,240,0.3)", fontFamily: "var(--font-label)", letterSpacing: "0.1em" }}
          >
            © {new Date().getFullYear()} THREE DEGREES SALON. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--gold)", fontFamily: "var(--font-label)", letterSpacing: "0.1em", fontSize: "0.6rem" }}>
              ★★★★★
            </span>
            <span className="text-xs" style={{ color: "rgba(249,246,240,0.3)", fontFamily: "var(--font-label)", letterSpacing: "0.1em" }}>
              4.9 · 384+ REVIEWS · ASIAN-OWNED
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
