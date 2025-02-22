import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MovieDashboard from './Components/Booking';
import SelectionScreen from './Components/Selection';
import LoginForm from './Components/Login';
import ActivityScreen from './Components/ActivityScreen';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/dashboard" element={<MovieDashboard />} />
        <Route path="/selection" element={<SelectionScreen />} />
        <Route path="/activity" element={<ActivityScreen/> } />
        
        {/* 404 route */}
        <Route
          path="*"
          element={
            <div className="flex min-h-screen items-center justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">404</h1>
                <p className="text-gray-600 mb-4">Page not found</p>
                <button
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-black text-white px-4 py-2 rounded-lg"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;