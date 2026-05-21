import Icon from "./Icon";

const TABS = [
  { id: "home",  name: "home",  label: "Home",  path: "/home" },
  { id: "chat",  name: "chat",  label: "Chat",  path: "/chat" },
  { id: "study", name: "book",  label: "Study", path: "/study" },
  { id: "timer", name: "timer", label: "Timer", path: "/timer" },
  { id: "you",   name: "user",  label: "You",   path: "/you" },
];

export default function BottomTabs({ activeTab, onChange }) {
  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      padding: "8px 14px 18px",
      background: "linear-gradient(to top, var(--paper) 60%, transparent)",
      zIndex: 30,
    }}>
      <div className="j-card" style={{
        padding: "8px 6px",
        display: "flex", justifyContent: "space-around",
        backdropFilter: "blur(8px)",
        maxWidth: 480, margin: "0 auto",
      }}>
        {TABS.map((it) => {
          const on = activeTab === it.id;
          return (
            <button key={it.id} onClick={() => onChange(it)} style={{
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
}

export { TABS };
