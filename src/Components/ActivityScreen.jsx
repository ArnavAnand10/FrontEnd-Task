import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import useMovieStore from '../store/movieStore';

const ActivityScreen = () => {
  const { bookings, userName, formatPrice, formatDate } = useMovieStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setTimeout(() => setIsLoading(false), 1000);
      if(!localStorage.getItem('user')){
        navigate("/login")
      }
    }, []);

  const tableVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen bg-white"
    >
      <Navbar />
      
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex justify-between items-center mb-8"
          >
            <h1 className="text-2xl font-semibold">Activity</h1>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <span className="font-medium">{userName}</span>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              >
                <User size={20} />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                  <span className="loading loading-ring loading-lg text-primary"></span>
                </div>
              ) : bookings.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-8 text-gray-500"
                >
                  No booking activity found
                </motion.div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left py-4 px-4 font-medium">ID</th>
                      <th className="text-left py-4 px-4 font-medium">Movie</th>
                      <th className="text-left py-4 px-4 font-medium">Tickets</th>
                      <th className="text-left py-4 px-4 font-medium">Amount</th>
                      <th className="text-left py-4 px-4 font-medium">Time</th>
                      <th className="text-left py-4 px-4 font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <motion.tr
                        key={booking.id}
                        variants={rowVariants}
                        className="border-b hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="py-4 px-4 text-blue-600">{booking.id}</td>
                        <td className="py-4 px-4">{booking.movieTitle}</td>
                        <td className="py-4 px-4">{booking.ticketCount}</td>
                        <td className="py-4 px-4">{formatPrice(booking.amount)}</td>
                        <td className="py-4 px-4">{booking.showTime}</td>
                        <td className="py-4 px-4">{formatDate(booking.date)}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityScreen;