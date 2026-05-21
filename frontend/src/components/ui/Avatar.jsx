import { findFriend, initialsOf } from "../../data/seed";

export default function Avatar({ friend, size = 36, ring = false, status = null }) {
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
}
