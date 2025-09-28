import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { itemImageMap } from "../lib/itemImages";
import AddToCollection from "../components/AddToCollection";
import LogoutButton from "../components/LogoutButton";
import ProfileImage from "../components/ProfileImage";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [collectionItems, setCollectionItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // 🔹 Define fetchCollection once, reuse it
  const fetchCollection = useCallback(async () => {
    if (!user) return;

    console.log("Fetching collection for:", user.id);
    const { data, error } = await supabase
      .from("user_items")
      .select(`
        id,
        created_at,
        item:items (
          id,
          name,
          brand,
          series,
          image_key
        )
      `)
      .eq("owner_id", user.id);

    if (error) {
      console.error("Error fetching collection:", error.message);
    } else {
      setCollectionItems(data || []);
    }
  }, [user]);

  // Fetch profile
  useEffect(() => {
    if (!user) return;

    supabase
      .from("profiles")
      .select("display_name, profile_pic_url")
      .eq("id", user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching profile:", error.message);
        } else {
          setProfile(data);
        }
      });
  }, [user]);

  // Fetch collection initially
  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <div className="mx-auto max-w-6xl px-4 pb-5">
        <div className="relative">
          {/* Left sidebar */}
          <aside className="absolute left-4 top-6 flex flex-col items-center gap-5 z-30">
            <div className="relative">
              <ProfileImage />
              <p className="text-sm font-medium text-gray-700">
                {profile?.display_name
                  ? profile.display_name.toLowerCase()
                  : "user"}
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition"
            >
              + collection
            </button>

            <Link
              to="/wishlist"
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 text-center transition"
            >
              go to wishlist
            </Link>

            <LogoutButton />
          </aside>

          {/* Page title */}
          <div className="relative w-full max-w-4xl mx-auto z-40">
            <div className="flex items-center justify-center gap-1">
              <img src="/images/Star.png" alt="stars" className="h-[120px]" />
              <h2 className="text-center text-xl md:text-2xl font-semibold">
                collection
              </h2>
              <img src="/images/Star frog.png" alt="frog" className="h-[120px]" />
            </div>
          </div>

          {/* Shelf area */}
          <div className="relative z-0 -mt-48 flex justify-center">
            <img
              src="/images/Shelf.png"
              alt="wooden shelf"
              className="w-[900px] max-w-full relative pointer-events-none z-0"
            />

            <div className="absolute inset-0 px-56 py-70 grid grid-cols-4">
              {collectionItems.map((c) => {
                const item = c.item;
                const key = item.image_key.replace(".png", "");
                const imgSrc = itemImageMap[key] || "/images/fallback.png";
                return (
                  <div key={c.id} className="flex flex-col items-center">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-32 h-32 object-contain"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AddToCollection modal */}
      <AddToCollection
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchCollection(); // 🔹 refresh after modal closes
        }}
      />
    </div>
  );
}
