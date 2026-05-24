// screens-b.jsx — Study (flashcards/notes), Album, Pomodoro, Profile

// ═══════════════════════════════════════════════════════════════════════
// STUDY HUB — Flashcards · Notes · Polls
// ═══════════════════════════════════════════════════════════════════════
function StudyScreen({ user, onOpenPolls, onOpenNotes, onOpenDeck, onOpenAlbum, onOpenAI, onOpenKanban }) {
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title="Study tools"
        subtitle="Decks, notes, polls — everything we share"
        trailing={<IconButton name="search" />}
      />

      {/* Hero — AI buddy CTA */}
      <div style={{ padding: "0 22px 12px" }}>
        <button onClick={onOpenAI} style={{
          width: "100%", textAlign: "left",
          padding: 18, borderRadius: 18, border: "none",
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-soft) 100%)",
          color: "#fff", position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 8px 24px -10px rgba(37,99,235,0.5)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 90% 30%, rgba(255,255,255,0.18), transparent 50%)",
          }} />
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "rgba(255,255,255,0.18)", color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, position: "relative",
          }}>✦</div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.1 }}>Study buddy</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 3 }}>
              Generate flashcards or ask anything · powered by AI
            </div>
          </div>
          <Icon name="back" size={18} stroke="rgba(255,255,255,0.85)" style={{ transform: "rotate(180deg)", position: "relative" }} />
        </button>
      </div>

      {/* Tile grid */}
      <div style={{ padding: "0 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <StudyTile color="var(--terra)" label="Notes" icon="note" count={`${NOTES.length} shared`} onClick={onOpenNotes} />
        <StudyTile color="var(--sage)" label="Polls" icon="poll" count={`${SEED_POLLS.filter(p=>p.closesIn!=="Closed").length} live`} onClick={onOpenPolls} />
        <StudyTile color="var(--ochre)" label="Tasks" icon="check" count="Project board" onClick={onOpenKanban} />
        <StudyTile color="var(--berry)" label="Album" icon="photo" count={`${ALBUM.length} photos`} onClick={onOpenAlbum} />
      </div>

      <SectionHead action={{ label: "New deck", onClick: () => {} }}>Flashcard decks</SectionHead>

      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
        {DECKS.map((d, i) => <DeckCard key={d.id} deck={d} onClick={() => onOpenDeck(d)} index={i} />)}
      </div>
    </div>
  );
}

function StudyTile({ color, label, icon, count, onClick, disabled }) {
  return (
    <button onClick={!disabled ? onClick : undefined} disabled={disabled} style={{
      padding: 16, borderRadius: 18, textAlign: "left",
      background: "var(--card)", border: "0.5px solid var(--card-edge)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 110, gap: 18, opacity: disabled ? 0.5 : 1,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: color, color: "#fbf6e8",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={20} strokeWidth={1.8} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 22, color: "var(--ink)", lineHeight: 1,
        }}>{label}</span>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{count}</span>
      </div>
    </button>
  );
}

