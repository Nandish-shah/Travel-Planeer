import { CloudSun, Sun, CloudRain, Cloud, CloudLightning, CloudSnow } from "lucide-react";
import { formatDayLabel } from "../../utils/date";

function iconFor(condition = "") {
  const c = condition.toLowerCase();
  if (c.includes("storm") || c.includes("thunder")) return CloudLightning;
  if (c.includes("rain") || c.includes("shower")) return CloudRain;
  if (c.includes("snow")) return CloudSnow;
  if (c.includes("cloud")) return Cloud;
  if (c.includes("sun") || c.includes("clear")) return Sun;
  return CloudSun;
}

export default function WeatherTab({ plan, startDate }) {
  const { weather } = plan;
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-sunset-600">
          {weather.season}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ocean-700">
          {weather.overview}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {weather.forecast.map((f) => {
          const Icon = iconFor(f.condition);
          return (
            <div
              key={f.day}
              className="flex flex-col items-center gap-2 rounded-2xl border border-ocean-100 bg-white p-5 text-center shadow-sm"
            >
              <p className="text-xs font-bold text-ocean-500">
                {startDate ? formatDayLabel(startDate, f.day) : `Day ${f.day}`}
              </p>
              <Icon size={30} className="text-ocean-600" />
              <p className="text-xs font-medium text-ocean-700">{f.condition}</p>
              <p className="text-sm font-bold text-ocean-950">
                {f.tempHighC}°
                <span className="ml-1 font-normal text-ocean-400">
                  {f.tempLowC}°
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
