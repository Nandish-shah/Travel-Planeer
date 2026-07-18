import { GoogleGenAI, Type } from "@google/genai";

let client = null;

function getClient() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error(
      "GEMINI_API_KEY is not set. Add it to backend/.env before requesting a plan."
    );
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return client;
}

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    destination: { type: Type.STRING },
    tripTitle: { type: Type.STRING },
    summary: { type: Type.STRING },
    bestTimeToVisit: { type: Type.STRING },
    currency: { type: Type.STRING },
    totalEstimatedCost: { type: Type.NUMBER },
    itinerary: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          title: { type: Type.STRING },
          activities: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING },
                activity: { type: Type.STRING },
                description: { type: Type.STRING },
                estimatedCost: { type: Type.NUMBER },
              },
              required: ["time", "activity", "description", "estimatedCost"],
            },
          },
          meals: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ["day", "title", "activities", "meals"],
      },
    },
    hotels: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          area: { type: Type.STRING },
          pricePerNight: { type: Type.NUMBER },
          rating: { type: Type.NUMBER },
          why: { type: Type.STRING },
        },
        required: ["name", "area", "pricePerNight", "rating", "why"],
      },
    },
    weather: {
      type: Type.OBJECT,
      properties: {
        season: { type: Type.STRING },
        overview: { type: Type.STRING },
        forecast: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.NUMBER },
              condition: { type: Type.STRING },
              tempHighC: { type: Type.NUMBER },
              tempLowC: { type: Type.NUMBER },
            },
            required: ["day", "condition", "tempHighC", "tempLowC"],
          },
        },
      },
      required: ["season", "overview", "forecast"],
    },
    packingList: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING },
          items: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["category", "items"],
      },
    },
    costOptimization: {
      type: Type.OBJECT,
      properties: {
        breakdown: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              category: { type: Type.STRING },
              amount: { type: Type.NUMBER },
              percentage: { type: Type.NUMBER },
            },
            required: ["category", "amount", "percentage"],
          },
        },
        savingTips: { type: Type.ARRAY, items: { type: Type.STRING } },
        withinBudget: { type: Type.BOOLEAN },
      },
      required: ["breakdown", "savingTips", "withinBudget"],
    },
    mapQuery: { type: Type.STRING },
    transport: {
      type: Type.OBJECT,
      properties: {
        originUsed: { type: Type.STRING },
        trains: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              trainName: { type: Type.STRING },
              trainNumber: { type: Type.STRING },
              from: { type: Type.STRING },
              to: { type: Type.STRING },
              departureTime: { type: Type.STRING },
              arrivalTime: { type: Type.STRING },
              duration: { type: Type.STRING },
              travelClass: { type: Type.STRING },
              fare: { type: Type.NUMBER },
              runsOn: { type: Type.STRING },
            },
            required: [
              "trainName",
              "trainNumber",
              "from",
              "to",
              "departureTime",
              "arrivalTime",
              "duration",
              "travelClass",
              "fare",
              "runsOn",
            ],
          },
        },
        flights: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              airline: { type: Type.STRING },
              flightNumber: { type: Type.STRING },
              from: { type: Type.STRING },
              to: { type: Type.STRING },
              departureTime: { type: Type.STRING },
              arrivalTime: { type: Type.STRING },
              duration: { type: Type.STRING },
              cabinClass: { type: Type.STRING },
              fare: { type: Type.NUMBER },
              stops: { type: Type.STRING },
            },
            required: [
              "airline",
              "flightNumber",
              "from",
              "to",
              "departureTime",
              "arrivalTime",
              "duration",
              "cabinClass",
              "fare",
              "stops",
            ],
          },
        },
        note: { type: Type.STRING },
      },
      required: ["originUsed", "trains", "flights", "note"],
    },
  },
  required: [
    "destination",
    "tripTitle",
    "summary",
    "bestTimeToVisit",
    "currency",
    "totalEstimatedCost",
    "itinerary",
    "hotels",
    "weather",
    "packingList",
    "costOptimization",
    "mapQuery",
    "transport",
  ],
};

function formatDateRange(startDate, endDate) {
  const opts = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const start = new Date(`${startDate}T00:00:00Z`).toLocaleDateString("en-US", {
    ...opts,
    timeZone: "UTC",
  });
  const end = new Date(`${endDate}T00:00:00Z`).toLocaleDateString("en-US", {
    ...opts,
    timeZone: "UTC",
  });
  return `${start} to ${end}`;
}

