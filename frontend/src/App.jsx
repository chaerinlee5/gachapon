// src/App.jsx
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { useAuth } from "./lib/useAuth";
import { supabase, ensureProfileRow } from "./lib/supabase";
import { useEffect, useState } from "react";
import logo from "./assets/gachaponLogo.png";


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

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const [profile, setProfile] = useState(null);

  const hideHeader = location.pathname === "/login";
  const base = import.meta.env.BASE_URL; // correct base for GitHub Pages

  // fetch profile data when user changes
  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }

    supabase
      .from("profiles")
      .select("display_name, profile_pic_url")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          setProfile(data);
        }
      });
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {!hideHeader && (
        <header className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50">
          <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Centered title */}
            <div className="flex-1 flex justify-center">
              <Link to="/feed" className="flex items-center gap-2">
                <img
                  src={logo}
                  alt="Gachapon Logo"
                  className="h-8 w-auto object-contain"
                />
                <span className="text-lg font-semibold">gachapon</span>
              </Link>
            </div>

            {/* Profile avatar */}
            {profile && (
              <Link to="/profile" className="absolute right-4">
                <img
                  src={
                    profile?.profile_pic_url
                      ? `${base}images/${profile.profile_pic_url}`
                      : `${base}images/profile1.png`
                  }
                  alt={profile?.display_name || "Profile"}
                  className="w-10 h-10 rounded-full shadow-md object-cover hover:opacity-80 transition"
                  onError={(e) =>
                    (e.currentTarget.src = `${base}images/profile1.png`)
                  }
                />
              </Link>
            )}
          </div>
        </header>
      )}

      <main
        className={`mx-auto ${hideHeader ? "" : "pt-16"} max-w px-4 sm:px-6 lg:px-8`}
      >
        <AppRoutes />
      </main>
    </div>
  );
}
