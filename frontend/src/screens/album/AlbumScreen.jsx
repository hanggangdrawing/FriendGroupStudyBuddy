import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import IconButton from "../../components/ui/IconButton";
import { ALBUM, findFriend } from "../../data/seed";

export default function AlbumScreen() {
  const navigate = useNavigate();
  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 40 }}>
      <AppNavBar
        title="Shared album"
        subtitle="Moments from study sessions"
        leading={<IconButton name="back" size={36} onClick={() => navigate("/study")} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ padding: "0 22px" }}>
        <div className="fade-up" style={{
          position: "relative", borderRadius: 18, overflow: "hidden",
          aspectRatio: "4/3", marginBottom: 12,
          background: `linear-gradient(135deg, ${ALBUM[0].tone[0]}, ${ALBUM[0].tone[1]})`,
        }}>
          <div className="tape" style={{ top: 12, left: 20 }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'><path d='M0 0L40 40M40 0L0 40' stroke='rgba(255,255,255,0.06)' stroke-width='1'/></svg>\")",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            padding: "20px 18px 18px",
            background: "linear-gradient(to top, rgba(20,12,8,0.75), transparent)",
            color: "#fbf6e8",
          }}>
            <div className="hand" style={{ fontSize: 22, lineHeight: 1 }}>{ALBUM[0].label}</div>
            <div style={{ fontSize: 11, marginTop: 4, opacity: 0.85, letterSpacing: 0.2 }}>
              posted by {findFriend(ALBUM[0].poster).name}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
          {ALBUM.slice(1).map((a, i) => (
            <div key={a.id} className="fade-up" style={{
              animationDelay: `${i * 0.03}s`,
              aspectRatio: "1", borderRadius: 10, overflow: "hidden",
              background: `linear-gradient(135deg, ${a.tone[0]}, ${a.tone[1]})`,
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='30' height='30'><circle cx='15' cy='15' r='1' fill='rgba(255,255,255,0.1)'/></svg>\")",
              }} />
              <div style={{
                position: "absolute", bottom: 4, left: 6, right: 6,
                fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.9)",
                letterSpacing: 0.2, lineHeight: 1.2,
                overflow: "hidden", display: "-webkit-box",
                WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
              }}>{a.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
