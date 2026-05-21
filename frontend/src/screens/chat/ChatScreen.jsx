import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "../../components/ui/Avatar";
import AvatarStack from "../../components/ui/AvatarStack";
import IconButton from "../../components/ui/IconButton";
import Icon from "../../components/ui/Icon";
import { SEED_MESSAGES, findFriend } from "../../data/seed";
import { useUser } from "../../lib/useUser";

const AUTO_REPLIES = [
  { author: "basty", text: "saved!" },
  { author: "waren", text: "🙌🙌🙌" },
  { author: "jho",   text: "noted noted" },
  { author: "edres", text: "ack" },
  { author: "basam", text: "wait what" },
];

export default function ChatScreen() {
  const user = useUser();
  const navigate = useNavigate();
  const [messages, setMessages] = useState(SEED_MESSAGES);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  if (!user) return null;

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages((m) => [...m, { id: `m${Date.now()}`, author: user.id, time, text, reactions: {} }]);
    setDraft("");

    setTimeout(() => {
      const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
      const now2 = new Date();
      const t2 = `${now2.getHours()}:${String(now2.getMinutes()).padStart(2, "0")}`;
      setMessages((m) => [...m, {
        id: `m${Date.now() + 1}`, author: reply.author, time: t2, text: reply.text, reactions: {},
      }]);
    }, 1100);
  };

  return (
    <div className="paper-bg" style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column" }}>
      <div style={{
        padding: "62px 18px 14px", borderBottom: "0.5px solid var(--line-soft)",
        display: "flex", alignItems: "center", gap: 12, background: "var(--paper)",
      }}>
        <IconButton name="back" size={36} onClick={() => navigate("/home")} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
          <span style={{
            fontFamily: "var(--font-display)", fontWeight: 700,
            fontSize: 20, color: "var(--ink)",
          }}>The Study Cabin</span>
          <span style={{ fontSize: 11, color: "var(--ink-mute)", marginTop: 2 }}>
            19 members · 5 studying
          </span>
        </div>
        <AvatarStack ids={["jhums", "edres", "rhana", "tocalo"]} size={24} />
      </div>

      <div ref={scrollRef} className="scroll-area" style={{
        flex: 1, overflowY: "auto", padding: "12px 14px 8px",
        display: "flex", flexDirection: "column", gap: 4,
      }}>
        <div style={{
          alignSelf: "center", margin: "6px 0 14px",
          fontSize: 11, color: "var(--ink-mute)", letterSpacing: 0.2,
        }}>Today · {new Date().toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</div>
        {messages.map((m, i) => (
          <MessageBubble
            key={m.id}
            msg={m}
            isMe={m.author === user.id}
            prev={messages[i - 1]}
          />
        ))}
        <div style={{
          alignSelf: "flex-start", display: "flex", gap: 8, alignItems: "center",
          padding: "4px 4px 12px", opacity: 0.6,
        }}>
          <span style={{ fontSize: 11, color: "var(--ink-mute)" }}>jho is typing</span>
          <span className="typing-dots">
            <i></i><i></i><i></i>
          </span>
        </div>
      </div>

      <div style={{
        padding: "8px 12px 14px", background: "var(--paper)",
        borderTop: "0.5px solid var(--line-soft)",
        display: "flex", gap: 8, alignItems: "flex-end",
      }}>
        <div className="j-card" style={{
          flex: 1, padding: "8px 12px", display: "flex", alignItems: "center", gap: 8,
          borderRadius: 22, minHeight: 42,
        }}>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Message the cabin…"
            style={{
              flex: 1, border: "none", background: "transparent",
              outline: "none", fontSize: 14, color: "var(--ink)",
              fontFamily: "var(--font-body)",
            }}
          />
          <button style={{ background: "transparent", border: "none", color: "var(--ink-mute)", padding: 0 }}>
            <Icon name="photo" size={20} />
          </button>
        </div>
        <button onClick={send} style={{
          width: 42, height: 42, borderRadius: 21,
          background: draft.trim() ? "var(--accent)" : "var(--paper-soft)",
          color: draft.trim() ? "#fbf6e8" : "var(--ink-mute)",
          border: "none", display: "inline-flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.15s",
        }}>
          <Icon name="send" size={20} />
        </button>
      </div>

      <style>{`
        .typing-dots { display: inline-flex; gap: 3px; }
        .typing-dots i {
          width: 4px; height: 4px; border-radius: 50%;
          background: var(--ink-mute); display: inline-block;
          animation: bounce 1.2s infinite;
        }
        .typing-dots i:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots i:nth-child(3) { animation-delay: 0.3s; }
        @keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-3px); } }
      `}</style>
    </div>
  );
}

function MessageBubble({ msg, isMe, prev }) {
  const author = findFriend(msg.author);
  const showAuthor = !prev || prev.author !== msg.author;
  if (isMe) {
    return (
      <div style={{
        alignSelf: "flex-end", maxWidth: "78%",
        display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2,
        marginTop: showAuthor ? 6 : 1,
      }}>
        <div style={{
          padding: "9px 14px", borderRadius: "18px 18px 4px 18px",
          background: "var(--ink)", color: "var(--paper-soft)",
          fontSize: 14, lineHeight: 1.4,
        }}>{msg.text}</div>
        <span style={{ fontSize: 10, color: "var(--ink-mute)", padding: "0 4px" }}>{msg.time}</span>
      </div>
    );
  }
  return (
    <div style={{
      alignSelf: "flex-start", display: "flex", gap: 8,
      maxWidth: "82%", marginTop: showAuthor ? 8 : 1,
    }}>
      <div style={{ width: 28, flexShrink: 0 }}>
        {showAuthor && <Avatar friend={author} size={28} />}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {showAuthor && (
          <span style={{
            fontSize: 11, fontWeight: 600, color: author.color, padding: "0 4px",
          }}>{author.name}</span>
        )}
        <div style={{
          padding: "9px 14px", borderRadius: "4px 18px 18px 18px",
          background: "var(--card)",
          border: "0.5px solid var(--card-edge)",
          fontSize: 14, lineHeight: 1.4, color: "var(--ink)",
        }}>{msg.text}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "0 4px" }}>
          <span style={{ fontSize: 10, color: "var(--ink-mute)" }}>{msg.time}</span>
          {msg.reactions && Object.entries(msg.reactions).map(([e, c]) => (
            <span key={e} style={{
              fontSize: 11, padding: "1px 6px", borderRadius: 10,
              background: "var(--paper-soft)", color: "var(--ink-soft)",
            }}>{e} {c}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
