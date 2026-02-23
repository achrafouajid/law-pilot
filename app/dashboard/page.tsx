"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Divider } from "@/components/ui/divider";
import { CardSkeleton } from "@/components/ui/skeleton";
import {
    Scale, FileText, Clock, CheckCircle2,
    Plus, Upload, TrendingUp, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { useStore, type Case } from "@/store/useStore";
import { supabase } from "@/lib/supabase";

interface DBDocument {
    id: string;
    status: string;
}

interface DBCase {
    id: string;
    title: string;
    service_type: string;
    progress: number;
    status: string;
    documents?: DBDocument[];
}

interface TransformedCase {
    id: string;
    title: string;
    subtitle: string;
    progress: number;
    nextStep: string;
    dueDate: string;
    status: string;
    docsReady: number;
    docsTotal: number;
}

export default function Dashboard() {
    const { user, cases, setCases } = useStore();
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        active: 0,
        pendingDocs: 0,
        upcomingDates: 0,
        completedSteps: 0
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!user) return;

            setIsLoading(true);
            try {
                // 1. Fetch cases
                const { data: casesData, error: casesError } = await supabase
                    .from('cases')
                    .select('*, documents(*)')
                    .eq('client_id', user.id)
                    .order('created_at', { ascending: false });

                if (casesError) throw casesError;

                // Transform to match local UI expectations if needed
                const transformedCases = (casesData as DBCase[] || []).map((c: DBCase) => ({
                    id: c.id,
                    title: c.title,
                    subtitle: c.service_type,
                    progress: c.progress || 0,
                    nextStep: 'Awaiting Review',
                    dueDate: 'TBD',
                    status: c.status === 'pending' ? 'Pending' : c.status === 'in_review' ? 'In Review' : 'Approved',
                    docsReady: c.documents?.filter((d: DBDocument) => d.status === 'approved').length || 0,
                    docsTotal: 3, // Default for now
                }));

                setCases(transformedCases as unknown as Case[]); // Cast to Case[] to match store type

                // 2. Fetch stats (mocked logic based on real data)
                setStats({
                    active: casesData?.length || 0,
                    pendingDocs: (casesData as DBCase[])?.reduce((acc: number, c: DBCase) => acc + (c.documents?.filter((d: DBDocument) => d.status === 'pending').length || 0), 0) || 0,
                    upcomingDates: 0,
                    completedSteps: (casesData as DBCase[])?.reduce((acc: number, c: DBCase) => acc + (c.documents?.filter((d: DBDocument) => d.status === 'approved').length || 0), 0) || 0
                });

            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, [user, setCases]);

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
                                {user?.role?.toUpperCase() || 'CLIENT'} DASHBOARD
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
                                Welcome back, {user?.full_name?.split(' ')[0] || 'User'}
                            </h1>
                            <p className="mt-2 text-[0.9rem]" style={{ color: 'rgba(194,221,216,0.65)' }}>
                                {stats.active} active cases · {stats.pendingDocs} documents pending
                            </p>
                        </div>
                        <Link href="/apply">
                            <Button variant="primary" size="md" className="group hidden md:flex mb-2">
                                <Plus size={16} />
                                New Application
                            </Button>
                        </Link>
                    </div>

                    {/* Stat strip */}
                    <div
                        className="grid grid-cols-2 md:grid-cols-4 gap-px"
                        style={{ borderTop: '1px solid rgba(194,221,216,0.1)' }}
                    >
                        {[
                            { label: 'Active Cases', value: stats.active, Icon: Scale },
                            { label: 'Pending Docs', value: stats.pendingDocs, Icon: FileText },
                            { label: 'Upcoming Dates', value: stats.upcomingDates, Icon: Clock },
                            { label: 'Completed Steps', value: stats.completedSteps, Icon: CheckCircle2 },
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
                            {isLoading ? (
                                Array(2).fill(0).map((_, i) => <CardSkeleton key={i} />)
                            ) : cases.length > 0 ? (
                                cases.map((c) => (
                                    <DashboardCaseCard key={c.id} {...(c as unknown as TransformedCase)} />
                                ))
                            ) : (
                                <Card className="p-12 text-center flex flex-col items-center border-dashed border-2">
                                    <FileText size={48} className="text-[#9d9daa] mb-4 opacity-20" />
                                    <h3 className="text-xl font-bold text-[#000042] mb-2">No active cases yet</h3>
                                    <p className="text-[#6b6b7e] mb-6 max-w-[300px]">Start your immigration journey by opening your first case.</p>
                                    <Link href="/apply">
                                        <Button variant="primary">Apply for Service</Button>
                                    </Link>
                                </Card>
                            )}
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
                                <Link href="/apply">
                                    <Button variant="outline" size="sm" className="w-full justify-start">
                                        <Plus size={14} />
                                        Open New Case
                                    </Button>
                                </Link>
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
}: {
    id: string;
    title: string;
    subtitle: string;
    progress: number;
    nextStep: string;
    dueDate: string;
    status: string;
    docsReady: number;
    docsTotal: number;
}) {
    const statusBadge: 'info' | 'warning' | 'success' = status === 'In Review' ? 'info' : status === 'Approved' ? 'success' : 'warning';

    return (
        <Card variant="elevated" className="p-6 group hover:translate-y-[-2px] transition-transform duration-200">
            <div className="flex flex-wrap items-start gap-3 justify-between mb-4">
                <div>
                    <span className="mono-label">{id?.slice(0, 8).toUpperCase()}</span>
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
                        {docsReady}/{docsTotal} documents verified
                    </span>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="secondary" size="sm">
                        <Upload size={12} />
                        Upload
                    </Button>
                </div>
            </div>
        </Card>
    );
}
