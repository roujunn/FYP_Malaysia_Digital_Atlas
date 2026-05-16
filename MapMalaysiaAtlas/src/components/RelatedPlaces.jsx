import React from "react";
import { MapPin, ArrowUpRight } from "lucide-react";

function RelatedPlaces({ result }) {
  return (
    <section className="card-section related-card">
      <span className="section-kicker">Related places</span>
      <h2>Useful places for this query</h2>

      <div className="place-list">
        {result.relatedPlaces.map((place) => (
          <article className="place-item" key={place.name}>
            <div className="place-icon">
              <MapPin size={16} />
            </div>
            <div>
              <strong>{place.name}</strong>
              <span>{place.type}</span>
              <p>{place.note}</p>
            </div>
            <ArrowUpRight className="place-arrow" size={17} />
          </article>
        ))}
      </div>
    </section>
  );
}

export default RelatedPlaces;
