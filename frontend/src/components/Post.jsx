import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { HeartIcon as OutlineHeart } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeart } from "@heroicons/react/24/solid";

import Washi0 from "../assets/washi_tape/washi1.png";
import Washi1 from "../assets/washi_tape/washi2.png";
import Washi2 from "../assets/washi_tape/washi3.png";

const Post = ({ post }) => {
  const a = post.author ?? {};
  const { user } = useAuth();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [washiTape, setWashiTape] = useState(null);

  // choose tape once when component mounts
  useEffect(() => {
    const tapes = [Washi0, Washi1, Washi2];
    const randomIndex = Math.floor(Math.random() * tapes.length);
    setWashiTape(tapes[randomIndex]);
  }, []);

  // fetching likes
  useEffect(() => {
    if (!user) return;

    const fetchLikes = async () => {
      const { count } = await supabase
        .from("post_likes")
        .select("*", { count: "exact", head: true })
        .eq("post_id", post.id);

      setLikeCount(count || 0);

      const { data: myLike } = await supabase
        .from("post_likes")
        .select("post_id")
        .eq("post_id", post.id)
        .eq("user_id", user.id)
        .maybeSingle();

      setLiked(!!myLike);
    };

    fetchLikes();
  }, [post.id, user]);

  const handleLike = async () => {
    if (!user) return;

    if (liked) {
      await supabase
        .from("post_likes")
        .delete()
        .eq("post_id", post.id)
        .eq("user_id", user.id);

      setLiked(false);
      setLikeCount((c) => Math.max(c - 1, 0));
    } else {
      await supabase.from("post_likes").insert([
        {
          post_id: post.id,
          user_id: user.id,
        },
      ]);

      setLiked(true);
      setLikeCount((c) => c + 1);
    }
  };

  return (
    <div className="relative p-4 mb-6">
      {/* Washi tape */}
      {washiTape && (
        <img
          src={washiTape}
          alt="Washi tape"
          className="absolute top-4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 rotate-[-6deg] pointer-events-none"
        />
      )}

      <div className="bg-white shadow overflow-hidden">
        <div className="flex items-center gap-3 p-4">
          <img
            src={a.profile_pic_url || "/avatar.png"}
            alt={a.display_name || "User avatar"}
            className="w-10 h-10 shadow-lg rounded-full"
          />
          <span className="font-semibold">{a.display_name || "Anonymous"}</span>
        </div>

        {post.image_url && (
          <img src={post.image_url} alt="" className="w-full object-cover" />
        )}

        <div className="flex flex-row justify-between items-center p-4">
          {post.body && <p>{post.body}</p>}
          <div
            onClick={handleLike}
            className="flex items-center gap-2 cursor-pointer"
          >
            {liked ? (
              <SolidHeart className="w-6 h-6 text-red-500" />
            ) : (
              <OutlineHeart className="w-6 h-6 text-gray-500 hover:text-red-500" />
            )}
            <span className="text-sm text-gray-600">{likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
