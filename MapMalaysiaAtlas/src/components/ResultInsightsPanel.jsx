import React, { useMemo, useState } from "react";
import { Crosshair, GitBranch, ListChecks, MapPin, Play, RotateCcw, StepForward } from "lucide-react";
import GraphVisualization from "./GraphVisualization";

const tabs = [
  { key: "guide", label: "Guide", icon: ListChecks },
  { key: "spatial", label: "Spatial", icon: Crosshair },
  { key: "graph", label: "Graph", icon: GitBranch },
  { key: "places", label: "Places", icon: MapPin },
];

function ResultInsightsPanel({
  result,
  showGuidedSteps,
  setShowGuidedSteps,
  activeGuideStep,
  setActiveGuideStep,
}) {
  const [activeTab, setActiveTab] = useState("guide");

  const maxStep = useMemo(() => Math.max((result.steps?.length || 1) - 1, 0), [result.steps]);
  const started = activeGuideStep >= 0;

  function startTour() {
    setShowGuidedSteps(true);
    setActiveGuideStep(0);
  }

  function nextStep() {
    setShowGuidedSteps(true);
    setActiveGuideStep((prev) => {
      if (prev < 0) return 0;
      return Math.min(prev + 1, maxStep);
    });
  }

  function resetTour() {
    setActiveGuideStep(-1);
  }

  return (
    <section className="result-insights-panel">
      <div className="insights-topbar">
        <div>
          <span className="section-kicker">Result insights</span>
          <strong>Explore the answer without scrolling</strong>
        </div>
        <div className="insight-tabs" role="tablist" aria-label="Result insight tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                type="button"
                className={activeTab === tab.key ? "active" : ""}
                onClick={() => setActiveTab(tab.key)}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="insight-content">
        {activeTab === "guide" && (
          <div className="compact-guide">
            <div className="compact-tour-actions">
              <button type="button" onClick={startTour} className={started ? "active-tool-button" : ""}>
                <Play size={12} />
                {started ? "Tour started" : "Start"}
              </button>
              <button type="button" onClick={nextStep}>
                <StepForward size={12} />
                Next
              </button>
              <button type="button" onClick={resetTour}>
                <RotateCcw size={12} />
                Reset
              </button>
              <button type="button" onClick={() => setShowGuidedSteps(!showGuidedSteps)}>
                {showGuidedSteps ? "Hide steps" : "Show steps"}
              </button>
            </div>

            {showGuidedSteps ? (
              <div className="compact-step-list">
                {result.steps.map((step, index) => (
                  <button
                    type="button"
                    key={`${step}-${index}`}
                    className={`compact-step ${activeGuideStep === index ? "active-step" : ""} ${activeGuideStep > index ? "completed-step" : ""}`}
                    onClick={() => setActiveGuideStep(index)}
                  >
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </button>
                ))}
              </div>
            ) : (
              <div className="compact-empty-note">
                Guided steps are hidden. Press <b>Show steps</b> to display the exploration flow.
              </div>
            )}
          </div>
        )}

        {activeTab === "spatial" && result.spatialAnalysis && (
          <div className="compact-spatial">
            <p>{result.spatialAnalysis.explanation}</p>
            <div className="compact-spatial-summary">
              <span><b>Center:</b> {result.spatialAnalysis.center}</span>
              <span><b>Type:</b> {result.spatialAnalysis.queryType}</span>
              <span><b>Rule:</b> {result.spatialAnalysis.radius}</span>
            </div>
            <div className="compact-result-list">
              {result.spatialAnalysis.results.map((place) => (
                <article key={place.name}>
                  <strong>{place.name}</strong>
                  <span>{place.type} · {place.distance}</span>
                  <p>{place.note}</p>
                </article>
              ))}
            </div>
          </div>
        )}

        {activeTab === "graph" && (
          <div className="compact-graph">
            <GraphVisualization graph={result.graph} compact />
            <div className="compact-graph-edges">
              {result.graph.slice(0, 4).map((edge, index) => (
                <span key={`${edge[0]}-${index}`}>
                  <b>{edge[0]}</b> {edge[1]} <b>{edge[2]}</b>
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "places" && (
          <div className="compact-places">
            {result.relatedPlaces.map((place) => (
              <article key={place.name}>
                <strong>{place.name}</strong>
                <span>{place.type}</span>
                <p>{place.note}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResultInsightsPanel;
