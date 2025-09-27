const Post = ({ post }) => {
  const a = post.author ?? {};

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <img
          src={a.profile_pic_url || "/default-avatar.png"}
          alt={a.display_name || "User avatar"}
          className="w-10 h-10 rounded-full"
        />
        <span className="font-semibold">{a.display_name || "Anonymous"}</span>
      </div>

      {post.body && <p className="mt-3">{post.body}</p>}
      {post.image_url && <img src={post.image_url} alt="" className="mt-3 rounded-lg" />}
    </div>
  );
};

export default Post;
