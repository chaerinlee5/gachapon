import { Link, NavLink } from "react-router-dom";
import AppRoutes from "./routes";
import { useAuth } from "./lib/useAuth";
import LogoutButton from "./components/LogoutButton";

const linkBase = "px-3 py-2 rounded-xl border hover:bg-gray-50";
const active = ({ isActive }) => (isActive ? `${linkBase} bg-white shadow` : linkBase);

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">Gachapon</Link>
          <nav className="flex gap-2 mr-auto">
            <NavLink to="/feed" className={active}>Feed</NavLink>
            <NavLink to="/profile" className={active}>Profile</NavLink>
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">
                {user.user_metadata?.full_name || user.email}
              </span>
              <LogoutButton />
            </div>
          ) : (
            <NavLink to="/login" className={active}>Login</NavLink>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <AppRoutes />
      </main>
    </div>
  );
}
