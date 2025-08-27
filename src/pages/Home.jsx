import { useState } from "react";
import { motion } from "framer-motion";
import CreatePost from "./CreatePost";


const postsData = { Happy: [
    { id: 1, text: "🌞 Smile more, stress less!", author: "Shobhit" },
    { id: 2, text: "🎶 Dance like nobody’s watching!", author: "Anjali" },
    { id: 3, text: "🍦 Treat yourself today!", author: "Ravi" },
    
  ],
  Sad: [
    { id: 11, text: "💔 It's okay to not be okay.", author: "Ravi" },
    { id: 12, text: "🌧 Tough times don’t last.", author: "Aman" },
    { id: 13, text: "😢 Tears are words the heart can’t say.", author: "Shobhit" },
    { id: 14, text: "🖤 Let it out, don’t bottle up.", author: "Neha" },
    { id: 15, text: "🌙 Dark nights make bright mornings.", author: "Rahul" },
    { id: 16, text: "💭 Reflect, heal, and grow.", author: "Priya" },
    { id: 17, text: "🍂 Sadness is part of life’s color.", author: "Kriti" },
    { id: 18, text: "🎧 Listen to music, soothe your mind.", author: "Rohit" },
    { id: 19, text: "🕊 Let go of what hurts.", author: "Anjali" },
    { id: 20, text: "🌧 Rain makes everything fresh.", author: "Vikram" },
  ],
  Motivated: [
    { id: 21, text: "🚀 Keep pushing forward!", author: "Neha" },
    { id: 22, text: "🔥 Hard work beats talent.", author: "Rahul" },
    { id: 23, text: "🏆 Success is earned, not given.", author: "Shobhit" },
    { id: 24, text: "💪 Believe in yourself!", author: "Priya" },
    { id: 25, text: "🌟 Your only limit is you.", author: "Aman" },
    { id: 26, text: "📈 Small steps lead to big wins.", author: "Kriti" },
    { id: 27, text: "🎯 Focus, act, achieve.", author: "Rohit" },
    { id: 28, text: "⚡ Energy flows where attention goes.", author: "Anjali" },
    { id: 29, text: "🛠 Build your dreams daily.", author: "Vikram" },
    { id: 30, text: "💥 Never settle for less.", author: "Ravi" },
  ],
  Chill: [
    { id: 31, text: "😌 Relax, it’s your time.", author: "Priya" },
    { id: 32, text: "☕ Coffee + good vibes!", author: "Rohit" },
    { id: 33, text: "🌴 Take a deep breath, unwind.", author: "Shobhit" },
    { id: 34, text: "🎵 Chill music heals the soul.", author: "Neha" },
    { id: 35, text: "🛋 Cozy moments are priceless.", author: "Rahul" },
    { id: 36, text: "🌅 Watch sunsets, feel calm.", author: "Aman" },
    { id: 37, text: "🕯 Light candles, relax your mind.", author: "Kriti" },
    { id: 38, text: "📚 Read a book, drift away.", author: "Rohit" },
    { id: 39, text: "🍵 Tea time = chill time.", author: "Anjali" },
    { id: 40, text: "🌊 Listen to waves, let go.", author: "Vikram" },
  ],
  Love: [
    { id: 41, text: "❤ Love is all we need.", author: "Kriti" },
    { id: 42, text: "💌 You make my heart smile.", author: "Vikram" },
    { id: 43, text: "💞 Spread love everywhere.", author: "Shobhit" },
    { id: 44, text: "🌹 Small gestures matter most.", author: "Neha" },
    { id: 45, text: "💖 Appreciate those you love.", author: "Rahul" },
    { id: 46, text: "💕 Love yourself first.", author: "Priya" },
    { id: 47, text: "💝 Kindness is love in action.", author: "Rohit" },
    { id: 48, text: "🌸 Romance is in little things.", author: "Anjali" },
    { id: 49, text: "💗 Heartfelt words matter.", author: "Aman" },
    { id: 50, text: "💘 True love is patient.", author: "Vikram" },
  ],
 };

function PostCard({ post }) {
  return (
    <motion.div
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
  );
}

export default function Home() {
  const [mood, setMood] = useState("Happy");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Background Animation */}
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
        <div className="flex flex-wrap justify-center gap-4 mb-10">
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

        {/* Posts Feed */}
        <motion.div
          className="grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {postsData[mood].map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </motion.div>
       

        <CreatePost/>
      </div>
    </div>
  );
}
