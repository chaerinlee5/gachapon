import { useEffect, useState } from "react";
import { supabase, ensureProfileRow } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session (not just user) on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth event:", event, "Session:", session?.user ? "Present" : "None");
        setUser(session?.user ?? null);
        setLoading(false);

        // Create profile row right after login
        if (event === "SIGNED_IN" && session?.user) {
          await ensureProfileRow();
          console.log("Profile row ensured for user:", session.user.id);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
