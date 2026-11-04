import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import IconButton from "../../components/ui/IconButton";
import { findCategory } from "../../data/seed";
import { questions as fetchQuestions } from "../../lib/api";

const QUESTION_COUNT = 10;

export default function QuizScreen() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const cat = findCategory(categoryId);

  const [questions, setQuestions] = useState(null);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const load = useCallback(async () => {
    setQuestions(null);
    setError("");
    setIndex(0);
    setPicked(null);
    setScore(0);
    setDone(false);
    try {
      setQuestions(await fetchQuestions(categoryId, QUESTION_COUNT));
    } catch {
      setError("Couldn't load the questions. Check your connection and try again.");
    }
  }, [categoryId]);

  useEffect(() => {
    if (cat) load();
  }, [cat, load]);

  if (!cat) {
    return (
      <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
        <AppNavBar
          title="Not found"
          subtitle="That category doesn't exist."
          leading={<IconButton name="back" onClick={() => navigate("/study")} />}
        />
      </div>
    );
  }

  const current = questions?.[index];

  const pick = (choiceIndex) => {
    if (picked !== null) return;
    setPicked(choiceIndex);
    if (choiceIndex === current.answer_index) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 < questions.length) {
      setIndex(index + 1);
      setPicked(null);
    } else {
      setDone(true);
    }
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title={cat.title}
        subtitle={done ? "Results" : "Mock exam"}
        leading={<IconButton name="back" onClick={() => navigate(`/study/${cat.id}`)} />}
      />

      <div style={{ padding: "8px 22px 32px" }}>
        {error && (
          <div className="j-card" style={{ padding: 20, borderRadius: 18, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "var(--ink)", fontWeight: 600, lineHeight: 1.5 }}>
              {error}
            </div>
            <button onClick={load} style={primaryButton}>Retry</button>
          </div>
        )}

        {!error && !questions && (
          <div className="j-card" style={{ padding: 28, borderRadius: 18, textAlign: "center" }}>
            <span className="spin-mini" />
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-mute)" }}>
              Loading questions…
            </div>
          </div>
        )}

        {!error && questions && questions.length === 0 && (
          <div className="j-card" style={{ padding: 24, borderRadius: 18, textAlign: "center" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>No questions yet</div>
            <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-mute)", lineHeight: 1.5 }}>
              This category's question bank is still empty. Try another category.
            </div>
          </div>
        )}

        {!error && questions && current && !done && (
          <>
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 12, fontSize: 12, color: "var(--ink-mute)", fontWeight: 600,
            }}>
              <span>Question {index + 1} of {questions.length}</span>
              <span>{score} correct</span>
            </div>

            <div style={{
              height: 6, borderRadius: 3, background: "var(--line-soft)",
              overflow: "hidden", marginBottom: 18,
            }}>
              <div style={{
                width: `${((index + (picked === null ? 0 : 1)) / questions.length) * 100}%`,
                height: "100%", background: `var(--${cat.tone})`, transition: "width .25s ease",
              }} />
            </div>

            <div className="j-card fade-up" style={{ padding: 20, borderRadius: 18 }}>
              <div style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18,
                lineHeight: 1.35, color: "var(--ink)",
              }}>
                {current.prompt}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                {current.choices.map((choice, i) => (
                  <ChoiceButton
                    key={i}
                    label={choice}
                    state={choiceState(i, picked, current.answer_index)}
                    disabled={picked !== null}
                    onClick={() => pick(i)}
                  />
                ))}
              </div>

              {picked !== null && (
                <div style={{
                  marginTop: 16, padding: 14, borderRadius: 14,
                  background: picked === current.answer_index ? "var(--tint-sage)" : "rgba(220,38,38,0.08)",
                  fontSize: 13, lineHeight: 1.5, color: "var(--ink-soft)",
                }}>
                  <strong style={{ color: picked === current.answer_index ? "var(--sage)" : "#dc2626" }}>
                    {picked === current.answer_index ? "Correct." : "Not quite."}
                  </strong>{" "}
                  {current.explanation}
                </div>
              )}

              <button onClick={next} disabled={picked === null} style={{
                ...primaryButton,
                width: "100%",
                background: picked === null ? "var(--line-soft)" : `var(--${cat.tone})`,
                color: picked === null ? "var(--ink-mute)" : "#fbf6e8",
                cursor: picked === null ? "not-allowed" : "pointer",
              }}>
                {index + 1 < questions.length ? "Next question" : "See results"}
              </button>
            </div>
          </>
        )}

        {done && (
          <div className="j-card fade-up" style={{ padding: 24, borderRadius: 18, textAlign: "center" }}>
            <div style={{ fontSize: 12, letterSpacing: 1, fontWeight: 700, color: "var(--ink-mute)" }}>
              YOUR SCORE
            </div>
            <div style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 44,
              color: "var(--ink)", lineHeight: 1.1, marginTop: 6,
            }}>
              {score} / {questions.length}
            </div>
            <div style={{ fontSize: 13, color: "var(--ink-mute)", marginTop: 4 }}>
              {Math.round((score / questions.length) * 100)}% · {verdict(score, questions.length)}
            </div>
            <button onClick={load} style={{ ...primaryButton, width: "100%", marginTop: 22 }}>
              Try again
            </button>
            <button onClick={() => navigate(`/study/${cat.id}`)} style={{
              width: "100%", marginTop: 10, padding: "14px 20px",
              background: "transparent", border: "1.5px solid var(--line)",
              borderRadius: 999, fontSize: 13, fontWeight: 700,
              color: "var(--ink-soft)", cursor: "pointer",
            }}>
              Back to {cat.title}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function choiceState(index, picked, answerIndex) {
  if (picked === null) return "idle";
  if (index === answerIndex) return "correct";
  if (index === picked) return "wrong";
  return "muted";
}

function ChoiceButton({ label, state, disabled, onClick }) {
  const styles = {
    idle: { border: "1.5px solid var(--line)", background: "var(--card)", color: "var(--ink)" },
    correct: { border: "1.5px solid var(--sage)", background: "var(--tint-sage)", color: "var(--ink)" },
    wrong: { border: "1.5px solid #dc2626", background: "rgba(220,38,38,0.08)", color: "var(--ink)" },
    muted: { border: "1.5px solid var(--line-soft)", background: "var(--card)", color: "var(--ink-mute)" },
  }[state];

  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...styles,
      padding: "14px 16px", borderRadius: 14, textAlign: "left",
      fontSize: 14, fontWeight: 600, lineHeight: 1.4,
      cursor: disabled ? "default" : "pointer",
    }}>
      {label}
    </button>
  );
}

function verdict(score, total) {
  const pct = (score / total) * 100;
  if (pct >= 90) return "Ready for the real thing.";
  if (pct >= 70) return "Solid — review the misses.";
  if (pct >= 50) return "Getting there.";
  return "Keep practicing.";
}

const primaryButton = {
  marginTop: 18, padding: "15px 22px",
  background: "var(--accent)", color: "#fff",
  border: "none", borderRadius: 999,
  fontSize: 14, fontWeight: 800, letterSpacing: 0.6,
  cursor: "pointer",
};
