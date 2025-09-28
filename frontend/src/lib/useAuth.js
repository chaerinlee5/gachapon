import { useEffect, useRef, useState } from "react";
import { supabase, ensureProfileRow } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const ensuredRef = useRef(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);

        // run exactly once when a real sign-in happens
        if (!ensuredRef.current && event === "SIGNED_IN" && session?.user) {
          ensuredRef.current = true;
          ensureProfileRow();
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}
