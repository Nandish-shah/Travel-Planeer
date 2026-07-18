import { Plane } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-sand-50/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="absolute -top-10 left-10 h-24 w-40 rounded-full bg-ocean-300/25 blur-2xl" />
        <div className="absolute -top-10 right-10 h-24 w-40 rounded-full bg-sunset-300/20 blur-2xl" />
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ocean-700 text-white">
            <Plane className="h-4.5 w-4.5 -rotate-45" size={18} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-ocean-950">
            Wanderly
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ocean-800 md:flex">
          <a href="#seasonal" className="transition hover:text-sunset-600">
            Seasonal picks
          </a>
          <a href="#spiritual" className="transition hover:text-sunset-600">
            Spiritual India
          </a>
          <a href="#planner" className="transition hover:text-sunset-600">
            Plan a trip
          </a>
          <a href="#results" className="transition hover:text-sunset-600">
            Your itinerary
          </a>
        </nav>

        <a
          href="#planner"
          className="rounded-full bg-sunset-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sunset-500/30 transition hover:bg-sunset-600"
        >
          Start planning
        </a>
      </div>
    </header>
  );
}
