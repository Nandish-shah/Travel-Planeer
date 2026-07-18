# Wanderly — AI Travel Planner

**A full-stack, India-focused AI travel planner.** The user gives a budget, a
travel date range, a departure city, and interests (destination is optional);
the Gemini API dynamically generates a complete trip — itinerary, transport
options, hotels, weather, packing list, map, and cost breakdown — live, on
every request. Nothing in the generated plan is static or templated.

Built with ❤️, Powered by Nandish Shah.

> **This file is a living document.** It is updated every time a meaningful
> feature, architecture change, or new API is added to the project so it
> always reflects the current state of the app.

---

## 1. What this project is

Wanderly is a two-part application:

- **`frontend/`** — a React 19 + Vite single-page app, styled with Tailwind
  CSS v4 in an ocean/sunset/sand travel-brand palette.
- **`backend/`** — a small Express API server whose only real job is to hold
  the Gemini API key server-side, build a detailed prompt from the user's
  form input, and return Gemini's structured JSON response to the frontend.

There is no database and no user accounts — every "plan" is generated fresh
per request and lives only in the browser's React state for that session
(and in a downloaded PDF/print if the user chooses to save one).

---

## 2. How it was built (architecture walkthrough)

### 2.1 Backend — `backend/`

- **`src/server.js`** — Express app entry point. Registers CORS, JSON body
  parsing, a `GET /api/health` check, and mounts the `plan` and `geocode`
  routers under `/api`.
- **`src/routes/plan.js`** — `POST /api/plan`. Validates the request body via
  `validatePlanRequest.js`, calls `generateTravelPlan()`, and returns the
  plan JSON (or a 400/502 error).
- **`src/utils/validatePlanRequest.js`** — Validates budget, `startDate` /
  `endDate` (must be `YYYY-MM-DD`, end ≥ start, and the resulting trip length
  must be 1–30 days — the day count is *derived* from the date range
  server-side, never trusted from the client), traveler count, interests,
  and the optional `origin`/`destination` strings.
