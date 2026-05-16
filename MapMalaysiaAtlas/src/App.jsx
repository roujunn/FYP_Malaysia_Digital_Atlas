import React, { useState } from "react";
import { Map, Moon, Sun } from "lucide-react";
import MapWorkspace from "./components/MapWorkspace";
import ChatPanel from "./components/ChatPanel";
import NotificationToast from "./components/NotificationToast";
import { Scenarios } from "./data/mockAtlasData";
import { processQuery } from "./services/queryProcessor";
import "./styles/App.css";

function App() {
  const defaultScenario = Scenarios.melakaTourism;

  const [query, setQuery] = useState("");
  const [result, setResult] = useState(defaultScenario);
  const [selectedMapType, setSelectedMapType] = useState(
    defaultScenario.recommendedMapType,
  );

  const [showGuidedSteps, setShowGuidedSteps] = useState(false);
  const [activeGuideStep, setActiveGuideStep] = useState(-1);
  const [notification, setNotification] = useState(
    "Ready to explore Malaysia.",
  );
  const [theme, setTheme] = useState("light");

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! Ask me about Malaysia places, map types, spatial query, or graph relationships.",
    },
    { role: "user", text: defaultScenario.query },
    { role: "ai", text: defaultScenario.userFriendlyAnswer },
  ]);

  function handleSearch(nextQuery = query) {
    const cleanQuery = nextQuery.trim();
    if (!cleanQuery) return;
    const processedResult = processQuery(cleanQuery);
    setResult(processedResult);
    setSelectedMapType(processedResult.recommendedMapType);
    setQuery("");
    setShowGuidedSteps(true);
    setActiveGuideStep(-1);
    setNotification("Map and analysis updated.");
    setMessages((prev) => [
      ...prev,
      { role: "user", text: cleanQuery },
      { role: "ai", text: processedResult.userFriendlyAnswer },
    ]);
  }

  return (
    <div className={`app atlas-dashboard ${theme}`}>
      <header className="atlas-top-header">
        <div className="brand">
          <div className="brand-mark">
            <Map size={22} />
          </div>
          <div>
            <h1>Malaysia Digital Atlas</h1>
          </div>
        </div>
        <button
          className="top-theme-button"
          type="button"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}{" "}
          {theme === "light" ? "Dark" : "Light"}
        </button>
      </header>
      <main className="atlas-layout">
        <ChatPanel
          messages={messages}
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
          result={result}
          showGuidedSteps={showGuidedSteps}
          setShowGuidedSteps={setShowGuidedSteps}
          activeGuideStep={activeGuideStep}
          setActiveGuideStep={setActiveGuideStep}
        />
        <MapWorkspace
          result={result}
          selectedMapType={selectedMapType}
          setSelectedMapType={setSelectedMapType}
          activeGuideStep={activeGuideStep}
          setActiveGuideStep={setActiveGuideStep}
        />
      </main>
      <NotificationToast
        message={notification}
        onClose={() => setNotification("")}
      />
    </div>
  );
}
export default App;
