import React, { useEffect, useState } from "react";
import { User, Lock, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });


  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate("/dashboard");
    }
  })

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validUser = "naval.ravikant";
    const validPass = "05111974";

    if (username === validUser && password === validPass) {
      localStorage.setItem("user", JSON.stringify({ username }));
      showToast("Login successful! Redirecting...", "success");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      showToast("Invalid username or password!", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="card w-96 bg-black shadow-xl">
        <div className="card-body">
          <div className="flex justify-center items-center gap-2 mb-8">
            <Globe className="h-6 w-6 text-white" />
            <h2 className="text-xl font-semibold text-white">Almanack</h2>
          </div>

          <AnimatePresence>
            {toast.show && (
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4"
              >
                <div className={`alert ${toast.type === "success" ? "alert-success" : "alert-error"} shadow-lg`}>
                  <div>
                  
                    <span>{toast.message}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input input-bordered w-full bg-white text-black pl-10"
              />
            </div>

            <div className="form-control relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full bg-white text-black pl-10"
              />
            </div>

            <div className="form-control mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-block bg-white text-black hover:bg-gray-200 border-none"
              >
                Login
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
