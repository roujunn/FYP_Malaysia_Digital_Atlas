import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Sparkles, StepForward } from "lucide-react";

function GuidedExplanation({ result, activeGuideStep, setActiveGuideStep, showGuidedSteps }) {
  const [isTourRunning, setIsTourRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current);
    setIsTourRunning(false);
    setActiveGuideStep(-1);
  }, [result.title, setActiveGuideStep]);

  function startGuidedTour() {
    clearTimeout(timerRef.current);
    setIsTourRunning(true);
    setActiveGuideStep(0);
    runStep(0);
  }

  function runStep(stepIndex) {
    if (stepIndex >= result.steps.length - 1) {
      timerRef.current = setTimeout(() => setIsTourRunning(false), 1200);
      return;
    }

    timerRef.current = setTimeout(() => {
      const nextStep = stepIndex + 1;
      setActiveGuideStep(nextStep);
      runStep(nextStep);
    }, 1500);
  }

  function nextStep() {
    clearTimeout(timerRef.current);
    setIsTourRunning(false);
    setActiveGuideStep((prev) => {
      if (prev < 0) return 0;
      return Math.min(prev + 1, result.steps.length - 1);
    });
  }

  function resetTour() {
    clearTimeout(timerRef.current);
    setIsTourRunning(false);
    setActiveGuideStep(-1);
  }

  return (
    <section className="card-section guide-card cinematic-card">
      <div className="guide-card-header">
        <div>
          <span className="section-kicker"><Sparkles size={14} /> Guided Exploration</span>
          <h2>Guided map exploration</h2>
          <p>
            The map can guide the user step by step while highlighting relevant places.
          </p>
        </div>

        <div className="tour-actions">
          <button type="button" onClick={startGuidedTour} className={isTourRunning ? "active-tool-button" : ""}>
            <Play size={13} /> Start tour
          </button>
          <button type="button" onClick={nextStep}>
            <StepForward size={13} /> Next
          </button>
          <button type="button" onClick={resetTour}>
            <RotateCcw size={13} /> Reset
          </button>
        </div>
      </div>

      {showGuidedSteps ? (
        <div className="step-grid">
          {result.steps.map((step, index) => (
            <div
              className={`step-card ${activeGuideStep === index ? "active-step" : ""} ${activeGuideStep > index ? "completed-step" : ""}`}
              key={step}
              onClick={() => setActiveGuideStep(index)}
            >
              <span>{index + 1}</span>
              <p>{step}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="hidden-steps-note">
          Guided steps are hidden. Use the “Show steps” button in the chat panel to display the explanation flow.
        </div>
      )}
    </section>
  );
}

export default GuidedExplanation;
