import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Post from "../components/Post";
import CreatePost from "../popups/CreatePost";
import leftFeed from "../assets/leftFeed.png";
import rightFeed from "../assets/rightFeed.png";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(`
        id,
        body,
        image_url,
        created_at,
        author:profiles!posts_author_id_fkey (
          id,
          display_name,
          profile_pic_url
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error loading posts:", error.message);
    } else {
      setPosts(data ?? []);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="relative">
      <img
        src={leftFeed}
        alt=""
        aria-hidden="true"
        className="
          hidden lg:block
          fixed left-0 top-12
          h-[calc(100vh-4rem)]
          w-full xl:w-72
          object-contain
          select-none pointer-events-none
          z-0
        "
      />

      <img
        src={rightFeed}
        alt=""
        aria-hidden="true"
        className="
          hidden lg:block
          fixed right-0 top-16
          h-[calc(100vh-4rem)]
          w-full xl:w-72
          object-contain
          select-none pointer-events-none
          z-0
        "
      />

      <div className="relative z-10 max-w-xl mt-5 mx-auto px-4">
        {posts.length ? (
          posts.map((p) => <Post key={p.id} post={p} />)
        ) : (
          <p className="text-center text-gray-500 mt-10">No posts yet.</p>
        )}
      </div>

      <button
        className="fixed bottom-6 right-90 z-20
             bg-gray-400 hover:bg-gray-500 text-white
             rounded-full p-4 shadow-lg transition
             focus:outline-none focus:ring-2 focus:ring-gray-300"
        onClick={() => setShowCreatePost(true)}
        aria-label="Create post"
        title="Create post"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {showCreatePost && (
        <CreatePost
          onClose={() => setShowCreatePost(false)}
          onPostCreated={fetchPosts}
        />
      )}

    </div>
  );
}
