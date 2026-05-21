export default function SectionHead({ children, action }) {
  return (
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
}
