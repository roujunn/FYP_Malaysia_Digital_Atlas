import React, { useMemo, useState } from "react";
import {
  Camera,
  Landmark,
  Route,
  Mountain,
  MapPin,
  Navigation,
  Info,
  Layers3,
} from "lucide-react";
import { mapTypeDefinitions } from "../data/mockAtlasData";

const mapIcons = {
  administrative: Landmark,
  tourism: Camera,
  transport: Route,
  physical: Mountain,
};

const mapColors = {
  administrative: "blue",
  tourism: "rose",
  transport: "amber",
  physical: "emerald",
};

function LargeMapSection({ result, selectedMapType, setSelectedMapType }) {
  const [showGuide, setShowGuide] = useState(true);

  const selectedDefinition = useMemo(() => {
    return mapTypeDefinitions[selectedMapType] || mapTypeDefinitions.tourism;
  }, [selectedMapType]);

  const SelectedIcon = mapIcons[selectedMapType] || Camera;

  return (
    <section className="map-shell">
      <div className="map-heading">
        <div>
          <span className="section-kicker">Map result</span>
          <h2>{result.focus}</h2>
          <p>{result.summary}</p>
        </div>

        <button className="plain-button" onClick={() => setShowGuide(!showGuide)}>
          <Info size={16} />
          {showGuide ? "Hide guide" : "Map guide"}
        </button>
      </div>

      <div className="map-type-strip">
        {Object.entries(mapTypeDefinitions).map(([key, item]) => {
          const Icon = mapIcons[key];
          const active = selectedMapType === key;

          return (
            <button
              key={key}
              className={`map-choice ${active ? "active" : ""} ${mapColors[key]}`}
              onClick={() => setSelectedMapType(key)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {showGuide && (
        <div className={`map-guide ${mapColors[selectedMapType]}`}>
          <div className="guide-copy">
            <SelectedIcon size={22} />
            <div>
              <strong>{selectedDefinition.simpleName}</strong>
              <p>{selectedDefinition.description}</p>
            </div>
          </div>

          <div className="guide-tags">
            {selectedDefinition.examples.map((example) => (
              <span key={example}>{example}</span>
            ))}
          </div>
        </div>
      )}

      <div className={`large-map ${mapColors[selectedMapType]}`}>
        <div className="map-bg" />
        <div className="map-gradient" />

        <div className="land land-1" />
        <div className="land land-2" />
        <div className="land land-3" />

        <div className="route route-1" />
        <div className="route route-2" />
        <div className="river" />

        {result.mapMarkers.map((marker, index) => (
          <div
            key={marker.label}
            className={`map-marker marker-${index}`}
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            <MapPin size={15} />
            <span>{marker.label}</span>
          </div>
        ))}

        <div className="map-tools">
          <button>+</button>
          <button>−</button>
          <button><Navigation size={15} /></button>
        </div>

        <div className="map-floating-info">
          <div>
            <Layers3 size={17} />
            <strong>{selectedDefinition.label}</strong>
          </div>
          <p>{result.mapMarkers.length} highlighted locations</p>
        </div>
      </div>
    </section>
  );
}

export default LargeMapSection;
