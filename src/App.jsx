import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { motion } from "framer-motion";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";
import CreatePost from "./pages/CreatePost";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/Auth" },
    { name: "CreatePost", path: "/CreatePost" },
    { name: "Profile", path: "/Profile" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  return (
    <motion.nav
      className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-4 shadow-2xl rounded-b-3xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <div className="flex justify-between items-center">
        <motion.h1
          className="font-extrabold text-2xl cursor-pointer select-none"
          whileHover={{ scale: 1.1, rotateY: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          MoodiFy
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{
                scale: 1.1,
                rotateX: 10,
                rotateY: 5,
                textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
              }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <Link
                to={item.path}
                className="px-4 py-2 rounded-xl font-semibold hover:bg-white hover:text-purple-600 hover:shadow-lg transition-all duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none text-white"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="flex flex-col mt-4 space-y-2 md:hidden bg-purple-700 rounded-xl p-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-[calc(100vh-96px)] p-4 md:p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Auth" element={<Auth />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/CreatePost" element={<CreatePost />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}
