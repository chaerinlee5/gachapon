import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import App from "./App";
import { supabase, ensureProfileRow } from "./lib/supabase";


export function AppWrapper() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (user) {
      // 🔹 ensure row exists for new users
      ensureProfileRow();

      if (location.pathname === "/login") {
        navigate("/feed", { replace: true });
      }
    } else if (!user && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [user, loading, location.pathname, navigate]);

  return <App />;
}