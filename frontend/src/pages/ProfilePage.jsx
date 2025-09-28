import LogoutButton from "../components/LogoutButton";
import ProfileImage from "../components/ProfileImage";

const ProfilePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <ProfileImage />
      <LogoutButton />
    </div>
  );
};

export default ProfilePage;