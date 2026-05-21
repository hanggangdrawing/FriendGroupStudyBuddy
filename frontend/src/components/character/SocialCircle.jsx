const STYLES = {
  facebook: {
    bg: "#1877F2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff">
        <path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9v-7H8v-3h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7c4.7-.8 8.4-4.9 8.4-9.9z"/>
      </svg>
    ),
  },
  google: {
    bg: "#fff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.5 12.2c0-.8-.1-1.5-.2-2.2H12v4.2h5.9c-.3 1.4-1 2.5-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/>
        <path fill="#34A853" d="M12 23c2.9 0 5.4-1 7.2-2.6l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8C3.9 20.4 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.8 14.3c-.2-.7-.4-1.4-.4-2.3s.1-1.6.4-2.3V7H2.2C1.4 8.5 1 10.2 1 12s.4 3.5 1.2 5l3.6-2.7z"/>
        <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1C17.4 2.2 14.9 1 12 1 7.7 1 3.9 3.6 2.2 7l3.6 2.8c.9-2.7 3.3-4.4 6.2-4.4z"/>
      </svg>
    ),
    border: "1px solid var(--line)",
  },
  apple: {
    bg: "var(--ink)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--paper)">
        <path d="M16.4 12.4c0-2.4 2-3.5 2.1-3.6-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-2-.9-3.3-.8-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.3.8 1.2 1.8 2.6 3.1 2.5 1.3 0 1.7-.8 3.3-.8s1.9.8 3.3.8c1.4 0 2.2-1.2 3-2.5.9-1.4 1.3-2.8 1.3-2.9-.1 0-2.6-1-2.7-3.9zM14.3 5.3c.7-.9 1.2-2.1 1-3.3-1.1 0-2.3.7-3 1.6-.7.8-1.3 2-1.1 3.1 1.2.1 2.4-.6 3.1-1.4z"/>
      </svg>
    ),
  },
};

export default function SocialCircle({ provider, onClick, disabled }) {
  const styles = STYLES[provider];
  if (!styles) return null;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width: 54, height: 54, borderRadius: "50%",
      background: styles.bg, border: styles.border || "none",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 12px -4px var(--shadow-ink)",
      opacity: disabled ? 0.5 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "transform 0.1s",
    }}>
      {styles.icon}
    </button>
  );
}
