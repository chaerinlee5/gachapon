import { Routes, Route } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
