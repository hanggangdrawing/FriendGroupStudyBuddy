// screens-a.jsx — Login, Home (timeline), Chat, Polls

// ═══════════════════════════════════════════════════════════════════════
// LOGIN — Character-driven sign in / sign up (Lingo Star style)
// → then friend picker (which cabin member you are)
// ═══════════════════════════════════════════════════════════════════════
function Login({ onLogin }) {
  const [step, setStep] = useState("auth"); // auth | picker
  const [mode, setMode] = useState("signin"); // signin | signup
  const [picked, setPicked] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleSubmit = () => {
    setBusy(true);
    setTimeout(() => { setBusy(false); setStep("picker"); }, 800);
  };

  if (step === "picker") {
    return <PickerStep picked={picked} setPicked={setPicked}
                       onBack={() => setStep("auth")} onLogin={onLogin} />;
  }
  return <AuthStep mode={mode} setMode={setMode} busy={busy} onSubmit={handleSubmit} />;
}

// ─── AUTH STEP ─────────────────────────────────────────────────────────
function AuthStep({ mode, setMode, busy, onSubmit }) {
  const isSignUp = mode === "signup";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const valid = username.trim().length >= 2 && password.length >= 6
    && (!isSignUp || confirm === password);

  return (
    <div style={{
      width: "100%", height: "100%", position: "relative", overflow: "hidden",
      background: "var(--paper)",
    }}>
      {/* Curved colored header */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 360,
        background: "linear-gradient(155deg, var(--accent) 0%, var(--accent-soft) 100%)",
        borderRadius: "0 0 36px 36px",
        overflow: "hidden",
      }}>
        {/* Soft glow accents in header */}
        <div style={{
          position: "absolute", top: -40, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -40,
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }} />
      </div>

      {/* Back button (decorative, returns nowhere here but matches reference) */}
      <div style={{
        position: "absolute", top: 56, left: 18, zIndex: 5,
      }}>
        <button style={{
          width: 36, height: 36, borderRadius: 12,
          background: "#fbbf24", border: "none",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 10px -4px rgba(0,0,0,0.3)",
        }}>
          <Icon name="back" size={18} stroke="#1f2937" strokeWidth="2.4" />
        </button>
      </div>

      {/* Character + speech bubble */}
      <div style={{
        position: "absolute", top: 60, left: 0, right: 0, zIndex: 4,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
        <div style={{
          alignSelf: "center", marginLeft: 60, marginBottom: -10, zIndex: 5,
        }}>
          <SpeechBubble side="right">
            {isSignUp ? "Let's get started!" : "Welcome back!"}
          </SpeechBubble>
        </div>
        <div style={{ marginTop: -8 }}>
          <Character size={170} accent="var(--accent-soft)" />
        </div>
      </div>

      {/* Card */}
      <div className="scroll-area" style={{
        position: "absolute", top: 300, left: 0, right: 0, bottom: 0,
        background: "var(--card)",
        borderRadius: "32px 32px 0 0",
        boxShadow: "0 -8px 32px -12px var(--shadow-ink)",
        padding: "0 24px 28px",
        overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}>
        {/* Segmented tabs */}
        <div style={{
          display: "flex", marginTop: 22, marginBottom: 18,
          borderBottom: "1px solid var(--line-soft)",
        }}>
          {[
            { id: "signin", label: "SIGN IN" },
            { id: "signup", label: "SIGN UP" },
          ].map((m) => {
            const on = mode === m.id;
            return (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                flex: 1, padding: "10px 0", border: "none",
                background: "transparent",
                color: on ? "var(--ink)" : "var(--ink-mute)",
                fontSize: 13, fontWeight: 700, letterSpacing: 0.8,
                position: "relative",
              }}>
                {m.label}
                {on && <div style={{
                  position: "absolute", left: "20%", right: "20%", bottom: -1, height: 3,
                  background: "var(--ink)", borderRadius: 2,
                }} />}
              </button>
            );
          })}
        </div>

        {/* Form fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <RoundedField value={username} onChange={setUsername}
                        placeholder="User name" />
          <RoundedField value={password} onChange={setPassword}
                        placeholder="Password" type="password" />
          {isSignUp && (
            <RoundedField value={confirm} onChange={setConfirm}
                          placeholder="Confirm password" type="password" />
          )}
        </div>

        {!isSignUp && (
          <button style={{
            alignSelf: "flex-end", marginTop: 10,
            background: "transparent", border: "none",
            color: "var(--ink-mute)", fontSize: 12, fontWeight: 500,
          }}>Forgotten password?</button>
        )}

        {/* Primary CTA — yellow */}
        <button onClick={onSubmit} disabled={!valid || busy} style={{
          marginTop: 18, padding: "16px 22px",
          background: valid && !busy ? "#fbbf24" : "#fde68a",
          color: "#1f2937", border: "none", borderRadius: 999,
          fontSize: 14, fontWeight: 800, letterSpacing: 1,
          boxShadow: valid && !busy ? "0 8px 20px -8px rgba(251,191,36,0.7)" : "none",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          cursor: valid && !busy ? "pointer" : "not-allowed",
        }}>
          {busy && <span className="spin-mini" />}
          {isSignUp ? "SIGN UP" : "SIGN IN"}
        </button>

        {/* OR divider */}
        <div style={{
          margin: "18px 0 14px", textAlign: "center",
          fontSize: 11, color: "var(--ink-mute)", fontWeight: 700,
          letterSpacing: 0.6,
        }}>OR</div>

        {/* Social circles */}
        <div style={{
          display: "flex", justifyContent: "center", gap: 16, marginBottom: 8,
        }}>
          <SocialCircle provider="facebook" disabled={busy} onClick={onSubmit} />
          <SocialCircle provider="google" disabled={busy} onClick={onSubmit} />
          <SocialCircle provider="apple" disabled={busy} onClick={onSubmit} />
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 16, textAlign: "center", fontSize: 11,
          color: "var(--ink-mute)", lineHeight: 1.6,
        }}>
          By {isSignUp ? "signing up" : "continuing"} you agree to our{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>terms</span>{" & "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>privacy</span>.
        </div>
      </div>

      <style>{`
        .spin-mini {
          display: inline-block; width: 12px; height: 12px;
          border: 1.5px solid currentColor; border-right-color: transparent;
          border-radius: 50%; animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// Rounded pill input — matches reference style
function RoundedField({ value, onChange, placeholder, type = "text" }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--card)", border: "1.5px solid var(--line)",
      borderRadius: 999, padding: "0 18px",
      transition: "border 0.15s",
    }}>
      <input
        type={isPw && !show ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, padding: "13px 0", border: "none", background: "transparent",
          outline: "none", fontSize: 14, color: "var(--ink)",
          fontFamily: "var(--font-body)",
        }}
      />
      {isPw && (
        <button onClick={() => setShow((s) => !s)} style={{
          background: "transparent", border: "none", padding: 4,
          color: "var(--ink-mute)",
        }}>
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
              <path d="M3 3l18 18"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}

// ─── Step 3: Friend picker ─────────────────────────────────────────────
function PickerStep({ picked, setPicked, onBack, onLogin }) {
  return (
    <div className="paper-bg fade-up" style={{
      width: "100%", height: "100%", overflow: "hidden",
      display: "flex", flexDirection: "column", paddingBottom: 28,
    }}>
      <div style={{ padding: "62px 18px 8px", display: "flex", alignItems: "center" }}>
        <IconButton name="back" size={36} onClick={onBack} />
      </div>

      <div style={{ padding: "0 24px 16px" }}>
        <div style={{
          fontSize: 26, fontWeight: 700, color: "var(--ink)",
          lineHeight: 1.1, letterSpacing: -0.02,
        }}>Who's logging in?</div>
        <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 6 }}>
          Pick yourself from the cabin. We'll remember next time.
        </div>
      </div>

      <div className="scroll-area" style={{
        flex: 1, overflowY: "auto", padding: "0 16px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {FRIENDS.map((f) => {
            const on = picked === f.id;
            return (
              <button key={f.id} onClick={() => setPicked(f.id)} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: 6, padding: "10px 4px", borderRadius: 14,
                background: on ? "var(--card)" : "transparent",
                border: on ? "1px solid var(--accent)" : "1px solid transparent",
                transition: "all 0.15s",
              }}>
                <Avatar friend={f} size={46} ring={on} />
                <span style={{
                  fontSize: 11, fontWeight: on ? 700 : 500,
                  color: on ? "var(--ink)" : "var(--ink-soft)",
                  letterSpacing: 0.1,
                }}>{f.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "14px 24px 0" }}>
        <button onClick={() => picked && onLogin(picked)} disabled={!picked}
                className="btn btn-accent" style={{
                  width: "100%", padding: "16px 22px", fontSize: 16, borderRadius: 14,
                  opacity: picked ? 1 : 0.4,
                }}>
          {picked ? `Enter as ${findFriend(picked).name}` : "Pick yourself"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// HOME — Timeline + presence + today's poll
// ═══════════════════════════════════════════════════════════════════════
function HomeScreen({ user, onOpenChat, onOpenStudy, onOpenTimer, onOpenAlbum }) {
  const [posts, setPosts] = useState(POSTS);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const react = (postId, emoji) => {
    setPosts((arr) => arr.map((p) => {
      if (p.id !== postId) return p;
      const r = { ...p.reactions };
      r[emoji] = (r[emoji] || 0) + 1;
      return { ...p, reactions: r };
    }));
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title={`Hi, ${user.name}.`}
        subtitle={dateStr}
        leading={<div style={{
          display: "flex", alignItems: "center", gap: 6,
          fontSize: 11, fontWeight: 600, letterSpacing: 0.18, textTransform: "uppercase",
          color: "var(--ink-mute)",
        }}>
          <Icon name="leaf" size={14} stroke="var(--sage)" />
          <span>Day 14 streak</span>
        </div>}
        trailing={<IconButton name="bell" badge={2} />}
      />

      {/* Studying now strip */}
      <div style={{ padding: "0 22px 8px" }}>
        <div className="j-card" style={{ padding: "14px 16px", position: "relative" }}>
          <div className="tape" style={{ top: -8, left: 22 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="hand" style={{ fontSize: 18, color: "var(--accent)", lineHeight: 1 }}>studying now</span>
              <span style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
                {STUDYING_NOW.length} people · pomodoro in progress
              </span>
            </div>
            <button onClick={onOpenTimer} style={{
              background: "var(--ink)", color: "var(--paper-soft)",
              border: "none", borderRadius: 999, padding: "8px 14px",
              fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>
              <Icon name="play" size={11} />
              Join
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {STUDYING_NOW.slice(0, 5).map((s) => (
              <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                <Avatar friend={s.id} size={32} status="studying" />
                <span style={{ fontSize: 10, color: "var(--ink-mute)", fontWeight: 500 }}>{s.minLeft}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Today's poll preview */}
      <div style={{ padding: "12px 22px 0" }}>
        <div className="j-card" style={{ padding: 16, background: "var(--paper-soft)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <Tag tone="terra">Live poll · closes today</Tag>
            <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{SEED_POLLS[1].votes}13 votes</span>
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 22, color: "var(--ink)", lineHeight: 1.15, marginBottom: 10,
          }}>{SEED_POLLS[1].question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SEED_POLLS[1].options.slice(0, 2).map((o) => {
              const total = SEED_POLLS[1].options.reduce((s, x) => s + x.votes.length, 0);
              const pct = Math.round(o.votes.length / total * 100);
              return (
                <div key={o.id} style={{ position: "relative", padding: "8px 12px", background: "var(--card)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", inset: 0, width: `${pct}%`,
                    background: "var(--tint-sage)",
                  }} />
                  <div style={{
                    position: "relative", display: "flex", justifyContent: "space-between",
                    fontSize: 13, color: "var(--ink)",
                  }}>
                    <span>{o.label}</span>
                    <span style={{ color: "var(--ink-mute)", fontWeight: 600 }}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <SectionHead action={{ label: "All posts", onClick: () => {} }}>Timeline</SectionHead>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 22px" }}>
        {posts.map((p, i) => <PostCard key={p.id} post={p} onReact={react} index={i} />)}
      </div>
    </div>
  );
}

function PostCard({ post, onReact, index }) {
  const author = findFriend(post.author);
  const tags = {
    code: { tone: "sage", label: "code" },
    flashcards: { tone: "ochre", label: "flashcards" },
    results: { tone: "terra", label: "results" },
  };
  const tag = post.tag ? tags[post.tag] : null;
  return (
    <div className="j-card fade-up" style={{
      padding: 18, animationDelay: `${index * 0.04}s`,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Avatar friend={author} size={36} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{author.name}</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{author.role} · {post.time}</span>
        </div>
        {tag && <Tag tone={tag.tone}>#{tag.label}</Tag>}
      </div>

      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 22, lineHeight: 1.15, color: "var(--ink)", marginBottom: 8,
        letterSpacing: -0.01,
      }}>{post.title}</div>

      <div style={{
        fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)", marginBottom: 14,
      }}>{post.body}</div>

      {/* Reactions */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        {Object.entries(post.reactions).map(([emoji, count]) => (
          <button key={emoji} onClick={() => onReact(post.id, emoji)} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "5px 10px", borderRadius: 999,
            background: "var(--paper-soft)", border: "1px solid var(--line-soft)",
            fontSize: 12, color: "var(--ink-soft)", fontWeight: 500,
          }}>
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 10px", borderRadius: 999,
          background: "transparent", border: "none",
          fontSize: 12, color: "var(--ink-mute)", fontWeight: 500,
        }}>
          <Icon name="reply" size={13} />
          {post.comments}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// CHAT
// ═══════════════════════════════════════════════════════════════════════
function ChatScreen({ user }) {
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((m) => [...m, { id: `m${Date.now()}`, author: user.id, time, text, reactions: {} }]);
    setDraft("");
    // Auto-reply for delight
    setTimeout(() => {
      const reply = [
        { author: "basty",  text: "saved!" },
        { author: "waren",  text: "🙌🙌🙌" },
        { author: "jho",    text: "noted noted" },
        { author: "edres",  text: "ack" },
        { author: "basam",  text: "wait what" },
      ][Math.floor(Math.random() * 5)];
      const now2 = new Date();
      const t2 = `${now2.getHours()}:${String(now2.getMinutes()).padStart(2, "0")}`;
      setMessages((m) => [...m, { id: `m${Date.now()+1}`, author: reply.author, time: t2, text: reply.text, reactions: {} }]);
    }, 1100);
  };

  return (
    <div className="paper-bg" style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Custom chat header */}
      <div style={{
        padding: "62px 18px 14px", borderBottom: "0.5px solid var(--line-soft)",
        display: "flex", alignItems: "center", gap: 12, background: "var(--paper)",
      }}>
        <IconButton name="back" size={36} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 20, color: "var(--ink)",
          }}>The Study Cabin</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
            19 members · 5 studying
          </span>
        </div>
        <AvatarStack ids={["jhums","edres","rhana","tocalo"]} size={24} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="scroll-area" style={{
        flex: 1, overflowY: "auto", padding: "12px 14px 8px",
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{
          alignSelf: "center", margin: "6px 0 14px",
          fontSize: 11, color: "var(--ink-mute)", letterSpacing: 0.2,
        }}>Today · {new Date().toLocaleDateString("en-US",{weekday:"short", month:"short", day:"numeric"})}</div>
        {messages.map((m, i) => (
          <MessageBubble
            key={m.id}
            msg={m}
            isMe={m.author === user.id}
            prev={messages[i - 1]}
          />
        ))}
        <div style={{
          alignSelf: "flex-start", display: "flex", gap: 8, alignItems: "center",
          padding: "4px 4px 12px", opacity: 0.6,
        }}>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>jho is typing</span>
          <span className="typing-dots">
            <i></i><i></i><i></i>
          </span>
        </div>
      </div>

      {/* Composer */}
      <div style={{
        padding: "8px 12px 14px", background: "var(--paper)",
        borderTop: "0.5px solid var(--line-soft)",
        display: "flex", gap: 8, alignItems: "flex-end",
      }}>
        <div className="j-card" style={{
          flex: 1, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
          borderRadius: 22, minHeight: 42,
        }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message the cabin…"
            style={{
              flex: 1, border: "none", background: "transparent",
              outline: "none", fontSize: 14, color: "var(--ink)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button style={{ background: "transparent", border: "none", color: "var(--ink-mute)", padding: 0 }}>
            <Icon name="photo" size={20} />
          </button>
        </div>
        <button onClick={send} style={{
          width: 42, height: 42, borderRadius: 21,
          background: draft.trim() ? "var(--accent)" : "var(--paper-soft)",
          color: draft.trim() ? "#fbf6e8" : "var(--ink-mute)",
          border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.15s",
        }}>
          <Icon name="send" size={20} />
        </button>
      </div>

      <style>{`
        .typing-dots { display: inline-flex; gap: 3px; }
        .typing-dots i {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--ink-mute); display: inline-block;
          animation: bounce 1.2s infinite;
        }
        .typing-dots i:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-3px); } }
      `}</style>
    </div>
  );
}

function MessageBubble({ msg, isMe, prev }) {
  const author = findFriend(msg.author);
  const showAuthor = !prev || prev.author !== msg.author;
  if (isMe) {
    return (
      <div style={{
        alignSelf: "flex-end", maxWidth: "78%",
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2,
        marginTop: showAuthor ? 6 : 1,
      }}>
        <div style={{
          padding: "9px 14px", borderRadius: "18px 18px 4px 18px",
          background: "var(--ink)", color: "var(--paper-soft)",
          fontSize: 14, lineHeight: 1.4,
        }}>{msg.text}</div>
        <span style={{ fontSize: 10, color: "var(--ink-mute)", padding: "0 4px" }}>{msg.time}</span>
      </div>
    );
  }
  return (
    <div style={{
      alignSelf: "flex-start", display: "flex", gap: 8,
      maxWidth: "82%", marginTop: showAuthor ? 8 : 1,
    }}>
      <div style={{ width: 28, flexShrink: 0 }}>
        {showAuthor && <Avatar friend={author} size={28} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {showAuthor && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: author.color, padding: "0 4px",
          }}>{author.name}</span>
        )}
        <div style={{
          padding: "9px 14px", borderRadius: "4px 18px 18px 18px",
          background: "var(--card)",
          border: "0.5px solid var(--card-edge)",
          fontSize: 14, lineHeight: 1.4, color: "var(--ink)",
        }}>{msg.text}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}>
          <span style={{ fontSize: 10, color: "var(--ink-mute)" }}>{msg.time}</span>
          {msg.reactions && Object.entries(msg.reactions).map(([e, c]) => (
            <span key={e} style={{
              fontSize: 11, padding: "1px 6px", borderRadius: 10,
              background: "var(--paper-soft)", color: "var(--ink-soft)",
            }}>{e} {c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// POLLS
// ═══════════════════════════════════════════════════════════════════════
function PollsScreen({ user }) {
  const [polls, setPolls] = useState(SEED_POLLS);

  const vote = (pollId, optId) => {
    setPolls((arr) => arr.map((p) => {
      if (p.id !== pollId) return p;
      const opts = p.options.map((o) => ({
        ...o,
        votes: o.votes.filter((v) => v !== user.id).concat(o.id === optId ? [user.id] : []),
      }));
      return { ...p, options: opts };
    }));
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 100 }}>
      <AppNavBar
        title="Polls"
        subtitle="Decide together — drama-free"
        leading={<IconButton name="back" size={36} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 22px" }}>
        {polls.map((p) => <PollCard key={p.id} poll={p} user={user} onVote={vote} />)}
      </div>
    </div>
  );
}

function PollCard({ poll, user, onVote }) {
  const author = findFriend(poll.author);
  const total = poll.options.reduce((s, o) => s + o.votes.length, 0);
  const myVote = poll.options.find((o) => o.votes.includes(user.id));
  const closed = poll.closesIn === "Closed";

  return (
    <div className="j-card fade-up" style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <Avatar friend={author} size={28} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{author.name}</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>asked · {poll.time}</span>
        </div>
        <Tag tone={closed ? "default" : "terra"}>{poll.closesIn}</Tag>
      </div>

      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 22, color: "var(--ink)", lineHeight: 1.15, marginBottom: 14,
      }}>{poll.question}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {poll.options.map((o) => {
          const pct = total ? Math.round(o.votes.length / total * 100) : 0;
          const isMine = myVote?.id === o.id;
          return (
            <button
              key={o.id}
              onClick={() => !closed && onVote(poll.id, o.id)}
              disabled={closed}
              style={{
                position: "relative", padding: "10px 14px", borderRadius: 12,
                background: "var(--paper-soft)",
                border: isMine ? "1.5px solid var(--accent)" : "1px solid var(--line-soft)",
                textAlign: "left", overflow: "hidden", cursor: closed ? "default" : "pointer",
              }}
            >
              <div style={{
                position: "absolute", inset: 0, width: `${pct}%`,
                background: isMine ? "var(--tint-strong)" : "var(--tint-sage)",
                transition: "width 0.3s",
              }} />
              <div style={{
                position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isMine && (
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      background: "var(--accent)", display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name="check" size={11} stroke="#fff" strokeWidth="3" />
                    </div>
                  )}
                  <span style={{
                    fontSize: 14, color: "var(--ink)",
                    fontWeight: isMine ? 600 : 500,
                  }}>{o.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {o.votes.length > 0 && <AvatarStack ids={o.votes} size={18} max={3} />}
                  <span style={{
                    fontSize: 12, color: "var(--ink-mute)", fontWeight: 600,
                    minWidth: 32, textAlign: "right",
                  }}>{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, paddingTop: 10, borderTop: "0.5px solid var(--line-soft)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
          {total} votes · {total > 0 ? Math.round(total / FRIENDS.length * 100) : 0}% of the cabin
        </span>
        <button style={{
          background: "transparent", border: "none", color: "var(--accent)",
          fontSize: 12, fontWeight: 600, padding: 0,
        }}>See discussion →</button>
      </div>
    </div>
  );
}

Object.assign(window, { Login, HomeScreen, ChatScreen, PollsScreen });
