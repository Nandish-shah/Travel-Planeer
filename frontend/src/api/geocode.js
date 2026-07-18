const cache = new Map();
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function geocodePlace(query) {
  if (cache.has(query)) return cache.get(query);

  const res = await fetch(`${API_BASE}/api/geocode?q=${encodeURIComponent(query)}`);

  if (!res.ok) {
    cache.set(query, null);
    return null;
  }

  const data = await res.json();
  const result = { lat: data.lat, lon: data.lon, displayName: data.displayName };
  cache.set(query, result);
  return result;
}

/**
 * Geocodes a list of queries sequentially with a delay between requests,
 * respecting Nominatim's public usage policy (max ~1 request/second) which
 * our backend proxies through to.
 * Calls onResult(index, coords | null) as each one resolves.
 */
export async function geocodeSequential(queries, onResult, delayMs = 1100) {
  for (let i = 0; i < queries.length; i++) {
    try {
      const coords = await geocodePlace(queries[i]);
      onResult(i, coords);
    } catch {
      onResult(i, null);
    }
    if (i < queries.length - 1) {
      await sleep(delayMs);
    }
  }
}