- **`src/services/geminiService.js`** — The core of the app. It:
  1. Defines a strict `responseSchema` (via `@google/genai`'s `Type` helpers)
     describing every field the AI must return: `destination`, `tripTitle`,
     `summary`, `bestTimeToVisit`, `itinerary[]`, `transport` (trains +
     flights), `hotels[]`, `weather`, `packingList[]`, `costOptimization`,
     and `mapQuery`.
  2. Builds a natural-language prompt embedding the *exact* trip inputs —
     real calendar dates (not just a day count), budget, currency, traveler
     count, interests, and departure city — with explicit instructions such
     as "the itinerary array MUST contain EXACTLY N entries" and "use the
     actual travel dates to determine real seasonal weather, not a generic
     season."
  3. Calls Gemini with `responseMimeType: "application/json"` and the schema
     so the model returns parseable structured JSON, not free-form prose.
- **`src/routes/geocode.js`** — `GET /api/geocode?q=`. A thin server-side
  proxy to the OpenStreetMap Nominatim geocoding API. This exists because
  Nominatim does not send CORS headers, so the browser cannot call it
  directly — the backend calls it (with a proper `User-Agent`, as Nominatim's
  usage policy requires) and forwards the result.

### 2.2 Frontend — `frontend/`

Single-page app (`App.jsx`) composed of:

- **`components/Navbar.jsx`** — sticky glass-effect nav bar with anchor links.
- **`components/Hero.jsx`** — landing hero with an animated rotating tagline
  (`components/TextType.jsx`, a GSAP-powered typewriter effect).
- **`components/SeasonalDestinations.jsx`** — reads the real device date,
  determines the current Indian meteorological season (Winter / Summer /
  Monsoon / Autumn), and shows real, verified destination photos for that
  season, with tabs to browse the other three.
- **`components/SpiritualPlaces.jsx`** — the same season-tab pattern applied
  to Char Dham Yatra + major Himalayan shrines (with live Open / Opens
  partway / Closed badges per season, since these genuinely close for
  winter snow), all twelve Jyotirlingas, and the Ganga towns of Rishikesh
  and Haridwar.
- **`components/PlaceImage.jsx`** — shared `<img>` wrapper with an
  `onError` fallback to a gradient placeholder, used by both destination
  sections so a broken hotlinked photo never breaks the layout.
- **`components/PlannerForm.jsx`** — the trip input form: departure city
  (optional), destination (optional — AI recommends one if blank), budget +
  currency, a **From/To date range picker** (trip length is computed from
  the dates, not chosen directly), traveler count, and an interest-chip
  multi-select.
- **`components/ResultsDashboard.jsx`** — the generated-plan view: a summary
  banner, a **Download Report** button (triggers the browser's print/Save
  as PDF dialog against a dedicated print-only layout), and a tab bar for:
  - **`tabs/ItineraryTab.jsx`** — day-by-day activities with real calendar
    date labels.
  - **`tabs/TransportTab.jsx`** — AI-estimated train and flight schedules +
    fares between the departure city and destination, with a clear
    "estimates only, not live availability" disclaimer. **No booking or
    payment flow is integrated by design.**
  - **`tabs/HotelsTab.jsx`** — 6 hotel picks spanning budget → luxury.
  - **`tabs/WeatherTab.jsx`** — per-day forecast with real date labels.
  - **`tabs/PackingTab.jsx`** — categorized packing list.
  - **`tabs/MapTab.jsx`** — a Leaflet/OpenStreetMap map (no API key needed)
    with a marker for the destination and one per hotel, geocoded via the
    backend's `/api/geocode` proxy, sequentially with a delay to respect
    Nominatim's public rate limit. Falls back to a plain Google Maps iframe
    embed if geocoding fails.
  - **`tabs/CostTab.jsx`** — budget-vs-estimate status, a category
    breakdown, and money-saving tips.
- **`components/TripReport.jsx`** — a separate, always-rendered
  (`.print-only` CSS class) full report layout covering every section above
  in one continuous document, used by the Download Report button so the
  PDF isn't limited to whichever tab happened to be open on screen.
- **`api/planApi.js`** / **`api/geocode.js`** — thin `fetch` wrappers around
  the backend endpoints.
- **`utils/date.js`** — date-range math (day count, per-day date labels,
  formatted ranges) shared across the form, tabs, and report.
- **`data/options.js`**, **`data/seasonalDestinations.js`**,
  **`data/spiritualPlaces.js`** — static reference data (interest list,
  currencies, curated season/pilgrimage destination sets with real photo
  URLs) that is *not* sent to or generated by the AI — only the trip plan
  itself is AI-generated.

### 2.3 Print / PDF report mechanism

Rather than a client-side PDF library (which tends to fail on hotlinked,
cross-origin images via `canvas` taint), the report uses the browser's
native print pipeline: `TripReport` renders with a `.print-only` class
(`display: none` normally), while the rest of the page carries a `.no-print`
class. `@media print` in `index.css` flips both, so clicking **Download
Report** calls `window.print()` against a clean, paginated, all-sections
document that any browser can "Save as PDF."

---

## 3. Feature list

- AI-generated, non-templated trip plans (itinerary length, activities,
  costs, and weather all vary with the real inputs given).
- Optional destination — if left blank, the AI recommends one itself,
  biased toward Indian destinations (the app's overall focus).
- Date-range trip planning (From/To calendar pickers) with day count derived
  from real dates, driving date-accurate weather/season predictions.
- Departure-city input powering AI-estimated train and flight options.
- Seasonal India destination showcase that updates itself against the real
  device date.
- Spiritual India / pilgrimage section (Char Dham, Jyotirlingas, Himalayan
  shrines, Ganga towns) with season-aware open/closed status.
- Interactive map with real markers (destination + hotels), not just a
  single embedded pin.
- Six-hotel spread from budget to luxury.
- Downloadable, print-ready full trip report covering every section.
- Fully responsive, travel-brand-styled UI (no generic default template
  look).

---

## 4. Tech stack

| Layer | Technology |
|---|---|
| Frontend framework | React 19 + Vite |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`) |
| Icons | lucide-react |
| Animation | GSAP (hero typewriter text) |
| Maps | Leaflet + react-leaflet, OpenStreetMap tiles |
| Backend framework | Node.js + Express 5 |
| AI SDK | `@google/genai` (Gemini) |
| Env config | dotenv |

---

## 5. Project structure

```
Travel Planeer/
├── PROJECT_DOCUMENTATION.md   ← this file
├── README.md                  ← setup / run instructions
├── backend/
│   ├── .env / .env.example
│   └── src/
│       ├── server.js
│       ├── routes/
│       │   ├── plan.js
│       │   └── geocode.js
│       ├── services/
│       │   └── geminiService.js
│       └── utils/
│           └── validatePlanRequest.js
└── frontend/
    └── src/
        ├── App.jsx / main.jsx / index.css
        ├── api/
        │   ├── planApi.js
        │   └── geocode.js
        ├── utils/date.js
        ├── data/
        │   ├── options.js
        │   ├── seasonalDestinations.js
        │   └── spiritualPlaces.js
        └── components/
            ├── Navbar.jsx, Hero.jsx, TextType.jsx/.css
            ├── SeasonalDestinations.jsx, SpiritualPlaces.jsx, PlaceImage.jsx
            ├── PlannerForm.jsx
            ├── ResultsDashboard.jsx, TripReport.jsx
            ├── LoadingState.jsx, ErrorState.jsx, Footer.jsx
            └── tabs/
                ├── ItineraryTab.jsx, TransportTab.jsx, HotelsTab.jsx
                ├── WeatherTab.jsx, PackingTab.jsx, MapTab.jsx, CostTab.jsx
```

---

## 6. Environment variables (`backend/.env`)

```
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-flash-latest
PORT=5000
```

---

## 7. APIs used

This is the authoritative list of every external API the project talks to,
and what each one is for.

| API | Called from | Purpose | Auth | Notes |
|---|---|---|---|---|
| **Google Gemini API** (`@google/genai`, model `gemini-flash-latest`) | `backend/src/services/geminiService.js` | The core AI engine. Generates the entire trip plan — itinerary, hotels, weather, packing list, cost breakdown, and train/flight estimates — as structured JSON on every request, driven by the exact dates/budget/interests/origin given. | API key (`GEMINI_API_KEY`, server-side only) | The only "intelligence" in the app; everything else is either static reference data or a plain data-lookup API. |
| **OpenStreetMap Nominatim** (`nominatim.openstreetmap.org/search`) | `backend/src/routes/geocode.js`, proxied to by `frontend/src/api/geocode.js` | Geocodes place names (destination, hotel name + area) into latitude/longitude so the Map tab can place real markers. | None (public API, requires a descriptive `User-Agent`, which is why it's called server-side) | No CORS headers are sent by Nominatim, so it **cannot** be called directly from the browser — the backend proxies it. Calls are made sequentially with a ~1.1s delay to respect the public usage policy (~1 req/sec). |
| **OpenStreetMap tile server** (`{s}.tile.openstreetmap.org`) | `frontend/src/components/tabs/MapTab.jsx` (via Leaflet's `TileLayer`) | Supplies the actual map tile imagery rendered in the Map tab. | None | Free, no API key. |
| **Google Maps (web links / embed)** | `frontend/src/components/tabs/MapTab.jsx` | "Open in Google Maps" links, and a plain `?output=embed` iframe used only as a fallback if geocoding fails. | None | Not a programmatic API call — just a URL, no key needed. |
| **Wikipedia REST API / Wikimedia Commons API** (`en.wikipedia.org/w/api.php`, `commons.wikimedia.org/w/api.php`) | Used **only during development**, not called by the running app | Sourced the real, verified photo URLs baked into `frontend/src/data/seasonalDestinations.js` and `frontend/src/data/spiritualPlaces.js` (e.g. Goa, Munnar, Kedarnath, the twelve Jyotirlingas). | None | The app itself just renders the resulting `upload.wikimedia.org` image URLs directly — no live API calls happen at runtime for these photos. |

### Notably *not* integrated (and why)

- **Live train/flight data (IRCTC, RapidAPI Indian Railway APIs, Amadeus
  Self-Service, Skyscanner, Apify scrapers, etc.)** — these all require
  paid or registration-gated third-party API keys that this project does
  not have. The Transport tab uses Gemini to generate realistic,
  date-aware estimates instead, clearly labeled as estimates in the UI. If
  real keys for one of these services are added later, `geminiService.js`'s
  transport-generation step can be swapped for a real API call without
  touching the frontend contract (`transport.trains[]` /
  `transport.flights[]` shape stays the same).
- **Booking / payment** — intentionally excluded per project scope; the
  Transport and Hotels tabs are informational only, with no checkout flow.

---

## 8. Changelog

Update this section whenever a feature, architecture change, or new API is
added.

- **Initial build** — React + Vite + Tailwind frontend, Express + Gemini
  backend, structured-JSON trip generation (itinerary, hotels, weather,
  packing list, cost breakdown, map query).
- **UI copy pass** — removed direct "Gemini" branding from user-facing
  copy; footer credit set to "Built with ❤️, Powered by Nandish Shah."
- **Seasonal & Spiritual India sections** — replaced the static "How it
  works" section with a real-time, season-aware Indian destination
  showcase and a Char Dham / Jyotirlinga / Himalayan-shrine pilgrimage
  section, both using verified Wikimedia photos.
- **More hotels** — increased AI-generated hotel options from 3 to 6.
- **Real map markers** — replaced the single-pin map embed with a Leaflet
  map geocoding the destination and every hotel via a new backend
  `/api/geocode` proxy (added specifically because Nominatim has no CORS
  support for direct browser calls).
- **Downloadable report** — added a print-to-PDF full trip report
  (`TripReport.jsx`) covering every section, triggered from the results
  header.
- **Date-range trip planning** — replaced the day-count slider with
  From/To date pickers; day count and AI weather/season predictions are
  now derived from real calendar dates instead of a raw number.
- **Transport tab** — added AI-estimated train and flight schedules/fares
  (no booking/payment integration), positioned next to the Itinerary tab.
- **India-first defaults** — budget currency defaults to INR, destination
  placeholder/example uses an Indian city, and blank-destination requests
  are now biased toward Indian destinations.
- **This documentation file added.**
- **Hero wave seam fix** — the SVG wave divider at the bottom of the hero
  section now exactly color-matches the section below it (and overlaps by
  1px) to eliminate a hairline gap that showed the hero's dark background
  through as a thin line.
- **More transport options** — increased AI-generated train and flight
  options from 2-4 each to 6-8 each, spread across different times of day,
  classes, and operators.
