import { TrainFront, Plane, Info, ArrowRight } from "lucide-react";

function TrainRow({ t, currency }) {
  return (
    <tr className="border-b border-ocean-50 last:border-0">
      <td className="py-3 pr-4">
        <p className="font-semibold text-ocean-900">{t.trainName}</p>
        <p className="text-xs text-ocean-400">#{t.trainNumber} · {t.runsOn}</p>
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-700">
        <span className="flex items-center gap-1.5">
          {t.from} <ArrowRight size={12} className="text-ocean-300" /> {t.to}
        </span>
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-700">
        {t.departureTime} → {t.arrivalTime}
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-500">{t.duration}</td>
      <td className="py-3 pr-4 text-sm text-ocean-700">{t.travelClass}</td>
      <td className="py-3 text-right text-sm font-semibold text-ocean-950">
        {t.fare} {currency}
      </td>
    </tr>
  );
}

function FlightRow({ f, currency }) {
  return (
    <tr className="border-b border-ocean-50 last:border-0">
      <td className="py-3 pr-4">
        <p className="font-semibold text-ocean-900">{f.airline}</p>
        <p className="text-xs text-ocean-400">
          #{f.flightNumber} · {f.stops}
        </p>
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-700">
        <span className="flex items-center gap-1.5">
          {f.from} <ArrowRight size={12} className="text-ocean-300" /> {f.to}
        </span>
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-700">
        {f.departureTime} → {f.arrivalTime}
      </td>
      <td className="py-3 pr-4 text-sm text-ocean-500">{f.duration}</td>
      <td className="py-3 pr-4 text-sm text-ocean-700">{f.cabinClass}</td>
      <td className="py-3 text-right text-sm font-semibold text-ocean-950">
        {f.fare} {currency}
      </td>
    </tr>
  );
}

const HEAD_CELLS = ["Service", "Route", "Departs → Arrives", "Duration", "Class", "Fare"];

export default function TransportTab({ plan }) {
  const transport = plan.transport;
  const currency = plan.currency;

  if (!transport) {
    return (
      <div className="rounded-2xl border border-ocean-100 bg-white p-6 text-sm text-ocean-500 shadow-sm">
        No transport data available for this plan.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl border border-sunset-200 bg-sunset-50 p-4 text-sm text-sunset-800">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p>
          {transport.note ||
            "These schedules and fares are AI-generated estimates for planning reference only — not live availability. Confirm exact timings and prices with the railway/airline or a licensed booking platform before purchasing."}
        </p>
      </div>

      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ocean-900">
          <TrainFront size={16} className="text-sunset-500" />
          Trains from {transport.originUsed}
        </h3>
        {transport.trains?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ocean-200 text-xs font-semibold uppercase tracking-wide text-ocean-400">
                  {HEAD_CELLS.map((h) => (
                    <th key={h} className="pb-2 pr-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transport.trains.map((t, i) => (
                  <TrainRow key={i} t={t} currency={currency} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-ocean-500">
            No practical direct rail route found for this journey — see flight options below.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-ocean-900">
          <Plane size={16} className="text-sunset-500 -rotate-45" />
          Flights from {transport.originUsed}
        </h3>
        {transport.flights?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-ocean-200 text-xs font-semibold uppercase tracking-wide text-ocean-400">
                  {HEAD_CELLS.map((h) => (
                    <th key={h} className="pb-2 pr-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transport.flights.map((f, i) => (
                  <FlightRow key={i} f={f} currency={currency} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-ocean-500">No flight options generated for this route.</p>
        )}
      </div>
    </div>
  );
}
