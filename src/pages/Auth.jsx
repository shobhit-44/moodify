import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const generateLogos = (count) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * -500,
    size: Math.random() * 40 + 20,
    speed: Math.random() * 5 + 2,
    rotate: Math.random() * 360,
  }));
};

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [logos, setLogos] = useState(generateLogos(20));

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Check if user is already logged in
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLogos((prev) =>
        prev.map((logo) => {
          let newY = logo.y + logo.speed;
          if (newY > window.innerHeight) newY = -50;
          return { ...logo, y: newY, rotate: logo.rotate + 2 };
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!fullName || !email || !password) return alert("Fill all fields!");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.find((u) => u.email === email);
    if (exists) return alert("User already exists!");

    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Account created successfully! Please login.");
    setFullName("");
    setEmail("");
    setPassword("");
    setIsLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Fill all fields!");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (!user) return alert("Invalid email or password!");

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    setLoggedInUser(user); // Update state
    alert(`Welcome back, ${user.fullName}!`);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    setIsLogin(true);
  };

  // If logged in, show profile
  if (loggedInUser) {
    return (
      <div className="p-4 sm:p-6 max-w-md mx-auto mt-10">
        <motion.div
          className="bg-white shadow-2xl rounded-3xl p-6 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-purple-600">
            Welcome, {loggedInUser.fullName}!
          </h2>
          <p className="mb-2 text-sm sm:text-base">Email: {loggedInUser.email}</p>
          <p className="mb-4 text-sm sm:text-base">You are logged in successfully.</p>
          <motion.button
            className="bg-purple-600 text-white py-2 px-6 sm:px-8 rounded-xl font-bold shadow-lg hover:scale-105 transition transform"
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Else show login/signup form
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-purple-200 to-pink-200 overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          className="absolute text-purple-600 font-bold select-none text-2xl sm:text-3xl"
          style={{ left: logo.x, top: logo.y, fontSize: logo.size }}
          animate={{ rotate: logo.rotate }}
          transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
        >
          MoodiFy
        </motion.div>
      ))}

      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 50, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-purple-600">
          {isLogin ? "Login to MoodiFy 🎭" : "Create Account ❤️"}
        </h2>

        <form
          className="space-y-4 sm:space-y-5"
          onSubmit={isLogin ? handleLogin : handleSignUp}
        >
          {!isLogin && (
            <motion.input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 sm:p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              required
            />
          )}

          <motion.input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 sm:p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            required
          />
          <motion.input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 sm:p-4 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            required
          />

          <motion.button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 sm:py-4 rounded-2xl font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition transform"
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {isLogin ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <motion.p
          className="mt-4 sm:mt-6 text-center text-gray-600 text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-purple-600 font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
