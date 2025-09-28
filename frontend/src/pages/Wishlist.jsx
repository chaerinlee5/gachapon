import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { itemImageMap } from "../lib/itemImages";
import AddToWishlist from "../components/AddToWishlist";

export default function Wishlist() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
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

  // Fetch wishlist
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      console.log("Fetching wishlist for:", user.id);
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
    };

    fetchWishlist();
  }, [user]);

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <div className="mx-auto max-w-6xl mt-5 px-4 pb-5">
        <div className="relative">
          {/* Left sidebar */}
          <aside className="absolute left-4 top-6 flex flex-col items-center gap-5 z-30">
            <img
              src={`/images/${profile?.profile_pic_url || "profile1.png"}`}
              alt={profile?.display_name || "Profile"}
              className="w-24 h-24 rounded-full"
              onError={(e) => (e.currentTarget.src = "/images/profile1.png")}
            />

            <button className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition"
            onClick={()=> setShowModal(true)}>
              + wishlist
            </button>
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 text-center transition"
            >
              go to collection
            </Link>
          </aside>

          <div className="relative w-full max-w-4xl mx-auto mt-2">
            <h2 className="text-center text-xl md:text-2xl font-semibold z-10">
              user’s wishlist
            </h2>

            <img
              src="/images/Star.png"
              alt="stars"
              className="absolute left-65 top-1/2 -translate-y-1/2 h-[150px]"
            />
            <img
              src="/images/Star frog.png"
              alt="frog"
              className="absolute right-65 top-1/2 -translate-y-1/2 h-[150px]"
            />
          </div>

          {/* Shelf area */}
          <div className="relative z-10 -mt-38 flex justify-center">
            <img
              src="/images/Shelf.png"
              alt="wooden shelf"
              className="w-[900px] max-w-full relative z-0"
            />
            <img
              src="/images/Green bow.png"
              alt="ribbon"
              className="absolute left-[18%] top-[17%] h-27 rotate-6 z-100 pointer-events-none"
            />
            <img
              src="/images/Pink flower.png"
              alt="flower"
              className="absolute right-[13%] top-[13%] h-50 rotate-6 z-100 pointer-events-none"
            />

            {/* Items grid overlay */}
            <div className="absolute inset-0 px-56 py-64 grid grid-cols-4">
              {wishlistItems.map((w) => {
                const item = w.item;
                const key = item.image_key.replace(".png", "");
                const imgSrc = itemImageMap[key] || "/images/fallback.png";
                return (
                  <div key={w.id} className="flex flex-col items-center">
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
          <AddToWishlist isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
   
  );
}
