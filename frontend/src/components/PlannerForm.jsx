import { useMemo, useState } from "react";
import { MapPin, Navigation, Wallet, CalendarRange, Users, Sparkles, Loader2 } from "lucide-react";
import { INTEREST_OPTIONS, CURRENCIES } from "../data/options";
import { addDaysISO, daysBetweenInclusive, todayISO } from "../utils/date";

export default function PlannerForm({ onSubmit, loading }) {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState(50000);
  const [currency, setCurrency] = useState("INR");
  const [startDate, setStartDate] = useState(() => addDaysISO(todayISO(), 14));
  const [endDate, setEndDate] = useState(() => addDaysISO(todayISO(), 18));
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState(["beach", "food"]);
  const [formError, setFormError] = useState("");

  const days = useMemo(() => {
    if (!startDate || !endDate) return 0;
    return daysBetweenInclusive(startDate, endDate);
  }, [startDate, endDate]);

  function toggleInterest(id) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handleStartDateChange(value) {
    setStartDate(value);
    if (endDate && value > endDate) {
      setEndDate(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (interests.length === 0) {
      setFormError("Pick at least one interest so the AI knows your vibe.");
      return;
    }
    if (!startDate || !endDate || endDate < startDate) {
      setFormError("Pick a valid travel date range.");
      return;
    }
    if (days > 30) {
      setFormError("Trips longer than 30 days aren't supported yet.");
      return;
    }
    setFormError("");
    onSubmit({
      origin: origin.trim(),
      destination: destination.trim(),
      budget: Number(budget),
      currency,
      startDate,
      endDate,
      travelers: Number(travelers),
      interests,
    });
  }

  return (
    <section id="planner" className="mx-auto max-w-4xl px-5 py-16 md:py-24">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-ocean-950 md:text-4xl">
          Build your trip
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ocean-700">
          Give the AI a few details. It generates a brand-new plan every time —
          never a recycled template.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-ocean-100 bg-white p-6 shadow-xl shadow-ocean-950/5 md:p-10"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
              <Navigation size={16} className="text-sunset-500" />
              Departing from
            </span>
            <input
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="e.g. Mumbai"
              className="rounded-xl border border-ocean-200 px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
              <MapPin size={16} className="text-sunset-500" />
              Destination
            </span>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="e.g. Goa, India"
              className="rounded-xl border border-ocean-200 px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
              <Wallet size={16} className="text-sunset-500" />
              Budget
            </span>
            <div className="flex overflow-hidden rounded-xl border border-ocean-200 focus-within:border-ocean-500 focus-within:ring-2 focus-within:ring-ocean-200">
              <input
                type="number"
                min={1}
                required
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-4 py-3 text-ocean-950 outline-none"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="border-l border-ocean-200 bg-ocean-50 px-3 text-sm font-semibold text-ocean-800 outline-none"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label className="flex flex-col gap-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
              <Users size={16} className="text-sunset-500" />
              Travelers
            </span>
            <input
              type="number"
              min={1}
              max={20}
              required
              value={travelers}
              onChange={(e) => setTravelers(e.target.value)}
              className="rounded-xl border border-ocean-200 px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
              <CalendarRange size={16} className="text-sunset-500" />
              Travel dates
              {days > 0 && (
                <span className="text-ocean-500">
                  ({days} {days === 1 ? "day" : "days"})
                </span>
              )}
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-ocean-500">From</span>
                <input
                  type="date"
                  required
                  min={todayISO()}
                  value={startDate}
                  onChange={(e) => handleStartDateChange(e.target.value)}
                  className="rounded-xl border border-ocean-200 px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-ocean-500">To</span>
                <input
                  type="date"
                  required
                  min={startDate || todayISO()}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="rounded-xl border border-ocean-200 px-4 py-3 text-ocean-950 outline-none transition focus:border-ocean-500 focus:ring-2 focus:ring-ocean-200"
                />
              </div>
            </div>
          </label>
        </div>

        <div className="mt-8">
          <span className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
            <Sparkles size={16} className="text-sunset-500" />
            Interests
          </span>
          <div className="mt-3 flex flex-wrap gap-2">
            {INTEREST_OPTIONS.map((opt) => {
              const active = interests.includes(opt.id);
              return (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => toggleInterest(opt.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "border-ocean-700 bg-ocean-700 text-white shadow-sm"
                      : "border-ocean-200 bg-white text-ocean-700 hover:border-ocean-400"
                  }`}
                >
                  <span className="mr-1.5">{opt.emoji}</span>
                  {opt.label}
                </button>
              );
            })}
          </div>
          {formError && (
            <p className="mt-3 text-sm font-medium text-sunset-700">{formError}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-9 flex w-full items-center justify-center gap-2 rounded-xl bg-sunset-500 py-4 text-base font-semibold text-white shadow-lg shadow-sunset-500/25 transition hover:bg-sunset-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Building your trip...
            </>
          ) : (
            <>
              <Sparkles size={18} />
              Generate my AI trip plan
            </>
          )}
        </button>
      </form>
    </section>
  );
}
