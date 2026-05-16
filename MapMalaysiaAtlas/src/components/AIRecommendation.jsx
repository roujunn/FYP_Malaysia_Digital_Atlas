import React, { useEffect, useMemo, useState } from "react";
import { MessageSquareText, Volume2, Square, Sparkles } from "lucide-react";

function splitWords(text) {
  return text.match(/\S+\s*/g) || [];
}

function AIRecommendation({ result }) {
  const [speaking, setSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);

  const words = useMemo(() => splitWords(result.userFriendlyAnswer), [result.userFriendlyAnswer]);

  useEffect(() => {
    stopSpeaking();
    return () => stopSpeaking();
  }, [result.userFriendlyAnswer]);

  function speakAnswer() {
    if (!window.speechSynthesis) return alert("Text-to-speech is not supported in this browser.");

    window.speechSynthesis.cancel();
    setSpeaking(true);
    setCurrentWordIndex(0);

    const utterance = new SpeechSynthesisUtterance(result.userFriendlyAnswer);
    utterance.rate = 0.92;

    utterance.onboundary = (event) => {
      if (event.name !== "word") return;
      const spokenText = result.userFriendlyAnswer.slice(0, event.charIndex);
      const wordsBefore = spokenText.trim() ? spokenText.trim().split(/\s+/).length : 0;
      setCurrentWordIndex(wordsBefore);
    };

    utterance.onend = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };

    utterance.onerror = () => {
      setSpeaking(false);
      setCurrentWordIndex(-1);
    };

    window.speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
    setCurrentWordIndex(-1);
  }

  return (
    <section className="card-section recommendation-card">
      <div className="card-header">
        <div>
          <span className="section-kicker"><Sparkles size={14} /> Answer</span>
          <h2>{result.title}</h2>
        </div>

        <div className="voice-actions">
          <button onClick={speakAnswer}>
            <Volume2 size={16} />
            {speaking ? "Restart" : "Listen"}
          </button>
          <button onClick={stopSpeaking} className="danger-button">
            <Square size={15} />
            Stop
          </button>
        </div>
      </div>

      <div className="answer-box">
        <MessageSquareText size={20} />
        <p>
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={
                speaking && index <= currentWordIndex
                  ? "spoken-word"
                  : speaking && index === currentWordIndex + 1
                  ? "next-word"
                  : ""
              }
            >
              {word}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}

export default AIRecommendation;
