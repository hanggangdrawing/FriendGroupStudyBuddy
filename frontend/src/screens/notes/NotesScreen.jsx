import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import { NOTES, findFriend } from "../../data/seed";

export default function NotesScreen() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  if (open) return <NoteDetail note={open} onBack={() => setOpen(null)} />;

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 40 }}>
      <AppNavBar
        title="Notes"
        subtitle="Markdown · synced across the cabin"
        leading={<IconButton name="back" size={36} onClick={() => navigate("/study")} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ padding: "0 22px", display: "flex", flexDirection: "column", gap: 12 }}>
        {NOTES.map((n, i) => {
          const author = findFriend(n.author);
          return (
            <button key={n.id} onClick={() => setOpen(n)} className="j-card fade-up" style={{
              animationDelay: `${i * 0.04}s`,
              padding: 18, textAlign: "left", border: "0.5px solid var(--card-edge)",
              display: "flex", flexDirection: "column", gap: 8,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {n.pinned && <Icon name="pin" size={14} stroke="var(--accent)" />}
                <span style={{
                  fontFamily: "var(--font-display)", fontWeight: 700,
                  fontSize: 20, color: "var(--ink)", lineHeight: 1.1, letterSpacing: -0.01,
                }}>{n.title}</span>
              </div>
              <div style={{
                fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.5,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}>{n.body.replace(/[#\-*[\]]/g, "").trim().slice(0, 140)}…</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                <Avatar friend={author} size={18} />
                <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{author.name} · {n.edited}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function NoteDetail({ note, onBack }) {
  const author = findFriend(note.author);
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 40 }}>
      <div style={{ padding: "62px 18px 8px", display: "flex", alignItems: "center", gap: 10 }}>
        <IconButton name="back" size={36} onClick={onBack} />
        <div style={{ flex: 1 }} />
        <IconButton name="edit" size={36} />
        <IconButton name="more" size={36} />
      </div>
      <div style={{ padding: "8px 24px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Avatar friend={author} size={22} />
          <span style={{ fontSize: 12, color: "var(--ink-mute)" }}>{author.name} · {note.edited}</span>
        </div>
        <div className="display" style={{
          fontSize: 34, color: "var(--ink)", lineHeight: 1.05,
        }}>{note.title}</div>
      </div>
      <div className="j-card" style={{
        margin: "0 18px", padding: "8px 18px", position: "relative",
      }}>
        <div className="ruled" style={{
          padding: "12px 4px", fontSize: 14, lineHeight: 1.55,
          color: "var(--ink)", whiteSpace: "pre-wrap",
          fontFamily: "var(--font-body)",
        }}>
          {note.body.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return <div key={i} style={{
                fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20,
                color: "var(--ink)", margin: "10px 0 4px",
              }}>{line.slice(3)}</div>;
            }
            if (line.startsWith("- [ ] ")) {
              return <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{ width: 14, height: 14, border: "1.5px solid var(--ink-mute)", borderRadius: 3 }} />
                <span>{line.slice(6)}</span>
              </div>;
            }
            if (line.startsWith("- [x] ")) {
              return <div key={i} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <div style={{
                  width: 14, height: 14, background: "var(--sage)", borderRadius: 3,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                }}>
                  <Icon name="check" size={10} stroke="#fff" strokeWidth="3" />
                </div>
                <span style={{ textDecoration: "line-through", color: "var(--ink-mute)" }}>{line.slice(6)}</span>
              </div>;
            }
            if (line.startsWith("- ")) {
              return <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)" }}>•</span><span>{line.slice(2)}</span>
              </div>;
            }
            if (/^\d+\. /.test(line)) {
              return <div key={i} style={{ display: "flex", gap: 8 }}>
                <span style={{ color: "var(--accent)", fontWeight: 600, minWidth: 18 }}>
                  {line.match(/^(\d+)\./)[1]}.
                </span>
                <span>{line.replace(/^\d+\. /, "")}</span>
              </div>;
            }
            return <div key={i}>{line || " "}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
