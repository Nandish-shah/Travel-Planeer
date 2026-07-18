import { formatDayLabel, formatDateRange } from "../utils/date";

export default function TripReport({ plan, startDate, endDate }) {
  const query = encodeURIComponent(plan.mapQuery || plan.destination);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <div className="print-only mx-auto max-w-4xl px-8 py-10 text-ocean-950">
      <header className="mb-8 border-b-2 border-ocean-700 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-ocean-500">
          Wanderly — AI Trip Report
        </p>
        <h1 className="mt-1 text-3xl font-bold">{plan.tripTitle}</h1>
        <p className="mt-1 text-ocean-600">{plan.destination}</p>
        {startDate && endDate && (
          <p className="mt-1 text-sm font-semibold text-ocean-700">
            {formatDateRange(startDate, endDate)}
          </p>
        )}
        <p className="mt-3 text-sm leading-relaxed text-ocean-700">{plan.summary}</p>
        <p className="mt-2 text-xs font-medium text-ocean-500">
          Best time to visit: {plan.bestTimeToVisit} · Estimated total: {plan.totalEstimatedCost}{" "}
          {plan.currency}
        </p>
      </header>

      <section className="mb-8" style={{ breakInside: "avoid" }}>
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Itinerary
        </h2>
        {plan.itinerary.map((day) => (
          <div key={day.day} className="mb-5" style={{ breakInside: "avoid" }}>
            <h3 className="text-sm font-bold text-ocean-800">
              Day {day.day}
              {startDate ? ` — ${formatDayLabel(startDate, day.day)}` : ""} — {day.title}
            </h3>
            <ul className="mt-1.5 space-y-1.5">
              {day.activities.map((act, i) => (
                <li key={i} className="text-sm text-ocean-700">
                  <span className="font-semibold">{act.time}</span> — {act.activity}
                  {act.estimatedCost > 0 && (
                    <span className="text-ocean-500"> (~{act.estimatedCost})</span>
                  )}
                  <br />
                  <span className="text-xs text-ocean-500">{act.description}</span>
                </li>
              ))}
            </ul>
            {day.meals?.length > 0 && (
              <p className="mt-1.5 text-xs font-medium text-ocean-500">
                Meals: {day.meals.join(" · ")}
              </p>
            )}
          </div>
        ))}
      </section>

      {plan.transport && (
        <section className="mb-8" style={{ breakInside: "avoid" }}>
          <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
            Transport (from {plan.transport.originUsed})
          </h2>
          <p className="mb-3 text-xs italic text-ocean-500">{plan.transport.note}</p>

          {plan.transport.trains?.length > 0 && (
            <div className="mb-3">
              <p className="mb-1 text-sm font-semibold text-ocean-800">Trains</p>
              <ul className="space-y-1 text-xs text-ocean-600">
                {plan.transport.trains.map((t, i) => (
                  <li key={i}>
                    {t.trainName} (#{t.trainNumber}) — {t.from} → {t.to} · {t.departureTime}–
                    {t.arrivalTime} ({t.duration}) · {t.travelClass} · {t.fare} {plan.currency}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {plan.transport.flights?.length > 0 && (
            <div>
              <p className="mb-1 text-sm font-semibold text-ocean-800">Flights</p>
              <ul className="space-y-1 text-xs text-ocean-600">
                {plan.transport.flights.map((f, i) => (
                  <li key={i}>
                    {f.airline} (#{f.flightNumber}) — {f.from} → {f.to} · {f.departureTime}–
                    {f.arrivalTime} ({f.duration}) · {f.cabinClass} · {f.fare} {plan.currency}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

      <section className="mb-8">
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Hotels
        </h2>
        <div className="space-y-3">
          {plan.hotels.map((hotel, i) => (
            <div key={i} className="text-sm" style={{ breakInside: "avoid" }}>
              <p className="font-semibold text-ocean-900">
                {hotel.name} — {hotel.pricePerNight} {plan.currency}/night ({hotel.rating}★)
              </p>
              <p className="text-xs text-ocean-500">{hotel.area}</p>
              <p className="text-xs text-ocean-600">{hotel.why}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8" style={{ breakInside: "avoid" }}>
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Weather
        </h2>
        <p className="mb-2 text-sm text-ocean-700">
          <span className="font-semibold">{plan.weather.season}</span> — {plan.weather.overview}
        </p>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-ocean-200 text-left text-xs uppercase text-ocean-500">
              <th className="py-1 pr-4">Day</th>
              <th className="py-1 pr-4">Condition</th>
              <th className="py-1">High / Low</th>
            </tr>
          </thead>
          <tbody>
            {plan.weather.forecast.map((f) => (
              <tr key={f.day} className="border-b border-ocean-100">
                <td className="py-1 pr-4">Day {f.day}</td>
                <td className="py-1 pr-4">{f.condition}</td>
                <td className="py-1">
                  {f.tempHighC}° / {f.tempLowC}°C
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mb-8" style={{ breakInside: "avoid" }}>
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Packing List
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {plan.packingList.map((group, i) => (
            <div key={i}>
              <p className="text-sm font-semibold text-ocean-800">{group.category}</p>
              <ul className="mt-1 list-disc pl-4 text-xs text-ocean-600">
                {group.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-8" style={{ breakInside: "avoid" }}>
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Map
        </h2>
        <p className="text-sm text-ocean-700">
          Destination: <span className="font-semibold">{plan.mapQuery || plan.destination}</span>
        </p>
        <p className="mt-1 text-xs text-ocean-500">
          View the interactive map with hotel markers in the app, or open directly:
          <br />
          {mapsLink}
        </p>
      </section>

      <section style={{ breakInside: "avoid" }}>
        <h2 className="mb-3 border-b border-ocean-200 pb-1 text-lg font-bold text-ocean-900">
          Cost Optimization
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-ocean-200 text-left text-xs uppercase text-ocean-500">
              <th className="py-1 pr-4">Category</th>
              <th className="py-1 pr-4">Amount</th>
              <th className="py-1">Share</th>
            </tr>
          </thead>
          <tbody>
            {plan.costOptimization.breakdown.map((b, i) => (
              <tr key={i} className="border-b border-ocean-100">
                <td className="py-1 pr-4">{b.category}</td>
                <td className="py-1 pr-4">
                  {b.amount} {plan.currency}
                </td>
                <td className="py-1">{b.percentage}%</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-sm font-semibold text-ocean-900">
          Total estimated: {plan.totalEstimatedCost} {plan.currency} —{" "}
          {plan.costOptimization.withinBudget ? "within budget" : "over budget"}
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-ocean-600">
          {plan.costOptimization.savingTips.map((tip, i) => (
            <li key={i}>{tip}</li>
          ))}
        </ul>
      </section>

      <footer className="mt-10 border-t border-ocean-100 pt-4 text-center text-xs text-ocean-400">
        Built with ❤️, Powered by Nandish Shah.
      </footer>
    </div>
  );
}
