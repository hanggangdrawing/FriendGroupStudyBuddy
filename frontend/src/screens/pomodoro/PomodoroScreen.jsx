import { useState, useEffect, useRef } from "react";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import AvatarStack from "../../components/ui/AvatarStack";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import SectionHead from "../../components/ui/SectionHead";
import { STUDYING_NOW, STUDY_ROOMS, findFriend } from "../../data/seed";
import { useUser } from "../../lib/useUser";

const TOTAL = 25 * 60;

export default function PomodoroScreen() {
  const user = useUser();
  const [remaining, setRemaining] = useState(TOTAL);
  const [running, setRunning] = useState(false);
  const [topic, setTopic] = useState("FastAPI · Auth route");
  const [phase, setPhase] = useState("focus");
  const [joinedRoom, setJoinedRoom] = useState(null);
  const intervalRef = useRef(null);

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

  if (!user) return null;

  const min = String(Math.floor(remaining / 60)).padStart(2, "0");
  const sec = String(remaining % 60).padStart(2, "0");
  const pct = ((TOTAL - remaining) / TOTAL) * 100;
  const CIRC = 2 * Math.PI * 120;
  const dash = CIRC * (1 - remaining / TOTAL);

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title="Focus"
        subtitle={phase === "focus" ? "25-minute deep work" : "5-minute break"}
        leading={
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: 0.18, textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}>
            <Icon name="fire" size={14} stroke="var(--terra)" />
            <span>Day 14</span>
          </div>
        }
        trailing={<IconButton name="settings" />}
      />

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

      <div style={{ padding: "16px 22px", display: "flex", justifyContent: "center" }}>
        <div style={{ position: "relative", width: 280, height: 280 }}>
          <svg width="280" height="280" style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
            <circle cx="140" cy="140" r="120" fill="none" stroke="var(--line-soft)" strokeWidth="14" />
            <circle cx="140" cy="140" r="120" fill="none" stroke="var(--accent)" strokeWidth="14"
                    strokeLinecap="round" strokeDasharray={CIRC} strokeDashoffset={dash}
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
            <span className="hand" style={{ fontSize: 18, color: "var(--accent)" }}>
              {phase === "focus" ? "focusing" : "taking a break"}
            </span>
            <span style={{
              fontSize: 11, color: "var(--ink-mute)", marginTop: 2, letterSpacing: 0.3,
            }}>{Math.round(pct)}% complete</span>
          </div>
        </div>
      </div>

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
