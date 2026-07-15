import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { X, ZoomIn, Instagram } from "lucide-react";
import { GALLERY_IMAGES, GALLERY_CATEGORIES, BUSINESS } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<typeof GALLERY_IMAGES[0] | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  const filtered = activeCategory === "All"
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (img: typeof GALLERY_IMAGES[0]) => {
    const idx = filtered.findIndex(i => i.id === img.id);
    setLightboxIdx(idx);
    setLightboxImg(img);
  };

  const navigate = (dir: number) => {
    const newIdx = (lightboxIdx + dir + filtered.length) % filtered.length;
    setLightboxIdx(newIdx);
    setLightboxImg(filtered[newIdx]);
  };

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="absolute inset-0 opacity-20">
          <img src="/manus-storage/hero-color.png" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Our Work</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              The<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Gallery</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              A curated collection of cuts, colors, perms, and transformations by our team of expert stylists.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Hair strand accent */}
      <div className="relative h-10 overflow-hidden pointer-events-none" style={{ background: "var(--ivory)" }}>
        <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
          <path d="M0 20 Q360 4 720 20 Q1080 36 1440 20" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Gallery */}
      <section className="py-16 md:py-24" style={{ background: "var(--ivory)" }}>
        <div className="container">
          {/* Filter */}
          <FadeUp className="mb-10">
            <div className="flex flex-wrap gap-2">
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-5 py-2 transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    background: activeCategory === cat ? "var(--charcoal)" : "transparent",
                    color: activeCategory === cat ? "var(--ivory)" : "var(--charcoal-light)",
                    border: `1px solid ${activeCategory === cat ? "var(--charcoal)" : "rgba(26,26,24,0.15)"}`,
                  }}
                >
                  {cat.toUpperCase()}
                  <span className="ml-2 opacity-50">
                    {cat === "All" ? GALLERY_IMAGES.length : GALLERY_IMAGES.filter(i => i.category === cat).length}
                  </span>
                </button>
              ))}
            </div>
          </FadeUp>

          {/* Masonry Grid */}
          <div
            style={{
              columns: "3",
              columnGap: "0.75rem",
            }}
            className="gallery-masonry"
          >
            {filtered.map((img, i) => (
              <div
                key={img.id}
                className="group cursor-pointer overflow-hidden relative mb-3"
                style={{
                  breakInside: "avoid",
                  opacity: 0,
                  animation: `fadeInUp 600ms cubic-bezier(0.16,1,0.3,1) ${(i % 12) * 50}ms forwards`,
                }}
                onClick={() => openLightbox(img)}
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(26,26,24,0.5)" }}
                >
                  <ZoomIn size={24} color="white" />
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(26,26,24,0.8), transparent)" }}
                >
                  <div style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                    {img.category.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "rgba(249,246,240,0.9)" }}>
                    {img.alt}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instagram CTA */}
          <FadeUp className="mt-16 text-center">
            <div style={{ borderTop: "1px solid rgba(201,169,110,0.2)", paddingTop: "3rem" }}>
              <p style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--charcoal-light)", marginBottom: "1rem" }}>
                SEE MORE OF OUR WORK
              </p>
              <a
                href={BUSINESS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-dark flex items-center gap-2 inline-flex mx-auto"
              >
                <Instagram size={14} />
                Follow @threedegreessalon
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(26,26,24,0.97)", backdropFilter: "blur(10px)" }}
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 z-10"
            onClick={() => setLightboxImg(null)}
            style={{ color: "rgba(249,246,240,0.6)" }}
          >
            <X size={28} />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            style={{ color: "rgba(249,246,240,0.6)", fontSize: "2rem", fontFamily: "var(--font-display)" }}
          >
            ‹
          </button>

          <div
            className="max-w-4xl max-h-[85vh] mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImg.url}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[75vh] object-contain"
            />
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", color: "rgba(249,246,240,0.9)" }}>
                  {lightboxImg.alt}
                </div>
                <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", marginTop: "4px" }}>
                  {lightboxImg.category.toUpperCase()} · BY {lightboxImg.stylist.toUpperCase()}
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "rgba(249,246,240,0.3)" }}>
                {lightboxIdx + 1} / {filtered.length}
              </div>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 z-10 transition-colors"
            onClick={(e) => { e.stopPropagation(); navigate(1); }}
            style={{ color: "rgba(249,246,240,0.6)", fontSize: "2rem", fontFamily: "var(--font-display)" }}
          >
            ›
          </button>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .gallery-masonry { columns: 2 !important; }
        }
        @media (max-width: 480px) {
          .gallery-masonry { columns: 1 !important; }
        }
      `}</style>
    </main>
  );
}
