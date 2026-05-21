import Avatar from "./Avatar";

export default function AvatarStack({ ids, max = 4, size = 26 }) {
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
}
