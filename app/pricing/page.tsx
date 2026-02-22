"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { CheckCircle2, X, ArrowRight, Star } from "lucide-react";
import Link from "next/link";

const PLANS = [
    {
        id: 'starter',
        name: 'Starter',
        price: '49',
        period: '/mo',
        badge: null,
        description: 'Perfect for individual clients managing a single case.',
        features: [
            { text: '1 active case', included: true },
            { text: 'Document uploads (5GB)', included: true },
            { text: 'Timeline visualization', included: true },
            { text: 'Email notifications', included: true },
            { text: 'Lawyer collaboration portal', included: false },
            { text: 'AI-assisted filing', included: false },
            { text: 'Priority support', included: false },
        ],
        cta: 'Start with Starter',
        variant: 'default' as const,
        featured: false,
    },
    {
        id: 'professional',
        name: 'Professional',
        price: '149',
        period: '/mo',
        badge: 'Most Popular',
        description: 'The complete solution for families and multi-case clients.',
        features: [
            { text: 'Up to 10 active cases', included: true },
            { text: 'Document uploads (50GB)', included: true },
            { text: 'Timeline visualization', included: true },
            { text: 'Email & SMS notifications', included: true },
            { text: 'Lawyer collaboration portal', included: true },
            { text: 'AI-assisted filing', included: true },
            { text: 'Priority support (48hr)', included: false },
        ],
        cta: 'Go Professional',
        variant: 'default' as const,
        featured: true,
    },
    {
        id: 'firm',
        name: 'Law Firm',
        price: '499',
        period: '/mo',
        badge: null,
        description: 'Enterprise-grade tools for law firms managing client portfolios.',
        features: [
            { text: 'Unlimited cases', included: true },
            { text: 'Unlimited document storage', included: true },
            { text: 'Advanced timeline & milestones', included: true },
            { text: 'All notification channels', included: true },
            { text: 'Lawyer collaboration portal', included: true },
            { text: 'AI-assisted filing (advanced)', included: true },
            { text: 'Dedicated account manager', included: true },
        ],
        cta: 'Contact Sales',
        variant: 'default' as const,
        featured: false,
    },
];

export default function Pricing() {
    return (
        <div>
            {/* Hero */}
            <section
                className="hero-bg"
                style={{ paddingBlock: 'clamp(80px, 12vh, 140px)', textAlign: 'center' }}
            >
                <div className="container-lp">
                    <span className="mono-label block mb-5">TRANSPARENT PRICING</span>
                    <h1
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                            fontWeight: 900,
                            letterSpacing: '-0.03em',
                            lineHeight: 1.05,
                            color: '#000042',
                            marginBottom: '1.25rem',
                        }}
                    >
                        Simple, honest<br />
                        <span className="text-gold-gradient">pricing</span>
                    </h1>
                    <p className="max-w-[460px] mx-auto text-[1rem] leading-relaxed" style={{ color: '#6b6b7e' }}>
                        No hidden fees. No long-term contracts. Scale up or down anytime.
                    </p>
                </div>
            </section>

            {/* Plans */}
            <section style={{ paddingBlock: 'clamp(60px, 10vh, 120px)', backgroundColor: '#faf9f6' }}>
                <div className="container-lp">
                    <div className="grid md:grid-cols-3 gap-6 items-end">
                        {PLANS.map((plan, i) => (
                            <PricingCard key={plan.id} {...plan} index={i} />
                        ))}
                    </div>
                </div>
            </section>

            <Divider variant="gold" className="mx-6 md:mx-12" />

            {/* FAQ / trust section */}
            <section style={{ paddingBlock: 'clamp(60px, 10vh, 100px)', backgroundColor: 'white' }}>
                <div className="container-lp text-center">
                    <h2
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                            fontWeight: 800,
                            color: '#000042',
                            letterSpacing: '-0.025em',
                            marginBottom: '1rem',
                        }}
                    >
                        Trusted by 180+ law firms worldwide
                    </h2>
                    <div className="flex items-center justify-center gap-1 mb-8">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={20} fill="#d8b23d" style={{ color: '#d8b23d' }} />
                        ))}
                        <span className="ml-2 font-sans text-[0.875rem] font-medium" style={{ color: '#6b6b7e' }}>
                            4.9 / 5 average rating
                        </span>
                    </div>
                    <Link href="/signup">
                        <Button variant="primary" size="lg" className="group">
                            Get Started Free
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}

function PricingCard({
    name, price, period, badge, description, features, cta, featured, index,
}: typeof PLANS[0] & { index: number }) {
    return (
        <div
            className={`relative transition-all duration-300 animate-fade-up stagger-${index + 1}`}
            style={{ marginTop: featured ? 0 : 16, marginBottom: featured ? 0 : 16 }}
        >
            {/* Featured glow */}
            {featured && (
                <div
                    className="absolute inset-0 rounded-[16px] pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 50% 0%, rgba(216,178,61,0.12) 0%, transparent 70%)',
                        border: '2px solid rgba(216,178,61,0.35)',
                        borderRadius: 16,
                        zIndex: 0,
                    }}
                    aria-hidden="true"
                />
            )}

            <div
                className={[
                    'relative z-10 rounded-[12px] p-8',
                    featured
                        ? 'bg-white shadow-[0_4px_24px_rgba(0,0,66,0.08),0_0_0_2px_rgba(216,178,61,0.25)]'
                        : 'bg-[#f4f2ed] border border-[rgba(0,0,66,0.08)]',
                ].join(' ')}
            >
                {badge && (
                    <Badge variant="gold" className="mb-5">{badge}</Badge>
                )}

                <p
                    className="mb-1"
                    style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#6b6b7e' }}
                >
                    {name}
                </p>

                <div className="flex items-end gap-1 mb-2">
                    <span
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(2.4rem, 5vw, 3.2rem)',
                            fontWeight: 800,
                            color: featured ? '#d8b23d' : '#000042',
                            lineHeight: 1,
                            letterSpacing: '-0.03em',
                        }}
                    >
                        ${price}
                    </span>
                    <span className="text-[0.9rem] mb-2" style={{ color: '#9d9daa' }}>{period}</span>
                </div>

                <p className="text-[0.875rem] leading-relaxed mb-7" style={{ color: '#6b6b7e' }}>
                    {description}
                </p>

                <Divider variant={featured ? 'gold' : 'subtle'} className="mb-6" />

                <ul className="space-y-3 mb-8">
                    {features.map(({ text, included }) => (
                        <li key={text} className="flex items-center gap-2.5">
                            {included ? (
                                <CheckCircle2 size={15} style={{ color: featured ? '#d8b23d' : '#54848c', flexShrink: 0 }} />
                            ) : (
                                <X size={15} style={{ color: '#d4d4de', flexShrink: 0 }} />
                            )}
                            <span
                                className="text-[0.875rem]"
                                style={{ color: included ? '#3a3a4a' : '#9d9daa' }}
                            >
                                {text}
                            </span>
                        </li>
                    ))}
                </ul>

                <Link href="/signup">
                    <Button
                        variant={featured ? 'primary' : 'outline'}
                        size="md"
                        className="w-full group"
                    >
                        {cta}
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                </Link>
            </div>
        </div>
    );
}
