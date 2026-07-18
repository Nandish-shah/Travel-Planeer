import { useEffect, useMemo, useState } from "react";
import { MapPin, CalendarClock } from "lucide-react";
import { SEASONS, getCurrentSeasonId } from "../data/seasonalDestinations";
import PlaceImage from "./PlaceImage";

export default function SeasonalDestinations() {
  const currentSeasonId = useMemo(() => getCurrentSeasonId(), []);
  const [activeSeasonId, setActiveSeasonId] = useState(currentSeasonId);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const activeSeason =
    SEASONS.find((s) => s.id === activeSeasonId) ?? SEASONS[0];

  const dateLabel = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
  });

  return (
    <section id="seasonal" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ocean-700">
            <CalendarClock size={14} className="text-sunset-500" />
            Live for {dateLabel} · India
          </span>
          <h2 className="text-3xl font-bold text-ocean-950 md:text-4xl">
            Where to go, this season
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ocean-700">
            India changes with the calendar. Wanderly tracks the current
            season and surfaces the destinations that are actually at their
            best right now.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {SEASONS.map((season) => {
            const active = season.id === activeSeasonId;
            const isNow = season.id === currentSeasonId;
            return (
              <button
                key={season.id}
                onClick={() => setActiveSeasonId(season.id)}
                className={`relative flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "border-ocean-700 bg-ocean-700 text-white shadow-sm"
                    : "border-ocean-200 bg-white text-ocean-700 hover:border-ocean-400"
                }`}
              >
                {season.label}
                {isNow && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                      active ? "bg-white/20 text-white" : "bg-sunset-100 text-sunset-600"
                    }`}
                  >
                    Now
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <p className="mb-8 text-center text-sm font-medium text-ocean-500">
          {activeSeason.tagline}
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activeSeason.destinations.map((dest) => (
            <div
              key={dest.name}
              className="group overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ocean-950/10"
            >
              <div className="relative overflow-hidden">
                <PlaceImage image={dest.image} name={dest.name} className="h-48 w-full object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean-800 shadow-sm">
                  {dest.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold text-ocean-950">
                    {dest.name}
                  </h3>
                  <span className="text-xs font-semibold text-ocean-500">
                    {dest.bestMonths}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-ocean-400">
                  <MapPin size={12} />
                  {dest.state}, India
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ocean-600">
                  {dest.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
