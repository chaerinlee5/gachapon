// routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import FeedPage from "./pages/FeedPage";
import ProfilePage from "./pages/ProfilePage";
import LoginPage from "./pages/LoginPage";

function Protected({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

function PublicOnly({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="p-6">Loading…</div>;
  return user ? <Navigate to="/feed" replace /> : children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/feed"
        element={
          <Protected>
            <FeedPage />
          </Protected>
        }
      />
      <Route
        path="/profile"
        element={
          <Protected>
            <ProfilePage />
          </Protected>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnly>
            <LoginPage />
          </PublicOnly>
        }
      />
    </Routes>
  );
}
