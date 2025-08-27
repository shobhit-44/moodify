import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Profile() {
  // Load user from localStorage or default dummy
  const storedUser = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const storedProfile = JSON.parse(localStorage.getItem("profileData")) || {};

  const [user, setUser] = useState({
    name: storedUser.fullName || "User Name",
    email: storedUser.email || "userMail.com",
    username: storedUser.username || "@moodify",
    bio: storedProfile.bio || "Web Developer | React Enthusiast | Mood lover 😎",
    gender: storedProfile.gender || "",
    instagram: storedProfile.instagram || "",
    joined: storedUser.joined || "August 2025",
    followers: storedProfile.followers || 120,
    following: storedProfile.following || 80,
    savedPosts: storedProfile.savedPosts || [
      { id: 1, mood: "Happy", text: "Smile more, worry less! 😄" },
      { id: 2, mood: "Love", text: "Love yourself first ❤️" },
    ],
  });

  const [editMode, setEditMode] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(user));
    alert("Profile updated successfully!");
    setEditMode(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <motion.div
        className="bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl rounded-3xl p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        <motion.div
          className="w-24 h-24 rounded-full bg-white text-purple-600 flex items-center justify-center text-4xl font-bold"
          whileHover={{ scale: 1.2, rotateY: 360 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {user.name[0]}
        </motion.div>
        <div className="w-full">
          {editMode ? (
            <div className="space-y-2">
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Username"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                placeholder="Gender"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <input
                type="text"
                name="instagram"
                value={user.instagram}
                onChange={handleChange}
                placeholder="Instagram"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="w-full px-3 py-2 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
              />
              <button
                onClick={handleSave}
                className="mt-2 bg-purple-600 py-2 px-4 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition transform"
              >
                Save
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold">{user.name}</h2>
              <p className="text-sm">{user.username}</p>
              <p className="mt-2">{user.bio}</p>
              <div className="mt-3 flex flex-wrap space-x-4 text-sm">
                {user.gender && <span>Gender: {user.gender}</span>}
                {user.instagram && <span>Instagram: {user.instagram}</span>}
                <span>Followers: {user.followers}</span>
                <span>Following: {user.following}</span>
              </div>
              <p className="text-sm mt-2">Joined: {user.joined}</p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-3 bg-purple-600 py-2 px-4 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition transform"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Saved Posts */}
      <h3 className="text-2xl font-bold mt-10 mb-6 text-purple-600">
        Saved Posts 📌
      </h3>
      <motion.div
        className="grid grid-cols-1 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {user.savedPosts.length > 0 ? (
          user.savedPosts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-3xl shadow-2xl border border-purple-200 cursor-pointer"
              whileHover={{
                scale: 1.05,
                rotateX: 5,
                rotateY: 5,
                boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h4 className="text-lg font-semibold mb-2">{post.mood} Mood</h4>
              <p className="text-gray-700">{post.text}</p>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">No saved posts yet.</p>
        )}
      </motion.div>
      {/* ===== Your Posts Section ===== */}
<h3 className="text-2xl font-bold mt-10 mb-6 text-purple-600">
  Your Posts ✨
</h3>
<motion.div
  className="grid grid-cols-1 gap-6"
  initial="hidden"
  animate="visible"
  variants={{
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  }}
>
  {(() => {
    const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const filteredPosts = userPosts.filter(p => p.author === user.name);
    return filteredPosts.length > 0 ? (
      filteredPosts.map((post) => (
        <motion.div
          key={post.id}
          className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-3xl shadow-2xl border border-purple-200 cursor-pointer"
          whileHover={{
            scale: 1.05,
            rotateX: 5,
            rotateY: 5,
            boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
          }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <h4 className="text-lg font-semibold mb-2">{post.mood} Mood</h4>

          {/* Photos */}
          {post.photos && post.photos.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={photo}
                  alt={`Post ${idx}`}
                  className="w-24 h-24 object-cover rounded-xl border border-purple-300"
                />
              ))}
            </div>
          )}

          <p className="text-gray-700">{post.text}</p>
        </motion.div>
      ))
    ) : (
      <p className="text-gray-500">You haven't posted anything yet.</p>
    );
  })()}
</motion.div>

    </div>
  );
}
