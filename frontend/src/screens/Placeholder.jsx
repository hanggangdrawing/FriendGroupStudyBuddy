import AppNavBar from "../components/ui/AppNavBar";

export default function Placeholder({ title, subtitle = "Coming soon" }) {
  return (
    <>
      <AppNavBar title={title} subtitle={subtitle} />
      <div style={{ padding: "20px 22px", color: "var(--ink-mute)", fontSize: 14, lineHeight: 1.55 }}>
        This screen will be built in a follow-up step. The design and tokens are ready —
        we'll port the prototype code into here next session.
      </div>
    </>
  );
}
