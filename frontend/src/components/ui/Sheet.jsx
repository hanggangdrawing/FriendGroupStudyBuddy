export default function Sheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 80,
      animation: "fadeUp 0.2s ease",
    }}>
      <div onClick={onClose} style={{
        position: "absolute", inset: 0, background: "rgba(20,12,8,0.5)",
      }} />
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0,
        background: "var(--paper)", borderRadius: "24px 24px 0 0",
        padding: "10px 0 28px",
        maxHeight: "82%", display: "flex", flexDirection: "column",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.18)",
        animation: "slideUp 0.25s cubic-bezier(.2,.8,.3,1)",
      }}>
        <div style={{
          width: 38, height: 4, borderRadius: 2,
          background: "var(--line)", margin: "0 auto 12px",
        }} />
        {title && (
          <div style={{
            padding: "0 22px 12px", fontFamily: "var(--font-display)",
            fontWeight: 700, fontSize: 24, color: "var(--ink)",
          }}>{title}</div>
        )}
        <div style={{ overflowY: "auto", padding: "0 4px" }}>{children}</div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }`}</style>
    </div>
  );
}
