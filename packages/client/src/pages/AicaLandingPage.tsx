/**
 * AICA Landing Page
 * ─────────────────────────────────────────────────────────────
 * Fonts already configured in your CSS — no new installs needed.
 *   DM Sans     → font-sans   (body copy)
 *   Space Grotesk → var(--font-heading) (headings, applied inline)
 *
 * Brand accent: Add these two lines to your :root {} block:
 *   --brand:        oklch(0.62 0.18 195);
 *   --brand-fg:     oklch(0.98 0 0);
 * Then replace the A.* inline styles with var(--brand) etc.
 * ─────────────────────────────────────────────────────────────
 */

'use client';

import { useState, useEffect } from 'react';
import {
  Compass,
  Brain,
  Target,
  GraduationCap,
  Briefcase,
  ArrowRight,
  Check,
  Zap,
  BookOpen,
  TrendingUp,
  Menu,
  X,
  Route,
  Star,
  UserCheck,
  BarChart3,
  Users,
  MessageCircle,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

// ── Brand accent tokens ───────────────────────────────────────────────────────
const A = {
  base: 'oklch(0.62 0.18 195)',
  hover: 'oklch(0.55 0.20 195)',
  subtle: 'oklch(0.94 0.05 195)',
  muted: 'oklch(0.78 0.09 195)',
  fg: 'oklch(0.98 0 0)',
};

// ── CSS keyframes (injected once via <style>) ─────────────────────────────────
const STYLES = `
  @keyframes aica-fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes aica-fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes aica-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-8px) rotate(0.5deg); }
    66%       { transform: translateY(-4px) rotate(-0.5deg); }
  }
  @keyframes aica-badge-float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-6px); }
  }
  .afu  { animation: aica-fade-up  0.65s cubic-bezier(0.16,1,0.3,1) forwards; opacity: 0; }
  .afi  { animation: aica-fade-in  0.7s  ease                        forwards; opacity: 0; }
  .afl  { animation: aica-float    6s    ease-in-out infinite; }
  .abfl { animation: aica-badge-float 4s ease-in-out infinite; }
  .d1 { animation-delay:  80ms; }
  .d2 { animation-delay: 180ms; }
  .d3 { animation-delay: 280ms; }
  .d4 { animation-delay: 380ms; }
  .d5 { animation-delay: 480ms; }
  .d6 { animation-delay: 620ms; }
  .d7 { animation-delay: 780ms; }
  .d8 { animation-delay: 980ms; }
`;

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = ['Features', 'How It Works', 'For You', 'About'];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-[0_1px_0_0_var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div
            className="w-8 h-8 rounded-[10px] flex items-center justify-center shadow-sm transition-transform duration-200 group-hover:scale-105"
            style={{ background: A.base }}
          >
            <Compass
              className="w-4 h-4"
              strokeWidth={2.5}
              style={{ color: A.fg }}
            />
          </div>
          <span
            className="text-[1.1rem] font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AICA
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-1"
          >
            Sign In
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-sm font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
            style={{ background: A.base, color: A.fg }}
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors -mr-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl px-5 py-3 space-y-0.5">
          {navLinks.map((l) => (
            <a
              key={l}
              href="#"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {l}
              <ChevronRight className="w-4 h-4 opacity-40" />
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#"
              className="py-2.5 px-3 text-sm font-medium text-muted-foreground text-center"
            >
              Sign In
            </a>
            <a
              href="#"
              className="py-3 px-3 rounded-xl text-sm font-semibold text-center"
              style={{ background: A.base, color: A.fg }}
            >
              Get Started Free
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

// ── Assessment Card (hero mock UI) ────────────────────────────────────────────
function AssessmentCard() {
  const options = [
    {
      label: 'Analytical — I prefer data and structured thinking',
      active: false,
    },
    { label: 'Creative — I explore ideas and visual solutions', active: true },
    { label: 'Collaborative — I build through teamwork', active: false },
  ];

  return (
    <div
      className="relative w-full max-w-[370px] rounded-2xl border border-border bg-card overflow-hidden"
      style={{
        boxShadow: `0 28px 80px -16px oklch(0.62 0.18 195 / 0.22), 0 6px 24px -8px oklch(0 0 0 / 0.12)`,
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-border">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{ background: A.subtle }}
            >
              <Brain className="w-3.5 h-3.5" style={{ color: A.base }} />
            </div>
            <span className="text-[11px] font-bold tracking-[0.08em] uppercase text-muted-foreground">
              Profile Assessment
            </span>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            Step 2 / 5
          </span>
        </div>

        {/* Progress */}
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: '40%',
              background: A.base,
              transition: 'width 0.6s ease',
            }}
          />
        </div>
      </div>

      {/* Question body */}
      <div className="px-5 py-4">
        <p className="text-[13px] font-semibold text-foreground leading-relaxed mb-3.5">
          What best describes your problem-solving style?
        </p>

        <div className="space-y-2">
          {options.map((opt, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all"
              style={
                opt.active
                  ? { borderColor: A.base, background: A.subtle }
                  : { borderColor: 'var(--border)' }
              }
            >
              <div
                className="w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                style={
                  opt.active
                    ? { borderColor: A.base, background: A.base }
                    : { borderColor: 'var(--border)' }
                }
              >
                {opt.active && (
                  <div className="w-1.5 h-1.5 rounded-full bg-white" />
                )}
              </div>
              <span
                className="text-[11.5px] font-medium leading-tight"
                style={{
                  color: opt.active ? A.base : 'var(--muted-foreground)',
                }}
              >
                {opt.label}
              </span>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          className="mt-4 w-full py-2.5 rounded-xl text-[13px] font-semibold transition-opacity hover:opacity-90"
          style={{ background: A.base, color: A.fg }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// ── Floating result badge ─────────────────────────────────────────────────────
interface FloatingBadgeProps {
  style?: React.CSSProperties;
  delay?: string;
  children: React.ReactNode;
}

function FloatingBadge({ style, delay = '0ms', children }: FloatingBadgeProps) {
  return (
    <div
      className="absolute px-3.5 py-2.5 rounded-xl bg-card border border-border text-xs font-semibold whitespace-nowrap abfl"
      style={{
        boxShadow: '0 4px 20px -4px oklch(0 0 0 / 0.14)',
        animationDelay: delay,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.80 0 0) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          opacity: 0.5,
        }}
      />
      {/* Teal glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% -5%, oklch(0.90 0.06 195 / 0.35) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* ── Left: copy ─────────────────────────── */}
          <div className="flex-1 max-w-[580px] lg:max-w-none lg:w-[52%]">
            {/* Badge */}
            <div
              className="afu d1 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-6"
              style={{
                borderColor: A.muted,
                background: A.subtle,
                color: A.base,
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Career Alignment
            </div>

            {/* Headline */}
            <h1
              className="afu d2 text-5xl sm:text-6xl lg:text-[4.5rem] font-bold leading-[1.04] tracking-tight mb-5"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Discover your
              <br />
              <span style={{ color: A.base }}>right path.</span>
            </h1>

            {/* Sub-copy */}
            <p className="afu d3 text-lg text-muted-foreground leading-relaxed max-w-[500px] mb-8">
              AICA analyzes your strengths, interests, and goals — then delivers
              personalized academic and career guidance with a concrete roadmap
              you can actually act on.
            </p>

            {/* CTAs */}
            <div className="afu d4 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: A.base, color: A.fg }}
              >
                Start Free Assessment
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold border border-border hover:bg-muted transition-all text-foreground"
              >
                See How It Works
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>

            {/* Social proof */}
            <div className="afu d5 flex items-center gap-3">
              <div className="flex -space-x-2">
                {(['#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b'] as const).map(
                  (c, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center"
                      style={{ background: c }}
                    >
                      <span className="text-[10px] font-bold text-white">
                        {['S', 'A', 'M', 'J'][i]}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">12,000+</span>{' '}
                students guided ·
                <span className="inline-flex gap-0.5 ml-1 align-middle">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400 inline"
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: visual ───────────────────────── */}
          <div className="afi d6 flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main floating card */}
              <div className="afl">
                <AssessmentCard />
              </div>

              {/* Floating badge — top right */}
              <FloatingBadge
                delay="300ms"
                style={{ top: '-18px', right: '-14px' }}
              >
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ background: A.base }}
                  />
                  Top Match:{' '}
                  <strong className="ml-0.5" style={{ color: A.base }}>
                    UX Design
                  </strong>
                </div>
              </FloatingBadge>

              {/* Floating badge — bottom left */}
              <FloatingBadge
                delay="600ms"
                style={{ bottom: '-16px', left: '-14px' }}
              >
                <div className="flex items-center gap-1.5">
                  <TrendingUp
                    className="w-3.5 h-3.5"
                    style={{ color: A.base }}
                  />
                  <span>
                    92%{' '}
                    <span className="text-muted-foreground font-normal">
                      Alignment Score
                    </span>
                  </span>
                </div>
              </FloatingBadge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Stats bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: '12,000+', label: 'Students Guided' },
    { value: '200+', label: 'Career Pathways' },
    { value: '94%', label: 'Match Satisfaction' },
    { value: '5 min', label: 'To Get Your Roadmap' },
  ];

  return (
    <div className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-7">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:px-10">
              <p
                className="text-3xl font-bold tracking-tight mb-1"
                style={{ fontFamily: 'var(--font-heading)', color: A.base }}
              >
                {s.value}
              </p>
              <p className="text-sm text-muted-foreground font-medium">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Problem section ───────────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      icon: GraduationCap,
      title: 'Academic Mismatch',
      description:
        'Students choose faculties based on family pressure or surface-level tests — not on their actual strengths, interests, or long-term ambitions.',
    },
    {
      icon: Brain,
      title: 'Decision Paralysis',
      description:
        'With hundreds of pathways and conflicting advice, most people freeze entirely. The options feel endless and the right answer invisible.',
    },
    {
      icon: Compass,
      title: 'No Personalized Guidance',
      description:
        "Traditional counseling can't scale. Most students never receive advice genuinely tailored to who they are — and what they could become.",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
            style={{ color: A.base }}
          >
            The Problem
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The guidance gap is real.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[500px] mx-auto leading-relaxed">
            Every year, millions make critical decisions with generic advice
            that doesn't reflect who they truly are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-md transition-all duration-200"
            >
              <div
                className="w-11 h-11 rounded-[12px] flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105"
                style={{ background: A.subtle }}
              >
                <p.icon className="w-5 h-5" style={{ color: A.base }} />
              </div>
              <h3
                className="text-lg font-semibold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How It Works ──────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: UserCheck,
      title: 'Build Your Profile',
      description:
        'Complete a structured assessment covering interests, strengths, learning style, and goals. No vague personality tests — real, guided questions designed for academic and career alignment.',
      pill: '~5 min · Completely private',
    },
    {
      num: '02',
      icon: Target,
      title: 'AI-Powered Matching',
      description:
        'AICA maps your profile against 200+ curated pathways using transparent rules, then generates clear and explainable recommendations. You always understand why a path was suggested.',
      pill: 'Instant · Transparent logic',
    },
    {
      num: '03',
      icon: Route,
      title: 'Get Your Roadmap',
      description:
        'Receive a personalized action plan: suggested faculties, relevant courses, skills to build, and concrete next steps — all tailored specifically to you and where you want to go.',
      pill: 'Full roadmap · Actionable steps',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
            style={{ color: A.base }}
          >
            How It Works
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Three steps to clarity.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {/* Connector line */}
          <div
            className="hidden md:block absolute top-5 h-px"
            style={{
              left: 'calc(16.67% + 20px)',
              right: 'calc(16.67% + 20px)',
              background: `linear-gradient(90deg, transparent, ${A.base}, transparent)`,
              opacity: 0.35,
            }}
          />

          {steps.map((step, i) => (
            <div key={i} className="flex flex-col">
              {/* Circle + big number */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="relative z-10 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-background"
                  style={{ borderColor: A.base }}
                >
                  <step.icon className="w-4 h-4" style={{ color: A.base }} />
                </div>
                <span
                  className="text-6xl font-black leading-none select-none"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    color: A.base,
                    opacity: 0.12,
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h3
                className="text-xl font-bold text-foreground mb-2"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                {step.description}
              </p>

              <div
                className="inline-flex items-center gap-1.5 self-start text-xs font-medium px-3 py-1.5 rounded-full"
                style={{ background: A.subtle, color: A.base }}
              >
                <Check className="w-3 h-3" />
                {step.pill}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features section ──────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: UserCheck,
      title: 'Deep User Profiling',
      description:
        'Structured inputs that go beyond surface preferences — interests, strengths, values, and goals captured in a usable, privacy-first form.',
    },
    {
      icon: Target,
      title: 'Intelligent Matching',
      description:
        'Profile-based rules compare you against curated pathways with full transparency. You always see why each path was recommended.',
    },
    {
      icon: MessageCircle,
      title: 'AI-Generated Explanations',
      description:
        'Every recommendation is explained in plain language, helping you understand the reasoning so you can own the decision yourself.',
    },
    {
      icon: Route,
      title: 'Personalized Roadmaps',
      description:
        'Concrete next steps, suggested qualifications, and skill-building plans built specifically around your chosen path and current starting point.',
    },
    {
      icon: BookOpen,
      title: 'Learning Pathway Curation',
      description:
        'Discover relevant courses, certifications, and resources that align with your goals — filtered to your level and available time.',
    },
    {
      icon: BarChart3,
      title: 'Progress Tracking',
      description:
        'Monitor your exploration journey, revisit past assessments, and update your profile as your goals grow and evolve.',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
            style={{ color: A.base }}
          >
            Features
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Everything to decide
            <br className="hidden sm:block" /> with confidence.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-200 cursor-default"
            >
              <div
                className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110"
                style={{ background: A.subtle }}
              >
                <f.icon className="w-5 h-5" style={{ color: A.base }} />
              </div>
              <h3
                className="text-base font-semibold text-foreground mb-1.5"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── For Who section ───────────────────────────────────────────────────────────
function ForWhoSection() {
  const audiences = [
    {
      icon: GraduationCap,
      label: 'Students',
      title: 'Choosing the Right Faculty',
      description:
        "You're entering higher education and the pressure to pick the right major is overwhelming. AICA helps you choose based on who you actually are — not family expectations or guess work.",
      bullets: [
        'Faculty and degree matching',
        'Strength-based guidance',
        'Long-term career alignment',
      ],
    },
    {
      icon: Users,
      label: 'Graduates',
      title: 'Exploring Your Career Path',
      description:
        "You've completed your studies and now face the real question: what's next? AICA maps your skills and interests to real career opportunities you can actually pursue.",
      bullets: [
        'Career pathway exploration',
        'Skill gap identification',
        'Industry direction clarity',
      ],
    },
    {
      icon: Briefcase,
      label: 'Career Changers',
      title: 'Pivoting with Confidence',
      description:
        "You're ready for a new direction but unsure where to start. AICA builds a structured transition plan — from where you are today to the career you want to build.",
      bullets: [
        'Transition roadmaps',
        'Transferable skill mapping',
        'Short course recommendations',
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card border-y border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
            style={{ color: A.base }}
          >
            Who It's For
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Built for people
            <br className="hidden sm:block" /> at crossroads.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <div
              key={i}
              className="p-7 rounded-2xl border border-border bg-background hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-[12px] flex items-center justify-center"
                  style={{ background: A.subtle }}
                >
                  <a.icon className="w-5 h-5" style={{ color: A.base }} />
                </div>
                <span
                  className="text-[11px] font-bold tracking-[0.12em] uppercase"
                  style={{ color: A.base }}
                >
                  {a.label}
                </span>
              </div>

              <h3
                className="text-xl font-bold text-foreground mb-3 leading-snug"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {a.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {a.description}
              </p>

              <ul className="space-y-2 pt-4 border-t border-border">
                {a.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                  >
                    <Check
                      className="w-4 h-4 flex-shrink-0"
                      style={{ color: A.base }}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I was completely stuck between Engineering and Product Design for two years. AICA helped me understand that my strengths pointed clearly toward HCI. Best decision I've made.",
      name: 'Sarah M.',
      role: 'Studying Human-Computer Interaction',
      initial: 'S',
      color: '#0ea5e9',
    },
    {
      quote:
        'After 6 years in accounting I needed a change but had zero idea where to start. The roadmap AICA gave me helped me transition into data analytics in under 12 months.',
      name: 'James K.',
      role: 'Data Analyst at a FinTech startup',
      initial: 'J',
      color: '#8b5cf6',
    },
    {
      quote:
        "Every counselor told me to just 'follow my passion.' AICA actually showed me which faculties fit my profile, exactly why, and what skills I should build first.",
      name: 'Nadia R.',
      role: 'Computer Science student, 2nd year',
      initial: 'N',
      color: '#10b981',
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <p
            className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
            style={{ color: A.base }}
          >
            Testimonials
          </p>
          <h2
            className="text-4xl md:text-5xl font-bold tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Real people,
            <br className="hidden sm:block" /> real clarity.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-border bg-card flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-3 border-t border-border">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: t.color }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── CTA section ───────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-foreground text-gray-900 relative overflow-hidden">
      {/* Subtle teal radial in dark section */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, oklch(0.62 0.18 195 / 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        {/* Pill */}
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold mb-7"
          style={{
            borderColor: 'oklch(1 0 0 / 0.12)',
            background: 'oklch(1 0 0 / 0.07)',
            color: A.muted,
          }}
        >
          <Zap className="w-3.5 h-3.5" />
          Free to start · No account required
        </div>

        {/* Heading */}
        <h2
          className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.05] mb-5"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'oklch(0.97 0 0)',
          }}
        >
          Ready to find
          <br />
          your path?
        </h2>

        <p
          className="text-lg leading-relaxed mb-9 max-w-[480px] mx-auto"
          style={{ color: 'oklch(0.72 0 0)' }}
        >
          Take the 5-minute assessment and receive a personalized academic or
          career roadmap built around who you actually are.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: A.base, color: A.fg }}
          >
            Start Free Assessment
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
            style={{
              borderColor: 'oklch(1 0 0 / 0.14)',
              color: 'oklch(0.82 0 0)',
            }}
          >
            Learn More
          </a>
        </div>

        <p className="mt-5 text-xs" style={{ color: 'oklch(0.48 0 0)' }}>
          No credit card · No account · 5 minutes
        </p>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  const cols = {
    Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div
                className="w-7 h-7 rounded-[8px] flex items-center justify-center"
                style={{ background: A.base }}
              >
                <Compass
                  className="w-3.5 h-3.5"
                  strokeWidth={2.5}
                  style={{ color: A.fg }}
                />
              </div>
              <span
                className="text-[1rem] font-bold tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                AICA
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[190px]">
              AI-powered guidance for academic and career decisions.
            </p>
          </div>

          {/* Link columns */}
          {(Object.entries(cols) as [string, string[]][]).map(
            ([section, items]) => (
              <div key={section}>
                <p className="text-xs font-bold tracking-wider uppercase text-foreground mb-3.5">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AICA. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with TypeScript · Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
export default function AicaLandingPage() {
  return (
    <>
      <style>{STYLES}</style>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <StatsBar />
          <ProblemSection />
          <HowItWorksSection />
          <FeaturesSection />
          <ForWhoSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
}
