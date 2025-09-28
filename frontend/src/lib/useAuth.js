import { useEffect, useState } from "react";
import { supabase } from "./supabase";

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
      (event, session) => {
        console.log('Auth event:', event, 'Session:', session?.user ? 'Present' : 'None');
        setUser(session?.user ?? null);
        setLoading(false);

        // Handle successful login
        if (event === "SIGNED_IN" && session?.user) {
          // Don't manipulate history here - let React Router handle it
          // The PublicOnly component will redirect to /feed automatically
          console.log('User signed in, letting router handle redirect');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return { user, loading };
}