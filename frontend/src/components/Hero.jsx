import { Sparkles, MapPin, Wallet, CalendarRange } from "lucide-react";
import TextType from "./TextType";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-ocean-800 text-white">
      <div className="bg-hero-pattern absolute inset-0" />
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-ocean-500/30 blur-3xl" />
      <div className="absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-sunset-500/20 blur-3xl" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-5 pb-20 pt-16 text-center md:pb-28 md:pt-24">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-ocean-100 ring-1 ring-white/20">
          <Sparkles size={14} className="text-sunset-300" />
          Powered by AI
        </span>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
          Your next trip, planned by AI for
          <br className="hidden md:block" />{" "}
          <TextType
            as="span"
            className="text-sunset-300"
            text={[
              "beach escapes.",
              "mountain adventures.",
              "cultural deep dives.",
              "family vacations.",
              "luxury getaways.",
              "budget backpacking.",
            ]}
            typingSpeed={55}
            deletingSpeed={30}
            pauseDuration={1600}
            cursorCharacter="|"
          />
        </h1>

        <p className="mt-5 max-w-xl text-base text-ocean-100/90 md:text-lg">
          Tell Wanderly your budget, your days, and what you love. Our AI builds a
          complete, one-of-a-kind trip — itinerary, hotels, weather, packing list,
          maps, and cost breakdown — every single time.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#planner"
            className="rounded-full bg-sunset-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-sunset-900/30 transition hover:bg-sunset-600"
          >
            Plan my trip
          </a>
          <a
            href="#seasonal"
            className="rounded-full bg-white/10 px-7 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/20"
          >
            See seasonal picks
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: Wallet, label: "Set your budget" },
            { icon: CalendarRange, label: "Pick your days" },
            { icon: MapPin, label: "Share your interests" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left text-sm font-medium text-ocean-50 ring-1 ring-white/15"
            >
              <Icon size={18} className="shrink-0 text-sunset-300" />
              {label}
            </div>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 1440 80"
        className="relative -mb-px block w-full text-white"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          d="M0 40 C 240 90 480 0 720 20 C 960 40 1200 90 1440 40 L1440 81 L0 81 Z"
        />
      </svg>
    </section>
  );
}
