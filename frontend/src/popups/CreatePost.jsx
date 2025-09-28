import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../lib/useAuth";
import { ArrowUpIcon, XMarkIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";

const CreatePost = ({ onClose, onPostCreated }) => {
    const { user } = useAuth();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [body, setBody] = useState("");

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setPreview(URL.createObjectURL(selected));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return;

        let imageUrl = null;

        if (file) {
            const { data, error } = await supabase.storage
                .from("post-images")
                .upload(`posts/${Date.now()}-${file.name}`, file);

            if (error) {
                console.error("Upload error:", error.message);
                return;
            }

            if (data) {
                const { data: urlData } = supabase.storage
                    .from("post-images")
                    .getPublicUrl(data.path);

                imageUrl = urlData.publicUrl;
            }
        }

        const { error: insertError } = await supabase.from("posts").insert({
            author_id: user.id,
            body,
            image_url: imageUrl,
        });

        if (insertError) {
            console.error("Error inserting post:", insertError.message);
        } else {
            onPostCreated?.();
            onClose?.();
        }
    };

    // Escape key closes popup
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose?.();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />

            <div className="relative flex flex-col bg-white max-w-lg p-4 mx-auto mt-24 rounded-2xl shadow">
                <div className="flex flex-row items-center justify-between">
                    <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
                        <XMarkIcon className="w-8 h-8" />
                    </button>

                    <h1 className="text-lg font-semibold">create a post</h1>

                    <button
                        type="submit"
                        form="create-post-form"
                        className="p-1 rounded hover:bg-gray-100"
                    >
                        <ArrowUpIcon className="w-8 h-8" />
                    </button>
                </div>

                <form id="create-post-form" onSubmit={handleSubmit} className="p-4 space-y-4">
                    <label
                        htmlFor="file-upload"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    >
                        {preview ? (
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-contain rounded"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center text-gray-600">
                                <ArrowUpTrayIcon className="w-12 h-12 mb-2" />
                                <p className="text-base">upload image</p>
                            </div>
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </label>

                    <textarea
                        className="w-full p-2 border border-gray-200 rounded"
                        rows={1}
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="add caption..."
                    />
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
