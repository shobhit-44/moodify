import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";

const features = [
  { emoji: "😄", title: "Happy", desc: "See content that makes your day brighter." },
  { emoji: "💔", title: "Sad", desc: "Get comforting posts when you feel low." },
  { emoji: "🚀", title: "Motivated", desc: "Boost your energy with inspiring posts." },
  { emoji: "😌", title: "Chill", desc: "Relax with calm and soothing content." },
  { emoji: "❤️", title: "Love", desc: "Feel the love with heartfelt messages." },
];

export default function About() {
  const [darkMode, setDarkMode] = useState(false);
  const [emojis, setEmojis] = useState([]);

  // Generate falling emoji animation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEmoji = features[Math.floor(Math.random() * features.length)].emoji;
      const left = Math.random() * window.innerWidth;
      setEmojis((prev) => [...prev, { id: Date.now(), emoji: randomEmoji, left }]);
      setTimeout(() => setEmojis((prev) => prev.slice(1)), 4000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-purple-50 text-gray-800"} relative overflow-hidden min-h-screen transition-colors duration-500`}>
      
      {/* Falling emojis */}
      {emojis.map((e) => (
        <motion.div
          key={e.id}
          className="absolute text-2xl sm:text-3xl"
          style={{ left: e.left }}
          initial={{ y: -50, opacity: 1 }}
          animate={{ y: window.innerHeight + 50, opacity: 0 }}
          transition={{ duration: 4, ease: "linear" }}
        >
          {e.emoji}
        </motion.div>
      ))}

      {/* Dark/Light toggle */}
      <div className="p-4 sm:p-6 flex justify-end">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="p-4 sm:p-6 md:p-8 max-w-5xl mx-auto">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8 text-center text-purple-600 dark:text-purple-400"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          About Modify 🌈
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <span className="font-bold text-purple-600 dark:text-purple-400">Modify</span> is a fun and engaging platform where
          your mood decides the content you see. Made with love by students, for the world! 🌍
        </motion.p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Tilt key={feature.title} glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>
              <motion.div
                className={`${darkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white border-purple-200"} border p-6 rounded-3xl shadow-lg cursor-pointer text-center transition-colors duration-500`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
              >
                <div className="text-4xl sm:text-5xl mb-4">{feature.emoji}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
              </motion.div>
            </Tilt>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 text-center text-purple-500 dark:text-purple-400 text-lg sm:text-xl font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 120 }}
        >
          Made with ❤️ for a happier world!
        </motion.div>
      </div>
    </div>
  );
}
