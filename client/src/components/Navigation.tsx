import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { BUSINESS } from "@/lib/data";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isHome = location === "/";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || !isHome
            ? "rgba(249, 246, 240, 0.95)"
            : "transparent",
          backdropFilter: scrolled || !isHome ? "blur(20px)" : "none",
          borderBottom: scrolled || !isHome
            ? "1px solid rgba(201, 169, 110, 0.15)"
            : "none",
          boxShadow: scrolled || !isHome
            ? "0 4px 24px rgba(26, 26, 24, 0.06)"
            : "none",
        }}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/">
              <div className="flex items-center gap-3 group">
                <img
                  src="/manus-storage/logo-icon.png"
                  alt="Three Degrees Salon"
                  className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div>
                  <div
                    className="font-semibold tracking-widest uppercase text-xs"
                    style={{
                      fontFamily: "var(--font-label)",
                      color: scrolled || !isHome ? "var(--charcoal)" : "white",
                      fontSize: "0.65rem",
                      letterSpacing: "0.25em",
                    }}
                  >
                    Three Degrees
                  </div>
                  <div
                    className="text-xs tracking-widest"
                    style={{
                      fontFamily: "var(--font-label)",
                      color: scrolled || !isHome ? "var(--gold)" : "rgba(201,169,110,0.9)",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                    }}
                  >
                    SALON · NEW YORK
                  </div>
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="nav-link"
                    style={{
                      color: scrolled || !isHome
                        ? location === link.href ? "var(--gold)" : "var(--charcoal)"
                        : location === link.href ? "var(--gold)" : "rgba(255,255,255,0.85)",
                    }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Book CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href={BUSINESS.booking}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold text-xs"
                style={{ padding: "0.6rem 1.5rem" }}
              >
                Book Now
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              style={{ color: scrolled || !isHome ? "var(--charcoal)" : "white" }}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <button
          className="absolute top-5 right-5 p-2"
          onClick={() => setMenuOpen(false)}
          style={{ color: "var(--charcoal)" }}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-3 mb-4">
            <img
              src="/manus-storage/logo-icon.png"
              alt="Three Degrees Salon"
              className="w-10 h-10 object-contain"
            />
            <div>
              <div
                className="font-semibold tracking-widest uppercase"
                style={{ fontFamily: "var(--font-label)", fontSize: "0.7rem", letterSpacing: "0.25em", color: "var(--charcoal)" }}
              >
                Three Degrees
              </div>
              <div
                style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold)" }}
              >
                SALON · NEW YORK
              </div>
            </div>
          </div>

          {NAV_LINKS.map((link, i) => (
            <Link key={link.href} href={link.href}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
                  fontWeight: 300,
                  letterSpacing: "-0.02em",
                  color: location === link.href ? "var(--gold)" : "var(--charcoal)",
                  transition: "color 200ms",
                  animationDelay: `${i * 50}ms`,
                }}
              >
                {link.label}
              </span>
            </Link>
          ))}

          <a
            href={BUSINESS.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold mt-4"
          >
            Book Appointment
          </a>

          <div
            className="mt-4 text-center"
            style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--charcoal-light)" }}
          >
            <div>{BUSINESS.address}</div>
            <div className="mt-1">{BUSINESS.phone}</div>
          </div>
        </div>
      </div>
    </>
  );
}
