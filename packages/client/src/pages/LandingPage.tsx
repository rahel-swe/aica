import AppLogo from '@/components/app-logo';
import HeroSection from '@/components/landing/hero-section';
import { Navbar } from '@/components/landing/navbar';
import RoadmapStepsPreview from '@/components/roadmap/roadmap-steps-preview';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Brain,
  Briefcase,
  Check,
  GraduationCap,
  Map,
  MessageCircle,
  Route,
  Star,
  Target,
  UserCheck,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

function StatsBar() {
  const stats = [
    { value: '12,000+', label: 'Students Guided', color: 'text-emerald-500' },
    { value: '200+', label: 'Career Pathways', color: 'text-sky-500' },
    { value: '94%', label: 'Match Satisfaction', color: 'text-violet-500' },
    { value: '5 min', label: 'To Your Roadmap', color: 'text-amber-500' },
  ];

  return (
    <div className="border-y border-border bg-card">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-border">
          {stats.map((s, i) => (
            <div key={i} className="text-center md:px-10">
              <p
                className={cn(
                  'text-3xl font-bold tracking-tight mb-1',
                  s.color
                )}
                style={{ fontFamily: 'var(--font-heading)' }}
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

// ── Problem section ────────────────────────────────────────────────────────────
function ProblemSection() {
  const problems = [
    {
      icon: GraduationCap,
      iconCls: 'text-rose-500',
      bgCls: 'bg-rose-400/10',
      title: 'Academic Mismatch',
      description:
        'Students choose faculties based on family pressure or surface-level tests — not on their actual strengths, interests, or long-term ambitions.',
    },
    {
      icon: Brain,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: 'Decision Paralysis',
      description:
        'With hundreds of pathways and conflicting advice, most people freeze. The options feel endless and the right answer invisible.',
    },
    {
      icon: Users,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-400/10',
      title: 'No Personalized Guidance',
      description:
        "Traditional counseling can't scale. Most students never receive advice genuinely tailored to who they are — and what they could become.",
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The guidance gap is real.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[500px] mx-auto font-heading">
            Every year, millions make critical decisions with generic advice
            that doesn't reflect who they truly are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {problems.map((p, i) => (
            <div key={i} className="group p-7 transition-all duration-200">
              <div
                className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-105 border',
                  p.bgCls
                )}
              >
                <p.icon className={cn('w-6 h-6', p.iconCls)} />
              </div>
              <h3
                className="text-lg font-bold text-foreground mb-2"
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

// ── How It Works ───────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      icon: UserCheck,
      iconCls: 'text-emerald-500',
      bgCls: 'bg-emerald-400/10',
      title: 'Build Your Profile',
      description:
        'Complete a guided assessment covering interests, strengths, and goals. Designed for real alignment — not surface-level personality tests.',
      pill: '~5 min · Private',
    },
    {
      num: '02',
      icon: Target,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      title: 'AI-Powered Matching',
      description:
        'AICA maps your profile against 200+ curated pathways with full transparency. You always understand why a path was suggested.',
      pill: 'Instant · Explainable',
    },
    {
      num: '03',
      icon: Map,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: 'Get Your Roadmap',
      description:
        'Receive a concrete action plan: faculties, courses, skills to build, and next steps — all tailored to your exact profile.',
      pill: 'Full plan · Actionable',
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-card border-y border-border"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Three steps to clarity.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-10 relative">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={cn(
                    'relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center border border-border bg-background',
                    step.bgCls
                  )}
                >
                  <step.icon className={cn('w-5 h-5', step.iconCls)} />
                </div>
                <span
                  className="text-5xl font-black leading-none select-none opacity-[0.07]"
                  style={{ fontFamily: 'var(--font-heading)' }}
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

              <div className="inline-flex items-center gap-1.5 self-start text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
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

function RoadmapPreviewSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* Left: copy */}
          <div className="flex-1 max-w-[480px]">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-5">
              Your roadmap,
              <br />
              in minutes.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-heading">
              After your assessment, AICA generates a step-by-step plan tailored
              to your exact profile — not a template, a personalized roadmap you
              can start following today.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                {
                  dot: 'bg-emerald-400',
                  text: 'Clear steps from where you are to where you want to be',
                },
                {
                  dot: 'bg-sky-400',
                  text: 'Specific courses, certifications, and skills per step',
                },
                {
                  dot: 'bg-violet-400',
                  text: 'Progress tracking as your goals evolve over time',
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-foreground"
                >
                  <div
                    className={cn('w-2 h-2 rounded-full shrink-0', item.dot)}
                  />
                  {item.text}
                </li>
              ))}
            </ul>

            <Button asChild className="px-8 py-6 gap-2">
              <Link to="/app/roadmap" viewTransition>
                See My Roadmap
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Right: roadmap visual */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <RoadmapStepsPreview />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Features grid ──────────────────────────────────────────────────────────────
function FeaturesSection() {
  const features = [
    {
      icon: UserCheck,
      iconCls: 'text-emerald-500',
      bgCls: 'bg-emerald-400/10',
      title: 'Deep User Profiling',
      description:
        'Structured inputs capturing interests, strengths, values, and goals — going far beyond surface-level personality tests.',
    },
    {
      icon: Target,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      title: 'Intelligent Matching',
      description:
        'Profile-based rules compare you against 200+ pathways with full transparency — you always see why each path was recommended.',
    },
    {
      icon: MessageCircle,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: 'AI-Generated Explanations',
      description:
        'Every recommendation comes with personalized reasoning, helping you understand and own your decision completely.',
    },
    {
      icon: Route,
      iconCls: 'text-amber-500',
      bgCls: 'bg-amber-300/10',
      title: 'Personalized Roadmaps',
      description:
        'Concrete next steps, suggested qualifications, and skill-building plans tailored to your specific chosen path.',
    },
    {
      icon: BookOpen,
      iconCls: 'text-rose-500',
      bgCls: 'bg-rose-400/10',
      title: 'Learning Pathway Curation',
      description:
        'Discover relevant courses, certifications, and resources filtered to your level and available time commitment.',
    },
    {
      icon: BarChart3,
      iconCls: 'text-cyan-500',
      bgCls: 'bg-cyan-300/10',
      title: 'Progress Tracking',
      description:
        'Monitor your exploration journey, revisit past assessments, and update your profile as your goals evolve.',
    },
  ];

  return (
    <section
      className="py-20 md:py-28 bg-card border-y border-border"
      id="features"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything to decide
            <br className="hidden sm:block" /> with confidence.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="group p-6 rounded-3xl border border-border bg-background hover:shadow-lg transition-all duration-200 cursor-default"
            >
              <div
                className={cn(
                  'w-11 h-11 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110',
                  f.bgCls
                )}
              >
                <f.icon className={cn('w-5 h-5', f.iconCls)} />
              </div>
              <h3
                className="text-base font-bold text-foreground mb-1.5"
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

// ── For Who ────────────────────────────────────────────────────────────────────
function ForWhoSection() {
  const audiences = [
    {
      icon: GraduationCap,
      iconCls: 'text-emerald-500',
      bgCls: 'bg-emerald-400/10',
      label: 'Students',
      title: 'Choosing the Right Faculty',
      description:
        "You're entering higher education and the pressure to pick the right major is overwhelming. AICA helps you choose based on who you actually are.",
      bullets: [
        'Faculty and degree matching',
        'Strength-based guidance',
        'Long-term career alignment',
      ],
      checkCls: 'text-emerald-500',
    },
    {
      icon: Users,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      label: 'Graduates',
      title: 'Exploring Your Career Path',
      description:
        "You've completed your studies. AICA maps your skills and interests to real career opportunities you can actually pursue.",
      bullets: [
        'Career pathway exploration',
        'Skill gap identification',
        'Industry direction clarity',
      ],
      checkCls: 'text-sky-500',
    },
    {
      icon: Briefcase,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      label: 'Career Changers',
      title: 'Pivoting with Confidence',
      description:
        'Ready for a new direction but unsure where to start? AICA builds a transition plan from where you are to where you want to be.',
      bullets: [
        'Transition roadmaps',
        'Transferable skill mapping',
        'Short course recommendations',
      ],
      checkCls: 'text-violet-500',
    },
  ];

  return (
    <section className="py-20 md:py-28" id="for-you">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Built for people
            <br className="hidden sm:block" /> at crossroads.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl border border-border bg-card hover:shadow-lg transition-all duration-200 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className={cn(
                    'w-11 h-11 rounded-2xl flex items-center justify-center',
                    a.bgCls
                  )}
                >
                  <a.icon className={cn('w-5 h-5', a.iconCls)} />
                </div>
                <Badge
                  variant="secondary"
                  className="rounded-full text-xs font-bold"
                >
                  {a.label}
                </Badge>
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

              <ul className="space-y-2.5 pt-4 border-t border-border">
                {a.bullets.map((b, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2.5 text-sm font-medium text-foreground"
                  >
                    <Check
                      className={cn('w-4 h-4 flex-shrink-0', a.checkCls)}
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

// ── Testimonials ───────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "I was completely stuck between Engineering and Product Design for two years. AICA helped me see that my strengths pointed clearly toward HCI. Best decision I've made.",
      name: 'Sarah M.',
      role: 'Studying Human-Computer Interaction',
      initial: 'S',
      color: '#0ea5e9',
    },
    {
      quote:
        'After 6 years in accounting I needed a change but had no idea where to start. The roadmap AICA gave me helped me transition into data analytics in under a year.',
      name: 'James K.',
      role: 'Data Analyst at a FinTech startup',
      initial: 'J',
      color: '#8b5cf6',
    },
    {
      quote:
        "Every counselor told me to 'follow my passion' with no guidance. AICA showed me specific faculties, why they fit me, and exactly what skills to build first.",
      name: 'Nadia R.',
      role: 'Computer Science student, 2nd year',
      initial: 'N',
      color: '#10b981',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            Real people,
            <br className="hidden sm:block" /> real clarity.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-3xl border border-border bg-background flex flex-col gap-4"
            >
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

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

// ── CTA ────────────────────────────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-foreground relative overflow-hidden">
      {/* Dot grid on dark background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.5 0 0) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.25,
        }}
      />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8 text-center">
        <h2 className="text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight leading-[1.05] mb-5 text-background">
          Ready to find
          <br />
          your path?
        </h2>

        <p className="text-base mb-9 max-w-[480px] mx-auto text-background/85">
          Take the 5-minute assessment and receive a personalized roadmap built
          around who you actually are.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="px-8 py-6 gap-2 bg-background text-foreground hover:bg-background/90">
            Start Free Assessment
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="link" className="px-7 text-base text-background/60">
            Learn More
          </Button>
        </div>

        <h3 className="mt-7 md:mt-10 text-base text-background/50 font-heading">
          No credit card , No account , 5 minutes
        </h3>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────
function Footer() {
  const cols: Record<string, string[]> = {
    Product: ['Features', 'How It Works', 'Pricing', 'Changelog'],
    Company: ['About', 'Blog', 'Careers', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
  };

  return (
    <footer className="border-t border-border bg-card" id="about">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <AppLogo />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-50">
              AI-powered guidance for academic and career decisions.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(cols).map(([section, items]) => (
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
          ))}
        </div>

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

const LandingPage = () => {
  return (
    <>
      <div className="min-h-screen bg-background text-foreground font-sans antialiased">
        <Navbar />
        <main>
          <HeroSection />
          <StatsBar />
          <ProblemSection />
          <HowItWorksSection />
          <RoadmapPreviewSection />
          <FeaturesSection />
          <ForWhoSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
