import { PiggyBank, CheckCircle2, AlertTriangle, Lightbulb } from "lucide-react";

export default function CostTab({ plan }) {
  const { costOptimization, totalEstimatedCost, currency } = plan;
  const maxAmount = Math.max(...costOptimization.breakdown.map((b) => b.amount), 1);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-ocean-500">
              Estimated total
            </p>
            <p className="mt-1 text-3xl font-bold text-ocean-950">
              {totalEstimatedCost}{" "}
              <span className="text-base font-medium text-ocean-500">
                {currency}
              </span>
            </p>
          </div>

          <span
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              costOptimization.withinBudget
                ? "bg-emerald-50 text-emerald-700"
                : "bg-sunset-50 text-sunset-700"
            }`}
          >
            {costOptimization.withinBudget ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertTriangle size={16} />
            )}
            {costOptimization.withinBudget ? "Within budget" : "Over budget"}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <h3 className="mb-5 flex items-center gap-2 text-sm font-bold text-ocean-900">
          <PiggyBank size={16} className="text-sunset-500" />
          Cost breakdown
        </h3>
        <div className="space-y-4">
          {costOptimization.breakdown.map((b, i) => (
            <div key={i}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-medium text-ocean-800">{b.category}</span>
                <span className="font-semibold text-ocean-950">
                  {b.amount} {currency}
                  <span className="ml-1.5 font-normal text-ocean-400">
                    ({b.percentage}%)
                  </span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-ocean-50">
                <div
                  className="h-full rounded-full bg-ocean-600"
                  style={{ width: `${Math.max((b.amount / maxAmount) * 100, 4)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ocean-900">
          <Lightbulb size={16} className="text-sunset-500" />
          Money-saving tips
        </h3>
        <ul className="space-y-3">
          {costOptimization.savingTips.map((tip, i) => (
            <li key={i} className="flex gap-2.5 text-sm text-ocean-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sunset-500" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
