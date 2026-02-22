"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Divider } from "@/components/ui/divider";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { Scale, Mail, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // auth logic here
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
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(ellipse at 30% 60%, rgba(216,178,61,0.08) 0%, transparent 60%)',
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
                    <span
                        style={{
                            fontFamily: 'var(--font-serif)',
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            letterSpacing: '-0.03em',
                            color: '#faf9f6',
                        }}
                    >
                        Law Pilot
                    </span>
                </div>

                {/* Quote */}
                <blockquote className="relative z-10">
                    <div className="divider-gold mb-6" style={{ maxWidth: 60 }} />
                    <p
                        style={{
                            fontFamily: 'var(--font-accent)',
                            fontSize: 'clamp(1.35rem, 2.5vw, 1.75rem)',
                            fontStyle: 'italic',
                            color: '#faf9f6',
                            lineHeight: 1.45,
                            letterSpacing: '0.01em',
                        }}
                    >
                        &quot;Justice is the constant and perpetual will to render to every man his due.&quot;
                    </p>
                    <cite
                        className="block mt-4 text-[0.8rem] not-italic tracking-[0.06em] uppercase"
                        style={{ color: '#d8b23d', fontFamily: 'var(--font-mono)' }}
                    >
                        — Justinian I, Corpus Juris Civilis
                    </cite>
                </blockquote>

                {/* Bottom decoration */}
                <div className="relative z-10">
                    <div
                        className="w-full h-px mb-6"
                        style={{ background: 'rgba(194,221,216,0.12)' }}
                    />
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#d8b23d' }} />
                        <span className="text-[0.75rem] font-medium tracking-wide" style={{ color: 'rgba(194,221,216,0.5)' }}>
                            SOC 2 · GDPR · Bank-level encryption
                        </span>
                    </div>
                </div>
            </div>

            {/* Right — Form */}
            <div className="flex-1 flex items-center justify-center p-8" style={{ backgroundColor: '#ffffff' }}>
                <div className="w-full max-w-[420px]">

                    {/* Header */}
                    <div className="mb-10">
                        <span className="mono-label block mb-4">SECURE ACCESS</span>
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
                            Welcome back
                        </h1>
                        <p className="text-[0.9rem]" style={{ color: '#6b6b7e' }}>
                            Sign in to access your legal dashboard.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <Input
                            label="Email address"
                            type="email"
                            id="login-email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            leftIcon={<Mail size={15} />}
                            autoComplete="email"
                            required
                        />
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                id="login-password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                leftIcon={<Lock size={15} />}
                                autoComplete="current-password"
                                required
                            />
                            <div className="flex justify-end mt-2">
                                <a
                                    href="#"
                                    className="text-[0.8125rem] font-medium transition-colors duration-150 hover:text-[#d8b23d]"
                                    style={{ color: '#54848c' }}
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="w-full mt-2 group"
                        >
                            Sign In
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </Button>
                    </form>

                    {/* Google OAuth Button */}
                    <div className="mt-6">
                        <GoogleAuthButton />
                    </div>

                    {/* Divider */}
                    <Divider label="or" className="my-8" />

                    {/* Sign up prompt */}
                    <p className="text-center text-[0.875rem]" style={{ color: '#6b6b7e' }}>
                        Don&apos;t have an account?{' '}
                        <Link
                            href="/signup"
                            className="font-semibold transition-colors duration-150 hover:text-[#b6912c]"
                            style={{ color: '#d8b23d' }}
                        >
                            Create one free
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
