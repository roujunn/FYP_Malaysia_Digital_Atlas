import React from "react";
import { ChevronDown, ChevronUp, Network } from "lucide-react";
import GraphVisualization from "./GraphVisualization";

function AdvancedAnalysis({ result, showAdvanced, setShowAdvanced }) {
  return (
    <section className="card-section advanced-card">
      <button
        className="advanced-toggle"
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        <div>
          <span className="section-kicker">Optional</span>
          <strong>Advanced AI analysis</strong>
        </div>
        {showAdvanced ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {showAdvanced && (
        <div className="advanced-content">
          <div className="advanced-title">
            <Network size={16} />
            Knowledge relationships
          </div>

          <GraphVisualization graph={result.graph} />

          <div className="graph-list compact-graph-list">
            {result.graph.map((edge, index) => (
              <div className="graph-edge" key={`${edge[0]}-${index}`}>
                <b>{edge[0]}</b>
                <span>{edge[1]}</span>
                <b>{edge[2]}</b>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default AdvancedAnalysis;
