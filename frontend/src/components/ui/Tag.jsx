const TONES = {
  default: { bg: "var(--paper-soft)", fg: "var(--ink-soft)" },
  sage:    { bg: "var(--tint-sage)", fg: "var(--sage)" },
  terra:   { bg: "var(--tint-terra)", fg: "var(--terra)" },
  ochre:   { bg: "var(--tint-ochre)", fg: "var(--ochre)" },
  berry:   { bg: "var(--tint-berry)", fg: "var(--berry)" },
};

export default function Tag({ children, tone = "default" }) {
  const t = TONES[tone] || TONES.default;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center",
      padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500,
      background: t.bg, color: t.fg, letterSpacing: 0.2,
    }}>{children}</span>
  );
}
