import { Router } from "express";
import { generateTravelPlan } from "../services/geminiService.js";
import { validatePlanRequest } from "../utils/validatePlanRequest.js";

const router = Router();

router.post("/plan", async (req, res) => {
  const { valid, errors, data } = validatePlanRequest(req.body);

  if (!valid) {
    return res.status(400).json({ error: "Invalid request", details: errors });
  }

  try {
    const plan = await generateTravelPlan(data);
    return res.status(200).json({ plan });
  } catch (err) {
    console.error("[POST /api/plan] Gemini generation failed:", err.message);

    if (err.message.includes("GEMINI_API_KEY")) {
      return res.status(500).json({
        error: "Server is missing a Gemini API key. Set GEMINI_API_KEY in backend/.env.",
      });
    }

    if (err.status === 429 || /RESOURCE_EXHAUSTED|429/.test(err.message)) {
      return res.status(429).json({
        error:
          "The AI provider is temporarily rate-limited (free-tier quota reached). Please wait a minute and try again.",
      });
    }

    return res.status(502).json({
      error: "Failed to generate travel plan from AI provider.",
      details: err.message,
    });
  }
});

export default router;
