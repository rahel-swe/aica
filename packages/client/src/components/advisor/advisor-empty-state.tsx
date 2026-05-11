import { Compass, Route, ShieldCheck } from 'lucide-react';
import { advisorBoundaries } from './advisor-ui-data';

export function AdvisorEmptyState() {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/75 p-5 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-300 text-blue-950">
          <Compass className="size-6" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-950">
            Start with a guided prompt
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Advisor works best when you ask about your pathway, roadmap, fit,
            constraints, or decision. It is intentionally scoped to AICA
            context.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {advisorBoundaries.map((item, index) => {
          const Icon = item.icon;
          const colors =
            index % 3 === 0
              ? 'bg-blue-100 text-blue-950'
              : index % 3 === 1
                ? 'bg-emerald-100 text-emerald-950'
                : 'bg-yellow-100 text-yellow-950';

          return (
            <div key={item.title} className={`rounded-3xl p-4 ${colors}`}>
              <Icon className="size-5" />
              <p className="mt-3 text-sm font-semibold">{item.title}</p>
              <p className="mt-1 text-xs leading-5 opacity-80">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-3xl bg-orange-100 p-4 text-sm leading-6 text-orange-950">
        <ShieldCheck className="size-5 shrink-0" />
        <span>
          Advisor will not replace local admission, licensing, or university
          verification for regulated pathways.
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-3xl bg-green-100 p-4 text-sm leading-6 text-green-950">
        <Route className="size-5 shrink-0" />
        <span>
          For best results, generate recommendations and a roadmap before asking
          deeper questions.
        </span>
      </div>
    </section>
  );
}
