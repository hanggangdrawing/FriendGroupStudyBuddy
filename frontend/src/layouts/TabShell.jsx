import { Outlet, useNavigate, useLocation } from "react-router-dom";
import BottomTabs, { TABS } from "../components/ui/BottomTabs";

export default function TabShell() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = TABS.find((t) => pathname.startsWith(t.path))?.id || "home";

  return (
    <div className="paper-bg" style={{
      width: "100%", minHeight: "100vh",
      paddingBottom: 96,
      maxWidth: 480, margin: "0 auto",
    }}>
      <Outlet />
      <BottomTabs activeTab={active} onChange={(t) => navigate(t.path)} />
    </div>
  );
}
