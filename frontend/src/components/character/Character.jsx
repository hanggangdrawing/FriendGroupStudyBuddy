// PLACEHOLDER mascot — the artist on the team will replace this with custom artwork.
// All consumers pass {size, accent, variant, mood} so swapping is trivial.
export default function Character({ size = 200, accent = "var(--accent)", mood = "happy" }) {
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

      <rect x="42" y="92" width="22" height="58" rx="8" fill="#0f172a" opacity="0.18" />
      <rect x="136" y="92" width="22" height="58" rx="8" fill="#0f172a" opacity="0.18" />

      <path d="M58 200 L58 142 Q58 110 100 110 Q142 110 142 142 L142 200 Z" fill={accent} />
      <path d="M58 200 L58 142 Q58 110 100 110 Q142 110 142 142 L142 200 Z" fill="url(#charBody)" />

      <rect x="60" y="118" width="6" height="60" rx="3" fill="#fff" opacity="0.35" />
      <rect x="134" y="118" width="6" height="60" rx="3" fill="#fff" opacity="0.35" />

      <ellipse cx="100" cy="120" rx="20" ry="6" fill="#0f172a" opacity="0.15" />
      <rect x="92" y="100" width="16" height="18" rx="3" fill="url(#charSkin)" />
      <ellipse cx="100" cy="78" rx="34" ry="36" fill="url(#charSkin)" />

      <path d="M66 70 Q60 36 100 32 Q140 36 134 70 Q134 60 100 58 Q66 60 66 70 Z" fill={accent} />
      <ellipse cx="100" cy="32" rx="8" ry="6" fill={accent} />
      <circle cx="100" cy="26" r="6" fill="#fbbf24" />

      <ellipse cx="65" cy="80" rx="4" ry="6" fill="url(#charSkin)" />
      <ellipse cx="135" cy="80" rx="4" ry="6" fill="url(#charSkin)" />

      <circle cx="84" cy="80" r="11" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
      <circle cx="116" cy="80" r="11" fill="#fff" stroke="#0f172a" strokeWidth="2.5" />
      <path d="M95 80 L105 80" stroke="#0f172a" strokeWidth="2.5" />
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

      <ellipse cx="74" cy="92" rx="5" ry="3" fill="#f87171" opacity="0.45" />
      <ellipse cx="126" cy="92" rx="5" ry="3" fill="#f87171" opacity="0.45" />
      <path d="M92 100 Q100 106 108 100" stroke="#0f172a" strokeWidth="2.4" fill="none" strokeLinecap="round" />

      <rect x="86" y="160" width="28" height="22" rx="3" fill="#fbbf24" stroke="#0f172a" strokeWidth="2" />
      <rect x="86" y="160" width="28" height="22" rx="3" fill="url(#charBody)" />
      <path d="M100 160 L100 182" stroke="#0f172a" strokeWidth="1.5" opacity="0.5" />
      <circle cx="78" cy="170" r="7" fill="url(#charSkin)" />
      <circle cx="122" cy="170" r="7" fill="url(#charSkin)" />
    </svg>
  );
}