function buildPrompt({
  origin,
  destination,
  budget,
  currency,
  days,
  startDate,
  endDate,
  interests,
  travelers,
}) {
  const destinationLine = destination
    ? `The traveler wants to go to: ${destination}.`
    : `The traveler has NOT picked a destination. Based on their budget, trip length and interests, recommend the single best-fit destination yourself. This app is India-focused, so prefer a great destination within India unless the stated budget or interests clearly call for an international trip (e.g. a very high budget explicitly paired with an interest that India can't satisfy). Choose realistically, considering what is reachable and enjoyable within the stated budget, then plan the whole trip around it.`;

  const originLine = origin
    ? `The traveler is departing from: ${origin}.`
    : `The traveler did not specify a departure city — assume a major national hub or gateway city reasonably close to the destination.`;

  return `You are an expert AI travel planner working for "Wanderly", a premium travel-planning company.
Build a complete, realistic, and DYNAMIC trip plan tailored exactly to the inputs below. Do not reuse a generic template — every section must be derived logically from the exact travel dates, the budget, and the interests given.

TRIP INPUTS:
- Destination preference: ${destinationLine}
- Departure city: ${originLine}
- Exact travel dates: ${formatDateRange(startDate, endDate)} (${days} day${days === 1 ? "" : "s"} total). The "itinerary" array MUST contain EXACTLY ${days} entries, one per day, numbered 1 to ${days}, each with a distinct theme/focus and activities that make sense for that specific day of the trip (e.g. arrival day is lighter, later days can be more adventurous, last day accounts for departure).
- Use the actual travel dates above to determine the real seasonal weather, local festivals/events, and any seasonal closures or crowd patterns for the destination at that specific time of year — do not default to a generic season.
- Total budget: ${budget} ${currency} for the entire trip (all travelers combined). Every cost figure (hotels, activities, totals) must be realistic for this destination and consistent with this budget. Set costOptimization.withinBudget to true only if totalEstimatedCost <= budget.
- Number of travelers: ${travelers}
- Interests / trip style: ${interests}

REQUIREMENTS:
1. Vary the plan meaningfully based on the interest list — activities must reflect the stated interests, not generic sightseeing.
2. Hotels: suggest 6 real-style options spanning a range of price points (from budget to luxury) that fit within the budget, in real or realistic neighborhoods/areas of the destination, each with a short reason why it suits this traveler.
3. Weather: give a realistic forecast for the exact travel dates given, with one forecast entry per day of the trip.
4. Packing list: group items into sensible categories based on destination climate at those specific dates and interests.
5. Cost optimization: break total budget usage into categories (e.g. accommodation, food, activities, transport) that sum approximately to totalEstimatedCost, with percentages, plus concrete money-saving tips specific to this trip.
6. mapQuery must be a short human-readable place string suitable for a Google Maps search (e.g. "Kyoto, Japan").
7. Transport: set transport.originUsed to the departure city actually used (the one given, or the hub you assumed). Provide 6-8 realistic, DISTINCT train options in transport.trains (different train names/numbers, spread across different times of day — early morning, morning, afternoon, evening, overnight — and different classes) ONLY if a reasonable direct or well-known connecting rail journey exists between the departure city and destination (e.g. within the same country with an established rail network) — otherwise return an empty trains array rather than inventing an implausible rail route. Always provide 6-8 realistic, DISTINCT flight options in transport.flights (different airlines/flight numbers spread across different times of day and cabin classes) connecting the departure city's nearest major airport to the destination's nearest major airport, with plausible airline names, flight numbers, timings and fares for the given travel dates. Set transport.note to a short, honest disclaimer that these are AI-estimated schedules and fares for planning reference only, and travelers should confirm exact timings and prices directly with the railway/airline or a licensed booking platform before making any purchase.
8. Keep all text concise, specific, and non-generic. Prices should be numbers only (no currency symbols) in the given currency.

Return ONLY the structured data matching the response schema.`;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRateLimitError(err) {
  return err?.status === 429 || /RESOURCE_EXHAUSTED|429/.test(err?.message || "");
}

export async function generateTravelPlan(input) {
  const ai = getClient();
  const model = process.env.GEMINI_MODEL || "gemini-flash-lite-latest";

  const prompt = buildPrompt(input);

  const maxAttempts = 2;
  let lastErr;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema,
          temperature: 0.9,
        },
      });

      const text = result.text;
      if (!text) {
        throw new Error("Gemini returned an empty response.");
      }

      try {
        return JSON.parse(text);
      } catch (err) {
        throw new Error("Failed to parse Gemini response as JSON: " + err.message);
      }
    } catch (err) {
      lastErr = err;
      if (isRateLimitError(err) && attempt < maxAttempts) {
        await sleep(4000);
        continue;
      }
      throw err;
    }
  }

  throw lastErr;
}
