import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { itemImageMap } from "../lib/itemImages";
import LogoutButton from "../components/LogoutButton";
import AddToWishlist from "../components/AddToWishlist";

export default function Wishlist() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("user_items_wishlist")
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
      console.error("Error fetching wishlist:", error.message);
    } else {
      setWishlistItems(data || []);
    }
  }, [user]);

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

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  const base = import.meta.env.BASE_URL;

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <div className="mx-auto max-w-6xl px-4 pb-5">
        <div className="relative">
          {/* Sidebar */}
          <aside className="absolute left-4 top-6 flex flex-col items-center gap-5 z-30">
            <div className="relative flex flex-col items-center">
              <img
                src={`${base}images/${profile?.profile_pic_url || "profile1.png"}`}
                alt={profile?.display_name || "Profile"}
                className="w-24 h-24 rounded-full"
                onError={(e) => (e.currentTarget.src = `${base}images/profile1.png`)}
              />
              <p className="mt-2 text-sm font-medium text-gray-700">
                {profile?.display_name
                  ? profile.display_name.toLowerCase()
                  : "user"}
              </p>
            </div>

            <button
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition"
              onClick={() => setShowModal(true)}
            >
              + wishlist
            </button>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 text-center transition"
            >
              go to collection
            </Link>
            <LogoutButton />
          </aside>

          {/* Title */}
          <div className="relative w-full max-w-4xl mx-auto mt-2 z-40">
            <div className="flex items-center justify-center gap-1">
              <img src={`${base}images/Star.png`} alt="stars" className="h-[120px]" />
              <h2 className="text-center text-xl md:text-2xl font-semibold">
                wishlist
              </h2>
              <img src={`${base}images/Star frog.png`} alt="frog" className="h-[120px]" />
            </div>
          </div>

          {/* Shelf */}
          <div className="relative z-0 -mt-48 flex justify-center">
            <img
              src={`${base}images/Shelf.png`}
              alt="wooden shelf"
              className="w-[900px] max-w-full relative pointer-events-none z-0"
            />
            <img
              src={`${base}images/Green bow.png`}
              alt="ribbon"
              className="absolute left-[18%] top-[17%] h-27 rotate-6 pointer-events-none z-0"
            />
            <img
              src={`${base}images/Pink flower.png`}
              alt="flower"
              className="absolute right-[13%] top-[13%] h-50 rotate-6 pointer-events-none z-0"
            />

            {/* Items */}
            <div className="absolute inset-0 px-56 py-70 grid grid-cols-4">
              {wishlistItems.map((w) => {
                const item = w.item;
                const key = item.image_key.replace(".png", "");
                const imgSrc = itemImageMap[key] || `${base}images/fallback.png`;
                return (
                  <div key={w.id} className="flex flex-col items-center">
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

      <AddToWishlist
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          fetchWishlist();
        }}
      />
    </div>
  );
}
