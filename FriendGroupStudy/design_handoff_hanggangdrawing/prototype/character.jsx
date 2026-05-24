// character.jsx — temporary SVG mascot for the auth + profile screens.
// PLACEHOLDER: the artist on the team will replace this with custom artwork.
// Each variant takes the same {size, accent} props so swapping is trivial.

const Character = ({ size = 200, accent = "var(--accent)", variant = "default", mood = "happy" }) => {
  // A simple study-buddy character: backpack, cap, big glasses, book.
  // Built entirely from primitive shapes — flat-illustration style — so the
  // user can drop in their own SVG later by replacing this component.
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      style={{ display: "block" }}
      aria-label="Study buddy mascot (placeholder)"
    >
      <defs>
        <linearGradient id="charBody" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#000" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="charSkin" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#ffd9bd" />
          <stop offset="1" stopColor="#f4b894" />
        </linearGradient>
      </defs>

      {/* Backpack peeking */}
      <rect x="42" y="92" width="22" height="58" rx="8" fill="#0f172a" opacity="0.18" />
      <rect x="136" y="92" width="22" height="58" rx="8" fill="#0f172a" opacity="0.18" />

      {/* Body / hoodie */}
      <path
        d="M58 200 L58 142 Q58 110 100 110 Q142 110 142 142 L142 200 Z"
        fill={accent}
      />
      <path
        d="M58 200 L58 142 Q58 110 100 110 Q142 110 142 142 L142 200 Z"
        fill="url(#charBody)"
      />

      {/* Backpack strap */}
      <rect x="60" y="118" width="6" height="60" rx="3" fill="#fff" opacity="0.35" />
      <rect x="134" y="118" width="6" height="60" rx="3" fill="#fff" opacity="0.35" />

      {/* Hoodie collar */}
      <ellipse cx="100" cy="120" rx="20" ry="6" fill="#0f172a" opacity="0.15" />

      {/* Neck */}
      <rect x="92" y="100" width="16" height="18" rx="3" fill="url(#charSkin)" />

      {/* Head */}
      <ellipse cx="100" cy="78" rx="34" ry="36" fill="url(#charSkin)" />

      {/* Hair / beanie */}
      <path
        d="M66 70 Q60 36 100 32 Q140 36 134 70 Q134 60 100 58 Q66 60 66 70 Z"
        fill={accent}
      />
      <ellipse cx="100" cy="32" rx="8" ry="6" fill={accent} />
      {/* beanie pompom */}
      <circle cx="100" cy="26" r="6" fill="#fbbf24" />

      {/* Ears */}
      <ellipse cx="65" cy="80" rx="4" ry="6" fill="url(#charSkin)" />
      <ellipse cx="135" cy="80" rx="4" ry="6" fill="url(#charSkin)" />

      {/* Glasses */}
      <circle cx="84" cy="80" r="11" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
      <circle cx="116" cy="80" r="11" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
      <path d="M95 80 L105 80" stroke="#0f172a" strokeWidth="2.5" />
      {/* Eyes */}
      {mood === "happy" ? (
        <>
          <path d="M79 80 Q84 84 89 80" stroke="#0f172a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          <path d="M111 80 Q116 84 121 80" stroke="#0f172a" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="84" cy="80" r="3" fill="#0f172a" />
          <circle cx="116" cy="80" r="3" fill="#0f172a" />
        </>
      )}

      {/* Cheeks */}
      <ellipse cx="74" cy="92" rx="5" ry="3" fill="#f87171" opacity="0.45" />
      <ellipse cx="126" cy="92" rx="5" ry="3" fill="#f87171" opacity="0.45" />

      {/* Mouth */}
      <path d="M92 100 Q100 106 108 100" stroke="#0f172a" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      {/* Hands holding a tiny book */}
      <rect x="86" y="160" width="28" height="22" rx="3" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
      <rect x="86" y="160" width="28" height="22" rx="3" fill="url(#charBody)" />
      <path d="M100 160 L100 182" stroke="#0f172a" strokeWidth="1.5" opacity="0.5" />
      <circle cx="78" cy="170" r="7" fill="url(#charSkin)" />
      <circle cx="122" cy="170" r="7" fill="url(#charSkin)" />
    </svg>
  );
};

// Speech bubble pointing down-left at the character
const SpeechBubble = ({ children, side = "right" }) => (
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
    {/* Tail */}
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

// Round social icon button (FB / Google / Apple)
const SocialCircle = ({ provider, onClick, disabled }) => {
  const styles = {
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
  }[provider];

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
};

Object.assign(window, { Character, SpeechBubble, SocialCircle });
