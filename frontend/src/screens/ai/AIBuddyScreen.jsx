import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import SectionHead from "../../components/ui/SectionHead";
import { useUser } from "../../lib/useUser";

// Mock card generator — until backend is wired up.
// Returns plausible-looking flashcards based on the topic so the UI is testable.
function mockGenerateCards(topic, count) {
  const t = topic.trim() || "general knowledge";
  const samples = [
    { q: `What is the core idea behind ${t}?`, a: `${t} is a concept centered on solving a recurring problem in its field. (mock answer — replace with real AI later)` },
    { q: `Give a common pitfall when applying ${t}.`, a: `A typical mistake is treating ${t} as universal — context still matters. (mock)` },
    { q: `Compare ${t} with a closely related idea.`, a: `${t} differs from its neighbor by emphasizing one specific tradeoff. (mock)` },
    { q: `When would you NOT use ${t}?`, a: `When the problem is small enough that simpler approaches win. (mock)` },
    { q: `Name one historical milestone of ${t}.`, a: `An early formalization that established the modern usage. (mock)` },
    { q: `Cite a real-world application of ${t}.`, a: `Production systems often apply ${t} for performance or clarity gains. (mock)` },
    { q: `What's the simplest example of ${t} in plain English?`, a: `Imagine the smallest case where ${t} produces a visible effect. (mock)` },
    { q: `What dependency does ${t} usually have?`, a: `It typically requires one supporting concept already in place. (mock)` },
    { q: `What metric would you measure ${t} by?`, a: `A meaningful efficiency or clarity metric specific to the use case. (mock)` },
    { q: `Summarize ${t} in one sentence.`, a: `${t} is the practice/theory of (mock summary). (mock)` },
  ];
  return samples.slice(0, count);
}

const TUTOR_REPLIES = [
  "Good question. Here's the short version: think of it as a tradeoff between time and clarity. (mock reply — wire to Claude API later)",
  "Try it like this: break the problem into smaller cases, then look for a pattern. (mock)",
  "That's a common gotcha. Most folks miss the edge case where the input is empty. (mock)",
  "Hint: write the simplest version first, even if it's slow. Optimize after it works. (mock)",
  "Yes — that approach is solid. You can shave a step by reusing the previous result. (mock)",
];

export default function AIBuddyScreen() {
  const [mode, setMode] = useState("generate");
  const navigate = useNavigate();
  const user = useUser();

  if (!user) return null;

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppNavBar
        title="Study buddy"
        subtitle={mode === "generate" ? "Make flashcards from any topic" : "Ask anything · mock tutor for now"}
        leading={<IconButton name="back" size={36} onClick={() => navigate("/study")} />}
        trailing={
          <div className="j-card" style={{ padding: "4px 4px", display: "flex", gap: 2, borderRadius: 999 }}>
            {[{ id: "generate", label: "Make" }, { id: "tutor", label: "Ask" }].map((m) => (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                padding: "6px 12px", borderRadius: 999, border: "none",
                background: mode === m.id ? "var(--ink)" : "transparent",
                color: mode === m.id ? "var(--paper)" : "var(--ink-mute)",
                fontSize: 12, fontWeight: 600,
              }}>{m.label}</button>
            ))}
          </div>
        }
      />
      {mode === "generate" ? <BuddyGenerator /> : <BuddyTutor user={user} />}
    </div>
  );
}

