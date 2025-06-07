import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Download, Eye, Search } from 'lucide-react';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const userBookings = await api.getUserBookings(user.id);
        setBookings(userBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load your bookings. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user]);
  
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center">
          <div className="loader" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
          <div className="mt-4 sm:mt-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="input pl-10"
                placeholder="Search bookings..."
              />
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {bookings.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 text-gray-400 mb-4">
              <Clock className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-500 mb-6">
              You haven't made any bookings yet. Start planning your journey today!
            </p>
            <Link to="/search" className="btn btn-primary">
              Book a Ticket
            </Link>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <li key={booking.id}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                      <div className="mb-4 sm:mb-0">
                        <p className="text-sm font-medium text-gray-600">
                          Booking ID: <span className="text-gray-900">{booking.id}</span>
                        </p>
                        <h3 className="text-lg font-medium text-gray-900 mt-1">
                          {booking.route.from} to {booking.route.to}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>
                            {new Date(booking.route.departureTime).toLocaleDateString()}, {' '}
                            {new Date(booking.route.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </p>
                          <p className="ml-4">
                            {booking.route.bus.name} • {booking.seats.length} seat(s)
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'CONFIRMED' 
                            ? 'bg-green-100 text-green-800' 
                            : booking.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status}
                        </span>
                        <p className="text-lg font-semibold text-primary-600 mt-2">
                          ${booking.totalAmount}
                        </p>
                        <div className="mt-4 flex space-x-3">
                          <Link
                            to={`/booking/${booking.id}`}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                          >
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                          <button
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                          >
                            <Download className="h-4 w-4 mr-1" /> Ticket
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
 
