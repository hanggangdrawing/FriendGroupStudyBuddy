import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import SectionHead from "../../components/ui/SectionHead";
import { DECKS, NOTES, ALBUM, SEED_POLLS, findFriend } from "../../data/seed";

export default function StudyScreen() {
  const navigate = useNavigate();

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title="Study tools"
        subtitle="Decks, notes, polls — everything we share"
        trailing={<IconButton name="search" />}
      />

      <div style={{ padding: "0 22px 12px" }}>
        <button onClick={() => navigate("/ai")} style={{
          width: "100%", textAlign: "left",
          padding: 18, borderRadius: 18, border: "none",
          background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-soft) 100%)",
          color: "#fff", position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", gap: 14,
          boxShadow: "0 8px 24px -10px rgba(37,99,235,0.5)",
        }}>
          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(circle at 90% 30%, rgba(255,255,255,0.18), transparent 50%)",
          }} />
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "rgba(255,255,255,0.18)", color: "#fff",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, position: "relative",
          }}>✦</div>
          <div style={{ flex: 1, position: "relative" }}>
            <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.1 }}>Study buddy</div>
            <div style={{ fontSize: 12, opacity: 0.9, marginTop: 3 }}>
              Generate flashcards or ask anything · powered by AI
            </div>
          </div>
          <Icon name="back" size={18} stroke="rgba(255,255,255,0.85)" style={{ transform: "rotate(180deg)", position: "relative" }} />
        </button>
      </div>

      <div style={{ padding: "0 22px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <StudyTile color="var(--terra)" label="Notes" icon="note"
                   count={`${NOTES.length} shared`}
                   onClick={() => navigate("/notes")} />
        <StudyTile color="var(--sage)" label="Polls" icon="poll"
                   count={`${SEED_POLLS.filter(p => p.closesIn !== "Closed").length} live`}
                   onClick={() => navigate("/polls")} />
        <StudyTile color="var(--ochre)" label="Tasks" icon="check"
                   count="Project board"
                   onClick={() => navigate("/kanban")} />
        <StudyTile color="var(--berry)" label="Album" icon="photo"
                   count={`${ALBUM.length} photos`}
                   onClick={() => navigate("/album")} />
      </div>

      <SectionHead action={{ label: "New deck", onClick: () => {} }}>Flashcard decks</SectionHead>

      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
        {DECKS.map((d, i) => (
          <DeckCard key={d.id} deck={d} index={i} onClick={() => navigate(`/decks/${d.id}`)} />
        ))}
      </div>
    </div>
  );
}

function StudyTile({ color, label, icon, count, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: 16, borderRadius: 18, textAlign: "left",
      background: "var(--card)", border: "0.5px solid var(--card-edge)",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      minHeight: 110, gap: 18,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: color, color: "#fbf6e8",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={icon} size={20} strokeWidth={1.8} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 22, color: "var(--ink)", lineHeight: 1,
        }}>{label}</span>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{count}</span>
      </div>
    </button>
  );
}

function DeckCard({ deck, onClick, index }) {
  const owner = findFriend(deck.owner);
  return (
    <button onClick={onClick} className="fade-up" style={{
      animationDelay: `${index * 0.04}s`,
      padding: 16, borderRadius: 18, textAlign: "left",
      background: "var(--card)", border: "0.5px solid var(--card-edge)",
      display: "flex", gap: 14, alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "relative", width: 64, height: 80, flexShrink: 0 }}>
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, opacity: 0.4, transform: "rotate(-6deg) translate(-3px, 2px)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, opacity: 0.7, transform: "rotate(-2deg) translate(0, 1px)",
        }} />
        <div style={{
          position: "absolute", inset: 0, borderRadius: 10,
          background: deck.color, color: "#fbf6e8",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 28,
        }}>
          {deck.cards.length}
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 19, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -0.01,
        }}>{deck.title}</span>
        <span style={{ fontSize: 12, color: "var(--ink-soft)", lineHeight: 1.4 }}>{deck.subtitle}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
          <Avatar friend={owner} size={18} />
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{owner.name}</span>
        </div>
      </div>
      <Icon name="back" size={16} stroke="var(--ink-mute)" style={{ transform: "rotate(180deg)" }} />
    </button>
  );
}
