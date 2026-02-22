"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Divider } from "@/components/ui/divider";
import { CardSkeleton } from "@/components/ui/skeleton";
import {
    Scale, FileText, Clock, CheckCircle2, Bell,
    Plus, Upload, TrendingUp, ArrowRight, AlertCircle
} from "lucide-react";
import Link from "next/link";

const CASES = [
    {
        id: 'IMM-2026-0847',
        title: 'Family Visa Petition',
        subtitle: 'Ait Family — K1 Visa',
        progress: 67,
        nextStep: 'Biometrics Appointment',
        dueDate: 'Mar 15, 2026',
        status: 'In Review' as const,
        docsReady: 8,
        docsTotal: 12,
    },
    {
        id: 'REF-2026-0312',
        title: 'Asylum Application',
        subtitle: 'Chen — Refugee Status',
        progress: 42,
        nextStep: 'Interview Preparation',
        dueDate: 'Apr 2, 2026',
        status: 'Pending' as const,
        docsReady: 5,
        docsTotal: 14,
    },
    {
        id: 'WRK-2026-1103',
        title: 'Work Permit Renewal',
        subtitle: 'Torres — H-1B Extension',
        progress: 91,
        nextStep: 'Final Approval',
        dueDate: 'Mar 8, 2026',
        status: 'Approved' as const,
        docsReady: 11,
        docsTotal: 11,
    },
];

const ACTIVITY = [
    { icon: CheckCircle2, color: '#d8b23d', message: 'Biometrics appointment confirmed', time: '2 hours ago' },
    { icon: Upload, color: '#54848c', message: 'Document "I-130" uploaded successfully', time: '5 hours ago' },
    { icon: Bell, color: '#d8b23d', message: 'Deadline reminder: Mar 8 filing due', time: '1 day ago' },
    { icon: AlertCircle, color: 'hsl(4,70%,52%)', message: 'Action required: Missing passport copy', time: '2 days ago' },
];

