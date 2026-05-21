import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import Tag from "../../components/ui/Tag";
import SectionHead from "../../components/ui/SectionHead";
import { POSTS, STUDYING_NOW, SEED_POLLS, findFriend } from "../../data/seed";
import { useUser } from "../../lib/useUser";

export default function HomeScreen() {
  const user = useUser();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(POSTS);
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  const react = (postId, emoji) => {
    setPosts((arr) => arr.map((p) => {
      if (p.id !== postId) return p;
      const r = { ...p.reactions };
      r[emoji] = (r[emoji] || 0) + 1;
      return { ...p, reactions: r };
    }));
  };

  if (!user) return null;

  const livePoll = SEED_POLLS.find((p) => p.closesIn === "Closes today") || SEED_POLLS[0];
  const totalVotes = livePoll.options.reduce((s, x) => s + x.votes.length, 0);

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100%" }}>
      <AppNavBar
        title={`Hi, ${user.name}.`}
        subtitle={dateStr}
        leading={
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 11, fontWeight: 600, letterSpacing: 0.18, textTransform: "uppercase",
            color: "var(--ink-mute)",
          }}>
            <Icon name="leaf" size={14} stroke="var(--sage)" />
            <span>Day 14 streak</span>
          </div>
        }
        trailing={<IconButton name="bell" badge={2} />}
      />

      <div style={{ padding: "0 22px 8px" }}>
        <div className="j-card" style={{ padding: "14px 16px", position: "relative" }}>
          <div className="tape" style={{ top: -8, left: 22 }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span className="hand" style={{ fontSize: 18, color: "var(--accent)", lineHeight: 1 }}>studying now</span>
              <span style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
                {STUDYING_NOW.length} people · pomodoro in progress
              </span>
            </div>
            <button onClick={() => navigate("/timer")} style={{
              background: "var(--ink)", color: "var(--paper-soft)",
              border: "none", borderRadius: 999, padding: "8px 14px",
              fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}>
              <Icon name="play" size={11} />
              Join
            </button>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {STUDYING_NOW.slice(0, 5).map((s) => (
              <div key={s.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
                <Avatar friend={s.id} size={32} status="studying" />
                <span style={{ fontSize: 10, color: "var(--ink-mute)", fontWeight: 500 }}>{s.minLeft}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "12px 22px 0" }}>
        <button onClick={() => navigate("/polls")} className="j-card" style={{
          padding: 16, background: "var(--paper-soft)", textAlign: "left", width: "100%", border: "none",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
            <Tag tone="terra">Live poll · {livePoll.closesIn.toLowerCase()}</Tag>
            <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{totalVotes} votes</span>
          </div>
          <div style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 22, color: "var(--ink)", lineHeight: 1.15, marginBottom: 10,
          }}>{livePoll.question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {livePoll.options.slice(0, 2).map((o) => {
              const pct = totalVotes ? Math.round(o.votes.length / totalVotes * 100) : 0;
              return (
                <div key={o.id} style={{ position: "relative", padding: "8px 12px", background: "var(--card)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{
                    position: "absolute", inset: 0, width: `${pct}%`,
                    background: "var(--tint-sage)",
                  }} />
                  <div style={{
                    position: "relative", display: "flex", justifyContent: "space-between",
                    fontSize: 13, color: "var(--ink)",
                  }}>
                    <span>{o.label}</span>
                    <span style={{ color: "var(--ink-mute)", fontWeight: 600 }}>{pct}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </button>
      </div>

      <SectionHead action={{ label: "All posts", onClick: () => {} }}>Timeline</SectionHead>

      <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 22px" }}>
        {posts.map((p, i) => <PostCard key={p.id} post={p} onReact={react} index={i} />)}
      </div>
    </div>
  );
}

function PostCard({ post, onReact, index }) {
  const author = findFriend(post.author);
  const tags = {
    code: { tone: "sage", label: "code" },
    flashcards: { tone: "ochre", label: "flashcards" },
    results: { tone: "terra", label: "results" },
  };
  const tag = post.tag ? tags[post.tag] : null;
  return (
    <div className="j-card fade-up" style={{
      padding: 18, animationDelay: `${index * 0.04}s`,
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <Avatar friend={author} size={36} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{author.name}</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>{author.role} · {post.time}</span>
        </div>
        {tag && <Tag tone={tag.tone}>#{tag.label}</Tag>}
      </div>

      <div style={{
        fontFamily: "var(--font-display)", fontWeight: 700,
        fontSize: 22, lineHeight: 1.15, color: "var(--ink)", marginBottom: 8,
        letterSpacing: -0.01,
      }}>{post.title}</div>

      <div style={{
        fontSize: 14, lineHeight: 1.5, color: "var(--ink-soft)", marginBottom: 14,
      }}>{post.body}</div>

      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
        {Object.entries(post.reactions).map(([emoji, count]) => (
          <button key={emoji} onClick={() => onReact(post.id, emoji)} style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: "5px 10px", borderRadius: 999,
            background: "var(--paper-soft)", border: "1px solid var(--line-soft)",
            fontSize: 12, color: "var(--ink-soft)", fontWeight: 500,
          }}>
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "5px 10px", borderRadius: 999,
          background: "transparent", border: "none",
          fontSize: 12, color: "var(--ink-mute)", fontWeight: 500,
        }}>
          <Icon name="reply" size={13} />
          {post.comments}
        </button>
      </div>
    </div>
  );
}
