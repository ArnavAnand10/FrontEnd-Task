import React, { useState, useEffect, useCallback } from 'react';
import { Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash.debounce';
import Navbar from './Navbar';
import useMovieStore from '../store/movieStore';
import movies from '../Constants/movie';

const MovieDashboard = () => {
  const navigate = useNavigate();
  const setSelectedMovie = useMovieStore(state => state.setSelectedMovie);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
    if(!localStorage.getItem('user')){
      navigate("/login")
    }
  }, []);

  const handleSearch = useCallback(
    debounce((query) => {
      setIsLoading(true);
      const filtered = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMovies(filtered);
      setTimeout(() => setIsLoading(false), 300);
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleMovieClick = (movie) => {
   
    setSelectedMovie(movie);
    navigate('/selection');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen bg-white"
    >
      <Navbar />
      
      <div className="flex-1 p-8">
        <motion.div 
          variants={itemVariants}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex-1 max-w-xl">
            <motion.div 
              whileFocus={{ scale: 1.02 }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full bg-gray-200 rounded-lg py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </motion.div>
          </div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 ml-4"
          >
            <span className="font-medium">Naval Ravikant</span>
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <User size={20} />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-2xl font-semibold mb-6"
        >
          Good Morning Mr. Naval Ravikant!
        </motion.h1>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          ) : filteredMovies.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center text-gray-500 mt-8"
            >
              No movies found matching "{searchQuery}"
            </motion.div>
          ) : (
            <motion.div 
              layout
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMovies.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg"
                  onClick={() => handleMovieClick(movie)}
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <motion.img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    <h3 className="text-white font-medium">{movie.title}</h3>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MovieDashboard;