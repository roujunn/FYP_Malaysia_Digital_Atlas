import React from "react";
import { Crosshair, MapPinned, Ruler, ShieldCheck } from "lucide-react";

function SpatialAnalysis({ result }) {
  const analysis = result.spatialAnalysis;

  if (!analysis) return null;

  return (
    <section className="card-section spatial-card">
      <div className="spatial-heading">
        <span className="section-kicker">
          <Crosshair size={14} /> Spatial Insight
        </span>
        <h2>Spatial analysis result</h2>
        <p>{analysis.explanation}</p>
      </div>

      <div className="spatial-summary-grid">
        <div className="spatial-summary-item">
          <MapPinned size={18} />
          <span>Center</span>
          <strong>{analysis.center}</strong>
        </div>
        <div className="spatial-summary-item">
          <Ruler size={18} />
          <span>Query Type</span>
          <strong>{analysis.queryType}</strong>
        </div>
        <div className="spatial-summary-item">
          <ShieldCheck size={18} />
          <span>Search rule</span>
          <strong>{analysis.radius}</strong>
        </div>
      </div>

      <div className="spatial-result-list">
        {analysis.results.map((place) => (
          <div className="spatial-result-card" key={place.name}>
            <div>
              <strong>{place.name}</strong>
              <span>{place.type}</span>
            </div>
            <p>{place.distance}</p>
            <small>{place.note}</small>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SpatialAnalysis;
