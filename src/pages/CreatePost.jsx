import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CreatePost() {
  const [author, setAuthor] = useState("");
  const [mood, setMood] = useState("Happy");
  const [text, setText] = useState("");
  const [photos, setPhotos] = useState([]); // Array of photo URLs
  const [posts, setPosts] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [editingPost, setEditingPost] = useState(null);

  // Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
      setLoggedInUser(user);
      setAuthor(user.fullName);
    }
  }, []);

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem("userPosts");
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  const updatePosts = (newPosts) => {
    setPosts(newPosts);
    localStorage.setItem("userPosts", JSON.stringify(newPosts));
  };

  const handlePhotoChange = (e) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files).slice(0, 4 - photos.length); // Limit max 4
    const newPhotos = selectedFiles.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  const removePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!author || !text) return alert("Fill all fields!");

    if (editingPost) {
      const newPosts = posts.map((post) =>
        post.id === editingPost.id ? { ...post, mood, text, photos } : post
      );
      updatePosts(newPosts);
      setEditingPost(null);
    } else {
      const newPost = { id: Date.now(), author, mood, text, photos, liked: false, saved: false };
      updatePosts([newPost, ...posts]);
    }

    setText("");
    setPhotos([]);
    setMood("Happy");
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setMood(post.mood);
    setText(post.text);
    setPhotos(post.photos || []);
  };

  const handleDelete = (id) => {
    if (editingPost && editingPost.id === id) setEditingPost(null);
    updatePosts(posts.filter((post) => post.id !== id));
  };

  const toggleLike = (id) => {
    updatePosts(posts.map((post) => (post.id === id ? { ...post, liked: !post.liked } : post)));
  };

  const toggleSave = (id) => {
    updatePosts(posts.map((post) => (post.id === id ? { ...post, saved: !post.saved } : post)));
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({ title: `Post by ${post.author}`, text: post.text, url: window.location.href })
        .catch((err) => console.log("Error sharing:", err));
    } else {
      navigator.clipboard.writeText(post.text);
      alert("Post copied to clipboard!");
    }
  };

  const moods = ["Happy", "Sad", "Motivated", "Chill", "Love"];

  return (
    <motion.div className="max-w-3xl mx-auto p-6">
      <motion.h2 className="text-4xl font-extrabold mb-6 text-center text-purple-600">
        {editingPost ? "Edit Post ✏️" : "Create a Post 📝"}
      </motion.h2>

      {/* Post Form */}
      <motion.form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          value={author}
          readOnly
          className="w-full px-4 py-3 rounded-xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xl"
        />

        <select
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xl"
        >
          {moods.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoChange}
          className="w-full text-sm text-gray-600"
        />

        {/* Photo Preview */}
        {photos.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative w-24 h-24 rounded-xl overflow-hidden border border-purple-300 shadow-2xl"
              >
                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(idx)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </div>
        )}

        <textarea
          placeholder="Write something..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-2xl resize-none h-32"
        />

        <div className="flex space-x-2">
          <button type="submit" className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold rounded-xl shadow-2xl">
            {editingPost ? "Save Changes" : "Post"}
          </button>

          {editingPost && (
            <button
              type="button"
              onClick={() => handleDelete(editingPost.id)}
              className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl shadow-2xl"
            >
              Delete
            </button>
          )}
        </div>
      </motion.form>

      {/* Display Posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            className="bg-purple-50 p-4 rounded-xl shadow-2xl relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {post.photos && post.photos.map((p, i) => (
              <img key={i} src={p} alt="Post" className="w-full rounded-lg mb-2" />
            ))}
            <p className="font-semibold">{post.author} ({post.mood})</p>
            <p>{post.text}</p>

            <div className="flex justify-between mt-3">
              <motion.button
                onClick={() => toggleLike(post.id)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className={`px-3 py-1 rounded-full ${post.liked ? "bg-red-500 text-white" : "bg-red-100 text-red-700"}`}
              >
                ❤️ Like
              </motion.button>

              <motion.button
                onClick={() => toggleSave(post.id)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className={`px-3 py-1 rounded-full ${post.saved ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"}`}
              >
                💾 Save
              </motion.button>

              <motion.button
                onClick={() => handleShare(post)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className="px-3 py-1 rounded-full bg-green-100 text-green-700"
              >
                🔗 Share
              </motion.button>

              <motion.button
                onClick={() => handleEdit(post)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1, rotateY: 10 }}
                className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700"
              >
                ✏️ Edit
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
