export default function AppNavBar({ title, subtitle, leading, trailing, large = true }) {
  return (
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
          <div className="display" style={{ fontSize: 38, color: "var(--ink)" }}>{title}</div>
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
}
