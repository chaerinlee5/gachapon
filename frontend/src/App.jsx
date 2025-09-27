// src/App.jsx
import { Link, NavLink } from "react-router-dom";
import AppRoutes from "./routes";

const linkBase = "px-3 py-2 rounded-xl border hover:bg-gray-50";
const active = ({ isActive }) => (isActive ? `${linkBase} bg-white shadow` : linkBase);

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link to="/" className="font-semibold">Gachapon</Link>
          <nav className="flex gap-2">
            <NavLink to="/feed" className={active}>Feed</NavLink>
            <NavLink to="/profile" className={active}>Profile</NavLink>
            <NavLink to="/login" className={active}>Login</NavLink>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <AppRoutes />
      </main>
    </div>
  );
}
