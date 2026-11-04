import { useNavigate, useParams } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import { findCategory } from "../../data/seed";

export default function CategoryScreen() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const cat = findCategory(categoryId);

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

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title={cat.title}
        subtitle={`${cat.total} items planned`}
        leading={<IconButton name="back" onClick={() => navigate("/study")} />}
      />

      <div style={{ padding: "8px 22px 32px" }}>
        <div className="j-card fade-up" style={{
          padding: 20, borderRadius: 18,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
          textAlign: "center",
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: `var(--${cat.tone})`, color: "#fbf6e8",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
          }}>
            <Icon name={cat.icon} size={28} strokeWidth={1.8} />
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 20, color: "var(--ink)",
          }}>
            {cat.title}
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-mute)", lineHeight: 1.5, maxWidth: 280 }}>
            A 10-question mock exam drawn from the CSE question bank. Each answer comes with a
            short explanation, so you learn even when you miss.
          </div>
          <button onClick={() => navigate(`/study/${cat.id}/quiz`)} style={{
            marginTop: 6, padding: "15px 26px",
            background: `var(--${cat.tone})`, color: "#fbf6e8",
            border: "none", borderRadius: 999,
            fontSize: 14, fontWeight: 800, letterSpacing: 0.6,
            cursor: "pointer",
          }}>
            Start mock exam
          </button>
          <div style={{ fontSize: 11, color: "var(--ink-mute)" }}>
            {cat.total} items planned · questions are shuffled every attempt
          </div>
        </div>
      </div>
    </div>
  );
}
