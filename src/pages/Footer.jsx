import { HiOutlineMail } from "react-icons/hi";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 to-pink-500 text-gray-100 py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        {/* Branding / Copy */}
        <p className="text-sm md:text-base">&copy; {new Date().getFullYear()} MoodiFy. All Rights Reserved.</p>

        {/* Links */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
          
          {/* Email */}
          <a
            href="mailto:moodify@gmail.com"
            className="flex items-center hover:text-white transition"
          >
            <HiOutlineMail className="mr-1" /> moodify@gmail.com
          </a>

          {/* Social Links */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-white transition"
          >
            <FaLinkedin className="mr-1" /> LinkedIn
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-white transition"
          >
            <FaGithub className="mr-1" /> GitHub
          </a>

          {/* Other Pages */}
          <a href="/about" className="hover:text-white transition">About</a>
          <a href="/contact" className="hover:text-white transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
