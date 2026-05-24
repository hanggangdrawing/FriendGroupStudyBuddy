import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import SectionHead from "../../components/ui/SectionHead";
import {
  DECKS, NOTES, ALBUM, SEED_POLLS, findFriend,
  CSE_CATEGORIES, USER_MASTERY,
} from "../../data/seed";

export default function StudyDashboard() {
  const navigate = useNavigate();

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title="Study"
        subtitle="CSE prep + everything we share"
        trailing={<IconButton name="search" />}
      />

      <div style={{ padding: "0 22px 12px", display: "flex", flexDirection: "column", gap: 10 }}>
        <button
          onClick={() => navigate("/battle")}
          style={{
            width: "100%", textAlign: "left",
            padding: 16, borderRadius: 18, border: "none",
            background: "linear-gradient(135deg, var(--terra) 0%, var(--berry) 100%)",
            color: "#fff",
            display: "flex", alignItems: "center", gap: 14,
            boxShadow: "0 8px 24px -10px rgba(124,58,237,0.45)",
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "rgba(255,255,255,0.2)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name="fire" size={22} stroke="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>Battle Arena</div>
            <div style={{ fontSize: 12, opacity: 0.92, marginTop: 3 }}>
              Bots, friends, daily &amp; weekly challenges
            </div>
          </div>
          <Icon name="back" size={18} stroke="rgba(255,255,255,0.9)" style={{ transform: "rotate(180deg)" }} />
        </button>

        <button
          onClick={() => navigate("/ai")}
          style={{
            width: "100%", textAlign: "left",
            padding: 16, borderRadius: 18, border: "none",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-soft) 100%)",
            color: "#fff",
            display: "flex", alignItems: "center", gap: 14,
            boxShadow: "0 8px 24px -10px rgba(37,99,235,0.45)",
            cursor: "pointer", position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            width: 44, height: 44, borderRadius: 12,
            background: "rgba(255,255,255,0.2)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>✦</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.1 }}>Study buddy</div>
            <div style={{ fontSize: 12, opacity: 0.92, marginTop: 3 }}>
              Generate flashcards or ask anything · powered by AI
            </div>
          </div>
          <Icon name="back" size={18} stroke="rgba(255,255,255,0.9)" style={{ transform: "rotate(180deg)" }} />
        </button>
      </div>

      <SectionHead>CSE Categories</SectionHead>

      <div style={{
        padding: "0 22px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
      }}>
        {CSE_CATEGORIES.map((cat, i) => (
          <CategoryCard
            key={cat.id}
            cat={cat}
            unlocked={USER_MASTERY[cat.id]?.unlocked ?? 0}
            spanBoth={i === CSE_CATEGORIES.length - 1}
            index={i}
            onClick={() => navigate(`/study/${cat.id}`)}
          />
        ))}
      </div>

      <SectionHead>Category Mastery</SectionHead>

      <div style={{
        padding: "0 22px",
        display: "flex", flexDirection: "column", gap: 14,
      }}>
        {CSE_CATEGORIES.map((cat) => (
          <MasteryRow
            key={cat.id}
            cat={cat}
            pct={USER_MASTERY[cat.id]?.masteredPct ?? 0}
          />
        ))}
      </div>

      <SectionHead>Quick tools</SectionHead>

      <div style={{
        padding: "0 22px",
        display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12,
      }}>
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

      <div style={{ padding: "0 22px 24px", display: "flex", flexDirection: "column", gap: 12 }}>
        {DECKS.map((d, i) => (
          <DeckCard key={d.id} deck={d} index={i} onClick={() => navigate(`/decks/${d.id}`)} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ cat, unlocked, spanBoth, index, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fade-up"
      style={{
        animationDelay: `${index * 0.04}s`,
        gridColumn: spanBoth ? "1 / span 2" : "auto",
        padding: 16, borderRadius: 18, textAlign: "left",
        background: "var(--card)", border: "0.5px solid var(--card-edge)",
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        minHeight: 118, gap: 18,
        position: "relative", overflow: "hidden", cursor: "pointer",
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: `var(--${cat.tone})`, color: "#fbf6e8",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
      }}>
        <Icon name={cat.icon} size={20} strokeWidth={1.8} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <span style={{
          fontFamily: "var(--font-display)", fontWeight: 700,
          fontSize: 18, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -0.01,
        }}>
          {cat.title}
        </span>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
          {unlocked} / {cat.total} items
        </span>
      </div>
    </button>
  );
}

function MasteryRow({ cat, pct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 24, height: 24, borderRadius: 8,
          background: `var(--tint-${cat.tone})`, color: `var(--${cat.tone})`,
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Icon name={cat.icon} size={14} strokeWidth={2} />
        </div>
        <span style={{
          flex: 1, fontSize: 13, fontWeight: 600, color: "var(--ink)",
        }}>{cat.title}</span>
        <span style={{ fontSize: 12, color: "var(--ink-mute)", fontVariantNumeric: "tabular-nums" }}>
          {pct}%
        </span>
      </div>
      <div style={{
        width: "100%", height: 6, borderRadius: 3,
        background: "var(--line-soft)", overflow: "hidden",
      }}>
        <div style={{
          width: `${Math.max(0, Math.min(100, pct))}%`,
          height: "100%", borderRadius: 3,
          background: `var(--${cat.tone})`,
          transition: "width 0.4s ease",
        }} />
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
      position: "relative", overflow: "hidden", cursor: "pointer",
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
      position: "relative", overflow: "hidden", cursor: "pointer",
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
