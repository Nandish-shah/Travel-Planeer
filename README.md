# Wanderly — AI Travel Planner

A full-stack, AI-powered travel planning app. Give it a budget, a number of
days, and your interests (destination optional), and AI dynamically generates
a complete, one-of-a-kind trip: a day-by-day itinerary, hotel picks, a
weather outlook, a packing list, an interactive map, and a
cost-optimization breakdown.

Every plan is generated live by AI for the exact inputs given — nothing is
static or templated. Two requests with the same budget and interests but a
different number of days will always produce a different, appropriately-sized
itinerary.

## Project structure

```
Travel Planeer/
├── backend/     Express API server that calls the AI provider
│   └── src/
│       ├── server.js              App entry point
│       ├── routes/plan.js         POST /api/plan
│       ├── services/geminiService.js   Prompt + AI call + JSON schema
│       └── utils/validatePlanRequest.js
└── frontend/    React (Vite + Tailwind CSS) UI
    └── src/
        ├── components/            Navbar, Hero, PlannerForm, ResultsDashboard, ...
        │   └── tabs/               Itinerary / Hotels / Weather / Packing / Map / Cost
        └── api/planApi.js         Fetch wrapper for the backend
```

## Prerequisites

- Node.js 18+
- An API key for the AI provider — get one free at [Google AI Studio](https://aistudio.google.com/apikey)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env   # then paste your API key into .env
npm run dev
```

`.env` values:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-flash-latest
PORT=5000
```

The server starts on `http://localhost:5000`. Check `GET /api/health` to
confirm it booted and that a key is configured.

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`. The Vite dev server proxies `/api/*` requests
to the backend on port 5000, so no extra configuration is needed in
development.

## 3. Using the app

1. Scroll to **Plan a trip**.
2. Set your budget, number of days, number of travelers, and pick your
   interests. Destination is optional — leave it blank and the AI will
   recommend one based on your budget and interests.
3. Click **Generate my AI trip plan**. The AI returns a structured plan that
   populates six tabs: Itinerary, Hotels, Weather, Packing List, Map, and
   Cost.

## How the AI integration works

`backend/src/services/geminiService.js` builds a prompt that embeds the
traveler's exact day count, budget, currency, traveler count, and interests,
and instructs the AI to return the trip as strict JSON matching a defined
`responseSchema` (via structured output mode). This means:

- The itinerary always has exactly as many day entries as requested.
- Costs are generated to be consistent with the stated budget.
- Every field (hotels, weather, packing list, cost breakdown) is generated
  fresh per request — not pulled from a static dataset.

## Production build

```bash
cd frontend
npm run build    # outputs static assets to frontend/dist
```

Serve `frontend/dist` with any static host, and deploy `backend/` (with
`GEMINI_API_KEY` set as an environment variable) to any Node host. Update
`VITE_API_BASE_URL` in a `frontend/.env` file if the backend is deployed to a
different origin than the frontend.

## Tech stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, lucide-react icons, GSAP
  (for the animated hero text)
- **Backend:** Node.js, Express 5, `@google/genai` SDK
- **AI:** `gemini-flash-latest` with structured JSON output

---

Built with ❤️, Powered by Nandish Shah.
