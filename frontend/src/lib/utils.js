import { supabase } from "./supabase";

export function safeImage(url) {
  if (!url) return "/default-avatar.png"; // local fallback

  // If it's already a full URL (Google, GitHub, etc.)
  if (url.startsWith("http")) return url;

  // Otherwise assume it's a Supabase Storage path
  return supabase.storage.from("avatars").getPublicUrl(url).data.publicUrl;
}
