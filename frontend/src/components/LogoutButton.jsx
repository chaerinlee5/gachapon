import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error.message);
        return;
      }
      
      console.log("User logged out successfully");
      
      // Use React Router navigation instead of window.location
      // This respects the base path configuration
      navigate("/login", { replace: true });
      
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  return (
    <button 
      className="px-3 py-2 rounded-xl border hover:bg-gray-50 transition-colors" 
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}