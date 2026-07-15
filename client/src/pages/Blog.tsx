import { useInView } from "react-intersection-observer";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BLOG_POSTS } from "@/lib/data";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(30px)", transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Blog() {
  const featured = BLOG_POSTS[0];
  const rest = BLOG_POSTS.slice(1);

  return (
    <main style={{ paddingTop: "80px" }}>
      {/* Hero */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ background: "var(--charcoal)" }}>
        <div className="container relative z-10">
          <FadeUp>
            <div className="flex items-center gap-4 mb-6">
              <div className="gold-rule" />
              <span className="section-label">Hair Care Knowledge</span>
            </div>
          </FadeUp>
          <FadeUp delay={100}>
            <h1 className="text-display mb-6" style={{ color: "rgba(249,246,240,0.95)", maxWidth: "600px" }}>
              The<br /><em style={{ fontStyle: "italic", color: "var(--gold)" }}>Journal</em>
            </h1>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="text-lg max-w-xl" style={{ color: "rgba(249,246,240,0.55)", fontFamily: "var(--font-body)", fontWeight: 300, lineHeight: 1.7 }}>
              Expert guides, trend spotlights, and hair care advice from our team of internationally trained stylists.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp>
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="grid grid-cols-1 lg:grid-cols-2 gap-0 group"
              style={{ border: "1px solid rgba(201,169,110,0.2)", overflow: "hidden" }}
            >
              <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center" style={{ background: "var(--beige)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="px-3 py-1"
                    style={{ background: "var(--gold)", color: "white", fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.15em" }}
                  >
                    FEATURED
                  </span>
                  <span style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.1em", color: "var(--gold)" }}>
                    {featured.category.toUpperCase()}
                  </span>
                </div>
                <h2
                  style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "1rem" }}
                >
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9rem", color: "var(--charcoal-light)", fontWeight: 300, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                  {featured.excerpt}
                </p>
                <div className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300" style={{ fontFamily: "var(--font-label)", fontSize: "0.65rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                  <span>READ ARTICLE</span>
                  <ExternalLink size={12} />
                </div>
              </div>
            </a>
          </FadeUp>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24" style={{ background: "var(--ivory)" }}>
        <div className="container">
          <FadeUp className="mb-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="gold-rule" />
              <span className="section-label">All Articles</span>
            </div>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post, i) => (
              <FadeUp key={post.id} delay={i * 80}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card group block"
                  style={{ border: "1px solid rgba(201,169,110,0.15)", overflow: "hidden" }}
                >
                  <div className="overflow-hidden" style={{ aspectRatio: "16/9" }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="blog-card-img w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.15em", color: "var(--gold)" }}>
                        {post.category.toUpperCase()}
                      </span>
                      <span style={{ color: "rgba(201,169,110,0.4)", fontSize: "0.7rem" }}>·</span>
                      <span style={{ fontFamily: "var(--font-label)", fontSize: "0.55rem", letterSpacing: "0.1em", color: "var(--charcoal-light)", opacity: 0.5 }}>
                        {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <h3
                      style={{ fontFamily: "var(--font-heading)", fontSize: "1.1rem", fontWeight: 400, color: "var(--charcoal)", lineHeight: 1.3, marginBottom: "0.75rem" }}
                    >
                      {post.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ color: "var(--charcoal-light)", fontFamily: "var(--font-body)", fontWeight: 300 }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      className="flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                      style={{ fontFamily: "var(--font-label)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)" }}
                    >
                      <span>READ MORE</span>
                      <ExternalLink size={11} />
                    </div>
                  </div>
                </a>
              </FadeUp>
            ))}
          </div>

          <FadeUp className="mt-16 text-center">
            <a
              href="https://threedegreesnyc.com/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-dark flex items-center gap-2 inline-flex mx-auto"
            >
              View All Articles on Our Blog <ExternalLink size={14} />
            </a>
          </FadeUp>
        </div>
      </section>
    </main>
  );
}
