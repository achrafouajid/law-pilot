"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, FileText, Clock, Shield, CheckCircle2,
  Users, Star, ChevronRight, MapPin, Award, Handshake, Globe, Heart
} from "lucide-react";
import Link from "next/link";

/* ── Service categories pulled from immigration-services.json structure ── */
const SERVICE_CATEGORIES = [
  {
    id: "family_based_immigration",
    label: "Family-Based",
    icon: Heart,
    headline: "Family Immigration",
    description: "Green cards for spouses, relatives, and fiancé(e) visas — reunite with your loved ones.",
    examples: ["Green Card for Spouse", "Fiancé(e) Visa", "Family Relative Petition"],
    accent: "gold",
    startingFrom: 1500,
  },
  {
    id: "employment_based_immigration",
    label: "Employment-Based",
    icon: Award,
    headline: "Work & Career Visas",
    description: "Green cards for professionals, extraordinary ability, and skilled workers.",
    examples: ["National Interest Waiver", "EB-1A / EB-1C", "EB-3 Skilled Workers"],
    accent: "teal",
    startingFrom: 5000,
  },
  {
    id: "work_and_investor_visas",
    label: "Work & Investor",
    icon: Globe,
    headline: "Work & Investor Visas",
    description: "H-1B, L-1, E-2, O, and other non-immigrant work and investor visa categories.",
    examples: ["H-1B Work Visa", "E-2 Investor Visa", "L-1 Transfer"],
    accent: "gold",
    startingFrom: 3500,
  },
  {
    id: "asylum_and_humanitarian_cases",
    label: "Asylum",
    icon: Handshake,
    headline: "Asylum & Humanitarian",
    description: "Asylum representation, court hearings, and humanitarian parole.",
    examples: ["Asylum Representation", "Court Hearing", "Humanitarian Parole"],
    accent: "teal",
    startingFrom: 1500,
  },
  {
    id: "other_immigration_services",
    label: "Other Services",
    icon: FileText,
    headline: "Other Services",
    description: "Citizenship, green card renewal, visitor visas, change of status, and more.",
    examples: ["U.S. Citizenship", "Green Card Renewal", "B-1/B-2 Visitor Visa"],
    accent: "gold",
    startingFrom: 500,
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Select Your Case Type",
    description: "Browse our immigration services and choose the one that matches your situation. We handle every visa and green card category.",
  },
  {
    step: "02",
    title: "Upload Your Documents",
    description: "Follow our intelligent checklist tailored to your case. Upload securely from any device — no appointment needed.",
  },
  {
    step: "03",
    title: "Attorney Review",
    description: "We review your documents, flag any issues, and guide you through the process with real-time updates.",
  },
  {
    step: "04",
    title: "Stay Informed",
    description: "Track your case milestones, receive deadline reminders, and communicate directly with your attorney.",
  },
];

