# THREE DEGREES SALON — Design Philosophy

## Three Approaches Considered

### Approach A — "Tokyo Noir"
Dark, cinematic, editorial. Deep charcoal and black with champagne gold accents. Inspired by high-end Japanese barbershops and Aesop retail stores.
**Probability: 0.07**

### Approach B — "Warm Minimalism" *(CHOSEN)*
Warm ivory, charcoal, and champagne gold. Japanese wabi-sabi meets New York editorial. Inspired by Bottega Veneta, Aesop, and Kinfolk magazine.
**Probability: 0.06**

### Approach C — "Architectural White"
Ultra-clean white with stark black typography and rose gold accents. Swiss grid system meets Parisian salon.
**Probability: 0.04**

---

## CHOSEN APPROACH: Warm Minimalism

### Design Movement
Japanese Wabi-Sabi meets New York Editorial — the beauty of imperfection, texture, and quiet luxury. References: Aesop, Bottega Veneta, Kinfolk, Comme des Garçons.

### Core Principles
1. **Restraint as luxury** — every element earns its place; nothing decorative without purpose
2. **Warmth over coldness** — ivory and warm whites instead of pure white; charcoal instead of pure black
3. **Typography as architecture** — large, confident headings that command space; generous tracking
4. **Motion as breath** — animations feel organic, never mechanical; like hair flowing in wind

### Color Philosophy
- **Background:** Warm ivory `#F9F6F0` — the color of fine Japanese washi paper
- **Primary text:** Deep charcoal `#1A1A18` — ink on paper
- **Gold accent:** Champagne gold `#C9A96E` — the warmth of candlelight
- **Rose gold accent:** `#B8836F` — muted, sophisticated, not garish
- **Muted bronze:** `#8B6914` — for depth and warmth
- **Soft beige:** `#E8DDD0` — section backgrounds, cards
- **White glass:** `rgba(255,255,255,0.85)` — glassmorphism elements
- Emotion: Trust, warmth, artistry, quiet confidence

### Layout Paradigm
- Asymmetric editorial layouts — text and imagery offset, never perfectly centered
- Full-bleed sections alternating with generous whitespace
- Horizontal scrolling galleries for work portfolios
- Staggered grid for team and testimonials
- Sticky navigation that transforms on scroll

### Signature Elements
1. **Hair strand motif** — thin curved SVG lines that flow through sections, referencing hair texture
2. **Gold rule lines** — thin 1px champagne gold horizontal dividers between sections
3. **Oversized numerals** — large muted numbers (01, 02, 03) as section markers

### Interaction Philosophy
- Cursor transforms into a custom gold circle on interactive elements
- Cards lift with subtle shadow on hover (3D perspective tilt)
- Text reveals character-by-character on scroll entry
- Image reveals with a sweeping gold curtain wipe
- Smooth Lenis scroll with parallax depth

### Animation
- **Entry:** Elements fade up from 20px below, opacity 0→1, duration 600ms, ease-out cubic
- **Stagger:** 80ms between sibling elements
- **Hover cards:** 3D perspective tilt (rotateX/Y ±5deg), scale 1.02, shadow deepens
- **Text reveal:** Clip-path from bottom, words cascade in 40ms intervals
- **Page transitions:** Fade through warm ivory overlay, 400ms
- **Three.js:** Floating golden particles in hero; subtle hair-strand particle system
- **Parallax:** Hero image moves at 0.4x scroll speed; background elements at 0.6x

### Typography System
- **Display/Hero:** Cormorant Garamond — ultra-thin to bold, high contrast, editorial
- **Headings:** Playfair Display — classic, authoritative, fashionable
- **Body:** DM Sans — clean, modern, highly readable at small sizes
- **Accent/Labels:** Montserrat — uppercase tracking for categories and labels
- **Size scale:** 96px hero → 64px h1 → 48px h2 → 32px h3 → 18px body → 12px label

### Brand Essence
**Three Degrees Salon** — NYC's Japanese-concept luxury hair studio, where Tokyo precision meets East Village soul. For the style-conscious who refuse to compromise.
Personality: **Precise. Warm. Artful.**

### Brand Voice
Headlines are quiet and confident — no exclamation marks, no hype.
CTAs are invitations, not commands.
Example lines:
- "Where your hair finds its style."
- "Book your transformation."
- "Crafted in East Village. Inspired by Tokyo."

### Wordmark & Logo
Geometric scissors icon — two blades forming a subtle "3" shape, in champagne gold on transparent background. Clean, modern, unmistakably a salon.

### Signature Brand Color
**Champagne Gold `#C9A96E`** — warm, refined, unmistakably Three Degrees.

---

## Style Decisions
- Use Cormorant Garamond for all hero/display text
- Use DM Sans for all body copy
- Use Montserrat uppercase for all labels, nav items, and categories
- Gold accent lines: 1px solid `#C9A96E`, opacity 0.4
- Card backgrounds: `rgba(255,255,255,0.7)` with `backdrop-filter: blur(20px)`
- Section padding: 120px vertical on desktop, 60px on mobile
- Border radius: minimal — 4px max, prefer sharp corners for luxury feel
- No purple gradients, no rounded pill buttons, no Inter font
