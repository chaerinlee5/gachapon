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

  // already exists? do nothing
  const { data: existing, error: selErr } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  // ignore "no rows" error; anything else is real
  if (selErr && selErr.code !== "PGRST116") {
    console.error("profiles select error:", selErr.message);
    return;
  }
  if (existing) return;

  // insert only id + display_name (let DB default fill profile_pic_url)
  const meta = user.user_metadata || {};
  const displayName =
    meta.full_name || meta.name || user.email?.split("@")[0] || "New User";

  const { error: insErr } = await supabase
    .from("profiles")
    .insert({ id: user.id, display_name: displayName });

  if (insErr) console.error("profiles insert error:", insErr.message);
}
