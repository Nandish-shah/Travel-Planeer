import { Clock, Utensils } from "lucide-react";
import { formatDayLabel } from "../../utils/date";

export default function ItineraryTab({ plan, startDate }) {
  return (
    <div className="space-y-6">
      {plan.itinerary.map((day) => (
        <div
          key={day.day}
          className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-sm font-bold text-white">
              {day.day}
            </span>
            <div>
              <h3 className="text-lg font-semibold text-ocean-950">{day.title}</h3>
              {startDate && (
                <p className="text-xs font-medium text-ocean-400">
                  {formatDayLabel(startDate, day.day)}
                </p>
              )}
            </div>
          </div>

          <ul className="space-y-4 border-l-2 border-ocean-100 pl-5">
            {day.activities.map((act, i) => (
              <li key={i} className="relative">
                <span className="absolute -left-[27px] top-1.5 h-2.5 w-2.5 rounded-full bg-sunset-500" />
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="flex items-center gap-1.5 text-sm font-semibold text-ocean-800">
                    <Clock size={14} className="text-ocean-400" />
                    {act.time} — {act.activity}
                  </p>
                  {act.estimatedCost > 0 && (
                    <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-semibold text-ocean-700">
                      ~{act.estimatedCost}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-ocean-600">{act.description}</p>
              </li>
            ))}
          </ul>

          {day.meals?.length > 0 && (
            <div className="mt-4 flex items-center gap-2 border-t border-ocean-50 pt-3 text-xs font-medium text-ocean-500">
              <Utensils size={14} />
              Meals: {day.meals.join(" · ")}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
