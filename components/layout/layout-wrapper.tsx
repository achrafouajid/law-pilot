"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/button';
import { useStore } from '@/store/useStore';
import { Scale, User, LogOut, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useStore();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isActive = (path: string) => pathname === path;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-sans)', backgroundColor: 'var(--surface-primary)', color: 'var(--text-primary)' }}>
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* ─── Navigation ─── */}
      <header
        className="sticky top-0 z-50 w-full transition-all duration-300"
        style={{
          backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(250,249,246,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: isScrolled
            ? '1px solid rgba(0,0,66,0.1)'
            : '1px solid rgba(0,0,66,0.05)',
          boxShadow: isScrolled
            ? '0 4px 24px rgba(0,0,66,0.06)'
            : 'none',
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between" style={{ height: '72px' }}>

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="Law Pilot — Home"
          >
            <div
              className="flex items-center justify-center rounded-[8px] transition-all duration-300 group-hover:scale-110"
              style={{
                width: 36, height: 36,
                background: 'linear-gradient(135deg, #b6912c, #d8b23d)',
                boxShadow: '0 2px 12px rgba(216,178,61,0.3)',
              }}
            >
              <Scale size={18} color="#000042" strokeWidth={2.5} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.3rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#000042',
              }}
            >
              Law Pilot
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            <NavLink href="/#services" label="Services" isActive={isActive('/#services')} />
            <NavLink href="/apply" label="Start Application" isActive={isActive('/apply')} />
            {user && (
              <NavLink href="/dashboard" label="Dashboard" isActive={isActive('/dashboard')} />
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <div className="flex items-center gap-2 pr-3" style={{ borderRight: '1px solid rgba(0,0,66,0.1)' }}>
                  <div
                    className="flex items-center justify-center rounded-full overflow-hidden"
                    style={{
                      width: 32, height: 32,
                      background: 'rgba(0,0,66,0.07)',
                      border: '1px solid rgba(0,0,66,0.12)',
                    }}
                  >
                    {user.avatar_url ? (
                      <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                    ) : (
                      <User size={14} color="#000042" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[0.8125rem] font-medium leading-none" style={{ color: '#000042' }}>
                      {user.full_name || user.email?.split('@')[0]}
                    </span>
                    {user.state && (
                      <span className="text-[0.625rem] font-medium opacity-60 uppercase tracking-wider mt-0.5">
                        {user.state}
                      </span>
                    )}
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => signOut()} aria-label="Sign out">
                  <LogOut size={14} />
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary" size="sm">Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-[8px] text-[#000042] hover:bg-[rgba(0,0,66,0.06)] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="md:hidden fixed inset-0 top-[72px] z-40"
            style={{ backgroundColor: 'rgba(250,249,246,0.98)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,0,66,0.08)' }}
          >
            <nav className="flex flex-col gap-1 p-6" aria-label="Mobile navigation">
              <MobileNavLink href="/#services" label="Services" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/apply" label="Start Application" onClick={() => setIsMobileMenuOpen(false)} />
              {user ? (
                <>
                  <div className="px-4 py-4 mb-2 flex items-center gap-3 bg-[rgba(0,0,66,0.03)] rounded-[12px]">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-[rgba(0,0,66,0.1)]">
                      {user.avatar_url ? (
                        <img src={user.avatar_url} alt={user.full_name || 'User'} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[rgba(0,0,66,0.07)]">
                          <User size={18} color="#000042" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-bold text-[#000042]">
                        {user.full_name || user.email?.split('@')[0]}
                      </span>
                      {user.state && (
                        <span className="text-[0.625rem] font-bold text-[#d8b23d] uppercase tracking-widest mt-0.5">
                          {user.state}
                        </span>
                      )}
                    </div>
                  </div>
                  <MobileNavLink href="/dashboard" label="Dashboard" onClick={() => setIsMobileMenuOpen(false)} />
                  <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,66,0.08)' }}>
                    <Button onClick={() => { signOut(); setIsMobileMenuOpen(false); }} variant="outline" className="w-full">
                      <LogOut size={14} />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,0,66,0.08)' }}>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* ─── Footer ─── */}
      <footer style={{ backgroundColor: '#000042', color: 'rgba(194,221,216,0.8)' }}>
        {/* Gold divider */}
        <div className="divider-gold" />

        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-5">
                <div
                  className="flex items-center justify-center rounded-[8px]"
                  style={{
                    width: 36, height: 36,
                    background: 'linear-gradient(135deg, #b6912c, #d8b23d)',
                  }}
                >
                  <Scale size={18} color="#000042" strokeWidth={2.5} />
                </div>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 800, letterSpacing: '-0.03em', color: '#faf9f6' }}>
                  Law Pilot
                </span>
              </div>
              <p className="text-[0.9rem] leading-relaxed max-w-xs" style={{ color: 'rgba(194,221,216,0.7)' }}>
                Secure, intelligent case management for modern legal professionals.
              </p>
              <div className="divider-gold mt-6" style={{ maxWidth: 80, opacity: 0.6 }} />
            </div>

            {/* Links */}
            <FooterSection title="Product" links={['Features', 'Security', 'Enterprise', 'Changelog']} />
            <FooterSection title="Company" links={['About', 'Careers', 'Blog', 'Contact']} />
          </div>

          <div
            className="mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[0.8125rem]"
            style={{ borderTop: '1px solid rgba(194,221,216,0.12)', color: 'rgba(194,221,216,0.45)' }}
          >
            <p>© {new Date().getFullYear()} Law Pilot. All rights reserved.</p>
            <div className="flex gap-5">
              {['Privacy', 'Terms', 'Cookie Policy'].map((item) => (
                <a key={item} href="#" className="hover:text-[#d8b23d] transition-colors duration-150">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Helper sub-components ── */

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className="relative font-medium text-[0.8125rem] tracking-wide transition-colors duration-150"
      style={{
        fontFamily: 'var(--font-sans)',
        letterSpacing: '0.02em',
        color: isActive ? '#d8b23d' : '#3a3a4a',
      }}
    >
      {label}
      {/* Underline */}
      <span
        className="absolute left-0 bottom-[-3px] h-[1.5px] rounded-full transition-all duration-200"
        style={{
          width: isActive ? '100%' : '0%',
          background: '#d8b23d',
        }}
      />
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center px-4 py-3 rounded-[8px] font-medium text-[1rem] transition-colors duration-150"
      style={{ color: '#000042', fontFamily: 'var(--font-sans)' }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(0,0,66,0.05)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      {label}
    </Link>
  );
}

function FooterSection({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4
        className="mb-5 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase"
        style={{ fontFamily: 'var(--font-sans)', color: '#d8b23d' }}
      >
        {title}
      </h4>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[0.875rem] transition-colors duration-150 hover:text-[#faf9f6]"
              style={{ color: 'rgba(194,221,216,0.6)' }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
