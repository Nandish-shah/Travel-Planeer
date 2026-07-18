import { useState } from "react";
import { ImageOff } from "lucide-react";

export default function PlaceImage({ image, name, className = "h-48 w-full object-cover" }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-ocean-200 to-ocean-400 text-ocean-700 ${className}`}
      >
        <ImageOff size={24} />
      </div>
    );
  }

  return (
    <img
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className={`object-cover transition duration-500 group-hover:scale-105 ${className}`}
    />
  );
}
