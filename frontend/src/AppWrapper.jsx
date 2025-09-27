import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./lib/useAuth";
import App from "./App";

export default function AppWrapper() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If logged in and on /login, send to /feed
    if (!loading && user && location.pathname === "/login") {
      navigate("/feed", { replace: true });
    }
  }, [user, loading, location, navigate]);

  return <App />;
}
