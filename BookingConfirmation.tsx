import  { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Check, Download, Mail, Share } from 'lucide-react';
import { Booking } from '../types';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking as Booking | undefined;
  
  useEffect(() => {
    if (!booking) {
      navigate('/');
    }
  }, [booking, navigate]);
  
  if (!booking) {
    return null;
  }
  
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="bg-primary-600 py-6 px-6 text-center">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-white text-primary-600 mb-4">
              <Check className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-white">Booking Confirmed!</h1>
            <p className="text-primary-100 mt-2">Your tickets have been booked successfully</p>
          </div>
          
          <div className="px-6 py-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-gray-500">Booking ID</p>
                  <p className="text-base font-medium text-gray-900">{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Booking Date</p>
                  <p className="text-base font-medium text-gray-900">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {booking.status}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="text-base font-medium text-gray-900">${booking.totalAmount}</p>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Journey Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="text-base font-medium text-gray-900">{booking.route.from}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="text-base font-medium text-gray-900">{booking.route.to}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="text-base font-medium text-gray-900">
                    {new Date(booking.route.departureTime).toLocaleDateString()}, {' '}
                    {new Date(booking.route.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bus</p>
                  <p className="text-base font-medium text-gray-900">
                    {booking.route.bus.name} ({booking.route.bus.busNumber})
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Passenger Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Seat No.
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {booking.passengerDetails.map((passenger, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {passenger.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {passenger.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {passenger.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {passenger.seatNumber}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between">
              <div className="flex space-x-3 mb-4 sm:mb-0">
                <button className="btn btn-outline flex items-center">
                  <Download className="h-4 w-4 mr-2" /> Download Ticket
                </button>
                <button className="btn btn-outline flex items-center">
                  <Mail className="h-4 w-4 mr-2" /> Email Ticket
                </button>
                <button className="btn btn-outline flex items-center">
                  <Share className="h-4 w-4 mr-2" /> Share
                </button>
              </div>
              <Link to="/bookings" className="btn btn-primary">
                View All Bookings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
