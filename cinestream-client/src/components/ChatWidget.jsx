import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bot, MessageCircle, Send, Sparkles, Trash2, X } from "lucide-react";
import { backend } from "../api/backend";
import { renderMarkdown } from "../utils/markdown";
import { useMovie } from "../context/MovieContext";

const SESSION_KEY = "cinestream_chat_session";

const WELCOME_MESSAGE = {
  id: "welcome",
  role: "bot",
  content:
    "Hi, I'm **CineStream AI** 🤖🎬\n\nAsk me for movie or TV show recommendations — by genre, mood, actor, or anything similar to a title you already love.",
};

const SUGGESTIONS = [
  "Recommend a mind-bending sci-fi movie",
  "Best feel-good comedies to watch tonight",
  "Shows similar to Breaking Bad",
  "Top thriller movies of all time",
];

const loadSession = () => {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) && parsed.length ? parsed : [WELCOME_MESSAGE];
  } catch {
    return [WELCOME_MESSAGE];
  }
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(loadSession);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

const { currentMovie } = useMovie();

  useEffect(() => {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages)); } catch { /* ignore */ }
  }, [messages]);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("nav-open");
      setTimeout(() => inputRef.current?.focus(), 250);
    } else {
      document.body.classList.remove("nav-open");
    }
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMessage = { id: `u-${Date.now()}`, role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
    const data = await backend.chatWithAI({
  message: trimmed,

  page: currentMovie ? "movie-details" : "general",

  movie: currentMovie
    ? {
        id: currentMovie.id,
        title: currentMovie.title,
        overview: currentMovie.overview,
        rating: currentMovie.vote_average,
        genres: currentMovie.genres?.map((g) => g.name),
        releaseDate: currentMovie.release_date,
      }
    : null,

  history: messages
    .slice(-6)
    .map((m) => ({
    role: m.role === "bot" ? "assistant" : m.role,
      content: m.content,
    })),
});
      const botMessage = {
        id: `b-${Date.now()}`,
        role: "bot",
        content: data.reply || "Sorry, I couldn't come up with a reply. Try asking again.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "bot",
          error: true,
          content: "I'm having trouble replying right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    send(input);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input);
    }
  };

  const clearChat = () => setMessages([WELCOME_MESSAGE]);

  const widget = (
    <>
      <button
        type="button"
        className={`ai-chat-launcher ${open ? "is-open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close CineStream AI chat" : "Open CineStream AI chat"}
        aria-expanded={open}
      >
        <span className="ai-chat-launcher__icon ai-chat-launcher__icon--chat">
          <Bot aria-hidden="true" />
        </span>
        <span className="ai-chat-launcher__icon ai-chat-launcher__icon--close">
          <X aria-hidden="true" />
        </span>
      </button>

      <div className={`ai-chat-window ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="CineStream AI chat">
        <header className="ai-chat-header">
          <div className="ai-chat-header__brand">
            <span className="ai-chat-header__avatar"><Sparkles aria-hidden="true" /></span>
            <div>
              <strong>CineStream AI</strong>
              <span>Movie &amp; TV recommendations</span>
            </div>
          </div>
          <div className="ai-chat-header__actions">
            <button type="button" onClick={clearChat} aria-label="Clear chat history" title="Clear chat">
              <Trash2 aria-hidden="true" />
            </button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              <X aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="ai-chat-body" ref={scrollRef}>
          {messages.map((message) => (
            <div key={message.id} className={`ai-chat-message ai-chat-message--${message.role} ${message.error ? "is-error" : ""}`}>
              {message.role === "bot" && (
                <span className="ai-chat-message__avatar"><Bot aria-hidden="true" /></span>
              )}
              <div
                className="ai-chat-message__bubble"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(message.content) }}
              />
            </div>
          ))}

          {typing && (
            <div className="ai-chat-message ai-chat-message--bot">
              <span className="ai-chat-message__avatar"><Bot aria-hidden="true" /></span>
              <div className="ai-chat-message__bubble ai-chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}

          {messages.length <= 1 && !typing && (
            <div className="ai-chat-suggestions">
              {SUGGESTIONS.map((suggestion) => (
                <button type="button" key={suggestion} onClick={() => send(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>

        <form className="ai-chat-input-bar" onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask for a movie or show recommendation…"
          />
          <button type="submit" aria-label="Send message" disabled={!input.trim() || typing}>
            <Send aria-hidden="true" />
          </button>
        </form>
      </div>

      <button
        type="button"
        className={`ai-chat-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-label="Close chat"
        tabIndex={open ? 0 : -1}
      />
    </>
  );

  return createPortal(widget, document.body);
}