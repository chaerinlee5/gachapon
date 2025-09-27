import { supabase } from "../lib/supabase";

export default function LogoutButton() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/"; // optional: force refresh to clear state
  };
  return (
    <button className="px-3 py-2 rounded-xl border hover:bg-gray-50" onClick={handleLogout}>
      Logout
    </button>
  );
}
