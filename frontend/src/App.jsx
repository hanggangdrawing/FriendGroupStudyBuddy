import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TabShell from "./layouts/TabShell";
import Login from "./screens/auth/Login";
import HomeScreen from "./screens/home/HomeScreen";
import ChatScreen from "./screens/chat/ChatScreen";
import StudyDashboard from "./screens/study/StudyDashboard";
import CategoryScreen from "./screens/study/CategoryScreen";
import BattleScreen from "./screens/battle/BattleScreen";
import PomodoroScreen from "./screens/pomodoro/PomodoroScreen";
import ProfileScreen from "./screens/profile/ProfileScreen";
import PollsScreen from "./screens/polls/PollsScreen";
import FlashcardScreen from "./screens/flashcards/FlashcardScreen";
import NotesScreen from "./screens/notes/NotesScreen";
import AlbumScreen from "./screens/album/AlbumScreen";
import KanbanScreen from "./screens/kanban/KanbanScreen";
import AIBuddyScreen from "./screens/ai/AIBuddyScreen";
import { getStoredUserId } from "./lib/useUser";

function RequireAuth({ children }) {
  return getStoredUserId() ? children : <Navigate to="/login" replace />;
}

function RedirectIfAuthed({ children }) {
  return getStoredUserId() ? <Navigate to="/home" replace /> : children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />

        <Route element={<RequireAuth><TabShell /></RequireAuth>}>
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/study" element={<StudyDashboard />} />
          <Route path="/study/:categoryId" element={<CategoryScreen />} />
          <Route path="/battle" element={<BattleScreen />} />
          <Route path="/timer" element={<PomodoroScreen />} />
          <Route path="/you" element={<ProfileScreen />} />
        </Route>

        <Route path="/polls" element={<RequireAuth><PollsScreen /></RequireAuth>} />
        <Route path="/notes" element={<RequireAuth><NotesScreen /></RequireAuth>} />
        <Route path="/album" element={<RequireAuth><AlbumScreen /></RequireAuth>} />
        <Route path="/decks/:id" element={<RequireAuth><FlashcardScreen /></RequireAuth>} />
        <Route path="/ai" element={<RequireAuth><AIBuddyScreen /></RequireAuth>} />
        <Route path="/kanban" element={<RequireAuth><KanbanScreen /></RequireAuth>} />

        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