const TESTIMONIALS = [
  {
    name: "Maria G.",
    origin: "Originally from Mexico",
    quote: "The process was so clear and organized. I knew exactly what to submit and when. My green card was approved in record time.",
    service: "Green Card for Spouse",
  },
  {
    name: "Ahmed K.",
    origin: "Originally from Egypt",
    quote: "The document checklist was a game-changer. No back and forth — everything was done online and approved smoothly.",
    service: "H-1B Work Visa",
  },
  {
    name: "Lin W.",
    origin: "Originally from China",
    quote: "I was nervous about the asylum process. The attorney kept me informed every step of the way. I'm so grateful.",
    service: "Asylum Representation",
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════
          HERO SECTION — Client-facing, immigration journey
          ═══════════════════════════════════════════════════════════ */}
      <section className="hero-bg relative" style={{ paddingBlock: "clamp(100px, 16vh, 200px)" }}>

        {/* Decorative arcs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute"
            style={{
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              border: "1px solid rgba(216,178,61,0.07)",
              top: "-300px",
              right: "-300px",
            }}
          />
          <div
            className="absolute"
            style={{
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              border: "1px solid rgba(84,132,140,0.05)",
              bottom: "-150px",
              left: "-150px",
            }}
          />
          {/* Subtle radial glow */}
          <div
            className="absolute"
            style={{
              width: "600px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(216,178,61,0.06) 0%, transparent 70%)",
              top: "20%",
              right: "-100px",
            }}
          />
        </div>

        <div className="container-lp relative">
          <div className="max-w-[720px]">

            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-9 animate-fade-up">
              <span className="mono-label">IMMIGRATION LAW OFFICE</span>
              <div className="line-gold" aria-hidden="true" />
              <Badge variant="gold" showIcon>Trusted Since 2012</Badge>
            </div>

            {/* Main headline */}
            <h1
              className="animate-fade-up stagger-1 mb-7"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(3rem, 6.5vw, 5.8rem)",
                fontWeight: 900,
                lineHeight: 1.01,
                letterSpacing: "-0.03em",
                color: "#000042",
              }}
            >
              Your path to the<br />
              <span className="text-gold-gradient">United States</span><br />
              starts here.
            </h1>

            {/* Sub-headline */}
            <p
              className="animate-fade-up stagger-2 mb-11 max-w-[560px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.05rem, 2vw, 1.3rem)",
                lineHeight: 1.7,
                color: "#6b6b7e",
              }}
            >
              Expert immigration legal services — for families, professionals, asylum seekers, and investors. Start your application today, from anywhere in the world.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-wrap items-center gap-4 animate-fade-up stagger-3">
              <Link href="/apply">
                <Button variant="primary" size="lg" className="group" id="hero-cta-start">
                  Start My Application
                  <ArrowRight size={17} className="transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#services">
                <Button variant="outline" size="lg" id="hero-cta-services">
                  View All Services
                </Button>
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center gap-6 mt-11 animate-fade-up stagger-4">
              {[
                { icon: Shield, label: "Secure & Confidential" },
                { icon: CheckCircle2, label: "No Hidden Fees" },
                { icon: Clock, label: "Fast Response Time" },
                { icon: MapPin, label: "Licensed in All 50 States" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon size={14} style={{ color: "#d8b23d" }} />
                  <span className="text-[0.8rem] font-medium" style={{ color: "#6b6b7e" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          STATS BAR
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ backgroundColor: "#000042", paddingBlock: "3.25rem" }}>
        <div className="container-lp">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2,800+", label: "Applications Filed", icon: FileText },
              { value: "96%", label: "Approval Rate", icon: Star },
              { value: "12+", label: "Years of Experience", icon: Award },
              { value: "45+", label: "Countries Served", icon: Globe },
            ].map(({ value, label, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Icon size={15} style={{ color: "#d8b23d" }} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    fontWeight: 800,
                    color: "#d8b23d",
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p className="text-[0.8125rem] mt-1.5 font-medium" style={{ color: "rgba(194,221,216,0.7)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SERVICES GRID
          ═══════════════════════════════════════════════════════════ */}
      <section
        id="services"
        style={{ paddingBlock: "clamp(80px, 12vh, 160px)", backgroundColor: "var(--surface-primary)" }}
      >
        <div className="container-lp">

          {/* Section header */}
          <div className="max-w-[600px] mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="line-gold" aria-hidden="true" />
              <span className="mono-label">IMMIGRATION SERVICES</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
                fontWeight: 800,
                color: "#000042",
                letterSpacing: "-0.025em",
                lineHeight: 1.12,
              }}
            >
              Every case is different.<br />
              <span className="text-gold-gradient">We handle them all.</span>
            </h2>
            <p className="mt-4 text-[1rem] leading-relaxed" style={{ color: "#6b6b7e", maxWidth: "480px" }}>
              From family reunification to employment visas and asylum cases — click on any service to start your application now.
            </p>
          </div>

          {/* Service cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICE_CATEGORIES.map(({ id, label, icon: Icon, headline, description, examples, accent, startingFrom }, i) => (
              <Link key={id} href={`/apply?service=${id}`} id={`service-card-${id}`}>
                <Card
                  variant="elevated"
                  className={`p-7 group cursor-pointer h-full animate-fade-up stagger-${i + 1} flex flex-col`}
                >
                  {/* Icon */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-[10px] mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: accent === "gold" ? "rgba(216,178,61,0.1)" : "rgba(84,132,140,0.1)",
                    }}
                  >
                    <Icon size={22} style={{ color: accent === "gold" ? "#d8b23d" : "#54848c" }} />
                  </div>

                  {/* Label pill */}
                  <span
                    className="inline-block text-[0.7rem] font-semibold uppercase tracking-widest mb-3"
                    style={{ color: accent === "gold" ? "#b6912c" : "#54848c" }}
                  >
                    {label}
                  </span>

                  {/* Headline */}
                  <h3
                    className="mb-3"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#000042",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {headline}
                  </h3>

                  {/* Description */}
                  <p className="text-[0.9rem] leading-relaxed mb-5 flex-1" style={{ color: "#6b6b7e" }}>
                    {description}
                  </p>

                  {/* Examples */}
                  <ul className="space-y-1.5 mb-6">
                    {examples.map((ex) => (
                      <li key={ex} className="flex items-center gap-2 text-[0.825rem]" style={{ color: "#3a3a4a" }}>
                        <CheckCircle2 size={12} style={{ color: accent === "gold" ? "#d8b23d" : "#54848c", flexShrink: 0 }} />
                        {ex}
                      </li>
                    ))}
                  </ul>

                  {/* Starting from + CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4" style={{ borderTop: "1px solid rgba(0,0,66,0.08)" }}>
                    <span className="text-[0.8rem]" style={{ color: "#9d9daa" }}>
                      Attorney fees from{" "}
                      <strong style={{ color: "#000042" }}>${startingFrom.toLocaleString()}</strong>
                    </span>
                    <ChevronRight
                      size={16}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                      style={{ color: accent === "gold" ? "#d8b23d" : "#54848c" }}
                    />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div className="divider-gold mx-8 md:mx-16" />

      {/* ═══════════════════════════════════════════════════════════
          HOW IT WORKS
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock: "clamp(80px, 12vh, 160px)", backgroundColor: "#faf9f6" }}>
        <div className="container-lp">

          <div className="max-w-[520px] mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="line-teal" aria-hidden="true" />
              <span className="mono-label" style={{ color: "#54848c" }}>THE PROCESS</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
                fontWeight: 800,
                color: "#000042",
                letterSpacing: "-0.025em",
              }}
            >
              Simple steps.<br />Life-changing results.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map(({ step, title, description }, i) => (
              <div key={step} className={`animate-fade-up stagger-${i + 1}`}>
                {/* Step number */}
                <div
                  className="mb-5"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "rgba(216,178,61,0.18)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {step}
                </div>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 400,
                    color: "#000042",
                  }}
                >
                  {title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed" style={{ color: "#6b6b7e" }}>
                  {description}
                </p>
                {/* Connector line — desktop only (decorative) */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div
                    className="hidden md:block absolute"
                    aria-hidden="true"
                    style={{
                      top: "1rem",
                      right: "-2rem",
                      width: "4rem",
                      height: "1px",
                      background: "rgba(216,178,61,0.25)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* CTA inside how-it-works section */}
          <div className="mt-16">
            <Link href="/apply">
              <Button variant="primary" size="lg" className="group" id="how-it-works-cta">
                Start My Application
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          TESTIMONIALS
          ═══════════════════════════════════════════════════════════ */}
      <section style={{ paddingBlock: "clamp(80px, 12vh, 160px)", backgroundColor: "var(--surface-primary)" }}>
        <div className="container-lp">

          <div className="max-w-[480px] mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="line-gold" aria-hidden="true" />
              <span className="mono-label">CLIENT STORIES</span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(1.9rem, 4vw, 3.2rem)",
                fontWeight: 800,
                color: "#000042",
                letterSpacing: "-0.025em",
              }}
            >
              Real people,<br />
              <span className="text-gold-gradient">real approvals.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, origin, quote, service }, i) => (
              <Card key={name} variant="elevated" className={`p-7 animate-fade-up stagger-${i + 1} flex flex-col`}>
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={13} fill="#d8b23d" style={{ color: "#d8b23d" }} />
                  ))}
                </div>

                {/* Quote */}
                <blockquote
                  className="flex-1 mb-6 text-[0.9375rem] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-accent)",
                    fontStyle: "italic",
                    color: "#3a3a4a",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="pt-4" style={{ borderTop: "1px solid rgba(0,0,66,0.08)" }}>
                  <p className="font-semibold text-[0.9rem]" style={{ color: "#000042" }}>{name}</p>
                  <p className="text-[0.8rem] mt-0.5" style={{ color: "#9d9daa" }}>{origin}</p>
                  <Badge variant="info" className="mt-2">{service}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA SECTION — Navy
          ═══════════════════════════════════════════════════════════ */}
      <section className="hero-bg-dark relative" style={{ paddingBlock: "clamp(100px, 14vh, 160px)" }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="divider-gold absolute top-0 w-full" style={{ opacity: 0.4 }} />
          <div className="divider-gold absolute bottom-0 w-full" style={{ opacity: 0.4 }} />
        </div>

        <div className="container-lp text-center">
          <span
            className="mono-label mb-6 block"
            style={{ color: "rgba(220,192,127,0.7)" }}
          >
            YOUR JOURNEY BEGINS TODAY
          </span>
          <h2
            className="mb-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1.04,
              color: "#faf9f6",
            }}
          >
            Ready to start your<br />
            <span className="text-gold-gradient">immigration application?</span>
          </h2>
          <p
            className="mb-10 max-w-[460px] mx-auto text-[1.05rem] leading-[1.7]"
            style={{ color: "rgba(194,221,216,0.75)" }}
          >
            Upload your documents, track your case, and get expert legal guidance — all from one secure platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/apply">
              <Button variant="primary" size="lg" className="group" id="final-cta-apply">
                Start My Application
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                className="bg-transparent border text-[#c2ddd8] hover:bg-[rgba(194,221,216,0.1)] hover:text-white"
                style={{ borderColor: "rgba(194,221,216,0.3)" }}
                id="final-cta-login"
              >
                <Users size={15} />
                Track Existing Case
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
