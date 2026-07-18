import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";

const LINKS = [
  { href: "#seasonal", label: "Seasonal picks" },
  { href: "#spiritual", label: "Spiritual India" },
  { href: "#planner", label: "Plan a trip" },
  { href: "#results", label: "Your itinerary" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-sand-50/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] backdrop-blur-xl backdrop-saturate-150 relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-full overflow-hidden">
        <div className="absolute -top-10 left-10 h-24 w-40 rounded-full bg-ocean-300/25 blur-2xl" />
        <div className="absolute -top-10 right-10 h-24 w-40 rounded-full bg-sunset-300/20 blur-2xl" />
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5">
        <a href="#top" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ocean-700 text-white">
            <Plane className="h-4.5 w-4.5 -rotate-45" size={18} />
          </span>
          <span className="text-lg font-semibold tracking-tight text-ocean-950">
            Wanderly
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-ocean-800 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition hover:text-sunset-600">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#planner"
          className="hidden shrink-0 rounded-full bg-sunset-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sunset-500/30 transition hover:bg-sunset-600 md:inline-flex"
        >
          Start planning
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ocean-800 ring-1 ring-ocean-200 transition hover:bg-white/60 md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-ocean-100 bg-sand-50 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ocean-800 transition hover:bg-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#planner"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-sunset-500 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-sunset-500/30"
            >
              Start planning
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