function DeckCard({ deck, onClick, index }) {
  const owner = findFriend(deck.owner);
  return (
    <button onClick={onClick} className="fade-up" style={{
      animationDelay: `${index * 0.04}s`,
      padding: 16, borderRadius: 18, textAlign: "left",
      background: "var(--card)", border: "0.5px solid var(--card-edge)",
      display: "flex", gap: 14, alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Stacked cards illustration */}
      <div style={{ position: "relative", width: 64, height: 80, flexShrink: 0 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, opacity: 0.4, transform: "rotate(-6deg) translate(-3px, 2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, opacity: 0.7, transform: "rotate(-2deg) translate(0, 1px)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, color: "#fbf6e8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28,
        }}>
          {deck.cards.length}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 19, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -0.01,
        }}>{deck.title}</span>
        <span style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>{deck.subtitle}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <Avatar friend={owner} size={18} />
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{owner.name}</span>
        </div>
      </div>
      <Icon name="back" size={16} stroke="var(--ink-mute)" style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FLASHCARD player
// ═══════════════════════════════════════════════════════════════════════
function FlashcardScreen({ deck, onBack }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const card = deck.cards[idx];
  const isLast = idx === deck.cards.length - 1;

  const next = (known) => {
    if (known) setKnownCount((k) => k + 1);
    setFlipped(false);
    if (!isLast) {
      setTimeout(() => setIdx((i) => i + 1), 140);
    }
  };

  const reset = () => {
    setIdx(0);
    setFlipped(false);
    setKnownCount(0);
  };

  return (
    <div className="paper-bg" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        padding: "62px 18px 8px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <IconButton name="back" size={36} onClick={onBack} />
        <div style={{ flex: 1, lineHeight: 1.1 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 18, color: "var(--ink)",
          }}>{deck.title}</div>
          <div style={{ fontSize: 11, color: "var(--ink-mute)" }}>{idx + 1} of {deck.cards.length}</div>
        </div>
        <IconButton name="more" size={36} />
      </div>

      {/* Progress */}
      <div style={{ padding: "0 22px 8px" }}>
        <div style={{ height: 4, background: "var(--line-soft)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${((idx + (flipped?1:0)) / deck.cards.length) * 100}%`,
            background: deck.color, transition: "width 0.3s",
          }} />
        </div>
      </div>

      {/* Card */}
      <div style={{
        flex: 1, padding: "16px 22px 22px",
        display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center",
      }}>
        <div className="flip-scene">
          <div
            className={"flip-card" + (flipped ? " is-flipped" : "")}
            onClick={() => setFlipped((f) => !f)}
          >
            <CardFace deck={deck} text={card.q} side="front" />
            <CardFace deck={deck} text={card.a} side="back" />
          </div>
        </div>
        <div style={{
          textAlign: "center", marginTop: 14,
          fontSize: 12, color: "var(--ink-mute)", letterSpacing: 0.2,
        }}>
          {flipped ? "Tap to flip back" : "Tap card to reveal"}
        </div>
      </div>

      {/* Actions */}
      <div style={{ padding: "0 22px 32px", display: "flex", gap: 10 }}>
        {!isLast || flipped ? (
          <>
            <button onClick={() => next(false)} className="btn" style={{
              flex: 1, background: "var(--paper-soft)", color: "var(--ink)",
              border: "1px solid var(--line)", padding: "14px 18px",
            }}>
              <Icon name="x" size={16} /> Again
            </button>
            <button onClick={() => next(true)} className="btn btn-primary" style={{
              flex: 1, padding: "14px 18px", background: "var(--sage)",
            }}>
              <Icon name="check" size={16} /> Got it
            </button>
          </>
        ) : (
          <button onClick={reset} className="btn btn-accent" style={{ flex: 1, padding: "14px 18px" }}>
            <Icon name="reset" size={16} /> Done · {knownCount}/{deck.cards.length} known
          </button>
        )}
      </div>
    </div>
  );
}

function CardFace({ deck, text, side }) {
  const isBack = side === "back";
  return (
    <div
      className={"flip-face" + (isBack ? " flip-face-back" : "")}
      style={{
        background: isBack ? deck.color : "var(--card)",
        color: isBack ? "#fbf6e8" : "var(--ink)",
        border: isBack ? "none" : "0.5px solid var(--card-edge)",
      }}
    >
      <span style={{
        fontSize: 11, letterSpacing: 0.3, fontWeight: 600, textTransform: "uppercase",
        opacity: 0.6, marginBottom: 18,
      }}>{isBack ? "answer" : "question"}</span>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: isBack ? 26 : 28, lineHeight: 1.18, letterSpacing: -0.005,
      }}>{text}</div>
      <span style={{
        position: "absolute", bottom: 18, fontSize: 11,
        opacity: 0.5, letterSpacing: 0.2,
      }}>by {findFriend(deck.owner).name}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// POMODORO timer
// ═══════════════════════════════════════════════════════════════════════
function PomodoroScreen({ user }) {
  const TOTAL = 25 * 60;
  const [remaining, setRemaining] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const [topic, setTopic] = useState("FastAPI · Auth route");
  const [phase, setPhase] = useState("focus"); // focus | break
  const [joinedRoom, setJoinedRoom] = useState(null);
  const intervalRef = useRef(null);

  // When joining a room, sync timer/topic to it
  const joinRoom = (roomId) => {
    if (roomId === null) {
      setJoinedRoom(null);
      return;
    }
    const room = STUDY_ROOMS.find((r) => r.id === roomId);
    if (!room) return;
    setJoinedRoom(roomId);
    setTopic(`${room.name} · ${room.topic}`);
    setRemaining(room.minLeft * 60);
    setRunning(true);
  };

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setRunning(false);
          return 0;
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  const pct = ((TOTAL - remaining) / TOTAL) * 100;
  const CIRC = 2 * Math.PI * 120;
  const dash = CIRC * (1 - remaining / TOTAL);

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title="Focus"
        subtitle={phase === "focus" ? "25-minute deep work" : "5-minute break"}
        leading={<div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 11, fontWeight: 600, letterSpacing: 0.18, textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}>
          <Icon name="fire" size={14} stroke="var(--terra)" />
          <span>Day 14</span>
        </div>}
        trailing={<IconButton name="settings" />}
      />

      {/* Topic input */}
      <div style={{ padding: "0 22px 4px" }}>
        <div className="j-card" style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <Icon name="book" size={16} stroke="var(--ink-mute)" />
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What are you working on?"
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontSize: 14, color: "var(--ink)", fontFamily: "var(--font-body)",
            }}
          />
        </div>
      </div>

      {/* Timer dial */}
      <div style={{ padding: "16px 22px", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 280, height: 280 }}>
          <svg width="280" height="280" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle cx="140" cy="140" r="120" fill="none"
                    stroke="var(--line-soft)" strokeWidth="14" />
            <circle cx="140" cy="140" r="120" fill="none"
                    stroke="var(--accent)" strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={CIRC}
                    strokeDashoffset={dash}
                    style={{ transition: "stroke-dashoffset 1s linear" }} />
          </svg>
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 6,
          }}>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 700,
              fontSize: 72, color: "var(--ink)", lineHeight: 1,
              fontVariantNumeric: "tabular-nums", letterSpacing: -0.02,
            }}>{min}:{sec}</span>
            <span className="hand" style={{
              fontSize: 18, color: "var(--accent)",
            }}>{phase === "focus" ? "focusing" : "taking a break"}</span>
            <span style={{
              fontSize: 11, color: "var(--ink-mute)", marginTop: 2, letterSpacing: 0.3,
            }}>{Math.round(pct)}% complete</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: "8px 22px 18px", display: "flex", gap: 12, justifyContent: "center" }}>
        <button onClick={() => { setRemaining(TOTAL); setRunning(false); }} style={{
          width: 56, height: 56, borderRadius: 28,
          background: "var(--paper-soft)", border: "1px solid var(--line)",
          color: "var(--ink-soft)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="reset" size={20} />
        </button>
        <button onClick={() => setRunning((r) => !r)} style={{
          width: 80, height: 80, borderRadius: 40,
          background: "var(--ink)", color: "var(--paper-soft)",
          border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 12px 32px -8px var(--shadow-ink)",
        }}>
          <Icon name={running ? "pause" : "play"} size={32} />
        </button>
        <button onClick={() => setPhase((p) => p === "focus" ? "break" : "focus")} style={{
          width: 56, height: 56, borderRadius: 28,
          background: "var(--paper-soft)", border: "1px solid var(--line)",
          color: "var(--ink-soft)",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon name="leaf" size={20} />
        </button>
      </div>

      <RoomsStrip user={user} onJoin={joinRoom} joinedId={joinedRoom} />

      <SectionHead>Also studying right now</SectionHead>
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 8 }}>
        {STUDYING_NOW.map((s) => {
          const f = findFriend(s.id);
          return (
            <div key={s.id} className="j-card" style={{
              padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
            }}>
              <Avatar friend={f} size={36} status="studying" />
              <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{f.name}</span>
                <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{s.topic}</span>
              </div>
              <div style={{
                display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2,
              }}>
                <span className="hand" style={{ fontSize: 18, color: "var(--accent)", lineHeight: 1 }}>{s.minLeft}m</span>
                <span style={{ fontSize: 10, color: "var(--ink-mute)", letterSpacing: 0.2 }}>remaining</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// NOTES (list + detail)
// ═══════════════════════════════════════════════════════════════════════
function NotesScreen({ user, onBack }) {
  const [open, setOpen] = useState(null);
  if (open) return <NoteDetail note={open} onBack={() => setOpen(null)} />;
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title="Notes"
        subtitle="Markdown · synced across the cabin"
        leading={<IconButton name="back" size={36} onClick={onBack} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
        {NOTES.map((n, i) => {
          const author = findFriend(n.author);
          return (
            <button key={n.id} onClick={() => setOpen(n)} className="j-card fade-up" style={{
              animationDelay: `${i * 0.04}s`,
              padding: 18, textAlign: "left", border: "0.5px solid var(--card-edge)",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {n.pinned && <Icon name="pin" size={14} stroke="var(--accent)" />}
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: 20, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -0.01,
                }}>{n.title}</span>
              </div>
              <div style={{
                fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{n.body.replace(/[#\-*[\]]/g, "").trim().slice(0, 140)}…</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <Avatar friend={author} size={18} />
                <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{author.name} · {n.edited}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NoteDetail({ note, onBack }) {
  const author = findFriend(note.author);
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <div style={{ padding: "62px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <IconButton name="back" size={36} onClick={onBack} />
        <div style={{ flex: 1 }} />
        <IconButton name="edit" size={36} />
        <IconButton name="more" size={36} />
      </div>
      <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar friend={author} size={22} />
          <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{author.name} · {note.edited}</span>
        </div>
        <div className="display" style={{
          fontSize: 34, color: "var(--ink)", lineHeight: 1.05,
        }}>{note.title}</div>
      </div>
      <div className="j-card" style={{
        margin: "0 18px", padding: "8px 18px", position: "relative",
      }}>
        <div className="ruled" style={{
          padding: "12px 4px", fontSize: 14, lineHeight: 1.55,
          color: "var(--ink)", whiteSpace: "pre-wrap",
          fontFamily: "var(--font-body)",
        }}>
          {note.body.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <div key={i} style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
                color: "var(--ink)", margin: "10px 0 4px",
              }}>{line.slice(3)}</div>;
            }
            if (line.startsWith("- [ ] ")) {
              return <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 14, height: 14, border: "1.5px solid var(--ink-mute)", borderRadius: 3 }} />
                <span>{line.slice(6)}</span>
              </div>;
            }
            if (line.startsWith("- [x] ")) {
              return <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  width: 14, height: 14, background: "var(--sage)", borderRadius: 3,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name="check" size={10} stroke="#fff" strokeWidth="3" />
                </div>
                <span style={{ textDecoration: "line-through", color: "var(--ink-mute)" }}>{line.slice(6)}</span>
              </div>;
            }
            if (line.startsWith("- ")) {
              return <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}>•</span><span>{line.slice(2)}</span>
              </div>;
            }
            if (/^\d+\. /.test(line)) {
              return <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)", fontWeight: 600, minWidth: 18 }}>
                  {line.match(/^(\d+)\./)[1]}.
                </span>
                <span>{line.replace(/^\d+\. /, "")}</span>
              </div>;
            }
            return <div key={i}>{line || "\u00A0"}</div>;
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ALBUM
// ═══════════════════════════════════════════════════════════════════════
function AlbumScreen({ onBack }) {
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title="Shared album"
        subtitle="Moments from study sessions"
        leading={<IconButton name="back" size={36} onClick={onBack} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ padding: "0 22px" }}>
        {/* Featured photo */}
        <div className="fade-up" style={{
          position: "relative", borderRadius: 18, overflow: "hidden",
          aspectRatio: "4/3", marginBottom: 12,
          background: `linear-gradient(135deg, ${ALBUM[0].tone[0]}, ${ALBUM[0].tone[1]})`,
        }}>
          <div className="tape" style={{ top: 12, left: 20 }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 0L40 40M40 0L0 40' stroke='rgba(255,255,255,0.06)' stroke-width='1'/></svg>\")",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "20px 18px 18px",
            background: "linear-gradient(to top, rgba(20,12,8,0.75), transparent)",
            color: "#fbf6e8",
          }}>
            <div className="hand" style={{ fontSize: 22, lineHeight: 1 }}>{ALBUM[0].label}</div>
            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85, letterSpacing: 0.2 }}>
              posted by {findFriend(ALBUM[0].poster).name}
            </div>
          </div>
        </div>

        {/* Mosaic grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {ALBUM.slice(1).map((a, i) => (
            <div key={a.id} className="fade-up" style={{
              animationDelay: `${i * 0.03}s`,
              aspectRatio: "1", borderRadius: 10, overflow: "hidden",
              background: `linear-gradient(135deg, ${a.tone[0]}, ${a.tone[1]})`,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='1' fill='rgba(255,255,255,0.1)'/></svg>\")",
              }} />
              <div style={{
                position: "absolute", bottom: 4, left: 6, right: 6,
                fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.9)",
                letterSpacing: 0.2, lineHeight: 1.2,
                overflow: "hidden", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PROFILE / YOU
// ═══════════════════════════════════════════════════════════════════════
function ProfileScreen({ user, onLogout, onOpenAlbum, onOpenNotes, dark, onToggleDark }) {
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100, position: "relative" }}>
      {/* Curved colored cover with character */}
      <div style={{
        position: "relative", height: 280,
        background: "linear-gradient(155deg, var(--accent) 0%, var(--accent-soft) 100%)",
        borderRadius: "0 0 36px 36px",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -40, right: -30, width: 160, height: 160,
          borderRadius: "50%", background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -40, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
        }} />

        {/* Top bar */}
        <div style={{
          position: "relative", padding: "56px 18px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button style={{
            width: 36, height: 36, borderRadius: 12,
            background: "#fbbf24", border: "none",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 10px -4px rgba(0,0,0,0.3)",
          }}>
            <Icon name="back" size={18} stroke="#1f2937" strokeWidth="2.4" />
          </button>
          <div style={{
            fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: 1,
          }}>PROFILE</div>
          <button style={{
            width: 36, height: 36, borderRadius: 10,
            background: "rgba(255,255,255,0.15)", border: "none",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
          }}>
            <Icon name="settings" size={18} stroke="#fff" strokeWidth="2" />
          </button>
        </div>

        {/* Character — centered */}
        <div style={{
          position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
        }}>
          <Character size={180} accent={user.color} />
        </div>

        {/* Customize floating chip */}
        <button style={{
          position: "absolute", bottom: 18, right: 18,
          padding: "8px 12px", borderRadius: 999,
          background: "#fbbf24", border: "none", color: "#1f2937",
          fontSize: 11, fontWeight: 700, letterSpacing: 0.4,
          boxShadow: "0 4px 10px -4px rgba(0,0,0,0.3)",
          display: "inline-flex", alignItems: "center", gap: 6,
        }}>
          <Icon name="edit" size={12} stroke="#1f2937" strokeWidth="2.4" />
          CUSTOMIZE
        </button>
      </div>

      {/* Name + role card overlapping cover */}
      <div style={{ padding: "28px 22px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div style={{
              fontSize: 28, fontWeight: 800, color: "var(--ink)",
              letterSpacing: -0.02, lineHeight: 1,
            }}>{user.name}</div>
            <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 4 }}>
              {user.role} · cabin member
            </div>
          </div>
          <button className="btn btn-ghost" style={{ padding: "8px 14px", fontSize: 12 }}>
            <Icon name="edit" size={13} /> Edit
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 18 }}>
          <Stat label="streak" value="14" unit="days" tone="terra" />
          <Stat label="pomodoros" value="86" unit="this month" tone="sage" />
          <Stat label="decks" value="7" unit="started" tone="ochre" />
        </div>
      </div>

      <SectionHead>Quick access</SectionHead>
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 2 }}>
        <SettingRow icon="photo" label="Shared album" detail={`${ALBUM.length} photos`} onClick={onOpenAlbum} />
        <SettingRow icon="note" label="My notes" detail={`${NOTES.length} shared`} onClick={onOpenNotes} />
        <SettingRow icon="bell" label="Notifications" detail="Daily 9pm" />
        <SettingRow icon={dark ? "sun" : "moon"} label={dark ? "Light mode" : "Dark mode"} onClick={onToggleDark} />
      </div>

      <SectionHead>The cabin · {FRIENDS.length} members</SectionHead>
      <div style={{ padding: "0 22px" }}>
        <div className="j-card" style={{ padding: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 10 }}>
            {FRIENDS.map((f) => (
              <div key={f.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <Avatar friend={f} size={36} />
                <span style={{ fontSize: 9, color: "var(--ink-mute)", letterSpacing: 0.1 }}>{f.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SectionHead>Group</SectionHead>
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 2 }}>
        <SettingRow icon="settings" label="Cabin settings" />
        <SettingRow icon="lock" label="Privacy" detail="Members only" />
        <SettingRow icon="x" label="Sign out" onClick={onLogout} danger />
      </div>
    </div>
  );
}

function Stat({ label, value, unit, tone }) {
  const colors = {
    terra: "var(--terra)",
    sage: "var(--sage)",
    ochre: "var(--ochre)",
  };
  return (
    <div className="j-card" style={{ padding: 12 }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: 0.3, textTransform: "uppercase",
        color: colors[tone], marginBottom: 4,
      }}>{label}</div>
      <div style={{
        display: "flex", alignItems: "baseline", gap: 4,
      }}>
        <span className="display" style={{ fontSize: 28, color: "var(--ink)", lineHeight: 1 }}>{value}</span>
        <span style={{ fontSize: 10, color: "var(--ink-mute)" }}>{unit}</span>
      </div>
    </div>
  );
}

function SettingRow({ icon, label, detail, onClick, danger }) {
  return (
    <button onClick={onClick} className="j-card" style={{
      padding: "12px 14px", display: "flex", alignItems: "center", gap: 12,
      textAlign: "left", background: "var(--card)",
    }}>
      <div style={{
        width: 34, height: 34, borderRadius: 10,
        background: danger ? "var(--tint-terra)" : "var(--paper-soft)",
        color: danger ? "var(--terra)" : "var(--ink-soft)",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={17} />
      </div>
      <span style={{
        flex: 1, fontSize: 14, fontWeight: 500,
        color: danger ? "var(--terra)" : "var(--ink)",
      }}>{label}</span>
      {detail && <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{detail}</span>}
      <Icon name="back" size={14} stroke="var(--ink-mute)" style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}

Object.assign(window, {
  StudyScreen, FlashcardScreen, PomodoroScreen, NotesScreen, AlbumScreen, ProfileScreen,
});
