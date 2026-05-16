import React, { useMemo, useState } from "react";
import {
  Brain,
  Building2,
  Camera,
  ChevronRight,
  Crosshair,
  Film,
  GitBranch,
  Info,
  Landmark,
  Mailbox,
  MapPin,
  Mountain,
  Navigation,
  Play,
  RotateCcw,
  Route,
  Square,
  StepForward,
  Users,
} from "lucide-react";
import GraphVisualization from "./GraphVisualization";
import { mapTypeDefinitions } from "../data/mockAtlasData";

const mapIcons = {
  administrative: Landmark,
  political: Building2,
  transport: Route,
  physical: Mountain,
  tourism: Camera,
  socioeconomic: Users,
};

const mapColors = {
  administrative: "blue",
  political: "purple",
  transport: "amber",
  physical: "emerald",
  tourism: "rose",
  socioeconomic: "teal",
};

function getCategoryLabel(type = "Other") {
  const lower = type.toLowerCase();
  if (
    lower.includes("hospital") ||
    lower.includes("health") ||
    lower.includes("facility")
  )
    return "Hospitals & Facilities";
  if (
    lower.includes("tour") ||
    lower.includes("attraction") ||
    lower.includes("cultural") ||
    lower.includes("food") ||
    lower.includes("scenic") ||
    lower.includes("heritage")
  )
    return "Tourist Attractions";
  if (
    lower.includes("transport") ||
    lower.includes("road") ||
    lower.includes("rail") ||
    lower.includes("route") ||
    lower.includes("highway")
  )
    return "Transport & Routes";
  if (
    lower.includes("district") ||
    lower.includes("state") ||
    lower.includes("taman") ||
    lower.includes("kampung") ||
    lower.includes("boundary") ||
    lower.includes("city")
  )
    return "Administrative Areas";
  if (
    lower.includes("amenity") ||
    lower.includes("education") ||
    lower.includes("church") ||
    lower.includes("religious") ||
    lower.includes("market")
  )
    return "Amenities & Services";
  return "Other Results";
}

function groupSpatialResults(results = []) {
  return results.reduce((groups, item) => {
    const label = getCategoryLabel(item.type);
    if (!groups[label]) groups[label] = [];
    groups[label].push(item);
    return groups;
  }, {});
}

function buildAIUnderstanding(result, selectedDefinition) {
  const analysis = result.spatialAnalysis || {};
  const center = analysis.center || result.focus || "Selected area";
  const entityNames = [
    center,
    ...(result.mapMarkers || []).slice(0, 3).map((marker) => marker.label),
  ]
    .filter(Boolean)
    .filter((value, index, array) => array.indexOf(value) === index);

  return {
    intent: analysis.queryType || "General geographical query",
    entities: entityNames,
    mapType: selectedDefinition?.label || "Selected Map",
    workflow: result.steps || [],
  };
}

