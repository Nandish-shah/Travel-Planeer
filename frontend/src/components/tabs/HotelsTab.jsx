import { Star, MapPin } from "lucide-react";

export default function HotelsTab({ plan }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {plan.hotels.map((hotel, i) => (
        <div
          key={i}
          className="flex flex-col rounded-2xl border border-ocean-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-ocean-950">{hotel.name}</h3>
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-ocean-50 px-2 py-1 text-xs font-bold text-ocean-700">
              <Star size={12} className="fill-sunset-500 text-sunset-500" />
              {hotel.rating}
            </span>
          </div>
          <p className="mb-3 flex items-center gap-1 text-xs font-medium text-ocean-500">
            <MapPin size={13} />
            {hotel.area}
          </p>
          <p className="flex-1 text-sm leading-relaxed text-ocean-600">{hotel.why}</p>
          <div className="mt-4 border-t border-ocean-50 pt-3">
            <span className="text-lg font-bold text-ocean-950">
              {hotel.pricePerNight}
            </span>
            <span className="text-sm text-ocean-500"> / night</span>
          </div>
        </div>
      ))}
    </div>
  );
}
