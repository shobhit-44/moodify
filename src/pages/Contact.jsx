import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <motion.h1
        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-purple-600"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contact Us 📩
      </motion.h1>

      <form className="space-y-4 sm:space-y-5">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 sm:p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 sm:p-4 border rounded-xl h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
          required
        ></textarea>
        <button className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-xl hover:bg-purple-700 transition">
          Send Message
        </button>
      </form>
    </div>
  );
}
