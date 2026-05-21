export default function Icon({ name, size = 22, stroke = "currentColor", fill = "none", strokeWidth = 1.7 }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill, stroke, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "home": return (
      <svg {...props}><path d="M3 11.5L12 4l9 7.5"/><path d="M5 10v9a1 1 0 001 1h4v-6h4v6h4a1 1 0 001-1v-9"/></svg>
    );
    case "chat": return (
      <svg {...props}><path d="M21 12c0 4.4-4 8-9 8a10 10 0 01-3.5-.6L4 21l1.4-4A7.6 7.6 0 013 12c0-4.4 4-8 9-8s9 3.6 9 8z"/></svg>
    );
    case "book": return (
      <svg {...props}><path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 014 16.5v-12z"/><path d="M4 16.5A2.5 2.5 0 016.5 14H20"/></svg>
    );
    case "timer": return (
      <svg {...props}><circle cx="12" cy="13" r="8"/><path d="M12 13V9"/><path d="M9 2h6"/><path d="M19 5l1.5-1.5"/></svg>
    );
    case "user": return (
      <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
    );
    case "plus": return (
      <svg {...props}><path d="M12 5v14M5 12h14"/></svg>
    );
    case "send": return (
      <svg {...props} strokeWidth="1.5"><path d="M3.5 11.5L20.5 4l-7 17-3-7-7-2.5z"/></svg>
    );
    case "search": return (
      <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
    );
    case "back": return (
      <svg {...props}><path d="M15 6l-6 6 6 6"/></svg>
    );
    case "more": return (
      <svg {...props}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>
    );
    case "heart": return (
      <svg {...props}><path d="M12 20s-7-4.4-7-10a4.5 4.5 0 017-3.7A4.5 4.5 0 0119 10c0 5.6-7 10-7 10z"/></svg>
    );
    case "reply": return (
      <svg {...props}><path d="M9 14L4 9l5-5"/><path d="M4 9h9a7 7 0 017 7v3"/></svg>
    );
    case "poll": return (
      <svg {...props}><path d="M6 20V10"/><path d="M12 20V4"/><path d="M18 20v-7"/></svg>
    );
    case "photo": return (
      <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M21 16l-5-5-8 8"/></svg>
    );
    case "note": return (
      <svg {...props}><path d="M5 3h11l4 4v14H5z"/><path d="M16 3v4h4"/><path d="M9 12h7"/><path d="M9 16h5"/></svg>
    );
    case "play": return (
      <svg {...props} fill="currentColor" stroke="none"><path d="M7 5l13 7-13 7z"/></svg>
    );
    case "pause": return (
      <svg {...props} fill="currentColor" stroke="none"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
    );
    case "reset": return (
      <svg {...props}><path d="M3 12a9 9 0 109-9"/><path d="M3 4v5h5"/></svg>
    );
    case "settings": return (
      <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1A1.6 1.6 0 008 19.4a1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H2a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H8a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V10a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z"/></svg>
    );
    case "check": return (
      <svg {...props}><path d="M5 12l5 5L20 7"/></svg>
    );
    case "x": return (
      <svg {...props}><path d="M6 6l12 12M18 6L6 18"/></svg>
    );
    case "sun": return (
      <svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5"/></svg>
    );
    case "moon": return (
      <svg {...props}><path d="M21 13A9 9 0 1111 3a7 7 0 0010 10z"/></svg>
    );
    case "lock": return (
      <svg {...props}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>
    );
    case "leaf": return (
      <svg {...props}><path d="M5 19c8 0 14-6 14-14C19 5 5 6 5 14v5z"/><path d="M5 19l7-7"/></svg>
    );
    case "fire": return (
      <svg {...props}><path d="M12 22a7 7 0 007-7c0-3-2-5-3-7-1-2-1-4-1-6-2 2-6 5-6 9 0-2-1-3-2-4-1 2-2 4-2 7a7 7 0 007 8z"/></svg>
    );
    case "bell": return (
      <svg {...props}><path d="M6 9a6 6 0 1112 0v5l2 3H4l2-3V9z"/><path d="M10 20a2 2 0 004 0"/></svg>
    );
    case "edit": return (
      <svg {...props}><path d="M4 20h4l11-11-4-4L4 16v4z"/><path d="M14 5l4 4"/></svg>
    );
    case "pin": return (
      <svg {...props}><path d="M12 17v5"/><path d="M9 4h6l-1 5 3 3v3H7v-3l3-3-1-5z"/></svg>
    );
    default: return null;
  }
}
