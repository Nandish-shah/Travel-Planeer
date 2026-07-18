import { Plane } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-ocean-100 bg-ocean-950 py-10 text-ocean-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 md:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ocean-700 text-white">
            <Plane className="-rotate-45" size={16} />
          </span>
          <span className="font-semibold text-white">Wanderly</span>
        </div>
        <p className="text-sm text-ocean-300">
          Built with <span aria-hidden="true">❤️</span>, Powered by Nandish Shah.
        </p>
      </div>
    </footer>
  );
}
