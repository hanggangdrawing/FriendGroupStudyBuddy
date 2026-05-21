import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import AvatarStack from "../../components/ui/AvatarStack";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import Tag from "../../components/ui/Tag";
import { SEED_POLLS, FRIENDS, findFriend } from "../../data/seed";
import { useUser } from "../../lib/useUser";

export default function PollsScreen() {
  const user = useUser();
  const navigate = useNavigate();
  const [polls, setPolls] = useState(SEED_POLLS);

  if (!user) return null;

  const vote = (pollId, optId) => {
    setPolls((arr) => arr.map((p) => {
      if (p.id !== pollId) return p;
      const opts = p.options.map((o) => ({
        ...o,
        votes: o.votes.filter((v) => v !== user.id).concat(o.id === optId ? [user.id] : []),
      }));
      return { ...p, options: opts };
    }));
  };

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%", paddingBottom: 40 }}>
      <AppNavBar
        title="Polls"
        subtitle="Decide together — drama-free"
        leading={<IconButton name="back" size={36} onClick={() => navigate("/home")} />}
        trailing={<IconButton name="plus" />}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "0 22px" }}>
        {polls.map((p) => <PollCard key={p.id} poll={p} user={user} onVote={vote} />)}
      </div>
    </div>
  );
}

function PollCard({ poll, user, onVote }) {
  const author = findFriend(poll.author);
  const total = poll.options.reduce((s, o) => s + o.votes.length, 0);
  const myVote = poll.options.find((o) => o.votes.includes(user.id));
  const closed = poll.closesIn === "Closed";

  return (
    <div className="j-card fade-up" style={{ padding: 18 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
        <Avatar friend={author} size={28} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>{author.name}</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>asked · {poll.time}</span>
        </div>
        <Tag tone={closed ? "default" : "terra"}>{poll.closesIn}</Tag>
      </div>

      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 22, color: "var(--ink)", lineHeight: 1.15, marginBottom: 14,
      }}>{poll.question}</div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {poll.options.map((o) => {
          const pct = total ? Math.round(o.votes.length / total * 100) : 0;
          const isMine = myVote?.id === o.id;
          return (
            <button
              key={o.id}
              onClick={() => !closed && onVote(poll.id, o.id)}
              disabled={closed}
              style={{
                position: "relative", padding: "10px 14px", borderRadius: 12,
                background: "var(--paper-soft)",
                border: isMine ? "1.5px solid var(--accent)" : "1px solid var(--line-soft)",
                textAlign: "left", overflow: "hidden", cursor: closed ? "default" : "pointer",
              }}
            >
              <div style={{
                position: "absolute", inset: 0, width: `${pct}%`,
                background: isMine ? "var(--tint-strong)" : "var(--tint-sage)",
                transition: "width 0.3s",
              }} />
              <div style={{
                position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {isMine && (
                    <div style={{
                      width: 16, height: 16, borderRadius: "50%",
                      background: "var(--accent)", display: "inline-flex",
                      alignItems: "center", justifyContent: "center",
                    }}>
                      <Icon name="check" size={11} stroke="#fff" strokeWidth="3" />
                    </div>
                  )}
                  <span style={{
                    fontSize: 14, color: "var(--ink)",
                    fontWeight: isMine ? 600 : 500,
                  }}>{o.label}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {o.votes.length > 0 && <AvatarStack ids={o.votes} size={18} max={3} />}
                  <span style={{
                    fontSize: 12, color: "var(--ink-mute)", fontWeight: 600,
                    minWidth: 32, textAlign: "right",
                  }}>{pct}%</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{
        marginTop: 12, paddingTop: 10, borderTop: "0.5px solid var(--line-soft)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>
          {total} votes · {total > 0 ? Math.round(total / FRIENDS.length * 100) : 0}% of the cabin
        </span>
        <button style={{
          background: "transparent", border: "none", color: "var(--accent)",
          fontSize: 12, fontWeight: 600, padding: 0,
        }}>See discussion →</button>
      </div>
    </div>
  );
}
