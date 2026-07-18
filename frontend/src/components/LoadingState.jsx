import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

const MESSAGES = [
  "Consulting the AI...",
  "Scouting hotels that fit your budget...",
  "Mapping out each day of your trip...",
  "Checking the seasonal weather outlook...",
  "Packing your bags (virtually)...",
  "Optimizing your travel budget...",
];

export default function LoadingState() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MESSAGES.length);
    }, 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-ocean-100 bg-white px-6 py-20 text-center shadow-xl shadow-ocean-950/5">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-ocean-200/70" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-ocean-700 text-white">
          <Plane size={26} className="-rotate-45" />
        </span>
      </div>
      <div>
        <p className="text-lg font-semibold text-ocean-950">
          Wanderly's AI is building your trip
        </p>
        <p className="mt-1 text-sm text-ocean-600">{MESSAGES[index]}</p>
      </div>
    </div>
  );
}
