// mapping between keys and images
const profileMap = {
  profile1,
  profile2,
  profile3,
  profile4,
  profile5,
  profile6,
  profile7,
  profile8,
};

const profileOptions = Object.keys(profileMap);

const ProfileImage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("profile1"); // default key

  const handleSave = async (key) => {
    setSelectedImage(key);
    setShowPopup(false);

    const { error } = await supabase
      .from("profiles")
      .update({ profile_pic_url: key }) // store just the string
      .eq("id", "USER_ID");

    if (error) console.error(error);
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>
        <img
          src={profileMap[selectedImage]}
          alt="Profile"
          className="w-24 h-24 rounded-full border shadow"
        />
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Choose your avatar</h2>
            <div className="grid grid-cols-4 gap-4">
              {profileOptions.map((key) => (
                <button key={key} onClick={() => handleSave(key)}>
                  <img
                    src={profileMap[key]}
                    alt={key}
                    className="w-16 h-16 rounded-full border hover:scale-110 transition"
                  />
                </button>
              ))}
            </div>
            <button
              className="mt-4 px-4 py-2 bg-gray-200 rounded"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};