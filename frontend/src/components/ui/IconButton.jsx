import Icon from "./Icon";

export default function IconButton({ name, onClick, size = 38, active = false, badge = null }) {
  return (
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
}
