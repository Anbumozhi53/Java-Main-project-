import  { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, ArrowRight, Check, CreditCard, Info, User } from 'lucide-react';
import { Route, Passenger } from '../types';
import { useAuth } from '../context/AuthContext';
import api from '../api';

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [route, setRoute] = useState<Route | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (location.state?.route) {
      setRoute(location.state.route);
    } else {
      // In a real app, you'd fetch the route data using the ID
      setError('Route information not found');
    }
  }, [location.state, id]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    }
  }, [isAuthenticated, navigate, location.pathname]);
  
  useEffect(() => {
    setPassengers(
      selectedSeats.map((seat) => ({
        name: '',
        age: 0,
        gender: 'MALE',
        seatNumber: seat,
      }))
    );
  }, [selectedSeats]);
  
  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (selectedSeats.length < 6) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        setError('You can only select up to 6 seats');
      }
    }
  };
  
  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    const updatedPassengers = [...passengers];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengers(updatedPassengers);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && selectedSeats.length === 0) {
      setError('Please select at least one seat');
      return;
    }
    
    if (step === 2) {
      // Validate passenger details
      const isValid = passengers.every((p) => p.name && p.age > 0);
      if (!isValid) {
        setError('Please fill in all passenger details');
        return;
      }
      setStep(3);
      return;
    }
    
    if (step === 3) {
      try {
        if (!route || !user) return;
        
        // In a real app, this would submit to your backend
        const bookingData = {
          userId: user.id,
          routeId: route.id,
          route: route,
          seats: selectedSeats,
          passengerDetails: passengers,
          totalAmount: route.price * selectedSeats.length,
        };
        
        const booking = await api.createBooking(bookingData);
        navigate('/booking-confirmation', { state: { booking } });
      } catch (error) {
        console.error('Error creating booking:', error);
        setError('Failed to create booking. Please try again.');
      }
    }
  };
  
  if (error && !route) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/search')}
          className="btn btn-primary"
        >
          Back to Search
        </button>
      </div>
    );
  }
  
  if (!route) {
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
        {/* Booking Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            <div className={`flex-1 ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className="flex items-center">
                <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                  step >= 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-400'
                }`}>
                  {step > 1 ? <Check className="h-5 w-5" /> : 1}
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Select Seats</p>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className={`flex-1 ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className="flex items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    step >= 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-400'
                  }`}>
                    {step > 2 ? <Check className="h-5 w-5" /> : 2}
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Passenger Details</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-end">
              <div className={`${step >= 3 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className="flex items-center">
                  <div className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${
                    step >= 3 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-400'
                  }`}>
                    3
                  </div>
                  <div className="ml-2">
                    <p className="text-sm font-medium">Payment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        )}
        
        {/* Bus and Route Info */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">{route.bus.name}</h2>
              <p className="text-sm text-gray-500">{route.bus.busNumber} • {route.bus.type}</p>
            </div>
            <div className="flex flex-col md:items-center">
              <div className="flex items-center">
                <span className="text-base font-medium">{new Date(route.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                <ArrowRight className="mx-2 h-4 w-4 text-gray-400" />
                <span className="text-base font-medium">{new Date(route.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {route.from} to {route.to} • {route.duration}
              </p>
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Price per seat</p>
                <p className="text-xl font-bold text-primary-600">${route.price}</p>
              </div>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {/* Step 1: Seat Selection */}
          {step === 1 && (
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Your Seats</h3>
              
              <div className="mb-6 flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-200 rounded mr-2"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-primary-500 rounded mr-2"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center">
                  <div className="h-4 w-4 bg-gray-400 rounded mr-2"></div>
                  <span>Booked</span>
                </div>
              </div>
              
              {/* Bus Layout */}
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                {/* Driver's cabin */}
                <div className="flex justify-between mb-8">
                  <div className="w-16 h-12 bg-gray-300 rounded flex items-center justify-center text-sm text-gray-600">
                    Driver
                  </div>
                  <div className="w-16 h-12 bg-gray-200 rounded"></div>
                </div>
                
                {/* Seats */}
                <div className="grid grid-cols-5 gap-4">
                  {[...Array(40)].map((_, index) => {
                    const seatNumber = index + 1;
                    const isBooked = route.bus.totalSeats - route.bus.availableSeats >= seatNumber;
                    const isSelected = selectedSeats.includes(seatNumber);
                    
                    return (
                      <div
                        key={seatNumber}
                        className={`w-12 h-12 rounded flex items-center justify-center cursor-pointer ${
                          isBooked
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : isSelected
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => !isBooked && toggleSeatSelection(seatNumber)}
                      >
                        {seatNumber}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">
                    Selected Seats: {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Total: ${selectedSeats.length * route.price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (selectedSeats.length > 0) {
                      setStep(2);
                      setError('');
                    } else {
                      setError('Please select at least one seat');
                    }
                  }}
                  className="btn btn-primary"
                >
                  Continue to Passenger Details
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Passenger Details */}
          {step === 2 && (
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Enter Passenger Details</h3>
              
              <div className="space-y-6">
                {passengers.map((passenger, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="text-base font-medium text-gray-900 mb-4">
                      Passenger {index + 1} - Seat {passenger.seatNumber}
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor={`name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id={`name-${index}`}
                          value={passenger.name}
                          onChange={(e) => updatePassenger(index, 'name', e.target.value)}
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`age-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Age
                        </label>
                        <input
                          type="number"
                          id={`age-${index}`}
                          value={passenger.age || ''}
                          onChange={(e) => updatePassenger(index, 'age', parseInt(e.target.value))}
                          min="1"
                          max="120"
                          className="input"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor={`gender-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                          Gender
                        </label>
                        <select
                          id={`gender-${index}`}
                          value={passenger.gender}
                          onChange={(e) => updatePassenger(index, 'gender', e.target.value as 'MALE' | 'FEMALE' | 'OTHER')}
                          className="input"
                          required
                        >
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-outline"
                >
                  Back to Seat Selection
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const isValid = passengers.every((p) => p.name && p.age > 0);
                    if (isValid) {
                      setStep(3);
                      setError('');
                    } else {
                      setError('Please fill in all passenger details');
                    }
                  }}
                  className="btn btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="bg-white shadow rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment</h3>
              
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-base font-medium text-gray-900 mb-2">Booking Summary</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">From:</span> {route.from}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">To:</span> {route.to}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Date:</span> {new Date(route.departureTime).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Time:</span> {new Date(route.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Bus:</span> {route.bus.name} ({route.bus.type})
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Seats:</span> {selectedSeats.join(', ')}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Passengers:</span> {selectedSeats.length}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      <span className="font-medium">Total Amount:</span> ${selectedSeats.length * route.price}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-base font-medium text-gray-900 mb-4">Payment Method</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="payment-card"
                      name="payment-method"
                      type="radio"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                      checked
                    />
                    <label htmlFor="payment-card" className="ml-3 block text-sm font-medium text-gray-700">
                      Credit/Debit Card
                    </label>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="mb-4">
                    <label htmlFor="card-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name on Card
                    </label>
                    <input
                      type="text"
                      id="card-name"
                      className="input"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="card-number"
                        className="input"
                        placeholder="1234 5678 9012 3456"
                        pattern="[0-9\s]{13,19}"
                        maxLength={19}
                        required
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="expiry"
                        className="input"
                        placeholder="MM/YY"
                        pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        className="input"
                        placeholder="123"
                        pattern="[0-9]{3,4}"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start mb-6">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                  I agree to the <a href="#" className="text-primary-600 hover:text-primary-500">Terms and Conditions</a> and <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
                </label>
              </div>
              
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn btn-outline"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Pay ${selectedSeats.length * route.price} and Confirm
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
 