function MapWorkspace({
  result,
  selectedMapType,
  setSelectedMapType,
  activeGuideStep = -1,
  setActiveGuideStep,
}) {
  const [showSideTools, setShowSideTools] = useState(true);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showAllSpatial, setShowAllSpatial] = useState(false);
  const [showFullGraph, setShowFullGraph] = useState(false);

  const selectedDefinition = useMemo(
    () =>
      mapTypeDefinitions[selectedMapType] || mapTypeDefinitions.administrative,
    [selectedMapType],
  );

  const groupedSpatialResults = groupSpatialResults(
    result.spatialAnalysis?.results || [],
  );
  const aiUnderstanding = buildAIUnderstanding(result, selectedDefinition);
  const mapMarkers = result.mapMarkers || [];

  const highlightedMarkerIndex =
    activeGuideStep >= 0
      ? activeGuideStep % Math.max(mapMarkers.length, 1)
      : -1;
  const maxStep = Math.max((result.steps?.length || 1) - 1, 0);
  const nodeCount = new Set(
    (result.graph || []).flatMap((edge) => [edge[0], edge[2]]),
  ).size;

  function startTour() {
    setActiveGuideStep?.(0);
  }

  function nextStep() {
    setActiveGuideStep?.((prev) =>
      prev < 0 ? 0 : Math.min(prev + 1, maxStep),
    );
  }

  function stopTour() {
    setActiveGuideStep?.(-1);
  }

  function resetTour() {
    setActiveGuideStep?.(-1);
  }

  return (
    <section className="atlas-workspace final-balanced-workspace">
      <div className="map-type-topbar">
        {Object.entries(mapTypeDefinitions).map(([key, item]) => {
          const Icon = mapIcons[key] || Landmark;
          return (
            <button
              key={key}
              className={`atlas-map-tab ${selectedMapType === key ? "active" : ""} ${mapColors[key]}`}
              onClick={() => setSelectedMapType(key)}
              type="button"
            >
              <Icon size={18} />
              <span>
                <b>{item.label}</b>
                <small>{item.short}</small>
              </span>
            </button>
          );
        })}
      </div>

      <div className={`map-definition-banner ${mapColors[selectedMapType]}`}>
        <Info size={15} />
        <p>
          <b>{selectedDefinition.label}:</b> {selectedDefinition.description}
        </p>
      </div>

      <div
        className={`atlas-main-area final-main-area ${showSideTools ? "with-tools" : "tools-hidden"}`}
      >
        <div className="left-insights-column">
          <aside
            className={`explore-tools-panel final-left-tools ${showSideTools ? "open" : "closed"}`}
          >
            {showSideTools ? (
              <>
                <div className="explore-panel-header">
                  <div>
                    <span>Analysis Controls</span>
                    <strong>{result.focus}</strong>
                  </div>
                  <button type="button" onClick={() => setShowSideTools(false)}>
                    ×
                  </button>
                </div>

                {result.spatialAnalysis && (
                  <div className="side-card left-widget spatial-left-widget">
                    <div className="side-card-title">
                      <Crosshair size={15} />
                      <h3>Spatial Analysis</h3>
                    </div>
                    <dl>
                      <div>
                        <dt>Type</dt>
                        <dd>{result.spatialAnalysis.queryType}</dd>
                      </div>
                      <div>
                        <dt>Center</dt>
                        <dd>{result.spatialAnalysis.center}</dd>
                      </div>
                      <div>
                        <dt>Rule</dt>
                        <dd>{result.spatialAnalysis.radius}</dd>
                      </div>
                      <div>
                        <dt>Results</dt>
                        <dd>{result.spatialAnalysis.results.length} places</dd>
                      </div>
                    </dl>
                    <p>{result.spatialAnalysis.explanation}</p>
                    <div className="left-category-list">
                      {Object.entries(groupedSpatialResults).map(
                        ([category, items]) => (
                          <button
                            type="button"
                            key={category}
                            onClick={() => setShowAllSpatial(true)}
                          >
                            <span>{category}</span>
                            <b>{items.length}</b>
                          </button>
                        ),
                      )}
                    </div>
                    <button
                      className="wide-light-button"
                      type="button"
                      onClick={() => setShowAllSpatial(true)}
                    >
                      View all spatial results
                    </button>
                  </div>
                )}

                <div className="side-card left-widget ai-query-widget">
                  <div className="side-card-title">
                    <Brain size={15} />
                    <h3>How AI understands the query</h3>
                  </div>
                  <dl>
                    <div>
                      <dt>Intent</dt>
                      <dd>{aiUnderstanding.intent}</dd>
                    </div>
                    <div>
                      <dt>Entities</dt>
                      <dd>{aiUnderstanding.entities.join(", ")}</dd>
                    </div>
                    <div>
                      <dt>Map</dt>
                      <dd>{aiUnderstanding.mapType}</dd>
                    </div>
                  </dl>
                  <ol className="left-ai-steps">
                    {aiUnderstanding.workflow.slice(0, 4).map((step, index) => (
                      <li key={`${step}-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="side-card left-widget cinematic-widget">
                  <div className="side-card-title">
                    <Film size={15} />
                    <h3>Cinematic AI</h3>
                  </div>
                  <p>
                    Guides the user through the answer using narration-style
                    steps and marker highlighting.
                  </p>
                  <div className="compact-cinematic-actions">
                    <button type="button" onClick={startTour}>
                      <Play size={12} /> Start
                    </button>
                    <button type="button" onClick={nextStep}>
                      <StepForward size={12} /> Next
                    </button>
                    <button type="button" onClick={stopTour}>
                      <Square size={11} /> Stop
                    </button>
                    <button type="button" onClick={resetTour}>
                      <RotateCcw size={12} /> Reset
                    </button>
                  </div>
                  <div className="cinematic-step-box">
                    {(result.steps || []).map((step, index) => (
                      <button
                        key={`${step}-${index}`}
                        type="button"
                        className={
                          activeGuideStep === index
                            ? "active"
                            : activeGuideStep > index
                              ? "done"
                              : ""
                        }
                        onClick={() => setActiveGuideStep?.(index)}
                      >
                        <span>{index + 1}</span>
                        <p>{step}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <button
                className="open-tools-fab"
                type="button"
                onClick={() => setShowSideTools(true)}
              >
                <ChevronRight size={18} />
              </button>
            )}
          </aside>

          <div className="atlas-bottom-insights final-graph-bottom">
            <article className="bottom-card graph-only-card">
              <div className="bottom-card-heading">
                <div>
                  <h3>
                    <GitBranch size={15} /> Knowledge Graph Visualization
                  </h3>
                  <p>
                    {nodeCount} entities · {(result.graph || []).length}{" "}
                    relationships from the current query
                  </p>
                </div>
                <button
                  className="text-action"
                  type="button"
                  onClick={() => setShowFullGraph(true)}
                >
                  View full graph
                </button>
              </div>
              <GraphVisualization graph={result.graph} compact />
            </article>
          </div>
        </div>

        <div
          className={`atlas-map-canvas final-map-canvas ${mapColors[selectedMapType]}`}
        >
          <div className="map-bg" />
          <div className="map-gradient" />
          <div className="land land-1" />
          <div className="land land-2" />
          <div className="land land-3" />
          <div className="route route-1" />
          <div className="route route-2" />
          <div className="river" />
          {(result.mapMarkers || []).map((marker, index) => (
            <button
              type="button"
              key={marker.label}
              className={`map-marker marker-${index} ${selectedMarker?.label === marker.label ? "selected-marker" : ""} ${highlightedMarkerIndex === index ? "tour-highlight-marker" : ""}`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              onClick={() => setSelectedMarker(marker)}
            >
              <MapPin size={15} />
              <span>{marker.label}</span>
            </button>
          ))}
          {selectedMarker && (
            <div className="marker-detail-card">
              <div>
                <strong>{selectedMarker.label}</strong>
                <button type="button" onClick={() => setSelectedMarker(null)}>
                  ×
                </button>
              </div>
              <p>
                {selectedMarker.description ||
                  "Relevant location highlighted by the atlas."}
              </p>
              <span>{selectedMarker.type || "Map result"}</span>
              {selectedMarker.distance && (
                <small>{selectedMarker.distance}</small>
              )}
            </div>
          )}
          <div className="map-tools">
            <button type="button">+</button>
            <button type="button">−</button>
            <button type="button">
              <Navigation size={15} />
            </button>
          </div>
        </div>
      </div>

      {showAllSpatial && (
        <div
          className="modal-backdrop"
          onClick={() => setShowAllSpatial(false)}
        >
          <div
            className="spatial-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>All Spatial Query Results</h3>
                <p>
                  {result.spatialAnalysis?.queryType} ·{" "}
                  {result.spatialAnalysis?.radius} of{" "}
                  {result.spatialAnalysis?.center}
                </p>
              </div>
              <button type="button" onClick={() => setShowAllSpatial(false)}>
                ×
              </button>
            </div>
            <div className="spatial-modal-grid">
              {(result.spatialAnalysis?.results || []).map((place, index) => (
                <div className="spatial-detail-card" key={place.name}>
                  <span>{index + 1}</span>
                  <div>
                    <h4>{place.name}</h4>
                    <p>
                      {place.type} · {place.distance}
                    </p>
                    <small>{place.note || "Relevant spatial result."}</small>
                    <dl>
                      <div>
                        <dt>Opening hours</dt>
                        <dd>
                          {place.openingHours ||
                            (place.type?.toLowerCase().includes("food") ||
                            place.name?.toLowerCase().includes("food")
                              ? "10:00 AM - 10:00 PM"
                              : "-")}
                        </dd>
                      </div>
                      <div>
                        <dt>Source</dt>
                        <dd>{place.source || "JPS Pahang"}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showFullGraph && (
        <div className="modal-backdrop" onClick={() => setShowFullGraph(false)}>
          <div
            className="spatial-modal graph-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h3>Full Knowledge Graph</h3>
                <p>
                  {nodeCount} entities · {(result.graph || []).length}{" "}
                  relationships
                </p>
              </div>
              <button type="button" onClick={() => setShowFullGraph(false)}>
                ×
              </button>
            </div>
            <GraphVisualization graph={result.graph} />
          </div>
        </div>
      )}
    </section>
  );
}

export default MapWorkspace;
