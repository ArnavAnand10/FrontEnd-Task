import React from "react";
import { Globe, MonitorPlay, Download, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-black p-6 flex flex-col gap-4 min-h-screen"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className="flex items-center gap-2 mb-8"
      >
        <Globe className="h-6 w-6 text-white" />
        <span className="text-white text-xl font-semibold">Almanack</span>
      </motion.div>

      {[
        { path: "/dashboard", icon: MonitorPlay, label: "Booking" },
        { path: "/activity", icon: Download, label: "Activity" },
      ].map(({ path, icon: Icon, label }) => (
        <motion.div key={path} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to={path}
            className={`flex items-center gap-3 text-white p-2 rounded-lg w-full transition-colors duration-200 ${
              location.pathname === path ? "bg-gray-900" : "hover:bg-gray-900"
            }`}
          >
            <Icon size={20} />
            <span>{label}</span>
          </Link>
        </motion.div>
      ))}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="mt-auto flex items-center gap-3 text-white p-2 rounded-lg w-full transition-colors duration-200 hover:bg-red-700"
      >
        <LogOut size={20} />
        <span>Logout</span>
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
