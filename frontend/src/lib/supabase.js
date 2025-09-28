// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      detectSessionInUrl: true, // parses #access_token after OAuth redirect
      flowType: "pkce",
    },
  }
);
export async function ensureProfileRow() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const meta = user.user_metadata || {};
  const displayName =
    meta.full_name || meta.name || user.email?.split("@")[0] || "New User";
  const avatar = meta.avatar_url || meta.picture || null;

  const { error } = await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        display_name: displayName,
        profile_pic_url: avatar,
      },
      { onConflict: "id" }
    )
    .throwOnError();

  if (error) console.error("Upsert failed:", error.message);
}
