import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Post from "../components/Post";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    (async () => {
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
        return;
      }
      setPosts(data ?? []);
    })();
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      {posts.length ? posts.map(p => <Post key={p.id} post={p} />)
                    : <p className="text-center text-gray-500 mt-10">No posts yet.</p>}
    </div>
  );
}
