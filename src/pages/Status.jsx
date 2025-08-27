import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CreatePost from "./CreatePost";

// Sample posts and status
const postsData = { /* aapka existing postsData */ };

export default function Home() {
  const [mood, setMood] = useState("Happy");
  const [darkMode, setDarkMode] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [statuses, setStatuses] = useState([]); // All users' status
  const [userStatus, setUserStatus] = useState(""); // Current user status

  // Load logged-in user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) setLoggedInUser(user);
  }, []);

  // Add/update user status
  const handleAddStatus = () => {
    if (!userStatus.trim()) return alert("Enter your status!");
    const existingIndex = statuses.findIndex(s => s.author === loggedInUser.fullName);
    if (existingIndex >= 0) {
      const newStatuses = [...statuses];
      newStatuses[existingIndex].text = userStatus;
      setStatuses(newStatuses);
    } else {
      setStatuses([{ author: loggedInUser.fullName, text: userStatus }, ...statuses]);
    }
    setUserStatus("");
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="fixed inset-0 -z-10 bg-gradient-to-r from-purple-200 via-pink-200 to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 animate-pulse"></div>
      
      <div className="p-6 max-w-4xl mx-auto min-h-screen">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-8 text-purple-600 dark:text-pink-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Choose Your Mood 🎭
        </motion.h2>

        {/* Mood Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.keys(postsData).map((m) => (
            <motion.button
              key={m}
              onClick={() => setMood(m)}
              className={`px-6 py-3 font-semibold rounded-full text-white shadow-lg ${
                mood === m
                  ? "bg-gradient-to-r from-purple-600 to-pink-500"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-700 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              }`}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {m}
            </motion.button>
          ))}
        </div>

        {/* Status / Story Section */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Status / Stories</h3>
          <div className="flex overflow-x-auto gap-4 p-2">
            {/* Logged-in user status input */}
            {loggedInUser && (
              <div className="flex-none w-40 p-2 bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col items-center">
                <input
                  type="text"
                  placeholder="Your status..."
                  value={userStatus}
                  onChange={(e) => setUserStatus(e.target.value)}
                  className="w-full p-2 rounded-xl border focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={handleAddStatus}
                  className="w-full py-1 bg-purple-600 text-white rounded-xl text-sm font-semibold hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
            )}

            {/* Other users' status */}
            {statuses
              .filter(s => !loggedInUser || s.author !== loggedInUser.fullName)
              .map((s, i) => (
                <div
                  key={i}
                  className="flex-none w-40 p-4 bg-purple-50 dark:bg-gray-700 rounded-2xl shadow-md flex flex-col items-center"
                >
                  <p className="text-sm text-center dark:text-white">{s.text}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-300 mt-2">— {s.author}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Posts Feed */}
        <motion.div
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {postsData[mood].map((post) => (
            <motion.div
              key={post.id}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-3xl p-6 mb-6 cursor-pointer border border-purple-200 dark:border-gray-700"
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <p className="text-lg font-semibold mb-2 dark:text-white">{post.text}</p>
              <p className="text-sm text-gray-500 mb-4 dark:text-gray-300">— {post.author}</p>
              <div className="flex justify-between mt-2 text-gray-600 dark:text-gray-400">
                <button className="px-3 py-1 rounded-full bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-700 transition duration-300">❤️ Like</button>
                <button className="px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 dark:hover:bg-blue-700 transition duration-300">💾 Save</button>
                <button className="px-3 py-1 rounded-full bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-700 transition duration-300">🔗 Share</button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Create Post Component */}
        <CreatePost />
      </div>
    </div>
  );
}
