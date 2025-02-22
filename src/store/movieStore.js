// store/movieStore.js
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useMovieStore = create(
  persist(
    (set, get) => ({
      bookings: [],
      userName: 'Naval Ravikant',
      selectedMovie: null,
      
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),

      addBooking: (booking) => {
        const currentState = get();
        const newBooking = {
          ...booking,
          id: String(currentState.bookings.length + 1).padStart(2, '0'),
          amount: booking.ticketCount * 25.00
        };
        
        set({ bookings: [...currentState.bookings, newBooking] });
      },

      clearBookings: () => set({ bookings: [] }),

      formatPrice: (amount) => `$ ${amount.toFixed(2)}`,
      
      formatDate: (date) => {
        const [year, month, day] = date.split('-');
        return `${month}-${day}-${year.slice(2)}`;
      }
    }),
    {
      name: 'movie-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useMovieStore;