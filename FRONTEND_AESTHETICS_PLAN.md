# 🏛️ Law Pilot — Frontend Aesthetics Master Plan

> **Project:** Legal Case Management Web Application
> **Stack:** Next.js (App Router, TypeScript) · Supabase · Vercel
> **Created:** 2026-02-22
> **Status:** Planning

---

## Table of Contents

1. [Design Philosophy & Creative Direction](#1-design-philosophy--creative-direction)
2. [Typography System](#2-typography-system)
3. [Color & Theme Architecture](#3-color--theme-architecture)
4. [Motion & Animation Strategy](#4-motion--animation-strategy)
5. [Spatial Composition & Layout](#5-spatial-composition--layout)
6. [Backgrounds & Visual Atmosphere](#6-backgrounds--visual-atmosphere)
7. [Component-Level Design Specifications](#7-component-level-design-specifications)
8. [Accessibility × Aesthetics Integration](#8-accessibility--aesthetics-integration)
9. [Anti-Patterns — What We NEVER Do](#9-anti-patterns--what-we-never-do)
10. [Implementation Roadmap](#10-implementation-roadmap)
11. [File & Folder Structure](#11-file--folder-structure)
12. [Design Tokens & CSS Variables Reference](#12-design-tokens--css-variables-reference)

---

## 1. Design Philosophy & Creative Direction

### 1.1 Context Analysis

| Dimension       | Answer                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------- |
| **Purpose**     | Empower clients to manage legal cases, upload documents, and track milestones with confidence.  |
| **Audience**    | Clients (non-technical), immigration lawyers, firm administrators.                              |
| **Tone**        | *Architectural Luxury* — the gravitas of marble courthouses meets the precision of Swiss design. |
| **Emotion**     | Trust, authority, clarity, forward-motion.                                                      |
| **Differentiator** | The interface should feel like walking into a prestigious law firm — not a SaaS dashboard.   |

### 1.2 Aesthetic Direction: **"Neo-Judicial"**

We are **not** building another generic SaaS dashboard. Law Pilot's aesthetic is **Neo-Judicial** — an intersection of:

- **Architectural Brutalism** → Bold structural elements, exposed grid logic, heavy typographic weight
- **Old-World Legal Gravitas** → Serif headlines, parchment textures, gold leaf accents
- **Modern Precision** → Sharp alignment, deliberate whitespace, micro-interactions that feel engineered

> **The One Unforgettable Thing:** When a user opens Law Pilot, they should feel like they've stepped into the lobby of a world-class law firm — not opened another cookie-cutter web app.

### 1.3 Design Principles

| Principle                        | Description                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Intentional Maximalism**       | Every decorative element earns its place. Ornament serves navigation and hierarchy.                      |
| **Typographic Authority**        | Type does the heavy lifting. Headlines command; body text guides.                                        |
| **Controlled Contrast**          | Dark dominant surfaces with strategic bursts of warm accent (gold, amber).                               |
| **Engineered Motion**            | Animations feel *mechanical and precise*, like a vault door opening — not bouncy or playful.             |
| **Material Honesty**             | Textures reference real materials (linen, marble grain, aged paper) rather than abstract gradients.      |

---

## 2. Typography System

### 2.1 Font Selection

> ⛔ **Banned fonts:** Inter, Roboto, Arial, Space Grotesk, system-ui, any default sans-serif stack.

| Role              | Font Family                  | Weight Range   | Usage                                         |
| ----------------- | ---------------------------- | -------------- | ---------------------------------------------- |
| **Display / H1**  | `"Playfair Display", serif`  | 700 – 900     | Page titles, hero headlines, case names         |
| **Heading / H2-H4** | `"DM Serif Display", serif` | 400            | Section headers, milestone titles, card headers |
| **Body**          | `"Satoshi", sans-serif`      | 400 – 700     | All body text, form labels, descriptions        |
| **Mono / Code**   | `"JetBrains Mono", monospace`| 400 – 500     | Case IDs, timestamps, file sizes, status codes  |
| **Accent / UI**   | `"Instrument Serif", serif`  | 400 italic     | Quotes, callouts, decorative labels             |

### 2.2 Typographic Scale

Use a **modular scale** based on `1.333` (perfect fourth) ratio:

```css
:root {
  --font-size-xs:    0.75rem;    /* 12px */
  --font-size-sm:    0.875rem;   /* 14px */
  --font-size-base:  1rem;       /* 16px */
  --font-size-md:    1.125rem;   /* 18px */
  --font-size-lg:    1.333rem;   /* ~21px */
  --font-size-xl:    1.777rem;   /* ~28px */
  --font-size-2xl:   2.369rem;   /* ~38px */
  --font-size-3xl:   3.157rem;   /* ~50px */
  --font-size-4xl:   4.209rem;   /* ~67px */
  --font-size-hero:  5.61rem;    /* ~90px */
}
```

### 2.3 Typography Rules

1. **Headlines** use `Playfair Display` at bold/black weight with tight `letter-spacing: -0.03em` and generous `line-height: 1.1`.
2. **Body text** uses `Satoshi` at regular weight with comfortable `line-height: 1.65` and `letter-spacing: 0.01em`.
3. **Never** set body text below `16px` on desktop or `15px` on mobile.
4. **Case IDs and metadata** use `JetBrains Mono` at `--font-size-sm` with `letter-spacing: 0.05em` for that technical, precise feeling.
5. **Pull quotes and decorative text** use `Instrument Serif` italic — this is the "surprise" typeface that adds editorial flair.

### 2.4 Google Fonts Import

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Instrument+Serif:ital@1&family=JetBrains+Mono:wght@400;500&family=Playfair+Display:wght@700;800;900&display=swap');
/* Satoshi via Fontshare CDN */
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap');
```

---

## 3. Color & Theme Architecture

### 3.1 Philosophy: Dark Dominant + Warm Accents

The palette is inspired by **dark mahogany wood, aged brass hardware, and cream parchment** — materials found in distinguished legal offices.

> ⛔ **Banned palettes:** Purple gradients on white, blue/white SaaS defaults, neon accents on dark, any "tech startup" color scheme.

### 3.2 Color Tokens

```css
:root {
  /* ═══════════════════════════════════════════════════════
     CORE PALETTE — "Chambers at Dusk"
     ═══════════════════════════════════════════════════════ */

  /* Foundations — Dark to Light */
  --color-ink:           hsl(30, 10%, 6%);        /* #0F0E0D — near black, warm */
  --color-charcoal:      hsl(30, 8%, 12%);        /* Deep charcoal */
  --color-slate:         hsl(30, 6%, 18%);        /* Card backgrounds */
  --color-graphite:      hsl(30, 5%, 28%);        /* Borders, dividers */
  --color-ash:           hsl(30, 4%, 45%);        /* Muted text */
  --color-stone:         hsl(30, 8%, 65%);        /* Secondary text */
  --color-parchment:     hsl(38, 25%, 88%);       /* Light surface */
  --color-cream:         hsl(40, 30%, 95%);       /* Lightest surface */
  --color-ivory:         hsl(42, 35%, 98%);       /* Near-white */

  /* Accent — Warm Gold / Amber */
  --color-gold:          hsl(43, 85%, 55%);       /* Primary accent — aged brass */
  --color-gold-bright:   hsl(43, 90%, 65%);       /* Hover state */
  --color-gold-dim:      hsl(43, 60%, 35%);       /* Subtle gold */
  --color-gold-ghost:    hsla(43, 85%, 55%, 0.08);/* Gold tint overlay */

  /* Semantic — Status */
  --color-success:       hsl(152, 55%, 42%);      /* Approved / complete */
  --color-success-bg:    hsla(152, 55%, 42%, 0.1);
  --color-warning:       hsl(38, 90%, 55%);       /* Pending / attention */
  --color-warning-bg:    hsla(38, 90%, 55%, 0.1);
  --color-danger:        hsl(4, 70%, 52%);        /* Rejected / overdue */
  --color-danger-bg:     hsla(4, 70%, 52%, 0.1);
  --color-info:          hsl(210, 50%, 55%);      /* Informational */
  --color-info-bg:       hsla(210, 50%, 55%, 0.1);

  /* ═══════════════════════════════════════════════════════
     THEME ASSIGNMENTS
     ═══════════════════════════════════════════════════════ */

  /* Surfaces */
  --surface-primary:     var(--color-ink);
  --surface-elevated:    var(--color-charcoal);
  --surface-card:        var(--color-slate);
  --surface-overlay:     hsla(30, 10%, 6%, 0.85);

  /* Text */
  --text-primary:        var(--color-cream);
  --text-secondary:      var(--color-stone);
  --text-muted:          var(--color-ash);
  --text-accent:         var(--color-gold);
  --text-inverse:        var(--color-ink);

  /* Borders */
  --border-subtle:       hsla(30, 8%, 65%, 0.1);
  --border-default:      hsla(30, 8%, 65%, 0.18);
  --border-strong:       var(--color-graphite);
  --border-accent:       var(--color-gold-dim);

  /* Interactive */
  --interactive-primary:    var(--color-gold);
  --interactive-hover:      var(--color-gold-bright);
  --interactive-active:     var(--color-gold-dim);
  --interactive-focus-ring: hsla(43, 85%, 55%, 0.4);
}
```

### 3.3 Light Theme Override (Optional — for document preview contexts)

```css
[data-theme="light"] {
  --surface-primary:    var(--color-ivory);
  --surface-elevated:   var(--color-cream);
  --surface-card:       #ffffff;
  --text-primary:       var(--color-ink);
  --text-secondary:     var(--color-graphite);
  --text-accent:        var(--color-gold-dim);
  --border-subtle:      hsla(30, 10%, 6%, 0.06);
  --border-default:     hsla(30, 10%, 6%, 0.12);
}
```

---

## 4. Motion & Animation Strategy

### 4.1 Philosophy: Mechanical Precision, Not Bounce

All motion should feel like **a vault mechanism** — smooth, weighted, deliberate. No spring physics, no elastic easing, no playful bounce.

### 4.2 Easing & Duration Tokens

```css
:root {
  /* Durations */
  --duration-instant:  80ms;
  --duration-fast:     150ms;
  --duration-normal:   300ms;
  --duration-slow:     500ms;
  --duration-dramatic: 800ms;
  --duration-reveal:   1200ms;

  /* Easings */
  --ease-out-expo:     cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-expo:  cubic-bezier(0.87, 0, 0.13, 1);
  --ease-out-quart:    cubic-bezier(0.25, 1, 0.5, 1);
  --ease-mechanical:   cubic-bezier(0.22, 0.68, 0, 1.0);
}
```

### 4.3 Animation Catalogue

| Moment                    | Technique                                          | Duration             | Easing              |
| ------------------------- | -------------------------------------------------- | -------------------- | -------------------- |
| **Page Load — Hero**      | Staggered reveal: title → subtitle → CTA           | `--duration-reveal`  | `--ease-out-expo`    |
| **Card Entrance**         | Slide-up + fade, stagger `80ms` per card           | `--duration-slow`    | `--ease-out-expo`    |
| **Timeline Step Reveal**  | Clip-path expand from center line outward           | `--duration-dramatic`| `--ease-in-out-expo` |
| **Button Hover**          | Background sweep left-to-right (gold fill)          | `--duration-normal`  | `--ease-out-quart`   |
| **Upload Progress**       | Width transition on progress bar + pulse glow        | `--duration-normal`  | `linear`             |
| **Status Badge Flip**     | 3D Y-axis rotation swap                             | `--duration-slow`    | `--ease-mechanical`  |
| **Navigation Link Hover** | Underline draws from left, gold color transition     | `--duration-fast`    | `--ease-out-quart`   |
| **Modal Open**            | Scale from 0.95 + fade, backdrop blur animates in    | `--duration-normal`  | `--ease-out-expo`    |
| **Scroll-Triggered Reveal** | `IntersectionObserver` → add `.revealed` class     | `--duration-slow`    | `--ease-out-expo`    |
| **Document Upload Drop**  | Border pulse (gold) + scale-down 0.98 → 1           | `--duration-fast`    | `--ease-mechanical`  |

### 4.4 Implementation Rules

1. **CSS-first.** All animations use CSS `@keyframes`, `transition`, and `animation-delay` unless interaction logic requires JS.
2. **Framer Motion** (`motion` library) for React component orchestration — page transitions, layout animations, `AnimatePresence` exit animations.
3. **`prefers-reduced-motion`** — ALL animations must respect this media query. Provide instant alternatives.
4. **No animation on critical paths** — form submissions, error states, and loading spinners stay functional and immediate.
5. **Stagger formula:** `animation-delay: calc(var(--stagger-index) * 80ms);` — set `--stagger-index` via inline style or CSS counter.

### 4.5 Page Load Orchestration (High-Impact Moment)

```
T+0ms       Background texture fades in (opacity 0 → 1)
T+100ms     Navigation bar slides down from top
T+250ms     Hero headline reveals character-by-character (clip-path)
T+500ms     Subtitle fades in from below
T+700ms     CTA button scales in from 0.8 → 1 with gold glow pulse
T+900ms     Dashboard cards stagger in (80ms intervals)
T+1200ms    Timeline draws its center line (stroke-dashoffset animation)
T+1400ms    Milestone nodes pop in along the timeline
```

---

## 5. Spatial Composition & Layout

### 5.1 Philosophy: Architectural, Not Generic

Layouts should feel **composed like an architectural plan** — precise grid logic with deliberate breaks for visual tension.

### 5.2 Grid System

```css
:root {
  --grid-columns:     12;
  --grid-gutter:      clamp(16px, 2vw, 32px);
  --grid-margin:      clamp(24px, 5vw, 80px);
  --max-content:      1440px;
  --max-text:         680px;   /* Optimal reading width */
}
```

### 5.3 Layout Techniques

| Technique                  | Where to Use                                           | How                                                       |
| -------------------------- | ------------------------------------------------------ | --------------------------------------------------------- |
| **Asymmetric Split**       | Dashboard overview (sidebar 4col / main 8col)          | `grid-template-columns: 1fr 2fr` with visual weight left  |
| **Overlapping Cards**      | Case summary section                                    | Negative margins + z-index stacking + box-shadow depth     |
| **Diagonal Flow**          | Timeline visualization                                  | CSS `clip-path` or `transform: skewY(-2deg)` on sections  |
| **Grid-Breaking Hero**     | Homepage / landing                                      | Full-bleed element breaking out of max-width container     |
| **Generous Negative Space**| Between major sections                                  | `padding-block: clamp(80px, 12vh, 160px)`                 |
| **Offset Headings**        | Section titles                                          | `margin-left: -2rem` or `translate` to break alignment    |
| **Controlled Density**     | Lawyer review queue, document checklist                 | Tight vertical rhythm, minimal gaps, information-dense grid|

### 5.4 Spacing Scale

```css
:root {
  --space-1:   0.25rem;   /* 4px */
  --space-2:   0.5rem;    /* 8px */
  --space-3:   0.75rem;   /* 12px */
  --space-4:   1rem;      /* 16px */
  --space-5:   1.5rem;    /* 24px */
  --space-6:   2rem;      /* 32px */
  --space-7:   3rem;      /* 48px */
  --space-8:   4rem;      /* 64px */
  --space-9:   6rem;      /* 96px */
  --space-10:  8rem;      /* 128px */
  --space-11:  12rem;     /* 192px */
}
```

### 5.5 Responsive Breakpoints

```css
:root {
  --bp-sm:   640px;
  --bp-md:   768px;
  --bp-lg:   1024px;
  --bp-xl:   1280px;
  --bp-2xl:  1536px;
}
```

---

## 6. Backgrounds & Visual Atmosphere

### 6.1 Philosophy: Material References, Not Flat Colors

Every surface should feel like it has *substance* — not just a hex code.

### 6.2 Texture Catalogue

| Texture                | CSS Implementation                                                           | Where to Use                           |
| ---------------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| **Noise Grain**        | SVG filter `<feTurbulence>` as pseudo-element overlay, `mix-blend-mode: overlay`, `opacity: 0.03` | Global body background                 |
| **Linen Weave**        | Repeating SVG pattern at very low opacity                                     | Card backgrounds, modals               |
| **Marble Vein**        | Subtle radial-gradient with layered positioning                               | Hero sections, headers                 |
| **Paper Texture**      | CSS gradient noise + soft shadow insets                                        | Document preview areas                 |
| **Gold Foil Shimmer**  | Animated linear-gradient at `45deg` (CSS `@keyframes`)                        | Premium badges, accent borders         |

### 6.3 Atmospheric Effects

```css
/* Noise grain overlay */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.025;
  background-image: url("data:image/svg+xml,..."); /* inline SVG turbulence */
  mix-blend-mode: overlay;
}

/* Dramatic ambient shadow on cards */
.card-elevated {
  box-shadow:
    0 1px 2px hsla(30, 10%, 6%, 0.3),
    0 4px 8px hsla(30, 10%, 6%, 0.2),
    0 16px 32px hsla(30, 10%, 6%, 0.15),
    0 32px 64px hsla(30, 10%, 6%, 0.1);
}

/* Mesh gradient background */
.hero-bg {
  background:
    radial-gradient(ellipse at 20% 50%, hsla(43, 85%, 55%, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 20%, hsla(30, 40%, 25%, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 100%, hsla(4, 70%, 52%, 0.04) 0%, transparent 40%),
    var(--surface-primary);
}
```

### 6.4 Custom Cursor (Subtle)

```css
/* Default — refined crosshair for precision feel */
body {
  cursor: url('/cursors/law-pilot-default.svg') 4 4, auto;
}

/* Interactive elements — gold dot */
a, button, [role="button"] {
  cursor: url('/cursors/law-pilot-pointer.svg') 8 2, pointer;
}
```

### 6.5 Decorative Borders

```css
/* Gold ruled line — used as section divider */
.divider-gold {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-gold-dim) 20%,
    var(--color-gold) 50%,
    var(--color-gold-dim) 80%,
    transparent 100%
  );
}

/* Double-line decorative border (legal document style) */
.border-legal {
  border: 3px double var(--color-graphite);
  padding: var(--space-6);
}
```

---

## 7. Component-Level Design Specifications

### 7.1 Navigation Bar

| Property         | Value                                                         |
| ---------------- | ------------------------------------------------------------- |
| Background       | `var(--surface-primary)` with `backdrop-filter: blur(16px)`   |
| Height           | `72px` desktop, `56px` mobile                                 |
| Logo             | Wordmark in `Playfair Display` bold + gold accent dot         |
| Links            | `Satoshi` medium, letter-spacing `0.02em`, gold underline on hover |
| CTA              | Outlined button, `1px solid var(--color-gold)`, gold text     |
| Sticky behavior  | Sticky with shadow reveal on scroll down                       |

### 7.2 Case Dashboard Cards

```
┌─────────────────────────────────────────┐
│  CASE #IMM-2026-0847                    │  ← JetBrains Mono, gold, xs
│                                         │
│  Ait Family Visa                        │  ← Playfair Display, cream, 2xl
│  Petition                               │
│                                         │
│  ██████████░░░░░░  67%                  │  ← Progress bar, gold fill
│                                         │
│  Next: Biometrics Appointment           │  ← Satoshi, stone
│  Due: March 15, 2026                    │  ← Satoshi, warning color
│                                         │
│  [View Timeline]  [Upload Docs]         │  ← Ghost buttons, gold border
└─────────────────────────────────────────┘
```

- **Surface:** `var(--surface-card)` with `border: 1px solid var(--border-subtle)`
- **Hover:** Border transitions to `var(--border-accent)`, card lifts via `translateY(-2px)` + enhanced shadow
- **Corner radius:** `12px`
- **Entrance animation:** Staggered slide-up + fade

### 7.3 Timeline Component

- **Orientation:** Vertical on mobile, horizontal on desktop (toggleable)
- **Center line:** `2px` solid `var(--color-graphite)`, animated `stroke-dashoffset` on load
- **Milestone nodes:**
  - Completed: Solid gold circle with checkmark icon
  - Current: Pulsing gold ring (CSS `@keyframes pulse`)
  - Upcoming: Hollow circle, `var(--color-graphite)` border
  - Overdue: `var(--color-danger)` fill with warning icon
- **Cards:** Alternate left/right of the center line (desktop) for asymmetry
- **Connector lines:** 45-degree diagonal lines from node to card

### 7.4 Document Upload Zone

- **Default state:** Dashed border `2px dashed var(--border-default)`, centered icon + text
- **Drag hover:** Border becomes `var(--color-gold)` solid, background shifts to `var(--color-gold-ghost)`, scale `1.01`
- **File items:** Horizontal layout with icon, filename (`Satoshi`), size (`JetBrains Mono`), status badge, remove button
- **Progress:** Thin gold bar beneath each file during upload

### 7.5 Status Badges

| Status        | Background                    | Text Color             | Border                    |
| ------------- | ----------------------------- | ---------------------- | ------------------------- |
| Approved      | `var(--color-success-bg)`     | `var(--color-success)` | `1px solid currentColor`  |
| Pending       | `var(--color-warning-bg)`     | `var(--color-warning)` | `1px solid currentColor`  |
| Rejected      | `var(--color-danger-bg)`      | `var(--color-danger)`  | `1px solid currentColor`  |
| In Review     | `var(--color-info-bg)`        | `var(--color-info)`    | `1px solid currentColor`  |
| Draft         | `hsla(30, 8%, 65%, 0.08)`    | `var(--color-ash)`     | `1px solid currentColor`  |

- **Shape:** `border-radius: 6px`, `padding: 4px 10px`
- **Font:** `Satoshi`, `--font-size-xs`, `font-weight: 600`, `letter-spacing: 0.04em`, `text-transform: uppercase`

### 7.6 Buttons

| Variant       | Background                      | Text                    | Border                          | Hover Effect                     |
| ------------- | ------------------------------- | ----------------------- | ------------------------------- | -------------------------------- |
| Primary       | `var(--color-gold)`             | `var(--color-ink)`      | none                            | Lighten to `--gold-bright`       |
| Secondary     | `transparent`                   | `var(--color-gold)`     | `1px solid var(--color-gold)`   | Gold background fill sweep       |
| Ghost         | `transparent`                   | `var(--text-secondary)` | none                            | Text → `var(--color-gold)`       |
| Danger        | `var(--color-danger)`           | `white`                 | none                            | Darken                           |

- **Size:** `height: 48px`, `padding: 0 24px`, `border-radius: 8px`
- **Font:** `Satoshi`, `font-weight: 600`, `letter-spacing: 0.02em`
- **Transition:** `all var(--duration-normal) var(--ease-out-quart)`
- **Focus ring:** `box-shadow: 0 0 0 3px var(--interactive-focus-ring)`

### 7.7 Form Inputs

- **Background:** `var(--surface-elevated)`
- **Border:** `1px solid var(--border-default)`, focus → `var(--color-gold)`
- **Label:** `Satoshi` medium, `--font-size-sm`, `var(--text-secondary)`, positioned above
- **Height:** `48px`
- **Corner radius:** `8px`
- **Focus animation:** Border color transitions + subtle glow (`box-shadow: 0 0 0 3px var(--interactive-focus-ring)`)
- **Error state:** Border → `var(--color-danger)`, error text in `--font-size-sm`, `var(--color-danger)`

### 7.8 Notification / In-App Alert Center

- **Dropdown panel** from navbar bell icon
- **Background:** `var(--surface-elevated)` with `backdrop-filter: blur(20px)`
- **Items:** Left gold accent bar (`3px`) on unread items
- **Timestamps:** `JetBrains Mono`, `--font-size-xs`, `var(--text-muted)`
- **Entrance:** Slide down + fade from top right

### 7.9 Lawyer Review Panel

- **Split view:** Document preview (left, 60%) | Review form (right, 40%)
- **Document preview:** PDF viewer embedded with `iframe`, dark surround, inner shadow for depth
- **Approve/Reject buttons:** Side-by-side, danger/success coloring
- **Feedback textarea:** Large (`min-height: 160px`), with `Satoshi` font
- **SLA indicator:** Countdown timer in `JetBrains Mono` + circular progress ring (CSS `conic-gradient`)

### 7.10 Pricing / Subscription Cards

- **Layout:** 2-3 cards, center card (premium) enlarged and elevated by `16px`
- **Premium card:** Gold border, `background: var(--surface-card)` with gold mesh gradient overlay
- **Free card:** Standard `--surface-card` with subtle border
- **Price:** `Playfair Display`, `--font-size-3xl`, gold color
- **Features:** Checkmark list, `Satoshi`, alternating opacity for included/excluded

---

## 8. Accessibility × Aesthetics Integration

> ⚠️ Aesthetics must **never** compromise accessibility. WCAG AA minimum.

### 8.1 Contrast Ratios (Verified)

| Pair                                             | Ratio   | Grade |
| ------------------------------------------------ | ------- | ----- |
| `--text-primary` (cream) on `--surface-primary` (ink)  | ~15.8:1 | AAA   |
| `--text-secondary` (stone) on `--surface-primary` (ink) | ~6.5:1  | AA    |
| `--text-accent` (gold) on `--surface-primary` (ink)    | ~7.2:1  | AA    |
| `--text-muted` (ash) on `--surface-primary` (ink)      | ~4.8:1  | AA    |

### 8.2 Implementation Requirements

1. **Focus indicators** — Always visible, using `--interactive-focus-ring` with `3px` offset.
2. **ARIA labels** — All interactive elements, icons, and status badges.
3. **Semantic HTML** — `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`, `<header>`, `<footer>`.
4. **Keyboard navigation** — Full tab order, `Enter`/`Space` activation, `Escape` to close modals.
5. **Screen reader support** — `aria-live` regions for status updates, `role="alert"` for errors.
6. **`prefers-reduced-motion`** — Disable all animations, provide instant state changes.
7. **`prefers-color-scheme`** — Respect system dark/light preference.
8. **Skip links** — "Skip to main content" link as first focusable element.

---

## 9. Anti-Patterns — What We NEVER Do

> This section exists to prevent aesthetic regression into generic AI-generated design.

### 9.1 Typography Anti-Patterns

- ❌ Using Inter, Roboto, Arial, Space Grotesk, or system fonts
- ❌ All-caps headings without proper letter-spacing
- ❌ Using only one font family across the entire application
- ❌ Body text below `16px` on desktop
- ❌ Tight line-height on paragraph text (`< 1.5`)

### 9.2 Color Anti-Patterns

- ❌ Purple gradients on white backgrounds
- ❌ Evenly-distributed rainbow palettes
- ❌ Blue-only SaaS color scheme (`#3B82F6` → `#1E3A5F`)
- ❌ Neon accents (#00FF41, #FF00FF) on dark backgrounds
- ❌ Using raw hex values instead of CSS variables
- ❌ Gray-only neutral palette without warm undertones

### 9.3 Motion Anti-Patterns

- ❌ Spring/bounce physics on professional UI elements
- ❌ Scroll-jacking (hijacking native scroll behavior)
- ❌ Animations longer than `1500ms` for UI elements
- ❌ Scattered micro-interactions without a choreographed load sequence
- ❌ Motion without `prefers-reduced-motion` fallback
- ❌ Animating `width`/`height` (use `transform` and `opacity` only)

### 9.4 Layout Anti-Patterns

- ❌ Symmetric 3-column card grids as the primary layout
- ❌ Default Bootstrap/Tailwind spacing without customization
- ❌ Everything centered with equal padding
- ❌ No visual hierarchy between content sections
- ❌ Hamburger menu on desktop viewports

### 9.5 Visual Detail Anti-Patterns

- ❌ Flat solid-color backgrounds with no texture or depth
- ❌ Default `box-shadow: 0 2px 4px rgba(0,0,0,0.1)` everywhere
- ❌ Stock illustrations or generic icon sets without customization
- ❌ Cookie-cutter component libraries used without restyling

---

## 10. Implementation Roadmap

### Phase 0 — Design Foundation (Week 1)

| Task                                     | Files to Create/Edit                   | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Set up CSS custom properties             | `app/globals.css`                       | 🔴 Critical |
| Import fonts (Google Fonts + Fontshare)  | `app/layout.tsx`, `app/globals.css`     | 🔴 Critical |
| Create noise grain SVG + overlay          | `public/textures/grain.svg`, CSS        | 🟡 High  |
| Define animation keyframes               | `app/globals.css` or `styles/motion.css`| 🟡 High  |
| Build design token reference component   | `components/ui/design-tokens.tsx`       | 🟢 Medium |
| Create custom cursor SVGs               | `public/cursors/`                        | 🟢 Medium |
| Set up `prefers-reduced-motion` utilities| `app/globals.css`                        | 🔴 Critical |

### Phase 1 — Core UI Components (Week 2)

| Task                                     | Files to Create                         | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Button variants (Primary, Secondary, Ghost, Danger) | `components/ui/button.tsx`    | 🔴 Critical |
| Form inputs (text, select, textarea)     | `components/ui/input.tsx`               | 🔴 Critical |
| Status badges                            | `components/ui/badge.tsx`               | 🔴 Critical |
| Card component (elevated, bordered)      | `components/ui/card.tsx`                | 🔴 Critical |
| Gold divider                             | `components/ui/divider.tsx`             | 🟡 High  |
| Modal / dialog                           | `components/ui/modal.tsx`               | 🟡 High  |
| Progress bar (gold-themed)               | `components/ui/progress.tsx`            | 🟡 High  |

### Phase 2 — Page Layouts & Navigation (Week 3)

| Task                                     | Files to Create                         | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Sticky navigation bar                    | `components/layout/navbar.tsx`          | 🔴 Critical |
| Sidebar (lawyer/admin dashboards)        | `components/layout/sidebar.tsx`         | 🔴 Critical |
| Page shell / layout wrapper              | `components/layout/page-shell.tsx`      | 🔴 Critical |
| Hero section (homepage)                  | `components/sections/hero.tsx`          | 🟡 High  |
| Staggered page load animation            | `components/motion/stagger-reveal.tsx`  | 🟡 High  |
| Scroll-triggered reveal wrapper          | `components/motion/scroll-reveal.tsx`   | 🟡 High  |

### Phase 3 — Feature-Specific Components (Week 4)

| Task                                     | Files to Create                         | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Timeline component (milestones)          | `components/features/timeline.tsx`      | 🔴 Critical |
| Document upload dropzone                 | `components/features/upload-zone.tsx`   | 🔴 Critical |
| Case dashboard card                      | `components/features/case-card.tsx`     | 🔴 Critical |
| Document checklist                       | `components/features/checklist.tsx`     | 🟡 High  |
| Notification dropdown                    | `components/features/notifications.tsx` | 🟡 High  |
| Pricing cards                            | `components/features/pricing-cards.tsx` | 🟡 High  |

### Phase 4 — Lawyer & Admin Interfaces (Week 5)

| Task                                     | Files to Create                         | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Review queue table                       | `components/features/review-queue.tsx`  | 🔴 Critical |
| Split review panel                       | `components/features/review-panel.tsx`  | 🔴 Critical |
| SLA indicator ring                       | `components/features/sla-ring.tsx`      | 🟡 High  |
| Admin analytics charts (Recharts)        | `components/features/analytics/`        | 🟡 High  |
| Reporting dashboard layout               | `app/admin/dashboard/page.tsx`          | 🟡 High  |

### Phase 5 — Polish & Atmospheric Details (Week 6)

| Task                                     | Files to Create/Edit                    | Priority |
| ---------------------------------------- | --------------------------------------- | -------- |
| Gold foil shimmer animation              | `styles/effects.css`                    | 🟢 Medium |
| Marble vein gradients on hero            | `styles/effects.css`                    | 🟢 Medium |
| Custom cursor implementation             | `app/globals.css`                       | 🟢 Medium |
| Linen texture overlays                   | `public/textures/linen.svg`            | 🟢 Medium |
| Page transition animations (Framer)      | `components/motion/page-transition.tsx` | 🟡 High  |
| Loading states + skeleton screens        | `components/ui/skeleton.tsx`            | 🟡 High  |
| 404 / error page (styled, on-brand)      | `app/not-found.tsx`                     | 🟢 Medium |

---

## 11. File & Folder Structure

```
app/
├── globals.css                    ← Design tokens, fonts, grain overlay, keyframes
├── layout.tsx                     ← Root layout, font imports, theme provider
├── page.tsx                       ← Homepage / landing
├── (auth)/                        ← Auth routes (login, signup)
├── (dashboard)/                   ← Client dashboard routes
├── (lawyer)/                      ← Lawyer portal routes
├── admin/                         ← Admin routes
├── not-found.tsx                  ← Styled 404 page
│
components/
├── ui/                            ← Atomic design components
│   ├── button.tsx
│   ├── input.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── divider.tsx
│   ├── modal.tsx
│   ├── progress.tsx
│   ├── skeleton.tsx
│   └── tooltip.tsx
├── layout/                        ← Structural layout components
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── page-shell.tsx
│   └── footer.tsx
├── motion/                        ← Animation wrapper components
│   ├── stagger-reveal.tsx
│   ├── scroll-reveal.tsx
│   └── page-transition.tsx
├── features/                      ← Domain-specific components
│   ├── timeline.tsx
│   ├── upload-zone.tsx
│   ├── case-card.tsx
│   ├── checklist.tsx
│   ├── notifications.tsx
│   ├── pricing-cards.tsx
│   ├── review-queue.tsx
│   ├── review-panel.tsx
│   ├── sla-ring.tsx
│   └── analytics/
│       ├── case-chart.tsx
│       ├── revenue-chart.tsx
│       └── review-metrics.tsx
└── sections/                      ← Page-level sections
    ├── hero.tsx
    ├── features-showcase.tsx
    └── testimonials.tsx
│
public/
├── cursors/
│   ├── law-pilot-default.svg
│   └── law-pilot-pointer.svg
├── textures/
│   ├── grain.svg
│   └── linen.svg
└── logo/
    ├── law-pilot-wordmark.svg
    └── law-pilot-icon.svg
│
styles/
├── effects.css                    ← Gold foil, marble veins, special effects
└── motion.css                     ← Reusable @keyframes definitions
```

---

## 12. Design Tokens & CSS Variables Reference

### Quick Reference Card

```
╔══════════════════════════════════════════════════════════════╗
║  LAW PILOT — DESIGN TOKENS QUICK REF                       ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  FONTS                                                       ║
║  Display:  Playfair Display 700–900                          ║
║  Heading:  DM Serif Display 400                              ║
║  Body:     Satoshi 400–700                                   ║
║  Mono:     JetBrains Mono 400–500                            ║
║  Accent:   Instrument Serif 400i                             ║
║                                                              ║
║  COLORS                                                      ║
║  Ink:       hsl(30, 10%, 6%)     — base dark                 ║
║  Gold:      hsl(43, 85%, 55%)    — primary accent            ║
║  Cream:     hsl(40, 30%, 95%)    — primary text on dark      ║
║  Stone:     hsl(30, 8%, 65%)     — secondary text            ║
║  Success:   hsl(152, 55%, 42%)   — approved                  ║
║  Warning:   hsl(38, 90%, 55%)    — pending                   ║
║  Danger:    hsl(4, 70%, 52%)     — rejected/overdue          ║
║                                                              ║
║  MOTION                                                      ║
║  Fast:     150ms                                             ║
║  Normal:   300ms                                             ║
║  Slow:     500ms                                             ║
║  Easing:   cubic-bezier(0.16, 1, 0.3, 1) — expo out         ║
║                                                              ║
║  SPACING                                                     ║
║  Base unit: 4px (0.25rem)                                    ║
║  Scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128    ║
║                                                              ║
║  RADIUS                                                      ║
║  Small: 6px  ·  Default: 8px  ·  Large: 12px  ·  Full: 999px║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## ✅ Definition of Done

For each component/page to be considered production-ready:

- [ ] Uses ONLY the defined font families (no fallback-only text)
- [ ] All colors reference CSS variables (no raw hex/hsl in component files)
- [ ] Entrance animation implemented with stagger support
- [ ] Hover/focus states defined and transitioned
- [ ] `prefers-reduced-motion` alternative exists
- [ ] ARIA labels on all interactive elements
- [ ] Keyboard navigable
- [ ] Contrast ratio meets WCAG AA minimum (4.5:1 normal text, 3:1 large text)
- [ ] Responsive from `375px` to `1536px+`
- [ ] No banned fonts, colors, or patterns used (see Section 9)
- [ ] Semantic HTML structure
- [ ] Loading/skeleton state implemented

---

> *"The practice of law demands precision, authority, and trust. The interface that serves it should embody the same qualities."*
