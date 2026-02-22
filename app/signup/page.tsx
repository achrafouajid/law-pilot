"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { Scale, Mail, Lock, User, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);

    const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="min-h-[calc(100vh-72px)] flex">

            {/* Left — Decorative panel (navy) */}
            <div
                className="hidden lg:flex flex-col justify-between w-[42%] p-16 relative overflow-hidden"
                style={{ backgroundColor: '#000042' }}
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 70% 40%, rgba(84,132,140,0.1) 0%, transparent 60%)',
                    }}
                />

                {/* Top brand */}
                <div className="flex items-center gap-2.5 relative z-10">
                    <div
                        className="flex items-center justify-center rounded-[8px]"
                        style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #b6912c, #d8b23d)' }}
                    >
                        <Scale size={18} color="#000042" strokeWidth={2.5} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#faf9f6' }}>
                        Law Pilot
                    </span>
                </div>

                {/* Benefits */}
                <div className="relative z-10">
                    <div className="divider-gold mb-8" style={{ maxWidth: 60 }} />
                    <h2
                        style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)', fontWeight: 700, color: '#faf9f6', lineHeight: 1.2, letterSpacing: '-0.025em', marginBottom: '1.75rem' }}
                    >
                        Your legal journey,<br />
                        <span className="text-gold-gradient">crystal clear</span>
                    </h2>

                    <ul className="space-y-4">
                        {[
                            'Manage all your cases in one secure place',
                            'Real-time timeline with every milestone',
                            'Direct collaboration with your lawyer',
                            'AI-powered document checklist',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-3">
                                <CheckCircle2 size={16} style={{ color: '#d8b23d', marginTop: 2, flexShrink: 0 }} />
                                <span className="text-[0.9rem] leading-snug" style={{ color: 'rgba(194,221,216,0.8)' }}>
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Bottom */}
                <div className="relative z-10">
                    <div className="w-full h-px mb-5" style={{ background: 'rgba(194,221,216,0.12)' }} />
                    <p className="text-[0.75rem]" style={{ color: 'rgba(194,221,216,0.4)' }}>
                        No credit card required. 14-day free trial.
                    </p>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: '#ffffff' }}>
                <div className="w-full max-w-[420px]">

                    {/* Header */}
                    <div className="mb-10">
                        <span className="mono-label block mb-4">FREE TRIAL</span>
                        <h1
                            style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
                                fontWeight: 900,
                                color: '#000042',
                                letterSpacing: '-0.03em',
                                lineHeight: 1.1,
                                marginBottom: '0.75rem',
                            }}
                        >
                            Create your account
                        </h1>
                        <p className="text-[0.9rem]" style={{ color: '#6b6b7e' }}>
                            Start managing your legal cases with confidence.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Full name"
                            type="text"
                            id="signup-name"
                            placeholder="Jane Doe"
                            value={form.name}
                            onChange={set('name')}
                            leftIcon={<User size={15} />}
                            autoComplete="name"
                            required
                        />
                        <Input
                            label="Email address"
                            type="email"
                            id="signup-email"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={set('email')}
                            leftIcon={<Mail size={15} />}
                            autoComplete="email"
                            required
                        />
                        <Input
                            label="Password"
                            type="password"
                            id="signup-password"
                            placeholder="Min. 8 characters"
                            value={form.password}
                            onChange={set('password')}
                            leftIcon={<Lock size={15} />}
                            autoComplete="new-password"
                            hint="Use at least 8 characters with a number and symbol."
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full mt-2 group"
                        >
                            Create Account
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>

                        <p className="text-center text-[0.75rem] leading-relaxed" style={{ color: '#9d9daa' }}>
                            By creating an account, you agree to our{' '}
                            <a href="#" className="underline hover:text-[#d8b23d] transition-colors">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="underline hover:text-[#d8b23d] transition-colors">Privacy Policy</a>.
                        </p>
                    </form>

                    {/* Google OAuth Button */}
                    <div className="mt-6">
                        <GoogleAuthButton />
                    </div>

                    <Divider label="or" className="my-8" />

                    <p className="text-center text-[0.875rem]" style={{ color: '#6b6b7e' }}>
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold transition-colors duration-150 hover:text-[#b6912c]"
                            style={{ color: '#d8b23d' }}
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
