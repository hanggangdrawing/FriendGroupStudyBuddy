// ui.jsx — Shared UI primitives for Hanggangdrawing
// Avatar, IconButton, icons, sheets, etc.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ─── Icons ────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 22, stroke = "currentColor", fill = "none", strokeWidth = 1.7 }) => {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill, stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "home": return (
      <svg {...props}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/></svg>
    );
    case "chat": return (
      <svg {...props}><path d="M21 12c0 4.4-4 8-9 8a10 10 0 01-3.5-.6L4 21l1.4-4A7.6 7.6 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></svg>
    );
    case "book": return (
      <svg {...props}><path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 014 16.5v-12z"/><path d="M4 16.5A2.5 2.5 0 016.5 14H20"/></svg>
    );
    case "timer": return (
      <svg {...props}><circle cx="12" cy="13" r="8"/><path d="M12 13V9"/><path d="M9 2h6"/><path d="M19 5l1.5-1.5"/></svg>
    );
    case "user": return (
      <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
    );
    case "plus": return (
      <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
    );
    case "send": return (
      <svg {...props} strokeWidth="1.5"><path d="M3.5 11.5L20.5 4l-7 17-3-7-7-2.5z"/></svg>
    );
    case "search": return (
      <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    );
    case "back": return (
      <svg {...props}><path d="M15 6l-6 6 6 6"/></svg>
    );
    case "more": return (
      <svg {...props}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>
    );
    case "heart": return (
      <svg {...props}><path d="M12 20s-7-4.4-7-10a4.5 4.5 0 017-3.7A4.5 4.5 0 0119 10c0 5.6-7 10-7 10z"/></svg>
    );
    case "reply": return (
      <svg {...props}><path d="M9 14L4 9l5-5"/><path d="M4 9h9a7 7 0 017 7v3"/></svg>
    );
    case "poll": return (
      <svg {...props}><path d="M6 20V10"/><path d="M12 20V4"/><path d="M18 20v-7"/></svg>
    );
    case "photo": return (
      <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-8 8"/></svg>
    );
    case "note": return (
      <svg {...props}><path d="M5 3h11l4 4v14H5z"/><path d="M16 3v4h4"/><path d="M9 12h7"/><path d="M9 16h5"/></svg>
    );
    case "play": return (
      <svg {...props} fill="currentColor" stroke="none"><path d="M7 5l13 7-13 7z"/></svg>
    );
    case "pause": return (
      <svg {...props} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
    );
    case "reset": return (
      <svg {...props}><path d="M3 12a9 9 0 109-9"/><path d="M3 4v5h5"/></svg>
    );
    case "settings": return (
      <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.6 1.6 0 008 19.4a1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H2a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H8a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V10a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/></svg>
    );
    case "check": return (
      <svg {...props}><path d="M5 12l5 5L20 7"/></svg>
    );
    case "x": return (
      <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>
    );
    case "sun": return (
      <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/></svg>
    );
    case "moon": return (
      <svg {...props}><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>
    );
    case "lock": return (
      <svg {...props}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>
    );
    case "leaf": return (
      <svg {...props}><path d="M5 19c8 0 14-6 14-14C19 5 5 6 5 14v5z"/><path d="M5 19l7-7"/></svg>
    );
    case "fire": return (
      <svg {...props}><path d="M12 22a7 7 0 007-7c0-3-2-5-3-7-1-2-1-4-1-6-2 2-6 5-6 9 0-2-1-3-2-4-1 2-2 4-2 7a7 7 0 007 8z"/></svg>
    );
    case "bell": return (
      <svg {...props}><path d="M6 9a6 6 0 1112 0v5l2 3H4l2-3V9z"/><path d="M10 20a2 2 0 004 0"/></svg>
    );
    case "edit": return (
      <svg {...props}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 5l4 4"/></svg>
    );
    case "pin": return (
      <svg {...props}><path d="M12 17v5"/><path d="M9 4h6l-1 5 3 3v3H7v-3l3-3-1-5z"/></svg>
    );
    default: return null;
  }
};

// ─── Avatar ───────────────────────────────────────────────────────────────
const Avatar = ({ friend, size = 36, ring = false, status = null }) => {
  const f = typeof friend === "string" ? findFriend(friend) : friend;
  const initials = initialsOf(f.name);
  const fontSize = Math.max(10, Math.round(size * 0.38));
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <div className="avatar" style={{
        width: size, height: size, background: f.color, fontSize,
        boxShadow: ring ? `0 0 0 2px var(--accent), 0 0 0 4px var(--card)` : undefined,
      }}>{initials}</div>
      {status === "studying" && (
        <div style={{
          position: "absolute", bottom: -2, right: -2,
          width: 12, height: 12, borderRadius: "50%",
          background: "var(--sage)", border: "2px solid var(--card)",
        }} />
      )}
      {status === "online" && (
        <div style={{
          position: "absolute", bottom: -1, right: -1,
          width: 10, height: 10, borderRadius: "50%",
          background: "#5fb878", border: "2px solid var(--card)",
        }} />
      )}
    </div>
  );
};

// Stack of avatars (overlapping)
const AvatarStack = ({ ids, max = 4, size = 26 }) => {
  const shown = ids.slice(0, max);
  const extra = ids.length - shown.length;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {shown.map((id, i) => (
        <div key={id} style={{ marginLeft: i === 0 ? 0 : -8, zIndex: shown.length - i }}>
          <Avatar friend={id} size={size} />
        </div>
      ))}
      {extra > 0 && (
        <div className="avatar" style={{
          width: size, height: size, marginLeft: -8,
          background: "var(--paper-soft)", color: "var(--ink-soft)",
          fontSize: Math.round(size * 0.34), border: "1.5px solid var(--card)",
        }}>+{extra}</div>
      )}
    </div>
  );
};

