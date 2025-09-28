import LogoutButton from "../components/LogoutButton";
import ProfileImage from "../components/ProfileImage";
import { Link } from "react-router-dom";   // 👈 import Link

const ProfilePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileImage />

      <div className="mt-4 flex flex-col gap-3">
        <Link
          to="/wishlist"
          className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition"
        >
          Go to Wishlist
        </Link>

        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfilePage;