import { useEffect, useState } from "react";
import { supabase } from "./supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get current session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event, 'User:', session?.user ? 'Present' : 'None');
        setUser(session?.user ?? null);
        setLoading(false);

        if (event === "SIGNED_IN") {
          console.log('User signed in successfully!');
          // Profile should be auto-created by database trigger
          // No need to manually call ensureProfileRow anymore
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}