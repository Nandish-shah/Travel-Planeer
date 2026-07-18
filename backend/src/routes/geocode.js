import { Router } from "express";

const router = Router();

router.get("/geocode", async (req, res) => {
  const q = String(req.query.q || "").trim();

  if (!q) {
    return res.status(400).json({ error: "Missing query parameter 'q'." });
  }

  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
      q
    )}`;

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Wanderly-Travel-Planner/1.0 (educational project)",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      return res.status(502).json({ error: "Geocoding provider request failed." });
    }

    const data = await response.json();
    if (!data.length) {
      return res.status(404).json({ error: "No location found." });
    }

    return res.status(200).json({
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
      displayName: data[0].display_name,
    });
  } catch (err) {
    console.error("[GET /api/geocode] failed:", err.message);
    return res.status(502).json({ error: "Geocoding failed." });
  }
});

export default router;
