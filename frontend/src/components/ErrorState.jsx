import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-3xl border border-sunset-200 bg-sunset-50 px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sunset-100 text-sunset-600">
        <AlertTriangle size={26} />
      </span>
      <div>
        <p className="text-lg font-semibold text-sunset-800">
          We couldn't build your trip
        </p>
        <p className="mx-auto mt-1 max-w-md text-sm text-sunset-700">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 rounded-full bg-sunset-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sunset-700"
      >
        <RotateCcw size={15} />
        Try again
      </button>
    </div>
  );
}
