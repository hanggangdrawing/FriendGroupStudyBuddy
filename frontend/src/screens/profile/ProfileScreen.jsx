import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import Icon from "../../components/ui/Icon";
import SectionHead from "../../components/ui/SectionHead";
import Character from "../../components/character/Character";
import { FRIENDS, NOTES, ALBUM } from "../../data/seed";
import { useUser, clearStoredUser } from "../../lib/useUser";

export default function ProfileScreen() {
  const user = useUser();
  const navigate = useNavigate();
  const [dark, setDark] = useState(
    () => document.documentElement.dataset.theme === "dark"
  );

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  if (!user) return null;

  const signOut = () => {
    clearStoredUser();
    navigate("/login");
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", position: "relative" }}>
      <div style={{
        position: "relative", height: 280,
        background: "linear-gradient(155deg, var(--accent) 0%, var(--accent-soft) 100%)",
        borderRadius: "0 0 36px 36px",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -30, width: 160, height: 160,
          borderRadius: "50%", background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -40, width: 120, height: 120,
          borderRadius: "50%", background: "rgba(255,255,255,0.06)",
        }} />

        <div style={{
          position: "relative", padding: "56px 18px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <button onClick={() => navigate("/home")} style={{
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

        <div style={{
          position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)",
        }}>
          <Character size={180} accent={user.color} />
        </div>

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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 18 }}>
          <Stat label="streak" value="14" unit="days" tone="terra" />
          <Stat label="pomodoros" value="86" unit="this month" tone="sage" />
          <Stat label="decks" value="7" unit="started" tone="ochre" />
        </div>
      </div>

      <SectionHead>Quick access</SectionHead>
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 2 }}>
        <SettingRow icon="photo" label="Shared album" detail={`${ALBUM.length} photos`}
                    onClick={() => navigate("/album")} />
        <SettingRow icon="note" label="My notes" detail={`${NOTES.length} shared`}
                    onClick={() => navigate("/notes")} />
        <SettingRow icon="bell" label="Notifications" detail="Daily 9pm" />
        <SettingRow icon={dark ? "sun" : "moon"} label={dark ? "Light mode" : "Dark mode"}
                    onClick={() => setDark((d) => !d)} />
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
        <SettingRow icon="x" label="Sign out" onClick={signOut} danger />
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
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
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
