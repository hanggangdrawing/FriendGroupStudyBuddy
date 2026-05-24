// app.jsx — main shell, routing, tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#2563eb",
  "density": "regular",
  "font": "jakarta",
  "showFrame": true
}/*EDITMODE-END*/;

const ACCENT_PALETTES = [
  ["#2563eb", "#3b82f6"],  // blue (default)
  ["#0ea371", "#10b981"],  // emerald
  ["#7c3aed", "#a78bfa"],  // violet
  ["#d97706", "#f59e0b"],  // amber
  ["#b8553a", "#d97a5c"],  // terracotta (warm)
];

const FONT_PAIRINGS = [
  { value: "jakarta", label: "Modern", display: '"Plus Jakarta Sans", system-ui, sans-serif', body: '"Plus Jakarta Sans", system-ui, sans-serif' },
  { value: "serif",   label: "Journal", display: '"Instrument Serif", Georgia, serif', body: '"Geist", system-ui, sans-serif' },
  { value: "mono",    label: "Lab",     display: '"JetBrains Mono", monospace', body: '"IBM Plex Sans", system-ui, sans-serif' },
];

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("home");
  const [route, setRoute] = useState(null); // sub-route: {name, props}

  // Apply tweaks to root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", t.dark ? "dark" : "light");
    root.setAttribute("data-density", t.density);
    root.style.setProperty("--accent", t.accent);
    const softMap = Object.fromEntries(ACCENT_PALETTES);
    root.style.setProperty("--accent-soft", softMap[t.accent] || t.accent);
    const pair = FONT_PAIRINGS.find((p) => p.value === t.font) || FONT_PAIRINGS[0];
    root.style.setProperty("--font-display", pair.display);
    root.style.setProperty("--font-body", pair.body);
  }, [t.dark, t.accent, t.density, t.font]);

  // Restore login from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("hd.user");
      if (saved) {
        const f = FRIENDS.find((x) => x.id === saved);
        if (f) setUser(f);
      }
    } catch (e) {}
  }, []);

  const login = (id) => {
    const f = findFriend(id);
    setUser(f);
    try { localStorage.setItem("hd.user", id); } catch (e) {}
  };
  const logout = () => {
    setUser(null);
    setRoute(null);
    setTab("home");
    try { localStorage.removeItem("hd.user"); } catch (e) {}
  };

  // Render current main screen
  const renderMain = () => {
    if (!user) return <Login onLogin={login} />;
    if (route?.name === "polls") return <PollsScreen user={user} onBack={() => setRoute(null)} />;
    if (route?.name === "notes") return <NotesScreen user={user} onBack={() => setRoute(null)} />;
    if (route?.name === "album") return <AlbumScreen onBack={() => setRoute(null)} />;
    if (route?.name === "deck") return <FlashcardScreen deck={route.deck} onBack={() => setRoute(null)} />;
    if (route?.name === "ai") return <AIBuddyScreen user={user} onBack={() => setRoute(null)}
                                          onOpenDeck={(d) => setRoute({ name: "deck", deck: d })} />;
    if (route?.name === "kanban") return <KanbanScreen user={user} onBack={() => setRoute(null)} />;

    switch (tab) {
      case "home":  return <HomeScreen user={user}
                              onOpenChat={() => setTab("chat")}
                              onOpenStudy={() => setTab("study")}
                              onOpenTimer={() => setTab("timer")}
                              onOpenAlbum={() => setRoute({ name: "album" })} />;
      case "chat":  return <ChatScreen user={user} />;
      case "study": return <StudyScreen user={user}
                              onOpenPolls={() => setRoute({ name: "polls" })}
                              onOpenNotes={() => setRoute({ name: "notes" })}
                              onOpenAlbum={() => setRoute({ name: "album" })}
                              onOpenAI={() => setRoute({ name: "ai" })}
                              onOpenKanban={() => setRoute({ name: "kanban" })}
                              onOpenDeck={(d) => setRoute({ name: "deck", deck: d })} />;
      case "timer": return <PomodoroScreen user={user} />;
      case "you":   return <ProfileScreen user={user} onLogout={logout}
                              onOpenAlbum={() => setRoute({ name: "album" })}
                              onOpenNotes={() => setRoute({ name: "notes" })}
                              dark={t.dark}
                              onToggleDark={() => setTweak("dark", !t.dark)} />;
      default: return null;
    }
  };

  // Bottom tabs visible only when logged in & not in a sub-route that should hide it
  const showTabs = user && route?.name !== "deck" && route?.name !== "ai";

  const screenLabel = !user ? "01 Login"
    : route?.name === "deck" ? `Flashcards · ${route.deck.title}`
    : route?.name ? `${route.name.charAt(0).toUpperCase()}${route.name.slice(1)}`
    : { home: "02 Home", chat: "03 Chat", study: "04 Study", timer: "05 Timer", you: "06 Profile" }[tab];

  return (
    <>
      <div className="stage-bg" />
      <PhoneStage showFrame={t.showFrame} label={screenLabel} dark={t.dark}>
        <div style={{
          position: "absolute", inset: 0, overflow: "hidden",
          display: "flex", flexDirection: "column",
        }}>
          {renderMain()}
          {showTabs && <BottomTabs tab={tab} onTab={(id) => { setTab(id); setRoute(null); }} />}
        </div>
      </PhoneStage>

      <TweaksPanel title="Hanggangdrawing">
        <TweakSection label="Theme">
          <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
          <TweakColor
            label="Accent"
            value={t.accent}
            options={ACCENT_PALETTES.map(([a]) => a)}
            onChange={(v) => setTweak("accent", v)}
          />
          <TweakRadio
            label="Type"
            value={t.font}
            options={FONT_PAIRINGS.map((p) => ({ value: p.value, label: p.label }))}
            onChange={(v) => setTweak("font", v)}
          />
          <TweakRadio
            label="Density"
            value={t.density}
            options={["compact", "regular", "comfy"]}
            onChange={(v) => setTweak("density", v)}
          />
        </TweakSection>
        <TweakSection label="Preview">
          <TweakToggle label="Phone frame" value={t.showFrame} onChange={(v) => setTweak("showFrame", v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// PhoneStage — wraps content in iOS frame and scales to viewport
function PhoneStage({ children, showFrame, label, dark }) {
  const W = 402, H = 874;
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const padding = window.innerWidth < 700 ? 0 : 60;
      const sx = (window.innerWidth - padding) / W;
      const sy = (window.innerHeight - padding) / H;
      setScale(Math.min(sx, sy, 1.15));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  if (!showFrame) {
    // raw — no bezel
    return (
      <div data-screen-label={label} style={{
        position: "fixed", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: W, height: H, position: "relative",
          transform: `scale(${scale})`,
          background: "var(--paper)",
          borderRadius: 24, overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0,0,0,0.4)",
        }}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div data-screen-label={label} style={{
      position: "fixed", inset: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        <div style={{
          width: W, height: H, borderRadius: 48, overflow: "hidden",
          position: "relative", background: "var(--paper)",
          boxShadow: "0 40px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.12)",
        }}>
          {/* dynamic island */}
          <div style={{
            position: "absolute", top: 11, left: "50%", transform: "translateX(-50%)",
            width: 126, height: 37, borderRadius: 24, background: "#000", zIndex: 100,
          }} />
          {/* status bar */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 50 }}>
            <IOSStatusBar dark={dark} />
          </div>
          {children}
          {/* home indicator */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 100,
            height: 34, display: "flex", justifyContent: "center", alignItems: "flex-end",
            paddingBottom: 8, pointerEvents: "none",
          }}>
            <div style={{
              width: 139, height: 5, borderRadius: 100,
              background: "rgba(0,0,0,0.4)",
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
