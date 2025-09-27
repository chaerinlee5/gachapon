import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import AppRoutes from "./routes";
import { useAuth } from "./lib/useAuth";
import LogoutButton from "./components/LogoutButton";

const linkBase = "px-3 py-2 rounded-xl border hover:bg-gray-50";
const active = ({ isActive }) => (isActive ? `${linkBase} bg-white shadow` : linkBase);

function AppWrapper() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && user && location.pathname === "/login") {
      navigate("/feed");
    }
  }, [user, loading, location, navigate]);

  return <App />;
}

export default function App() {
  const { user } = useAuth();
  const location = useLocation();
  const hideHeader = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-[#F6F6F6]">
      {!hideHeader && (
        <header className="fixed top-0 left-0 w-full bg-white p-4 shadow-md z-50">
          <div className="max-w mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex-1 flex justify-center">
              <Link to="/feed" className="text-lg">
                gachapon
              </Link>
            </div>

            {user && (
              <Link to="/profile" className="absolute right-4">
                <img
                  src={user.user_metadata?.avatar_url || "/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover hover:opacity-80 transition"
                />
              </Link>
            )}
          </div>
        </header>

      )
      }

      <main className={`mx-auto ${hideHeader ? "" : "pt-16"} max-w px-4 sm:px-6 lg:px-8`}>
        <AppRoutes />
      </main>
    </div >
  );
}
