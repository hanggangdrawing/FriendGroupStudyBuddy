/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-soft": "var(--paper-soft)",
        card: "var(--card)",
        "card-edge": "var(--card-edge)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        "ink-mute": "var(--ink-mute)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
        terra: "var(--terra)",
        sage: "var(--sage)",
        ochre: "var(--ochre)",
        berry: "var(--berry)",
      },
      fontFamily: {
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        body: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        hand: ["Caveat", "cursive"],
      },
    },
  },
  plugins: [],
}
