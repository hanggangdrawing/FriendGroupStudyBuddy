import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/ui/Icon";
import Character from "../../components/character/Character";
import SpeechBubble from "../../components/character/SpeechBubble";
import SocialCircle from "../../components/character/SocialCircle";
import { DEFAULT_USER_ID } from "../../data/seed";

export default function Login() {
  const [mode, setMode] = useState("signin");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    setBusy(true);
    setTimeout(() => {
      // Mock: log in as the default user. Replace with backend auth later.
      localStorage.setItem("hd.user", DEFAULT_USER_ID);
      navigate("/home");
    }, 800);
  };

  return <AuthStep mode={mode} setMode={setMode} busy={busy} onSubmit={handleSubmit} />;
}

function AuthStep({ mode, setMode, busy, onSubmit }) {
  const isSignUp = mode === "signup";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const valid =
    username.trim().length >= 2 &&
    password.length >= 6 &&
    (!isSignUp || confirm === password);

  return (
    <div style={{
      width: "100%", minHeight: "100vh", position: "relative", overflow: "hidden",
      background: "var(--paper)",
      maxWidth: 480, margin: "0 auto",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 360,
        background: "linear-gradient(155deg, var(--accent) 0%, var(--accent-soft) 100%)",
        borderRadius: "0 0 36px 36px",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -40, right: -30,
          width: 160, height: 160, borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }} />
        <div style={{
          position: "absolute", bottom: 40, left: -40,
          width: 120, height: 120, borderRadius: "50%",
          background: "rgba(255,255,255,0.06)",
        }} />
      </div>

      <div style={{ position: "absolute", top: 56, left: 18, zIndex: 5 }}>
        <button style={{
          width: 36, height: 36, borderRadius: 12,
          background: "#fbbf24", border: "none",
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 10px -4px rgba(0,0,0,0.3)",
        }}>
          <Icon name="back" size={18} stroke="#1f2937" strokeWidth="2.4" />
        </button>
      </div>

      <div style={{
        position: "absolute", top: 60, left: 0, right: 0, zIndex: 4,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
        <div style={{ alignSelf: "center", marginLeft: 60, marginBottom: -10, zIndex: 5 }}>
          <SpeechBubble side="right">
            {isSignUp ? "Let's get started!" : "Welcome back!"}
          </SpeechBubble>
        </div>
        <div style={{ marginTop: -8 }}>
          <Character size={170} accent="var(--accent-soft)" />
        </div>
      </div>

      <div className="scroll-area" style={{
        position: "absolute", top: 300, left: 0, right: 0, bottom: 0,
        background: "var(--card)",
        borderRadius: "32px 32px 0 0",
        boxShadow: "0 -8px 32px -12px var(--shadow-ink)",
        padding: "0 24px 28px",
        overflowY: "auto",
        display: "flex", flexDirection: "column",
      }}>
        <div style={{
          display: "flex", marginTop: 22, marginBottom: 18,
          borderBottom: "1px solid var(--line-soft)",
        }}>
          {[
            { id: "signin", label: "SIGN IN" },
            { id: "signup", label: "SIGN UP" },
          ].map((m) => {
            const on = mode === m.id;
            return (
              <button key={m.id} onClick={() => setMode(m.id)} style={{
                flex: 1, padding: "10px 0", border: "none",
                background: "transparent",
                color: on ? "var(--ink)" : "var(--ink-mute)",
                fontSize: 13, fontWeight: 700, letterSpacing: 0.8,
                position: "relative",
              }}>
                {m.label}
                {on && (
                  <div style={{
                    position: "absolute", left: "20%", right: "20%", bottom: -1, height: 3,
                    background: "var(--ink)", borderRadius: 2,
                  }} />
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <RoundedField value={username} onChange={setUsername} placeholder="User name" />
          <RoundedField value={password} onChange={setPassword} placeholder="Password" type="password" />
          {isSignUp && (
            <RoundedField value={confirm} onChange={setConfirm} placeholder="Confirm password" type="password" />
          )}
        </div>

        {!isSignUp && (
          <button style={{
            alignSelf: "flex-end", marginTop: 10,
            background: "transparent", border: "none",
            color: "var(--ink-mute)", fontSize: 12, fontWeight: 500,
          }}>Forgotten password?</button>
        )}

        <button onClick={onSubmit} disabled={!valid || busy} style={{
          marginTop: 18, padding: "16px 22px",
          background: valid && !busy ? "#fbbf24" : "#fde68a",
          color: "#1f2937", border: "none", borderRadius: 999,
          fontSize: 14, fontWeight: 800, letterSpacing: 1,
          boxShadow: valid && !busy ? "0 8px 20px -8px rgba(251,191,36,0.7)" : "none",
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
          cursor: valid && !busy ? "pointer" : "not-allowed",
        }}>
          {busy && <span className="spin-mini" />}
          {isSignUp ? "SIGN UP" : "SIGN IN"}
        </button>

        <div style={{
          margin: "18px 0 14px", textAlign: "center",
          fontSize: 11, color: "var(--ink-mute)", fontWeight: 700,
          letterSpacing: 0.6,
        }}>OR</div>

        <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 8 }}>
          <SocialCircle provider="facebook" disabled={busy} onClick={onSubmit} />
          <SocialCircle provider="google" disabled={busy} onClick={onSubmit} />
          <SocialCircle provider="apple" disabled={busy} onClick={onSubmit} />
        </div>

        <div style={{
          marginTop: 16, textAlign: "center", fontSize: 11,
          color: "var(--ink-mute)", lineHeight: 1.6,
        }}>
          By {isSignUp ? "signing up" : "continuing"} you agree to our{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>terms</span>{" & "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>privacy</span>.
        </div>
      </div>
    </div>
  );
}

function RoundedField({ value, onChange, placeholder, type = "text" }) {
  const [show, setShow] = useState(false);
  const isPw = type === "password";
  return (
    <div style={{
      display: "flex", alignItems: "center",
      background: "var(--card)", border: "1.5px solid var(--line)",
      borderRadius: 999, padding: "0 18px",
      transition: "border 0.15s",
    }}>
      <input
        type={isPw && !show ? "password" : "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          flex: 1, padding: "13px 0", border: "none", background: "transparent",
          outline: "none", fontSize: 14, color: "var(--ink)",
          fontFamily: "var(--font-body)",
        }}
      />
      {isPw && (
        <button onClick={() => setShow((s) => !s)} style={{
          background: "transparent", border: "none", padding: 4,
          color: "var(--ink-mute)",
        }}>
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
              <path d="M3 3l18 18"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
