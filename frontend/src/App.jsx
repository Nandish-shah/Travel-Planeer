import { useState, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SeasonalDestinations from "./components/SeasonalDestinations";
import SpiritualPlaces from "./components/SpiritualPlaces";
import PlannerForm from "./components/PlannerForm";
import LoadingState from "./components/LoadingState";
import ErrorState from "./components/ErrorState";
import ResultsDashboard from "./components/ResultsDashboard";
import Footer from "./components/Footer";
import { fetchTravelPlan } from "./api/planApi";

function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState("");
  const [lastPayload, setLastPayload] = useState(null);
  const resultsRef = useRef(null);

  async function handleGenerate(payload) {
    setLastPayload(payload);
    setStatus("loading");
    setError("");
    try {
      const result = await fetchTravelPlan(payload);
      setPlan(result);
      setStatus("success");
      requestAnimationFrame(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  function handleRetry() {
    if (lastPayload) handleGenerate(lastPayload);
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="no-print">
        <Navbar />
        <Hero />
        <SeasonalDestinations />
        <SpiritualPlaces />
        <PlannerForm onSubmit={handleGenerate} loading={status === "loading"} />
      </div>

      <div ref={resultsRef}>
        {status === "loading" && (
          <div className="no-print mx-auto max-w-5xl px-5 pb-24">
            <LoadingState />
          </div>
        )}

        {status === "error" && (
          <div className="no-print mx-auto max-w-5xl px-5 pb-24">
            <ErrorState message={error} onRetry={handleRetry} />
          </div>
        )}

        {status === "success" && plan && (
          <ResultsDashboard
            plan={plan}
            startDate={lastPayload?.startDate}
            endDate={lastPayload?.endDate}
          />
        )}
      </div>

      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}

export default App;
