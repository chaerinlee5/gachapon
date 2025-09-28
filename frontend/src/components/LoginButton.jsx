import { supabase } from "../lib/supabase";

export default function LoginButton() {
    const handleLogin = async () => {
        const baseUrl = import.meta.env.BASE_URL; // "/gachapon/" in production
        const redirectUrl = `${window.location.origin}${import.meta.env.BASE_URL}feed`;

        console.log('Redirecting to:', redirectUrl);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: redirectUrl,
            },
        });

        if (error) console.error("Login error:", error.message);
    };

    return (
        <button
            onClick={handleLogin}
            className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 rounded-xl transition"
        >
            <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                aria-hidden="true"
            >
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.72 1.23 9.23 3.64l6.15-6.15C35.9 3.02 30.41 1 24 1 14.64 1 6.55 6.16 2.7 13.65l7.34 5.69C12.05 14.12 17.58 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.5 24c0-1.64-.15-3.21-.44-4.71H24v9.02h12.7c-.55 2.97-2.22 5.49-4.73 7.18l7.28 5.65C43.92 37.6 46.5 31.3 46.5 24z" />
                <path fill="#FBBC05" d="M10.04 19.34l-7.34-5.69C.97 16.74 0 20.26 0 24c0 3.73.97 7.25 2.7 10.35l7.34-5.69C9.38 26.8 9 25.44 9 24s.38-2.8 1.04-4.66z" />
                <path fill="#34A853" d="M24 47c6.41 0 11.82-2.11 15.74-5.77l-7.28-5.65c-2.02 1.36-4.61 2.16-8.46 2.16-6.42 0-11.95-4.62-13.96-10.47l-7.34 5.69C6.55 41.84 14.64 47 24 47z" />
            </svg>
            <span className="text-lg">sign in with Google</span>
        </button>
    );
}