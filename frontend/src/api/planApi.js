const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function fetchTravelPlan(payload) {
  const res = await fetch(`${API_BASE}/api/plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message =
      body?.details?.join?.(" ") || body?.error || `Request failed with status ${res.status}`;
    throw new Error(message);
  }

  return body.plan;
}
