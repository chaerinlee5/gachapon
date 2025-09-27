import { supabase } from "../lib/supabase";

function LoginButton() {
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    });

    if (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      <img
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        alt="Google logo"
        className="w-5 h-5"
      />
      <span>Sign in with Google</span>
    </button>
  );
}

export default LoginButton;
