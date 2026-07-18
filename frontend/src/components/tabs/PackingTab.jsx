import { Backpack, Check } from "lucide-react";

export default function PackingTab({ plan }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {plan.packingList.map((group, i) => (
        <div
          key={i}
          className="rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm"
        >
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-ocean-900">
            <Backpack size={16} className="text-sunset-500" />
            {group.category}
          </h3>
          <ul className="space-y-2">
            {group.items.map((item, j) => (
              <li
                key={j}
                className="flex items-start gap-2 text-sm text-ocean-700"
              >
                <Check size={15} className="mt-0.5 shrink-0 text-ocean-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
