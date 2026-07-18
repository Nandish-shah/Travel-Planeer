export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function addDaysISO(isoDate, days) {
  const d = new Date(`${isoDate}T00:00:00`);
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export function daysBetweenInclusive(startISO, endISO) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return diff + 1;
}

export function formatDayLabel(startISO, dayNumber) {
  if (!startISO) return null;
  const date = new Date(`${startISO}T00:00:00`);
  date.setDate(date.getDate() + (dayNumber - 1));
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function formatDateRange(startISO, endISO) {
  const start = new Date(`${startISO}T00:00:00`);
  const end = new Date(`${endISO}T00:00:00`);
  const opts = { month: "short", day: "numeric" };
  const startLabel = start.toLocaleDateString("en-US", opts);
  const endLabel = end.toLocaleDateString("en-US", { ...opts, year: "numeric" });
  return `${startLabel} – ${endLabel}`;
}
