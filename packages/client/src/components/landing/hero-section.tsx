import { ChevronRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import AssessmentCard from './assessment-card';
import FloatingBadge from './floating-badge';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-30 pb-16 overflow-hidden">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, oklch(0.80 0 0) 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px',
          opacity: 0.45,
        }}
      />
      {/* Bottom fade */}
      <div
        className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent, var(--background))',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left: copy */}
          <div className="flex-1 flex flex-col gap-8  text-center lg:mx-auto ">
            <h1 className="afu d2 text-6xl sm:text-7xl lg:text-[5rem] font-bold leading-[1.2] text-foreground font-heading">
              Discover your
              <br />
              right path
            </h1>

            <p className="afu d3 text-muted-foreground leading-relaxed mb-3">
              AICA analyzes your strengths, interests, and goals — delivering
              personalized academic and career guidance with a concrete roadmap
              you can act on today.
            </p>

            <div className="afu d4 flex flex-col sm:flex-row sm:items-center gap-3 mb-10 items-center mx-auto">
              <Button asChild className="px-8 py-6.5">
                <Link to="/pathway-assessment" viewTransition>
                  Start Free Assessment
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
              <a href="#how-it-works">
                <Button variant="outline" className="px-7 py-6.5">
                  See How It Works
                  <ChevronRight className="w-4 h-4" />
                </Button>
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
                students guided ·{' '}
                <span className="inline-flex gap-0.5 ml-0.5 align-middle">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Right: floating card */}
          <div className="afi d6 flex-1 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="afl">
                <AssessmentCard />
              </div>

              <FloatingBadge
                delay="300ms"
                style={{ top: '-18px', right: '-14px' }}
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  Top Match:{' '}
                  <strong className="ml-0.5 text-emerald-600 dark:text-emerald-400">
                    UX Design
                  </strong>
                </div>
              </FloatingBadge>

              <FloatingBadge
                delay="600ms"
                style={{ bottom: '-16px', left: '-14px' }}
              >
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                  <span>
                    92%{' '}
                    <span className="text-muted-foreground font-normal">
                      Match Score
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
};

export default HeroSection;
