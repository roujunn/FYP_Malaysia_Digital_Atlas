import React from "react";
import { Search, Send, MapPin, Compass, Plane, Truck, Waves } from "lucide-react";
import { popularQueries } from "../data/mockAtlasData";

const chips = [
  { label: "General", icon: Compass },
  { label: "Tourism", icon: Plane },
  { label: "Logistics", icon: Truck },
  { label: "Environment", icon: Waves },
];

function HeroSearch({ query, setQuery, onSearch }) {
  return (
    <section className="hero-card">
      <div className="hero-visual">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="hero-map-pin"><MapPin size={24} /></div>
        <div className="floating-card fc-one">Penang</div>
        <div className="floating-card fc-two">Selangor</div>
        <div className="floating-card fc-three">Johor</div>
      </div>

      <div className="hero-text">
        <span className="eyebrow"><MapPin size={15} /> Malaysia map assistant</span>
        <h2>Explore Malaysia with a simple question.</h2>
        <p>
          Search for places, attractions, transport access, or environmental areas.
          The atlas chooses a suitable map type and explains the result in simple language.
        </p>

        <div className="hero-chips">
          {chips.map((chip) => {
            const Icon = chip.icon;
            return (
              <span key={chip.label}>
                <Icon size={14} />
                {chip.label}
              </span>
            );
          })}
        </div>
      </div>

      <div className="search-panel">
        <div className="main-search">
          <Search size={20} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Enter" && onSearch()}
            placeholder="Example: What can I visit in Penang?"
          />
          <button onClick={() => onSearch()}>
            <Send size={17} />
            Ask
          </button>
        </div>

        <div className="quick-queries">
          {popularQueries.map((item) => (
            <button key={item} onClick={() => onSearch(item)}>
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSearch;