// ─── Icon button (round, tactile) ─────────────────────────────────────────
const IconButton = ({ name, onClick, size = 38, active = false, badge = null }) => (
  <button onClick={onClick} style={{
    width: size, height: size, borderRadius: "50%",
    background: active ? "var(--ink)" : "transparent",
    color: active ? "var(--paper-soft)" : "var(--ink)",
    border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
    position: "relative", padding: 0,
  }}>
    <Icon name={name} size={size * 0.55} />
    {badge != null && (
      <span style={{
        position: "absolute", top: 2, right: 2,
        background: "var(--terra)", color: "#fff",
        fontSize: 10, fontWeight: 600, minWidth: 16, height: 16,
        borderRadius: 8, padding: "0 4px", display: "inline-flex",
        alignItems: "center", justifyContent: "center",
        border: "1.5px solid var(--card)",
      }}>{badge}</span>
    )}
  </button>
);

// ─── App nav bar (top of screen) ──────────────────────────────────────────
// Custom journal-style nav, not iOS chrome. Top padding clears the iOS status bar.
const AppNavBar = ({ title, subtitle, leading, trailing, large = true }) => (
  <div style={{
    padding: "62px 20px 14px",
    display: "flex", flexDirection: "column", gap: 6,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: 32 }}>
      <div style={{ flex: "0 0 auto" }}>{leading}</div>
      <div style={{ flex: "0 0 auto" }}>{trailing}</div>
    </div>
    {large && (
      <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 4 }}>
        <div className="display" style={{
          fontSize: 38, color: "var(--ink)",
        }}>{title}</div>
        {subtitle && (
          <div style={{
            fontSize: 13, color: "var(--ink-mute)",
            fontFamily: "var(--font-body)", letterSpacing: 0.1,
          }}>{subtitle}</div>
        )}
      </div>
    )}
  </div>
);

// ─── Bottom tab bar ───────────────────────────────────────────────────────
const BottomTabs = ({ tab, onTab, dark }) => {
  const items = [
    { id: "home",    name: "home",   label: "Home" },
    { id: "chat",    name: "chat",   label: "Chat" },
    { id: "study",   name: "book",   label: "Study" },
    { id: "timer",   name: "timer",  label: "Timer" },
    { id: "you",     name: "user",   label: "You" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      padding: "8px 14px 28px",
      background: "linear-gradient(to top, var(--paper) 60%, transparent)",
      zIndex: 30,
    }}>
      <div className="j-card" style={{
        padding: "8px 6px",
        display: "flex", justifyContent: "space-around",
        backdropFilter: "blur(8px)",
      }}>
        {items.map((it) => {
          const on = tab === it.id;
          return (
            <button key={it.id} onClick={() => onTab(it.id)} style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 2, padding: "6px 4px",
              background: "transparent", border: "none",
              color: on ? "var(--ink)" : "var(--ink-mute)",
            }}>
              <div style={{
                width: 36, height: 26, borderRadius: 12,
                background: on ? "var(--paper-soft)" : "transparent",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.15s",
              }}>
                <Icon name={it.name} size={19} strokeWidth={on ? 2 : 1.6} />
              </div>
              <span style={{
                fontSize: 10, fontWeight: on ? 600 : 500, letterSpacing: 0.2,
              }}>{it.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ─── Sheet (modal) ────────────────────────────────────────────────────────
const Sheet = ({ open, onClose, children, title }) => {
  if (!open) return null;
  return (
    <div style={{
      position: "absolute", inset: 0, zIndex: 80,
      animation: "fadeUp 0.2s ease",
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        background: "var(--paper)", borderRadius: "24px 24px 0 0",
        padding: "10px 0 28px",
        maxHeight: "82%", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
        animation: "slideUp 0.25s cubic-bezier(.2,.8,.3,1)",
      }}>
        <div style={{
          width: 38, height: 4, borderRadius: 2,
          background: "var(--line)", margin: "0 auto 12px",
        }} />
        {title && (
          <div style={{
            padding: "0 22px 12px", fontFamily: "var(--font-display)",
            fontWeight: 700, fontSize: 24, color: "var(--ink)",
          }}>{title}</div>
        )}
        <div style={{ overflowY: "auto", padding: "0 4px" }}>{children}</div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
};

// ─── Section header (small caps, journal style) ──────────────────────────
const SectionHead = ({ children, action }) => (
  <div style={{
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "20px 22px 8px",
  }}>
    <div style={{
      fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 600,
      letterSpacing: 0.16, textTransform: "uppercase",
      color: "var(--ink-mute)",
    }}>{children}</div>
    {action && (
      <button onClick={action.onClick} style={{
        background: "transparent", border: "none", color: "var(--accent)",
        fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500,
        padding: 0,
      }}>{action.label}</button>
    )}
  </div>
);

// ─── Tag pill ─────────────────────────────────────────────────────────────
const Tag = ({ children, tone = "default" }) => {
  const tones = {
    default: { bg: "var(--paper-soft)", fg: "var(--ink-soft)" },
    sage:    { bg: "var(--tint-sage)", fg: "var(--sage)" },
    terra:   { bg: "var(--tint-terra)", fg: "var(--terra)" },
    ochre:   { bg: "var(--tint-ochre)", fg: "var(--ochre)" },
    berry:   { bg: "var(--tint-berry)", fg: "var(--berry)" },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500,
      background: t.bg, color: t.fg, letterSpacing: 0.2,
    }}>{children}</span>
  );
};

Object.assign(window, {
  Icon, Avatar, AvatarStack, IconButton, AppNavBar, BottomTabs, Sheet, SectionHead, Tag,
});
