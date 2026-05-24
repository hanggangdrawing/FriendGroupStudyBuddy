import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";

export default function BattleScreen() {
  const navigate = useNavigate();
  const notReady = (label) => () => alert(`${label} — coming soon`);

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title="Battle Arena"
        subtitle="Practice, race friends, climb ranks"
        leading={<IconButton name="back" onClick={() => navigate("/study")} />}
      />

      <div style={{
        padding: "8px 22px 32px",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        <ArenaCard
          tone="terra"
          icon="bot"
          title="Play with Bots"
          subtitle="Offline simulation against AI opponents — sharpen your speed."
          actions={[
            { label: "Play with Bots", tone: "sage", onClick: notReady("Bot play") },
          ]}
          index={0}
        />

        <ArenaCard
          tone="berry"
          icon="users"
          title="Group Battle"
          subtitle="Live multiplayer rooms — invite your friends."
          footer="Real-time multiplayer — backend coming soon"
          dashed
          actions={[
            { label: "Create Room", tone: "ochre", onClick: notReady("Create Room") },
            { label: "Join Room",  tone: "ghost",  onClick: notReady("Join Room") },
          ]}
          index={1}
        />

        <ArenaCard
          tone="sage"
          icon="calendar"
          title="Daily Challenge"
          subtitle="A fresh quiz every day. Resets at midnight."
          actions={[
            { label: "Play Daily", tone: "sage",   onClick: notReady("Daily play") },
            { label: "Daily Rank", tone: "accent", onClick: notReady("Daily rankings") },
          ]}
          index={2}
        />

        <ArenaCard
          tone="ochre"
          icon="trophy"
          title="Weekly Challenge"
          subtitle="Bigger questions, bigger glory. Resets every Monday."
          actions={[
            { label: "Play Weekly", tone: "sage",   onClick: notReady("Weekly play") },
            { label: "Weekly Rank", tone: "accent", onClick: notReady("Weekly rankings") },
          ]}
          index={3}
        />
      </div>
    </div>
  );
}

function ArenaCard({ tone, icon, title, subtitle, footer, dashed, actions, index }) {
  return (
    <div
      className="fade-up"
      style={{
        animationDelay: `${index * 0.05}s`,
        padding: 18, borderRadius: 18,
        background: "var(--card)",
        border: dashed
          ? "1.5px dashed var(--line)"
          : "0.5px solid var(--card-edge)",
        display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14,
          background: `var(--tint-${tone})`, color: `var(--${tone})`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon name={icon} size={22} strokeWidth={1.8} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 18, color: "var(--ink)", lineHeight: 1.15, letterSpacing: -0.01,
          }}>
            {title}
          </div>
          <div style={{
            fontSize: 12, color: "var(--ink-mute)", marginTop: 3, lineHeight: 1.4,
          }}>
            {subtitle}
          </div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: actions.length === 1 ? "1fr" : "1fr 1fr",
        gap: 10,
      }}>
        {actions.map((a) => (
          <ArenaButton key={a.label} {...a} />
        ))}
      </div>

      {footer && (
        <div style={{
          fontSize: 11, color: "var(--ink-mute)", textAlign: "center",
          marginTop: -4,
        }}>
          {footer}
        </div>
      )}
    </div>
  );
}

function ArenaButton({ label, tone, onClick }) {
  const isGhost = tone === "ghost";
  const bg = isGhost ? "transparent" : `var(--${tone})`;
  const fg = isGhost ? "var(--ink)" : "#fff";
  const border = isGhost ? "1px solid var(--line)" : "none";

  return (
    <button
      onClick={onClick}
      style={{
        padding: "11px 14px", borderRadius: 12,
        background: bg, color: fg, border,
        fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600,
        letterSpacing: 0.1, cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
