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
            Coming soon
          </div>
          <div style={{ fontSize: 13, color: "var(--ink-mute)", lineHeight: 1.5, maxWidth: 280 }}>
            Flashcards and quizzes for {cat.title} will live here once the backend question bank is ready.
          </div>
        </div>
      </div>
    </div>
  );
}
