export default function SpeechBubble({ children, side = "right" }) {
  return (
    <div style={{
      background: "var(--card)",
      color: "var(--ink)",
      padding: "10px 16px",
      borderRadius: 18,
      fontSize: 14,
      fontWeight: 700,
      boxShadow: "0 6px 18px -8px var(--shadow-ink)",
      position: "relative",
      whiteSpace: "nowrap",
    }}>
      {children}
      <div style={{
        position: "absolute",
        bottom: -7,
        [side === "right" ? "left" : "right"]: 22,
        width: 14, height: 14,
        background: "var(--card)",
        transform: "rotate(45deg)",
        boxShadow: "3px 3px 6px -3px var(--shadow-ink)",
      }} />
    </div>
  );
}
