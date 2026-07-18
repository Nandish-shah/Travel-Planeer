import { useState } from "react";
import {
  CalendarDays,
  TrainFront,
  Hotel,
  CloudSun,
  Backpack,
  Map,
  PiggyBank,
  Sparkles,
  Download,
} from "lucide-react";
import ItineraryTab from "./tabs/ItineraryTab";
import TransportTab from "./tabs/TransportTab";
import HotelsTab from "./tabs/HotelsTab";
import WeatherTab from "./tabs/WeatherTab";
import PackingTab from "./tabs/PackingTab";
import MapTab from "./tabs/MapTab";
import CostTab from "./tabs/CostTab";
import TripReport from "./TripReport";

const TABS = [
  { id: "itinerary", label: "Itinerary", icon: CalendarDays, Component: ItineraryTab },
  { id: "transport", label: "Transport", icon: TrainFront, Component: TransportTab },
  { id: "hotels", label: "Hotels", icon: Hotel, Component: HotelsTab },
  { id: "weather", label: "Weather", icon: CloudSun, Component: WeatherTab },
  { id: "packing", label: "Packing List", icon: Backpack, Component: PackingTab },
  { id: "map", label: "Map", icon: Map, Component: MapTab },
  { id: "cost", label: "Cost", icon: PiggyBank, Component: CostTab },
];

export default function ResultsDashboard({ plan, startDate, endDate }) {
  const [activeTab, setActiveTab] = useState("itinerary");
  const Active = TABS.find((t) => t.id === activeTab)?.Component ?? ItineraryTab;

  return (
    <section id="results" className="mx-auto max-w-5xl px-5 pb-24">
      <div className="no-print">
        <div className="mb-8 overflow-hidden rounded-3xl border border-ocean-100 bg-ocean-800 text-white shadow-xl">
          <div className="bg-hero-pattern relative px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ocean-100 ring-1 ring-white/20">
                <Sparkles size={12} className="text-sunset-300" />
                AI-generated plan
              </span>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ocean-800 shadow-sm transition hover:bg-ocean-50"
              >
                <Download size={14} />
                Download Report
              </button>
            </div>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">{plan.tripTitle}</h2>
            <p className="mt-1 text-ocean-100/90">{plan.destination}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ocean-100/80">
              {plan.summary}
            </p>
            <p className="mt-3 text-xs font-medium text-ocean-200">
              Best time to visit: {plan.bestTimeToVisit}
            </p>
          </div>
        </div>

        <div className="scrollbar-thin mb-8 flex gap-2 overflow-x-auto pb-1">
          {TABS.map(({ id, label, icon: Icon }) => {
            const active = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-ocean-700 text-white shadow-sm"
                    : "bg-white text-ocean-700 ring-1 ring-ocean-100 hover:bg-ocean-50"
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            );
          })}
        </div>

        <Active plan={plan} startDate={startDate} />
      </div>

      <TripReport plan={plan} startDate={startDate} endDate={endDate} />
    </section>
  );
}
