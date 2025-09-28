import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../lib/useAuth";
import { supabase } from "../lib/supabase";
import LogoutButton from "../components/LogoutButton"; // NEW

export default function Wishlist() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);

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

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-gray-900">
      <div className="mx-auto max-w-6xl mt-5 px-4 pb-5">
        <div className="relative">

          {/* Left sidebar */}
          <aside className="absolute left-4 top-6 flex flex-col items-center gap-5 z-30">
            {/* Profile avatar with username underneath */}
            <div className="relative flex flex-col items-center">
              <img
                src={`/images/${profile?.profile_pic_url || "profile1.png"}`}
                alt={profile?.display_name || "Profile"}
                className="w-24 h-24 rounded-full"
                onError={(e) => (e.currentTarget.src = "/images/profile1.png")}
              />
              <p className="mt-2 text-sm font-medium text-gray-700">
                {profile?.display_name
                  ? profile.display_name.toLowerCase()
                  : "user"}
              </p>
            </div>

            {/* Add to wishlist */}
            <button className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition">
              + wishlist
            </button>

            {/* Go to collection */}
            <Link
              to="/profile"
              className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 text-center transition"
            >
              go to collection
            </Link>

            {/* Logout button top-left */}
            <LogoutButton /> {/* NEW */}
          </aside>

          {/* Page title and decorative stickers */}
          <div className="relative w-full max-w-4xl mx-auto mt-2 z-40">
            <div className="flex items-center justify-center gap-1">
              <img
                src="/images/Star.png"
                alt="stars"
                className="h-[120px] pointer-events-none z-20"
              />
              <h2 className="text-center text-xl md:text-2xl font-semibold">
                wishlist
              </h2>
              <img
                src="/images/Star frog.png"
                alt="frog"
                className="h-[120px] pointer-events-none z-20"
              />
            </div>
          </div>

          {/* Shelf area centered and expanding outward */}
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
          </div>

        </div>
      </div>
    </div>
  );
}
