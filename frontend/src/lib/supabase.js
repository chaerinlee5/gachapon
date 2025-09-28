// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Ensure user has a row in profiles
export async function ensureProfileRow() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const meta = user.user_metadata || {};
  const displayName =
    meta.full_name || meta.name || user.email?.split("@")[0] || "New User";
  const avatar = meta.avatar_url || meta.picture || null;

  await supabase.from("profiles").upsert(
    {
      id: user.id,
      display_name: displayName,
      profile_pic_url: avatar,
    },
    { onConflict: "id" }
  );
}
