import "dotenv/config";
import express from "express";
import cors from "cors";
import planRouter from "./routes/plan.js";
import geocodeRouter from "./routes/geocode.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", geminiConfigured: Boolean(process.env.GEMINI_API_KEY) });
});

app.use("/api", planRouter);
app.use("/api", geocodeRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
