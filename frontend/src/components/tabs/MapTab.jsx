import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin, ExternalLink, Loader2 } from "lucide-react";
import { geocodePlace, geocodeSequential } from "../../api/geocode";

function pinIcon(color) {
  return L.divIcon({
    className: "",
    html: `<svg width="28" height="40" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 0C6.7 0 0 6.7 0 15c0 10.5 15 27 15 27s15-16.5 15-27C30 6.7 23.3 0 15 0z" fill="${color}"/>
      <circle cx="15" cy="15" r="6" fill="white"/>
    </svg>`,
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -36],
  });
}

const destinationIcon = pinIcon("#fd5f0d");
const hotelIcon = pinIcon("#147c88");

function FitBounds({ points }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView([points[0].lat, points[0].lon], 13);
    } else {
      map.fitBounds(
        points.map((p) => [p.lat, p.lon]),
        { padding: [40, 40] }
      );
    }
  }, [points, map]);
  return null;
}

export default function MapTab({ plan }) {
  const [destCoords, setDestCoords] = useState(null);
  const [hotelCoords, setHotelCoords] = useState(() => plan.hotels.map(() => undefined));
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    setHotelCoords(plan.hotels.map(() => undefined));

    async function run() {
      const dest = await geocodePlace(plan.mapQuery || plan.destination).catch(() => null);
      if (cancelled) return;

      if (!dest) {
        setStatus("error");
        return;
      }
      setDestCoords(dest);
      setStatus("ready");

      const hotelQueries = plan.hotels.map((h) => `${h.name}, ${h.area}, ${plan.destination}`);
      await geocodeSequential(hotelQueries, (i, coords) => {
        if (cancelled) return;
        setHotelCoords((prev) => {
          const next = [...prev];
          next[i] = coords;
          return next;
        });
      });
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan.mapQuery, plan.destination]);

  const query = encodeURIComponent(plan.mapQuery || plan.destination);
  const linkHref = `https://www.google.com/maps/search/?api=1&query=${query}`;

  const resolvedHotelPoints = hotelCoords
    .map((c, i) => (c ? { ...c, hotel: plan.hotels[i] } : null))
    .filter(Boolean);

  const allPoints = destCoords ? [destCoords, ...resolvedHotelPoints] : resolvedHotelPoints;
  const stillPlacingHotels = hotelCoords.some((c) => c === undefined);

  if (status === "error") {
    const embedSrc = `https://www.google.com/maps?q=${query}&output=embed`;
    return (
      <div className="overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ocean-100 px-6 py-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
            <MapPin size={16} className="text-sunset-500" />
            {plan.mapQuery || plan.destination}
          </p>
          <a
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-ocean-600 hover:text-sunset-600"
          >
            Open in Google Maps
            <ExternalLink size={13} />
          </a>
        </div>
        <iframe
          title="Trip destination map"
          src={embedSrc}
          className="h-[420px] w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ocean-100 px-6 py-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-ocean-900">
          <MapPin size={16} className="text-sunset-500" />
          {plan.mapQuery || plan.destination}
        </p>
        <div className="flex items-center gap-3">
          {(status === "loading" || stillPlacingHotels) && (
            <span className="flex items-center gap-1.5 text-xs font-medium text-ocean-400">
              <Loader2 size={13} className="animate-spin" />
              Placing markers...
            </span>
          )}
          <a
            href={linkHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-semibold text-ocean-600 hover:text-sunset-600"
          >
            Open in Google Maps
            <ExternalLink size={13} />
          </a>
        </div>
      </div>

      {destCoords ? (
        <MapContainer
          center={[destCoords.lat, destCoords.lon]}
          zoom={12}
          scrollWheelZoom={false}
          className="h-[420px] w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds points={allPoints} />
          <Marker position={[destCoords.lat, destCoords.lon]} icon={destinationIcon}>
            <Popup>
              <strong>{plan.destination}</strong>
              <br />
              Trip destination
            </Popup>
          </Marker>
          {resolvedHotelPoints.map((p, i) => (
            <Marker key={i} position={[p.lat, p.lon]} icon={hotelIcon}>
              <Popup>
                <strong>{p.hotel.name}</strong>
                <br />
                {p.hotel.area}
                <br />
                {p.hotel.pricePerNight} / night
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : (
        <div className="flex h-[420px] w-full items-center justify-center gap-2 text-sm text-ocean-500">
          <Loader2 size={16} className="animate-spin" />
          Locating {plan.mapQuery || plan.destination}...
        </div>
      )}

      <div className="flex items-center gap-4 border-t border-ocean-100 px-6 py-3 text-xs text-ocean-500">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sunset-500" />
          Destination
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-ocean-600" />
          Hotels
        </span>
      </div>
    </div>
  );
}
