"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";
import {
    FileText, TrendingUp, Shield, Users, Zap, Globe,
    Clock, CheckCircle2, Bell, Lock, ArrowRight
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
    {
        icon: FileText,
        title: 'Document Management',
        description: 'Secure upload, organize, and track every document in your case with version control and instant retrieval.',
        badge: 'Core',
        accent: 'gold' as const,
    },
    {
        icon: TrendingUp,
        title: 'Milestone Timeline',
        description: 'Visualize every step of your legal journey — appointments, filings, approvals — on a beautiful interactive timeline.',
        badge: 'Core',
        accent: 'teal' as const,
    },
    {
        icon: Users,
        title: 'Lawyer Portal',
        description: 'Direct collaboration between clients and legal professionals with a dedicated, secure review workspace.',
        badge: 'Core',
        accent: 'gold' as const,
    },
    {
        icon: Zap,
        title: 'AI Filing Assistant',
        description: 'AI-powered checklists surface exactly what documents each jurisdiction requires — before you file.',
        badge: 'AI',
        accent: 'gold' as const,
    },
    {
        icon: Bell,
        title: 'Smart Notifications',
        description: 'Proactive alerts for upcoming deadlines, document requests, and status changes via email, SMS, or in-app.',
        badge: 'Comms',
        accent: 'teal' as const,
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'SOC 2 certified infrastructure, end-to-end encryption, GDPR compliance, and granular access controls.',
        badge: 'Infra',
        accent: 'gold' as const,
    },
    {
        icon: Globe,
        title: 'Multi-Jurisdiction',
        description: 'Built for cross-border matters across 40+ jurisdictions with localized filing requirements and compliance rules.',
        badge: 'Global',
        accent: 'teal' as const,
    },
    {
        icon: Clock,
        title: 'SLA Monitoring',
        description: 'Real-time SLA tracking for lawyer review queues — ensuring your case never falls behind schedule.',
        badge: 'Ops',
        accent: 'gold' as const,
    },
    {
        icon: Lock,
        title: 'Role-Based Access',
        description: 'Granular permissions for clients, lawyers, paralegals, and firm administrators with full audit trails.',
        badge: 'Infra',
        accent: 'teal' as const,
    },
];

export default function Features() {
    return (
        <div>
            {/* Hero */}
            <section
                className="hero-bg"
                style={{ paddingBlock: 'clamp(80px, 12vh, 140px)' }}
            >
                <div className="container-lp">
                    <div className="max-w-[640px]">
                        <span className="mono-label block mb-5">PLATFORM FEATURES</span>
                        <h1
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
                                fontWeight: 900,
                                letterSpacing: '-0.03em',
                                lineHeight: 1.05,
                                color: '#000042',
                                marginBottom: '1.25rem',
                            }}
                        >
                            Built for legal<br />
                            <span className="text-gold-gradient">excellence</span>
                        </h1>
                        <p className="max-w-[480px] text-[1rem] leading-relaxed mb-8" style={{ color: '#6b6b7e' }}>
                            Every feature in Law Pilot was designed with one goal: give legal professionals
                            and their clients total confidence in every stage of a case.
                        </p>
                        <div className="flex items-center gap-3">
                            <CheckCircle2 size={16} style={{ color: '#d8b23d' }} />
                            <span className="text-[0.875rem] font-medium" style={{ color: '#3a3a4a' }}>
                                No setup fees. Cancel anytime.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features grid */}
            <section style={{ paddingBlock: 'clamp(60px, 10vh, 120px)', backgroundColor: '#faf9f6' }}>
                <div className="container-lp">
                    <div className="grid md:grid-cols-3 gap-6">
                        {FEATURES.map(({ icon: Icon, title, description, badge, accent }, i) => (
                            <Card
                                key={title}
                                variant="elevated"
                                className={`p-7 group animate-fade-up stagger-${(i % 6) + 1}`}
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div
                                        className="flex items-center justify-center w-12 h-12 rounded-[10px] transition-transform duration-300 group-hover:scale-110"
                                        style={{
                                            background: accent === 'gold' ? 'rgba(216,178,61,0.1)' : 'rgba(84,132,140,0.1)',
                                        }}
                                    >
                                        <Icon size={22} style={{ color: accent === 'gold' ? '#d8b23d' : '#54848c' }} />
                                    </div>
                                    <Badge variant={accent === 'gold' ? 'gold' : 'teal'}>{badge}</Badge>
                                </div>

                                <h3
                                    className="mb-3"
                                    style={{
                                        fontFamily: 'var(--font-display)',
                                        fontSize: '1.125rem',
                                        fontWeight: 400,
                                        color: '#000042',
                                        lineHeight: 1.3,
                                    }}
                                >
                                    {title}
                                </h3>
                                <p className="text-[0.875rem] leading-relaxed" style={{ color: '#6b6b7e' }}>
                                    {description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <Divider variant="gold" className="mx-6 md:mx-12" />

            {/* CTA */}
            <section style={{ paddingBlock: 'clamp(80px, 10vh, 120px)', backgroundColor: '#000042', textAlign: 'center' }}>
                <div className="container-lp">
                    <span className="mono-label block mb-5" style={{ color: 'rgba(220,192,127,0.7)' }}>
                        READY TO BEGIN
                    </span>
                    <h2
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                            fontWeight: 800,
                            color: '#faf9f6',
                            letterSpacing: '-0.025em',
                            marginBottom: '1rem',
                        }}
                    >
                        Experience Law Pilot<br />
                        <span className="text-gold-gradient">free for 14 days</span>
                    </h2>
                    <p className="mb-8 max-w-[400px] mx-auto text-[0.95rem]" style={{ color: 'rgba(194,221,216,0.7)' }}>
                        Full access, no credit card required. Set up your first case in minutes.
                    </p>
                    <Link href="/signup">
                        <Button variant="primary" size="lg" className="group">
                            Start Free Trial
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
