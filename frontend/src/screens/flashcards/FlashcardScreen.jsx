import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import { findDeck, findFriend } from "../../data/seed";

export default function FlashcardScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const deck = findDeck(id);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [knownCount, setKnownCount] = useState(0);

  const card = deck.cards[idx];
  const isLast = idx === deck.cards.length - 1;

  const next = (known) => {
    if (known) setKnownCount((k) => k + 1);
    setFlipped(false);
    if (!isLast) {
      setTimeout(() => setIdx((i) => i + 1), 140);
    }
  };

  const reset = () => {
    setIdx(0);
    setFlipped(false);
    setKnownCount(0);
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "62px 18px 8px", display: "flex", alignItems: "center", gap: 12,
      }}>
        <IconButton name="back" size={36} onClick={() => navigate("/study")} />
        <div style={{ flex: 1, lineHeight: 1.1 }}>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 18, color: "var(--ink)",
          }}>{deck.title}</div>
          <div style={{ fontSize: 11, color: "var(--ink-mute)" }}>{idx + 1} of {deck.cards.length}</div>
        </div>
        <IconButton name="more" size={36} />
      </div>

      <div style={{ padding: "0 22px 8px" }}>
        <div style={{ height: 4, background: "var(--line-soft)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", width: `${((idx + (flipped ? 1 : 0)) / deck.cards.length) * 100}%`,
            background: deck.color, transition: "width 0.3s",
          }} />
        </div>
      </div>

      <div style={{
        flex: 1, padding: "16px 22px 22px",
        display: "flex", flexDirection: "column", alignItems: "stretch", justifyContent: "center",
      }}>
        <div className="flip-scene">
          <div
            className={"flip-card" + (flipped ? " is-flipped" : "")}
            onClick={() => setFlipped((f) => !f)}
          >
            <CardFace deck={deck} text={card.q} side="front" />
            <CardFace deck={deck} text={card.a} side="back" />
          </div>
        </div>
        <div style={{
          textAlign: "center", marginTop: 14,
          fontSize: 12, color: "var(--ink-mute)", letterSpacing: 0.2,
        }}>
          {flipped ? "Tap to flip back" : "Tap card to reveal"}
        </div>
      </div>

      <div style={{ padding: "0 22px 32px", display: "flex", gap: 10 }}>
        {!isLast || flipped ? (
          <>
            <button onClick={() => next(false)} className="btn" style={{
              flex: 1, background: "var(--paper-soft)", color: "var(--ink)",
              border: "1px solid var(--line)", padding: "14px 18px",
            }}>
              <Icon name="x" size={16} /> Again
            </button>
            <button onClick={() => next(true)} className="btn btn-primary" style={{
              flex: 1, padding: "14px 18px", background: "var(--sage)",
            }}>
              <Icon name="check" size={16} /> Got it
            </button>
          </>
        ) : (
          <button onClick={reset} className="btn btn-accent" style={{ flex: 1, padding: "14px 18px" }}>
            <Icon name="reset" size={16} /> Done · {knownCount}/{deck.cards.length} known
          </button>
        )}
      </div>
    </div>
  );
}

function CardFace({ deck, text, side }) {
  const isBack = side === "back";
  return (
    <div
      className={"flip-face" + (isBack ? " flip-face-back" : "")}
      style={{
        background: isBack ? deck.color : "var(--card)",
        color: isBack ? "#fbf6e8" : "var(--ink)",
        border: isBack ? "none" : "0.5px solid var(--card-edge)",
      }}
    >
      <span style={{
        fontSize: 11, letterSpacing: 0.3, fontWeight: 600, textTransform: "uppercase",
        opacity: 0.6, marginBottom: 18,
      }}>{isBack ? "answer" : "question"}</span>
      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: isBack ? 26 : 28, lineHeight: 1.18, letterSpacing: -0.005,
      }}>{text}</div>
      <span style={{
        position: "absolute", bottom: 18, fontSize: 11,
        opacity: 0.5, letterSpacing: 0.2,
      }}>by {findFriend(deck.owner).name}</span>
    </div>
  );
}
