import React, { useEffect, useMemo, useRef, useState } from "react";
import { popularQueries } from "../data/mockAtlasData";
import { Bot, User, Send, Volume2, Square, Sparkles } from "lucide-react";

function splitWords(text = "") {
  return String(text).match(/\S+\s*/g) || [];
}

function ChatPanel({
  messages,
  query,
  setQuery,
  onSearch,
  result,
  activeGuideStep,
  setActiveGuideStep,
}) {
  const [speaking, setSpeaking] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [showPromptChips, setShowPromptChips] = useState(true);
  const latestAnswerWords = useMemo(
    () => splitWords(result?.userFriendlyAnswer || ""),
    [result?.userFriendlyAnswer],
  );

  useEffect(() => {
    const box = messagesContainerRef.current;
    if (!box) return;

    box.scrollTo({
      top: box.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    stopSpeaking();
    return () => stopSpeaking();
  }, [result.userFriendlyAnswer]);

  function speakAnswer() {
    if (!window.speechSynthesis)
      return alert("Text-to-speech is not supported in this browser.");

    window.speechSynthesis.cancel();
    setSpeaking(true);
    setCurrentWordIndex(0);

    const answerText =
      result?.userFriendlyAnswer || "No answer is available for this query.";
    const utterance = new SpeechSynthesisUtterance(answerText);

    utterance.onboundary = (event) => {
      if (event.name !== "word") return;
      const spokenText = result.userFriendlyAnswer.slice(0, event.charIndex);
      const wordsBefore = spokenText.trim()
        ? spokenText.trim().split(/\s+/).length
        : 0;
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

  function submit(event) {
    event?.preventDefault();
    onSearch(query);
  }

  return (
    <section className="chat-panel">
      <div className="chat-header">
        <div>
          <span className="section-kicker">
            <Sparkles size={14} /> AI Atlas Chat
          </span>
          <h2>Ask about Malaysia</h2>
        </div>

        <div className="voice-actions">
          <button type="button" onClick={speakAnswer}>
            <Volume2 size={12} />
            Listen
          </button>
          <button
            type="button"
            onClick={stopSpeaking}
            className="danger-button"
          >
            <Square size={12} />
            Stop
          </button>
        </div>
      </div>

      <div className="chat-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => {
          const isLatestAi =
            message.role === "ai" && index === messages.length - 1;

          return (
            <div key={index} className={`message-row ${message.role}`}>
              <div className="message-avatar">
                {message.role === "ai" ? <Bot size={16} /> : <User size={16} />}
              </div>

              <div className="message-bubble">
                {isLatestAi && speaking
                  ? latestAnswerWords.map((word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className={
                          wordIndex <= currentWordIndex
                            ? "spoken-word"
                            : wordIndex === currentWordIndex + 1
                              ? "next-word"
                              : ""
                        }
                      >
                        {word}
                      </span>
                    ))
                  : message.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-tools-row">
        <button
          type="button"
          className="mini-toggle"
          onClick={() => setShowPromptChips(!showPromptChips)}
        >
          {showPromptChips ? "Hide suggestions" : "Show suggestions"}
        </button>
      </div>

      {showPromptChips && (
        <div className="prompt-chips">
          {popularQueries.map((item) => (
            <button key={item} type="button" onClick={() => onSearch(item)}>
              {item}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && submit(event)}
          placeholder="Ask about places, transport, tourism..."
        />
        <button type="button" onClick={submit}>
          <Send size={17} />
        </button>
      </div>
    </section>
  );
}

export default ChatPanel;
