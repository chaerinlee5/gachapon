import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get current user once on mount
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    // subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);

        // ✅ clean URL after login (removes #access_token from hash)
        if (event === "SIGNED_IN") {
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    );

    // cleanup subscription on unmount
    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
