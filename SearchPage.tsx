import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, ChevronRight, Clock, Filter, MapPin, Search, Star } from 'lucide-react';
import { Route } from '../types';
import api from '../api';

export default function SearchPage() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();
  
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromCity || !toCity || !date) return;
    
    setLoading(true);
    try {
      const searchedRoutes = await api.searchRoutes(fromCity, toCity, date);
      setRoutes(searchedRoutes);
      setSearched(true);
    } catch (error) {
      console.error('Error searching routes:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSelectBus = (route: Route) => {
    // In a real app, you'd store the selected route in state management or URL params
    navigate(`/booking/${route.id}`, { state: { route } });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Bus Tickets</h1>
          <p className="text-gray-600 mt-2">Find and book bus tickets for your journey</p>
        </div>
        
        {/* Search Form */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="from"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="input pl-10"
                  required
                >
                  <option value="">Select Departure City</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                  <option value="Phoenix">Phoenix</option>
                  <option value="Philadelphia">Philadelphia</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="to"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="input pl-10"
                  required
                >
                  <option value="">Select Arrival City</option>
                  <option value="New York">New York</option>
                  <option value="Los Angeles">Los Angeles</option>
                  <option value="Chicago">Chicago</option>
                  <option value="Houston">Houston</option>
                  <option value="Phoenix">Phoenix</option>
                  <option value="Philadelphia">Philadelphia</option>
                </select>
              </div>
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date of Journey</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="input pl-10"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-end">
              <button 
                type="submit" 
                className="btn btn-primary w-full"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search Buses'}
                <Search className="ml-2 h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
        
        {/* Search Results */}
        {searched && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {routes.length > 0 
                  ? `${routes.length} Buses Found` 
                  : 'No Buses Found'}
              </h2>
              
              <button className="flex items-center text-sm text-gray-600 hover:text-primary-600">
                <Filter className="h-4 w-4 mr-1" /> Filter
              </button>
            </div>
            
            {routes.length > 0 ? (
              <div className="space-y-4">
                {routes.map((route) => (
                  <div key={route.id} className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{route.bus.name}</h3>
                        <p className="text-sm text-gray-500">{route.bus.busNumber} • {route.bus.type}</p>
                        <div className="flex items-center mt-2">
                          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          <span className="text-sm text-gray-600 ml-1">{route.bus.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span className="text-base font-medium">{new Date(route.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="text-sm text-gray-500 ml-2">{route.from}</span>
                        </div>
                        <div className="relative pl-4 my-2">
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                          <div className="text-xs text-gray-500">{route.duration}</div>
                        </div>
                        <div className="flex items-center">
                          <span className="text-base font-medium">{new Date(route.arrivalTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                          <span className="text-sm text-gray-500 ml-2">{route.to}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm text-gray-500">Amenities</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {route.bus.features.map((feature, index) => (
                            <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">{route.bus.availableSeats}</span> seats available
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-right">
                          <span className="text-sm text-gray-500">Starting from</span>
                          <p className="text-2xl font-bold text-primary-600">${route.price}</p>
                        </div>
                        <button
                          onClick={() => handleSelectBus(route)}
                          className="btn btn-primary mt-4 w-full md:w-auto"
                        >
                          Select Seats <ChevronRight className="ml-1 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <p className="text-lg text-gray-600 mb-4">No buses found for the selected route and date.</p>
                <p className="text-gray-500">Try changing your search criteria or date of travel.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
 
