import { supabase } from "../lib/supbase";

function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) console.error("Login error:", error.message);
  };

  return (
    <button onClick={handleLogin} className="px-4 py-2 bg-indigo-600 text-white rounded">
      Sign in with Google
    </button>
  );
}

export default LoginButton;
