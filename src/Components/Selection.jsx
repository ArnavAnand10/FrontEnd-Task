import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import useMovieStore from '../store/movieStore';

const SelectionScreen = () => {
  const navigate = useNavigate();
  const { selectedMovie, addBooking } = useMovieStore();
  
  const loadSavedFormState = () => {
    const savedForm = localStorage.getItem('selection-form');
    return savedForm ? JSON.parse(savedForm) : {
      ticketCount: 1,
      showTime: '12:00',
      date: new Date().toISOString().split('T')[0]
    };
  };

  const [formState, setFormState] = useState(loadSavedFormState);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!selectedMovie && !localStorage.getItem('movie-store')) {
      navigate('/dashboard');
    }
  }, [selectedMovie, navigate]);

  useEffect(() => {
    localStorage.setItem('selection-form', JSON.stringify(formState));
  }, [formState]);

  const handleFormChange = (field, value) => {
    setFormState(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBooking = async () => {
    setLoading(true);
    
    const bookingData = {
      movieTitle: selectedMovie?.title,
      ...formState
    };

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      addBooking(bookingData);
      setShowToast(true);
      localStorage.removeItem('selection-form');
      
      setTimeout(() => {
        setShowToast(false);
        navigate('/activity');
      }, 2000);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex min-h-screen bg-white"
    >
      <Navbar />
      <div className="flex-1 p-8">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-3xl mx-auto"
        >
          {selectedMovie && (
            <motion.img 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={selectedMovie.image} 
              alt={selectedMovie.title}
              className="w-full h-48 object-cover rounded-lg mb-6"
            />
          )}

          <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold mb-8"
          >
            {selectedMovie?.title}
          </motion.h1>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="space-y-6"
          >
            <motion.div className="flex items-center gap-4">
              <span className="w-24">Ticket Count</span>
              <div className="flex items-center gap-4">
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFormChange('ticketCount', Math.max(1, formState.ticketCount - 1))}
                  className="px-3 py-1 bg-black text-white rounded"
                >
                  -
                </motion.button>
                <span className="w-8 text-center">{formState.ticketCount}</span>
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleFormChange('ticketCount', formState.ticketCount + 1)}
                  className="px-3 py-1 bg-black text-white rounded"
                >
                  +
                </motion.button>
              </div>
            </motion.div>

            <motion.div>
              <p className="mb-2">Show Time</p>
              <div className="flex gap-4">
                {['9:00', '12:00', '18:00'].map(time => (
                  <motion.button 
                    key={time}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleFormChange('showTime', time)}
                    className={`px-4 py-2 rounded transition-colors duration-200 ${
                      formState.showTime === time 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100'
                    }`}
                  >
                    {time}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div>
              <p className="mb-2">Date</p>
              <motion.input 
                whileFocus={{ scale: 1.02 }}
                type="date" 
                value={formState.date}
                onChange={(e) => handleFormChange('date', e.target.value)}
                className="px-4 py-2 bg-gray-100 rounded"
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBooking}
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg mt-8 relative"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <span className="loading loading-spinner loading-md"></span>
                </div>
              ) : (
                'Book Ticket'
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4"
          >
            <div className="alert alert-success shadow-lg">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Booking Successful!</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SelectionScreen;