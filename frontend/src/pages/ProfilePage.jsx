import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { itemImageMap } from "../lib/itemImages";
import AddToCollection from "../components/AddToCollection";
import LogoutButton from "../components/LogoutButton";

export default function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [collectionItems, setCollectionItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  // Fetch collection
  useEffect(() => {
    if (!user) return;

    const fetchCollection = async () => {
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
    };

    fetchCollection();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <div className="mx-auto max-w-6xl mt-5 px-4 pb-5">
        <div className="relative">
          {/* Left sidebar */}
          <aside className="absolute left-4 top-6 flex flex-col items-center gap-5 z-30">
            {/* Profile avatar with overlayed username */}
            <div className="relative">
              <ProfileImage />
              <p className="text-sm font-medium text-gray-700">
              {profile?.display_name
                ? profile.display_name.toLowerCase()
                : "user"}
            </p>
            </div>

            {/* Open AddToCollection modal */}
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition"
            >
              + collection
            </button>

            {/* Go to wishlist */}
            <Link
              to="/wishlist"
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 text-center transition"
            >
              go to wishlist
            </Link>

            <LogoutButton />
          </aside>

          {/* Page title with stickers */}
<div className="relative w-full max-w-4xl mx-auto mt-2 z-40">
  <div className="flex items-center justify-center gap-1">
    {/* Left sticker */}
    <img
      src="/images/Star.png"
      alt="stars"
      className="h-[120px] pointer-events-none z-20"
    />

    {/* Title */}
    <h2 className="text-center text-xl md:text-2xl font-semibold">
      collection
    </h2>

    {/* Right sticker */}
    <img
      src="/images/Star frog.png"
      alt="frog"
      className="h-[120px] pointer-events-none z-20"
    />
  </div>
</div>

          {/* Shelf area */}
          <div className="relative z-0 -mt-38 flex justify-center">
            <img
              src="/images/Shelf.png"
              alt="wooden shelf"
              className="w-[900px] max-w-full relative pointer-events-none z-0"
            />
            <img
              src="/images/Green bow.png"
              alt="ribbon"
              className="absolute left-[18%] top-[17%] h-27 rotate-6 pointer-events-none z-0"
            />
            <img
              src="/images/Pink flower.png"
              alt="flower"
              className="absolute right-[13%] top-[13%] h-50 rotate-6 pointer-events-none z-0"
            />

            {/* Items grid overlay */}
            <div className="absolute inset-0 px-56 py-64 grid grid-cols-4">
              {collectionItems.map((c) => {
                const item = c.item;
                const key = item.image_key.replace(".png", "");
                const imgSrc = itemImageMap[key] || "/images/fallback.png";
                return (
                  <div key={c.id} className="flex flex-col items-center">
                    <img
                      src={imgSrc}
                      alt={item.name}
                      className="w-32 h-32 object-contain m-0 p-0 block"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AddToCollection modal */}
      <AddToCollection isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
