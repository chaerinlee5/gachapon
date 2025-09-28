import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase } from "../lib/supabase";

// List of available profile images
const profileOptions = [
  "profile1.png",
  "profile2.png",
  "profile3.png",
  "profile4.png",
  "profile5.png",
  "profile6.png",
  "profile7.png",
  "profile8.png",
];

function ModalPortal({ children }) {
  if (typeof document === "undefined") return null;
  return createPortal(children, document.body);
}

const ProfileImage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("profile1.png"); // fallback

  // Load current user's profile image from Supabase
  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("profile_pic_url")
        .eq("id", user.id)
        .single();

      if (!error && data?.profile_pic_url) {
        setSelectedImage(data.profile_pic_url);
      }
    };

    loadProfile();
  }, []);

  // Save a new avatar selection to Supabase
  const handleSave = async (filename) => {
    setSelectedImage(filename);
    setShowPopup(false);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return;

    const { error } = await supabase
      .from("profiles")
      .update({ profile_pic_url: filename })
      .eq("id", user.id);

    if (error) console.error("Error updating profile:", error.message);
  };

  // Lock body scroll while modal is open
  useEffect(() => {
    if (!showPopup) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [showPopup]);

  return (
    <div>
      {/* Profile Image Button */}
      <button onClick={() => setShowPopup(true)}>
        <img
          src={`/images/${selectedImage}`}
          alt="Profile"
          className="w-24 h-24 rounded-full border shadow"
        />
      </button>

      {/* Popup Modal via portal (escapes parent z-index) */}
      {showPopup && (
        <ModalPortal>
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-[1000]"
            role="dialog"
            aria-modal="true"
            onClick={() => setShowPopup(false)} // click backdrop to close
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg z-[1001]"
              onClick={(e) => e.stopPropagation()} // prevent backdrop close on inner clicks
            >
              <h2 className="text-lg font-semibold mb-4">Choose your avatar</h2>
              <div className="grid grid-cols-4 gap-4">
                {profileOptions.map((filename) => (
                  <button key={filename} onClick={() => handleSave(filename)}>
                    <img
                      src={`/images/${filename}`}
                      alt={filename}
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
        </ModalPortal>
      )}
    </div>
  );
};

export default ProfileImage;
