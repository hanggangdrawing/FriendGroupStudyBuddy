import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppNavBar from "../../components/ui/AppNavBar";
import Avatar from "../../components/ui/Avatar";
import IconButton from "../../components/ui/IconButton";
import Tag from "../../components/ui/Tag";
import { SEED_TASKS, TAG_TONES, findFriend } from "../../data/seed";
import { useUser } from "../../lib/useUser";

export default function KanbanScreen() {
  const user = useUser();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(SEED_TASKS);
  const [filter, setFilter] = useState("all");

  if (!user) return null;

  const move = (id, from, to) => {
    setTasks((t) => {
      const card = t[from].find((x) => x.id === id);
      if (!card) return t;
      return {
        ...t,
        [from]: t[from].filter((x) => x.id !== id),
        [to]: [card, ...t[to]],
      };
    });
  };

  const filterFn = (t) => filter === "all" || t.assignee === user.id;

  const columns = [
    { id: "todo",  label: "To do",       next: "doing", prev: null,    color: "var(--ink-mute)" },
    { id: "doing", label: "In progress", next: "done",  prev: "todo",  color: "var(--accent)" },
    { id: "done",  label: "Shipped",     next: null,    prev: "doing", color: "var(--sage)" },
  ];

  const totalMine = ["todo", "doing", "done"].reduce(
    (s, c) => s + tasks[c].filter((t) => t.assignee === user.id).length, 0);

  return (
    <div className="paper-bg" style={{ width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <AppNavBar
        title="Project board"
        subtitle="Hanggangdrawing · sprint 3"
        leading={<IconButton name="back" size={36} onClick={() => navigate("/study")} />}
        trailing={<IconButton name="plus" />}
      />

      <div style={{ padding: "0 22px 12px", display: "flex", gap: 8 }}>
        <FilterChip on={filter === "all"} onClick={() => setFilter("all")}>
          All · {tasks.todo.length + tasks.doing.length + tasks.done.length}
        </FilterChip>
        <FilterChip on={filter === "mine"} onClick={() => setFilter("mine")}>
          Mine · {totalMine}
        </FilterChip>
      </div>

      <div className="scroll-area" style={{
        flex: 1, overflowX: "auto", overflowY: "hidden",
        display: "flex", gap: 12, padding: "0 22px 40px",
        scrollSnapType: "x mandatory",
      }}>
        {columns.map((col) => {
          const items = tasks[col.id].filter(filterFn);
          return (
            <div key={col.id} style={{
              flex: "0 0 84%", maxWidth: 320,
              display: "flex", flexDirection: "column", gap: 8,
              scrollSnapAlign: "start",
            }}>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0 4px 6px",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", background: col.color,
                  }} />
                  <span style={{
                    fontSize: 12, fontWeight: 700, letterSpacing: 0.2,
                    textTransform: "uppercase", color: "var(--ink-soft)",
                  }}>{col.label}</span>
                  <span style={{
                    fontSize: 11, color: "var(--ink-mute)", fontWeight: 600,
                    background: "var(--paper-soft)", padding: "2px 7px", borderRadius: 999,
                  }}>{items.length}</span>
                </div>
                <button style={{
                  background: "transparent", border: "none", color: "var(--ink-mute)",
                  fontSize: 18, padding: 0, lineHeight: 1, width: 22, height: 22,
                }}>＋</button>
              </div>

              <div className="scroll-area" style={{
                flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8,
                paddingBottom: 6,
              }}>
                {items.map((task, i) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    col={col}
                    onMove={move}
                    isMine={task.assignee === user.id}
                    index={i}
                  />
                ))}
                {items.length === 0 && (
                  <div style={{
                    padding: "20px 12px", textAlign: "center",
                    color: "var(--ink-mute)", fontSize: 12, fontStyle: "italic",
                    border: "1px dashed var(--line)", borderRadius: 12,
                  }}>
                    {filter === "mine" ? "No tasks here — sweet" : "Empty"}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FilterChip({ on, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: "6px 12px", borderRadius: 999,
      background: on ? "var(--ink)" : "var(--card)",
      color: on ? "var(--paper)" : "var(--ink-soft)",
      border: "1px solid " + (on ? "var(--ink)" : "var(--line)"),
      fontSize: 12, fontWeight: 600,
    }}>{children}</button>
  );
}

function TaskCard({ task, col, onMove, isMine, index }) {
  const tone = TAG_TONES[task.tag] || "default";
  const f = findFriend(task.assignee);
  const prioColor = task.prio === "high" ? "var(--terra)" : task.prio === "med" ? "var(--ochre)" : "var(--ink-mute)";
  return (
    <div className="j-card fade-up" style={{
      padding: 12, animationDelay: `${index * 0.03}s`,
      borderLeft: `3px solid ${prioColor}`,
      borderTopLeftRadius: 18, borderBottomLeftRadius: 18,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
        <span style={{
          fontSize: 13, lineHeight: 1.35, fontWeight: 600, color: "var(--ink)",
          flex: 1,
        }}>{task.title}</span>
        {isMine && <div style={{
          width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", marginTop: 6,
        }} />}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Tag tone={tone}>#{task.tag}</Tag>
        <Avatar friend={f} size={22} />
      </div>
      <div style={{
        marginTop: 10, paddingTop: 8, borderTop: "0.5px solid var(--line-soft)",
        display: "flex", gap: 6, justifyContent: "space-between",
      }}>
        {col.prev ? (
          <button onClick={() => onMove(task.id, col.id, col.prev)} style={moveBtn}>
            ← back
          </button>
        ) : <div />}
        {col.next ? (
          <button onClick={() => onMove(task.id, col.id, col.next)} style={moveBtn}>
            move →
          </button>
        ) : (
          <span style={{
            fontSize: 10, color: "var(--sage)", fontWeight: 700,
            letterSpacing: 0.3, textTransform: "uppercase",
          }}>✓ shipped</span>
        )}
      </div>
    </div>
  );
}

const moveBtn = {
  background: "transparent", border: "none", color: "var(--ink-mute)",
  fontSize: 11, fontWeight: 600, padding: "2px 0",
};
