// src/lib/useAuth.js
import { useEffect, useState } from "react";
import { supabase, ensureProfileRow } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // initial fetch
    supabase.auth.getUser().then(({ data, error }) => {
      console.log("getUser result:", data, error);
      setUser(data?.user ?? null);
      setLoading(false);
      if (data?.user) {
        console.log("Running ensureProfileRow for initial user:", data.user.id);
        ensureProfileRow();
      }
    });

    // subscribe to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth event:", event, "Session:", session);
      setUser(session?.user ?? null);
      if (session?.user) {
        console.log("Running ensureProfileRow for:", session.user.id);
        ensureProfileRow();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
