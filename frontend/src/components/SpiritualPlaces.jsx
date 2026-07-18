import { useMemo, useState } from "react";
import { MapPin, Mountain, Flame, Waves, CheckCircle2, Clock, XCircle } from "lucide-react";
import {
  YATRA_SEASONS,
  getCurrentYatraSeasonId,
  HIMALAYAN_YATRA,
  JYOTIRLINGAS,
  GANGA_TOWNS,
} from "../data/spiritualPlaces";
import PlaceImage from "./PlaceImage";

function getYatraStatus(item, season) {
  if (item.yearRound) return "open";
  const overlap = season.months.filter((m) => item.openMonths.includes(m));
  if (overlap.length === season.months.length) return "open";
  if (overlap.length > 0) return "partial";
  return "closed";
}

const STATUS_STYLES = {
  open: {
    label: "Open this season",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
  },
  partial: {
    label: "Opens partway through",
    icon: Clock,
    className: "bg-sunset-50 text-sunset-700",
  },
  closed: {
    label: "Closed this season",
    icon: XCircle,
    className: "bg-ocean-100 text-ocean-500",
  },
};

function YatraCard({ item, season }) {
  const status = getYatraStatus(item, season);
  const { label, icon: Icon, className } = STATUS_STYLES[status];

  return (
    <div className="group overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ocean-950/10">
      <div className="relative overflow-hidden">
        <PlaceImage image={item.image} name={item.name} className="h-44 w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ocean-800 shadow-sm">
          {item.tag}
        </span>
      </div>
      <div className="p-5">
        <h4 className="text-base font-semibold text-ocean-950">{item.name}</h4>
        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-ocean-400">
          <MapPin size={12} />
          {item.state}, India
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ocean-600">{item.blurb}</p>
        <span
          className={`mt-4 flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${className}`}
        >
          <Icon size={13} />
          {label}
        </span>
        <p className="mt-2 text-xs text-ocean-400">{item.windowLabel}</p>
      </div>
    </div>
  );
}

function EvergreenCard({ item }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:shadow-ocean-950/10">
      <PlaceImage image={item.image} name={item.name} className="h-36 w-full object-cover" />
      <div className="p-4">
        <h4 className="text-sm font-semibold text-ocean-950">{item.name}</h4>
        <p className="mt-0.5 flex items-center gap-1 text-xs font-medium text-ocean-400">
          <MapPin size={11} />
          {item.state}
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ocean-600">{item.blurb}</p>
        <p className="mt-2 text-[11px] font-medium text-ocean-500">{item.windowLabel}</p>
      </div>
    </div>
  );
}

export default function SpiritualPlaces() {
  const currentSeasonId = useMemo(() => getCurrentYatraSeasonId(), []);
  const [activeSeasonId, setActiveSeasonId] = useState(currentSeasonId);
  const activeSeason =
    YATRA_SEASONS.find((s) => s.id === activeSeasonId) ?? YATRA_SEASONS[0];

  return (
    <section id="spiritual" className="bg-sand-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-ocean-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ocean-700">
            <Mountain size={14} className="text-sunset-500" />
            Pilgrimage & Yatra
          </span>
          <h2 className="text-3xl font-bold text-ocean-950 md:text-4xl">
            Spiritual India, by season
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ocean-700">
            The Char Dham and high-Himalayan shrines close under snow every
            winter and reopen only for part of the year. Pick a season to see
            what's actually accessible.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
          {YATRA_SEASONS.map((season) => {
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

        <div className="mb-6 flex items-center gap-2">
          <Mountain size={18} className="text-sunset-500" />
          <h3 className="text-lg font-bold text-ocean-950">
            Char Dham & Himalayan Yatra
          </h3>
        </div>
        <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIMALAYAN_YATRA.map((item) => (
            <YatraCard key={item.name} item={item} season={activeSeason} />
          ))}
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Flame size={18} className="text-sunset-500" />
          <h3 className="text-lg font-bold text-ocean-950">
            The Twelve Jyotirlingas
          </h3>
          <span className="text-xs font-medium text-ocean-400">
            (open year-round, unlike the Himalayan shrines above)
          </span>
        </div>
        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {JYOTIRLINGAS.map((item) => (
            <EvergreenCard key={item.name} item={item} />
          ))}
        </div>

        <div className="mb-6 flex items-center gap-2">
          <Waves size={18} className="text-sunset-500" />
          <h3 className="text-lg font-bold text-ocean-950">Sacred Ganga</h3>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {GANGA_TOWNS.map((item) => (
            <EvergreenCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
