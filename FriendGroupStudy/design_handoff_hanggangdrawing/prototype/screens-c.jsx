// screens-c.jsx — New features: AI Study Buddy, Kanban board, Co-study rooms

// ═══════════════════════════════════════════════════════════════════════
// AI STUDY BUDDY
// Two modes: generate flashcards from a topic, or chat with a tutor.
// Uses window.claude.complete (Claude Haiku, 1024-token cap, shared quota).
// ═══════════════════════════════════════════════════════════════════════
function AIBuddyScreen({ user, onBack, onOpenDeck }) {
  const [mode, setMode] = useState("generate"); // generate | tutor
  return (
    <div className="paper-bg" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <AppNavBar
        title="Study buddy"
        subtitle={mode === "generate" ? "Make flashcards from any topic" : "Ask anything · powered by Claude"}
        leading={<IconButton name="back" size={36} onClick={onBack} />}
        trailing={
          <div className="j-card" style={{ padding: "4px 4px", display: "flex", gap: 2, borderRadius: 999 }}>
            {[
              { id: "generate", label: "Make" },
              { id: "tutor",    label: "Ask" },
            ].map((m) => (
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
      {mode === "generate"
        ? <BuddyGenerator user={user} onOpenDeck={onOpenDeck} />
        : <BuddyTutor user={user} />}
    </div>
  );
}

function BuddyGenerator({ user, onOpenDeck }) {
  const [topic, setTopic] = useState("Python list comprehensions");
  const [count, setCount] = useState(5);
  const [busy, setBusy] = useState(false);
  const [cards, setCards] = useState(null); // [{q, a}, ...]
  const [error, setError] = useState(null);

  const generate = async () => {
    setBusy(true); setError(null); setCards(null);
    try {
      const prompt = `Generate ${count} concise flashcards for studying: "${topic}".
Return ONLY a JSON array, no prose, no markdown fences. Each item: {"q": "question (one short sentence)", "a": "answer (1-2 sentences, plain text)"}.
Make the questions varied — definitions, applications, common pitfalls, comparisons.`;
      const raw = await window.claude.complete({
        messages: [{ role: "user", content: prompt }],
      });
      const jsonText = raw.replace(/^[^[{]*/, "").replace(/[^\]}]*$/, "");
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("Unexpected format");
      setCards(parsed.slice(0, count));
    } catch (e) {
      console.error(e);
      setError("Couldn't generate cards — try again or rephrase your topic.");
    } finally {
      setBusy(false);
    }
  };

  const saveAsDeck = () => {
    const deck = {
      id: `gen-${Date.now()}`,
      title: topic,
      subtitle: `Generated · ${cards.length} cards`,
      color: "#2563eb",
      owner: user.id,
      cards,
    };
    onOpenDeck(deck);
  };

  return (
    <div className="scroll-area" style={{ flex: 1, overflowY: "auto", padding: "0 22px 120px" }}>
      {/* Topic input card */}
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
            {busy ? (<><span className="spin" /> Thinking…</>) : (<>✨ Generate</>)}
          </button>
        </div>
      </div>

      {/* Suggestions */}
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

      {/* Generated cards */}
      {cards && (
        <>
          <SectionHead action={{ label: "Save as deck", onClick: saveAsDeck }}>
            {cards.length} cards ready
          </SectionHead>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cards.map((c, i) => <MiniFlash key={i} card={c} idx={i} />)}
          </div>
        </>
      )}

      {error && (
        <div style={{
          marginTop: 16, padding: "12px 14px", borderRadius: 12,
          background: "var(--tint-strong)", color: "var(--accent)",
          fontSize: 13, lineHeight: 1.5,
        }}>{error}</div>
      )}

      <style>{`
        .spin {
          display: inline-block; width: 12px; height: 12px;
          border: 1.5px solid currentColor; border-right-color: transparent;
          border-radius: 50%; animation: spin 0.7s linear infinite;
          vertical-align: -2px; margin-right: 6px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
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
    { role: "assistant", text: "I'm your study buddy. Ask me anything — concepts, sample problems, debugging. I do my best with code and exam prep." },
  ]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, busy]);

  const send = async () => {
    const text = draft.trim();
    if (!text || busy) return;
    setDraft("");
    const next = [...messages, { role: "user", text }];
    setMessages(next);
    setBusy(true);
    try {
      const sysContext = `You are a friendly, concise study tutor for a Filipino friend group preparing for coding interviews and the Philippine Civil Service Exam. Be encouraging, use plain examples, and keep replies under 6 sentences unless code requires more. The student's name is ${user.name}.`;
      const reply = await window.claude.complete({
        messages: [
          ...next.map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.role === "user" && m === next[0] ? `${sysContext}\n\nQuestion: ${m.text}` : m.text })),
        ],
      });
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", text: "Hmm, I lost connection. Try once more?" }]);
    } finally {
      setBusy(false);
    }
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
              <span className="typing-dots"><i></i><i></i><i></i></span>
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

// ═══════════════════════════════════════════════════════════════════════
// KANBAN — for the project itself (Hanggangdrawing dev board)
// ═══════════════════════════════════════════════════════════════════════
const SEED_TASKS = {
  todo: [
    { id: "t1", title: "WebSocket route for chat", tag: "code",     assignee: "edres",   prio: "high" },
    { id: "t2", title: "Civil Service vocab set 5", tag: "study",    assignee: "rhana",   prio: "med" },
    { id: "t3", title: "Design empty-state for Album", tag: "design", assignee: "jho",     prio: "low" },
    { id: "t4", title: "Migrate to PostgreSQL",     tag: "infra",    assignee: "hero",    prio: "med" },
  ],
  doing: [
    { id: "t5", title: "JWT auth middleware",       tag: "code",     assignee: "edres",   prio: "high" },
    { id: "t6", title: "Pomodoro session storage",  tag: "code",     assignee: "jhums",   prio: "med" },
    { id: "t7", title: "Mock exam #5 — Math",       tag: "study",    assignee: "huamza",  prio: "high" },
  ],
  done: [
    { id: "t8", title: "Repo + CI setup",           tag: "infra",    assignee: "hero",    prio: "high" },
    { id: "t9", title: "Login picker UI",           tag: "design",   assignee: "jho",     prio: "med" },
    { id: "t10", title: "Database schema v1",       tag: "code",     assignee: "norj",    prio: "med" },
    { id: "t11", title: "Sunday review session",    tag: "meet",     assignee: "waren",   prio: "low" },
  ],
};

const TAG_TONES = {
  code:   "terra",
  design: "berry",
  study:  "sage",
  infra:  "ochre",
  meet:   "default",
};

function KanbanScreen({ user, onBack }) {
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [filter, setFilter] = useState("all"); // all | mine

  const move = (id, from, to) => {
    setTasks((t) => {
      const card = t[from].find((x) => x.id === id);
      if (!card) return t;
      return {
        ...t,
        [from]: t[from].filter((x) => x.id !== id),
        [to]: [card, ...t[to]],
      };
    });
  };

  const filterFn = (t) => filter === "all" || t.assignee === user.id;

  const columns = [
    { id: "todo",  label: "To do",       next: "doing", prev: null,    color: "var(--ink-mute)" },
    { id: "doing", label: "In progress", next: "done",  prev: "todo",  color: "var(--accent)" },
    { id: "done",  label: "Shipped",     next: null,    prev: "doing", color: "var(--sage)" },
  ];

  const totalMine = ["todo", "doing", "done"].reduce(
    (s, c) => s + tasks[c].filter((t) => t.assignee === user.id).length, 0);

  return (
    <div className="paper-bg" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      <AppNavBar
        title="Project board"
        subtitle="Hanggangdrawing · sprint 3"
        leading={<IconButton name="back" size={36} onClick={onBack} />}
        trailing={<IconButton name="plus" />}
      />

      {/* Filter chips */}
      <div style={{ padding: "0 22px 12px", display: "flex", gap: 8 }}>
        <FilterChip on={filter === "all"} onClick={() => setFilter("all")}>
          All · {tasks.todo.length + tasks.doing.length + tasks.done.length}
        </FilterChip>
        <FilterChip on={filter === "mine"} onClick={() => setFilter("mine")}>
          Mine · {totalMine}
        </FilterChip>
      </div>

      {/* Columns — horizontal scroll */}
      <div className="scroll-area" style={{
        flex: 1, overflowX: "auto", overflowY: "hidden",
        display: "flex", gap: 12, padding: "0 22px 120px",
        scrollSnapType: "x mandatory",
      }}>
        {columns.map((col) => {
          const items = tasks[col.id].filter(filterFn);
          return (
            <div key={col.id} style={{
              flex: "0 0 84%", maxWidth: 320,
              display: "flex", flexDirection: "column", gap: 8,
              scrollSnapAlign: "start",
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 4px 6px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: col.color,
                  }} />
                  <span style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: 0.2,
                    textTransform: "uppercase", color: "var(--ink-soft)",
                  }}>{col.label}</span>
                  <span style={{
                    fontSize: 11, color: "var(--ink-mute)", fontWeight: 600,
                    background: "var(--paper-soft)", padding: "2px 7px", borderRadius: 999,
                  }}>{items.length}</span>
                </div>
                <button style={{
                  background: "transparent", border: "none", color: "var(--ink-mute)",
                  fontSize: 18, padding: 0, lineHeight: 1, width: 22, height: 22,
                }}>＋</button>
              </div>

              <div className="scroll-area" style={{
                flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
                paddingBottom: 6,
              }}>
                {items.map((task, i) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    col={col}
                    onMove={move}
                    isMine={task.assignee === user.id}
                    index={i}
                  />
                ))}
                {items.length === 0 && (
                  <div style={{
                    padding: "20px 12px", textAlign: "center",
                    color: "var(--ink-mute)", fontSize: 12, fontStyle: "italic",
                    border: "1px dashed var(--line)", borderRadius: 12,
                  }}>
                    {filter === "mine" ? "No tasks here — sweet" : "Empty"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px", borderRadius: 999,
      background: on ? "var(--ink)" : "var(--card)",
      color: on ? "var(--paper)" : "var(--ink-soft)",
      border: "1px solid " + (on ? "var(--ink)" : "var(--line)"),
      fontSize: 12, fontWeight: 600,
    }}>{children}</button>
  );
}

function TaskCard({ task, col, onMove, isMine, index }) {
  const tone = TAG_TONES[task.tag] || "default";
  const f = findFriend(task.assignee);
  const prioColor = task.prio === "high" ? "var(--terra)" : task.prio === "med" ? "var(--ochre)" : "var(--ink-mute)";
  return (
    <div className="j-card fade-up" style={{
      padding: 12, animationDelay: `${index * 0.03}s`,
      borderLeft: `3px solid ${prioColor}`,
      borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 13, lineHeight: 1.35, fontWeight: 600, color: "var(--ink)",
          flex: 1,
        }}>{task.title}</span>
        {isMine && <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 6,
        }} />}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Tag tone={tone}>#{task.tag}</Tag>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Avatar friend={f} size={22} />
        </div>
      </div>
      {/* Move buttons */}
      <div style={{
        marginTop: 10, paddingTop: 8, borderTop: "0.5px solid var(--line-soft)",
        display: "flex", gap: 6, justifyContent: "space-between",
      }}>
        {col.prev ? (
          <button onClick={() => onMove(task.id, col.id, col.prev)} style={moveBtn}>
            ← back
          </button>
        ) : <div />}
        {col.next ? (
          <button onClick={() => onMove(task.id, col.id, col.next)} style={moveBtn}>
            move →
          </button>
        ) : (
          <span style={{
            fontSize: 10, color: "var(--sage)", fontWeight: 700,
            letterSpacing: 0.3, textTransform: "uppercase",
          }}>✓ shipped</span>
        )}
      </div>
    </div>
  );
}

const moveBtn = {
  background: "transparent", border: "none", color: "var(--ink-mute)",
  fontSize: 11, fontWeight: 600, padding: "2px 0",
};

// ═══════════════════════════════════════════════════════════════════════
// CO-STUDY ROOMS — used inside Pomodoro screen
// ═══════════════════════════════════════════════════════════════════════
const STUDY_ROOMS = [
  {
    id: "r1",
    name: "Algo grind",
    topic: "Data structures · heaps & graphs",
    host: "yasser",
    members: ["yasser", "haron", "abdensa", "zainab"],
    minLeft: 18,
    accent: "var(--accent)",
  },
  {
    id: "r2",
    name: "Vocab cabin",
    topic: "Civil Service · English drill",
    host: "rhana",
    members: ["rhana", "khim", "waren"],
    minLeft: 22,
    accent: "var(--sage)",
  },
  {
    id: "r3",
    name: "FastAPI lab",
    topic: "Building the chat WebSocket",
    host: "edres",
    members: ["edres", "qais", "jho"],
    minLeft: 7,
    accent: "var(--ochre)",
  },
];

function RoomsStrip({ user, onJoin, joinedId }) {
  return (
    <>
      <SectionHead action={{ label: "+ New room", onClick: () => {} }}>Co-study rooms</SectionHead>
      <div className="scroll-area" style={{
        display: "flex", gap: 10, overflowX: "auto", padding: "0 22px 4px",
        scrollSnapType: "x mandatory",
      }}>
        {STUDY_ROOMS.map((r) => {
          const joined = joinedId === r.id;
          const members = joined && !r.members.includes(user.id) ? [...r.members, user.id] : r.members;
          return (
            <div key={r.id} className="j-card" style={{
              flex: "0 0 78%", maxWidth: 300, padding: 14, scrollSnapAlign: "start",
              borderTop: `3px solid ${r.accent}`, borderTopLeftRadius: 18, borderTopRightRadius: 18,
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>
                    {r.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
                    hosted by {findFriend(r.host).name}
                  </div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: r.accent, letterSpacing: 0.2,
                  fontVariantNumeric: "tabular-nums",
                }}>
                  ● {r.minLeft}m left
                </div>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>{r.topic}</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
                <AvatarStack ids={members} size={22} max={5} />
                <button
                  onClick={() => onJoin(joined ? null : r.id)}
                  style={{
                    padding: "6px 14px", borderRadius: 999, border: "none",
                    background: joined ? "var(--paper-soft)" : "var(--ink)",
                    color: joined ? "var(--ink)" : "var(--paper)",
                    fontSize: 12, fontWeight: 600,
                  }}>
                  {joined ? "Leave" : "Join"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

Object.assign(window, {
  AIBuddyScreen, KanbanScreen, RoomsStrip, STUDY_ROOMS,
});