export default function Dashboard() {
    return (
        <div style={{ backgroundColor: '#faf9f6', minHeight: 'calc(100vh - 72px)' }}>

            {/* ─── Header Banner ─── */}
            <div
                style={{ backgroundColor: '#000042', paddingBlock: '2.5rem 0' }}
            >
                <div className="container-lp">
                    <div className="flex items-end justify-between pb-8">
                        <div>
                            <span className="mono-label block mb-3" style={{ color: 'rgba(220,192,127,0.6)' }}>
                                CASE DASHBOARD
                            </span>
                            <h1
                                style={{
                                    fontFamily: 'var(--font-serif)',
                                    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                                    fontWeight: 800,
                                    letterSpacing: '-0.03em',
                                    lineHeight: 1.1,
                                    color: '#faf9f6',
                                }}
                            >
                                My Legal Cases
                            </h1>
                            <p className="mt-2 text-[0.9rem]" style={{ color: 'rgba(194,221,216,0.65)' }}>
                                3 active cases · Last updated 2 hours ago
                            </p>
                        </div>
                        <Button variant="primary" size="md" className="group hidden md:flex mb-2">
                            <Plus size={16} />
                            New Case
                        </Button>
                    </div>

                    {/* Stat strip */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-px"
                        style={{ borderTop: '1px solid rgba(194,221,216,0.1)' }}
                    >
                        {[
                            { label: 'Active Cases', value: '3', Icon: Scale },
                            { label: 'Pending Docs', value: '4', Icon: FileText },
                            { label: 'Upcoming Dates', value: '2', Icon: Clock },
                            { label: 'Completed Steps', value: '18', Icon: CheckCircle2 },
                        ].map(({ label, value, Icon }) => (
                            <div key={label} className="py-4 px-2 text-center">
                                <div className="flex items-center justify-center gap-1.5 mb-1">
                                    <Icon size={13} style={{ color: '#d8b23d' }} />
                                    <span className="text-[0.7rem] font-medium tracking-[0.06em] uppercase" style={{ color: 'rgba(194,221,216,0.5)' }}>
                                        {label}
                                    </span>
                                </div>
                                <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', fontWeight: 800, color: '#faf9f6' }}>
                                    {value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ─── Main content ─── */}
            <div className="container-lp py-10">
                <div className="grid lg:grid-cols-[1fr_340px] gap-8">

                    {/* Cases */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2
                                style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', color: '#000042' }}
                            >
                                Active Cases
                            </h2>
                            <Link href="#">
                                <Button variant="ghost" size="sm">
                                    View all
                                    <ArrowRight size={13} />
                                </Button>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-5">
                            {CASES.map((c) => (
                                <DashboardCaseCard key={c.id} {...c} />
                            ))}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="flex flex-col gap-6">

                        {/* Quick actions */}
                        <Card variant="elevated" className="p-6">
                            <h3 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#000042' }}>
                                Quick Actions
                            </h3>
                            <div className="flex flex-col gap-2.5">
                                <Button variant="primary" size="sm" className="w-full justify-start group">
                                    <Upload size={14} />
                                    Upload Document
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <TrendingUp size={14} />
                                    View Timeline
                                </Button>
                                <Button variant="outline" size="sm" className="w-full justify-start">
                                    <Plus size={14} />
                                    Open New Case
                                </Button>
                            </div>
                        </Card>

                        {/* Recent activity */}
                        <Card variant="elevated" className="p-6">
                            <h3 className="mb-5" style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: '#000042' }}>
                                Recent Activity
                            </h3>
                            <div className="flex flex-col gap-4">
                                {ACTIVITY.map(({ icon: Icon, color, message, time }, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div
                                            className="mt-0.5 flex items-center justify-center rounded-full shrink-0"
                                            style={{ width: 28, height: 28, background: `${color}18` }}
                                        >
                                            <Icon size={13} style={{ color }} />
                                        </div>
                                        <div>
                                            <p className="text-[0.8rem] leading-snug" style={{ color: '#3a3a4a' }}>{message}</p>
                                            <p className="text-[0.7rem] mt-0.5 font-mono" style={{ color: '#9d9daa' }}>{time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </aside>
                </div>
            </div>
        </div>
    );
}

function DashboardCaseCard({
    id, title, subtitle, progress, nextStep, dueDate, status, docsReady, docsTotal,
}: typeof CASES[0]) {
    const statusBadge: 'info' | 'warning' | 'success' = status === 'In Review' ? 'info' : status === 'Approved' ? 'success' : 'warning';

    return (
        <Card variant="elevated" className="p-6 group hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex flex-wrap items-start gap-3 justify-between mb-4">
                <div>
                    <span className="mono-label">{id}</span>
                    <h3
                        className="mt-1"
                        style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 700, color: '#000042', lineHeight: 1.2, letterSpacing: '-0.02em' }}
                    >
                        {title}
                    </h3>
                    <p className="text-[0.8125rem] mt-0.5" style={{ color: '#6b6b7e' }}>{subtitle}</p>
                </div>
                <Badge variant={statusBadge} showIcon>{status}</Badge>
            </div>

            <Progress value={progress} label="Progress" variant="gold" size="md" className="mb-4" />

            <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.05em] mb-1" style={{ color: '#9d9daa' }}>Next Step</p>
                    <p className="text-[0.8125rem]" style={{ color: '#3a3a4a' }}>{nextStep}</p>
                </div>
                <div>
                    <p className="text-[0.7rem] font-medium uppercase tracking-[0.05em] mb-1" style={{ color: '#9d9daa' }}>Due Date</p>
                    <p className="text-[0.8125rem] font-mono" style={{ color: 'hsl(38,90%,48%)' }}>{dueDate}</p>
                </div>
            </div>

            <Divider variant="subtle" className="mb-4" />

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <FileText size={13} style={{ color: '#54848c' }} />
                    <span className="text-[0.8rem]" style={{ color: '#6b6b7e' }}>
                        {docsReady}/{docsTotal} documents ready
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Case</Button>
                    <Button variant="secondary" size="sm">
                        <Upload size={12} />
                        Upload
                    </Button>
                </div>
            </div>
        </Card>
    );
}
