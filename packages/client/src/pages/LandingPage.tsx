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
import { m } from '../paraglide/messages';

function StatsBar() {
  const stats = [
    {
      value: '12,000+',
      label: m.landing_stats_students_guided(),
      color: 'text-emerald-500',
    },
    {
      value: '200+',
      label: m.landing_stats_career_pathways(),
      color: 'text-sky-500',
    },
    {
      value: '94%',
      label: m.landing_stats_match_satisfaction(),
      color: 'text-violet-500',
    },
    {
      value: '5 min',
      label: m.landing_stats_to_your_roadmap(),
      color: 'text-amber-500',
    },
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
      title: m.landing_problem_academic_mismatch_title(),
      description: m.landing_problem_academic_mismatch_description(),
    },
    {
      icon: Brain,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: m.landing_problem_decision_paralysis_title(),
      description: m.landing_problem_decision_paralysis_description(),
    },
    {
      icon: Users,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-400/10',
      title: m.landing_problem_personalized_guidance_title(),
      description: m.landing_problem_personalized_guidance_description(),
    },
  ];

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {m.landing_problem_heading()}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-[500px] mx-auto font-heading">
            {m.landing_problem_subheading()}
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
      title: m.landing_how_it_works_step1_title(),
      description: m.landing_how_it_works_step1_description(),
      pill: m.landing_how_it_works_step1_pill(),
    },
    {
      num: '02',
      icon: Target,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      title: m.landing_how_it_works_step2_title(),
      description: m.landing_how_it_works_step2_description(),
      pill: m.landing_how_it_works_step2_pill(),
    },
    {
      num: '03',
      icon: Map,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: m.landing_how_it_works_step3_title(),
      description: m.landing_how_it_works_step3_description(),
      pill: m.landing_how_it_works_step3_pill(),
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
            {m.landing_how_it_works_heading()}
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
              {m.landing_roadmap_heading_line1()}
              <br />
              {m.landing_roadmap_heading_line2()}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-6 font-heading">
              {m.landing_roadmap_description()}
            </p>

            <ul className="space-y-3 mb-8">
              {[
                {
                  dot: 'bg-emerald-400',
                  text: m.landing_roadmap_feature_1(),
                },
                {
                  dot: 'bg-sky-400',
                  text: m.landing_roadmap_feature_2(),
                },
                {
                  dot: 'bg-violet-400',
                  text: m.landing_roadmap_feature_3(),
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
                {m.landing_roadmap_button()}
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
      title: m.landing_feature_profile_title(),
      description: m.landing_feature_profile_description(),
    },
    {
      icon: Target,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      title: m.landing_feature_matching_title(),
      description: m.landing_feature_matching_description(),
    },
    {
      icon: MessageCircle,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      title: m.landing_feature_ai_explanation_title(),
      description: m.landing_feature_ai_explanation_description(),
    },
    {
      icon: Route,
      iconCls: 'text-amber-500',
      bgCls: 'bg-amber-300/10',
      title: m.landing_feature_roadmaps_title(),
      description: m.landing_feature_roadmaps_description(),
    },
    {
      icon: BookOpen,
      iconCls: 'text-rose-500',
      bgCls: 'bg-rose-400/10',
      title: m.landing_feature_learning_title(),
      description: m.landing_feature_learning_description(),
    },
    {
      icon: BarChart3,
      iconCls: 'text-cyan-500',
      bgCls: 'bg-cyan-300/10',
      title: m.landing_feature_progress_title(),
      description: m.landing_feature_progress_description(),
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
            {m.landing_features_heading_line1()}
            <br className="hidden sm:block" />
            {m.landing_features_heading_line2()}
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
      label: m.for_who_students_label(),
      title: m.for_who_students_title(),
      description: m.for_who_students_description(),
      bullets: [
        m.for_who_students_b1(),
        m.for_who_students_b2(),
        m.for_who_students_b3(),
      ],
      checkCls: 'text-emerald-500',
    },
    {
      icon: Users,
      iconCls: 'text-sky-500',
      bgCls: 'bg-sky-300/10',
      label: m.for_who_graduates_label(),
      title: m.for_who_graduates_title(),
      description: m.for_who_graduates_description(),
      bullets: [
        m.for_who_graduates_b1(),
        m.for_who_graduates_b2(),
        m.for_who_graduates_b3(),
      ],
      checkCls: 'text-sky-500',
    },
    {
      icon: Briefcase,
      iconCls: 'text-violet-500',
      bgCls: 'bg-violet-400/10',
      label: m.for_who_career_label(),
      title: m.for_who_career_title(),
      description: m.for_who_career_description(),
      bullets: [
        m.for_who_career_b1(),
        m.for_who_career_b2(),
        m.for_who_career_b3(),
      ],
      checkCls: 'text-violet-500',
    },
  ];

  return (
    <section className="py-20 md:py-28" id="for-you">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            {m.for_who_title()}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((a, i) => {
            const Icon = a.icon;

            return (
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
                    <Icon className={cn('w-5 h-5', a.iconCls)} />
                  </div>

                  <Badge
                    variant="secondary"
                    className="rounded-full text-xs font-bold"
                  >
                    {a.label}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
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
                      <Check className={cn('w-4 h-4', a.checkCls)} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ───────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const testimonials = [
    {
      quote: m.testimonial_1_quote(),
      name: m.testimonial_1_name(),
      role: m.testimonial_1_role(),
      initial: 'S',
      color: '#0ea5e9',
    },
    {
      quote: m.testimonial_2_quote(),
      name: m.testimonial_2_name(),
      role: m.testimonial_2_role(),
      initial: 'J',
      color: '#8b5cf6',
    },
    {
      quote: m.testimonial_3_quote(),
      name: m.testimonial_3_name(),
      role: m.testimonial_3_role(),
      initial: 'N',
      color: '#10b981',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-bold">
            {m.testimonials_heading()}
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
          {m.cta_title_line1()}
          <br />
          {m.cta_title_line2()}
        </h2>

        <p className="text-base mb-9 max-w-[480px] mx-auto text-background/85">
          {m.cta_description()}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button className="px-8 py-6 gap-2 bg-background text-foreground hover:bg-background/90">
            {m.cta_primary_button()}
            <ArrowRight className="w-4 h-4" />
          </Button>

          <Button variant="link" className="px-7 text-base text-background/60">
            {m.cta_secondary_button()}
          </Button>
        </div>

        <h3 className="mt-7 md:mt-10 text-base text-background/50 font-heading">
          {m.cta_footer_note()}
        </h3>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      key: 'product',
      title: m.footer_section_product,
      items: [
        m.footer_product_features,
        m.footer_product_how_it_works,
        m.footer_product_pricing,
        m.footer_product_changelog,
      ],
    },
    {
      key: 'company',
      title: m.footer_section_company,
      items: [
        m.footer_company_about,
        m.footer_company_blog,
        m.footer_company_careers,
        m.footer_company_contact,
      ],
    },
    {
      key: 'legal',
      title: m.footer_section_legal,
      items: [
        m.footer_legal_privacy,
        m.footer_legal_terms,
        m.footer_legal_cookies,
      ],
    },
  ];

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
              {m.footer_brand_description()}
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col, index) => (
            <div key={index}>
              <p className="text-xs font-bold tracking-wider uppercase text-foreground mb-3.5">
                {col.title()}
              </p>

              <ul className="space-y-2.5">
                {col.items.map((item, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            {' '}
            © {new Date().getFullYear()} AICA. All rights reserved.{' '}
          </p>

          <p className="text-xs text-muted-foreground">{m.footer_tagline()}</p>
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