function BuddyGenerator() {
  const [topic, setTopic] = useState("Python list comprehensions");
  const [count, setCount] = useState(5);
  const [busy, setBusy] = useState(false);
  const [cards, setCards] = useState(null);

  const generate = () => {
    if (!topic.trim()) return;
    setBusy(true);
    setCards(null);
    setTimeout(() => {
      setCards(mockGenerateCards(topic, count));
      setBusy(false);
    }, 900);
  };

  return (
    <div className="scroll-area" style={{ flex: 1, overflowY: "auto", padding: "0 22px 40px" }}>
      <div className="j-card" style={{ padding: 18 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.2, textTransform: "uppercase",
          color: "var(--ink-mute)", marginBottom: 8,
        }}>Topic or context</div>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. FastAPI dependency injection, or paste lecture notes…"
          rows={3}
          style={{
            width: "100%", border: "none", outline: "none",
            background: "transparent", fontFamily: "var(--font-body)",
            fontSize: 15, lineHeight: 1.5, color: "var(--ink)",
            resize: "none",
          }}
        />
        <div style={{
          marginTop: 8, paddingTop: 12, borderTop: "0.5px solid var(--line-soft)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 12, color: "var(--ink-mute)", fontWeight: 500 }}>Cards</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button onClick={() => setCount((c) => Math.max(3, c - 1))} style={pillBtn}>−</button>
              <span style={{
                minWidth: 22, textAlign: "center", fontSize: 14, fontWeight: 700,
                color: "var(--ink)", fontVariantNumeric: "tabular-nums",
              }}>{count}</span>
              <button onClick={() => setCount((c) => Math.min(10, c + 1))} style={pillBtn}>+</button>
            </div>
          </div>
          <button onClick={generate} disabled={busy || !topic.trim()} className="btn btn-accent" style={{
            padding: "10px 18px", fontSize: 13, opacity: busy || !topic.trim() ? 0.5 : 1,
          }}>
            {busy ? (<><span className="spin-mini" /> Thinking…</>) : (<>✨ Generate</>)}
          </button>
        </div>
      </div>

      {!cards && !busy && (
        <>
          <SectionHead>Quick starts</SectionHead>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Civil Service English — vocabulary set 5",
              "Big-O complexity for common operations",
              "FastAPI route decorators",
              "SQL JOIN types with examples",
              "Logical reasoning — syllogisms",
            ].map((s) => (
              <button key={s} onClick={() => setTopic(s)} className="j-card" style={{
                padding: "12px 14px", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
                background: "var(--card)",
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 8,
                  background: "var(--tint-strong)", color: "var(--accent)",
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>✦</div>
                <span style={{ flex: 1, fontSize: 13, color: "var(--ink-soft)" }}>{s}</span>
                <Icon name="back" size={13} stroke="var(--ink-mute)" style={{ transform: "rotate(180deg)" }} />
              </button>
            ))}
          </div>
        </>
      )}

      {cards && (
        <>
          <SectionHead action={{ label: "Save as deck", onClick: () => alert("Deck saved (mock)") }}>
            {cards.length} cards ready
          </SectionHead>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cards.map((c, i) => <MiniFlash key={i} card={c} idx={i} />)}
          </div>
        </>
      )}
    </div>
  );
}

const pillBtn = {
  width: 26, height: 26, borderRadius: 13,
  border: "none", background: "var(--paper-soft)",
  fontSize: 16, fontWeight: 600, color: "var(--ink-soft)",
  display: "inline-flex", alignItems: "center", justifyContent: "center",
};

function MiniFlash({ card, idx }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div onClick={() => setFlipped((f) => !f)} className="j-card fade-up" style={{
      padding: 16, display: "flex", flexDirection: "column", gap: 6,
      cursor: "pointer", animationDelay: `${idx * 0.05}s`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: 0.3, textTransform: "uppercase",
        color: flipped ? "var(--sage)" : "var(--accent)", marginBottom: 4,
      }}>
        Card {idx + 1} · {flipped ? "Answer" : "Question"}
      </div>
      <div style={{
        fontSize: 15, lineHeight: 1.45, color: "var(--ink)",
        fontWeight: flipped ? 500 : 600,
      }}>
        {flipped ? card.a : card.q}
      </div>
      <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 4 }}>
        tap to {flipped ? "see question" : "reveal answer"}
      </div>
    </div>
  );
}

function BuddyTutor({ user }) {
  const [messages, setMessages] = useState([
    { role: "assistant", text: `Hi ${user.name}! I'm your study buddy. Ask me anything — concepts, sample problems, debugging. (Currently using mock replies — will plug into Claude API when backend is ready.)` },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const send = () => {
    const text = draft.trim();
    if (!text || busy) return;
    setDraft("");
    setMessages((m) => [...m, { role: "user", text }]);
    setBusy(true);
    setTimeout(() => {
      const reply = TUTOR_REPLIES[Math.floor(Math.random() * TUTOR_REPLIES.length)];
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
      setBusy(false);
    }, 900);
  };

  return (
    <>
      <div ref={scrollRef} className="scroll-area" style={{
        flex: 1, overflowY: "auto", padding: "0 14px 8px",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{
            alignSelf: m.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "84%", display: "flex", gap: 8,
            flexDirection: m.role === "user" ? "row-reverse" : "row",
          }}>
            {m.role === "assistant" && (
              <div style={{
                width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
                color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 14,
              }}>✦</div>
            )}
            <div style={{
              padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "4px 18px 18px 18px",
              background: m.role === "user" ? "var(--ink)" : "var(--card)",
              color: m.role === "user" ? "var(--paper)" : "var(--ink)",
              border: m.role === "assistant" ? "0.5px solid var(--card-edge)" : "none",
              fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap",
            }}>{m.text}</div>
          </div>
        ))}
        {busy && (
          <div style={{ alignSelf: "flex-start", display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, var(--accent), var(--accent-soft))",
              color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
            }}>✦</div>
            <div style={{
              padding: "10px 14px", borderRadius: "4px 18px 18px 18px",
              background: "var(--card)", border: "0.5px solid var(--card-edge)",
            }}>
              <span className="spin-mini" />
            </div>
          </div>
        )}
      </div>
      <div style={{
        padding: "8px 12px 14px", background: "var(--paper)",
        borderTop: "0.5px solid var(--line-soft)",
        display: "flex", gap: 8, alignItems: "flex-end",
      }}>
        <div className="j-card" style={{
          flex: 1, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8,
          borderRadius: 22, minHeight: 42,
        }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything…"
            style={{
              flex: 1, border: "none", background: "transparent",
              outline: "none", fontSize: 14, color: "var(--ink)",
              fontFamily: "var(--font-body)",
            }}
          />
        </div>
        <button onClick={send} disabled={busy || !draft.trim()} style={{
          width: 42, height: 42, borderRadius: 21,
          background: draft.trim() && !busy ? "var(--accent)" : "var(--paper-soft)",
          color: draft.trim() && !busy ? "#fff" : "var(--ink-mute)",
          border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="send" size={20} />
        </button>
      </div>
    </>
  );
}
