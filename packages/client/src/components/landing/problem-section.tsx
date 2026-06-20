import { cn } from '@/lib/utils';
import { GraduationCap, Brain, Users } from 'lucide-react';
import { m } from '../../paraglide/messages';

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

export default ProblemSection;
