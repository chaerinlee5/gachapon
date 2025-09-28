import React from "react";
import { Link } from "react-router-dom";

export default function Wishlist() {
    return (
        <div className="min-h-screen bg-[#F3F4F6] text-gray-900">

            {/* Content */}
            <div className="mx-auto max-w-6xl mt-5 px-4 pb-5">
                <div className="relative">

                    {/* Left sidebar */}
                    <aside className="absolute -left-10 top-6 hidden md:flex md:flex-col md:items-center gap-5">
                        <img
                            src={`/images/${user.profile_pic_url || "profile1.png"}`}
                            alt="Profile"
                            className="w-8 h-8 rounded-full"
                            onError={(e) => (e.currentTarget.src = "/images/profile1.png")}
                        />
                        <button className="px-4 py-2 rounded-xl bg-white shadow hover:bg-gray-50 transition">
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
                        {/* Shelf image */}
                        <img
                            src="/images/Shelf.png"
                            alt="wooden shelf"
                            className="w-[900px] max-w-full relative z-0"
                        />

                        {/* Decorative stickers pinned to shelf */}
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
                    </div>
                </div>
            </div>
        </div>
    );
}