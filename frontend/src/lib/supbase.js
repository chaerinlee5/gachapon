// frontend/src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

// These values come from frontend/.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
