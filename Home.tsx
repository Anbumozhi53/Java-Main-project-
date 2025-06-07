import  { ArrowRight, Calendar, MapPin, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      content: 'BusGo made my trip planning so much easier. The booking process was smooth and the tickets were delivered instantly to my email.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      content: 'I love how easy it is to find and compare different bus routes. The UI is intuitive and the customer service is excellent.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      content: 'Been using BusGo for all my bus travel needs. Their prices are competitive and the booking experience is seamless.',
      rating: 4,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="City bus transportation at night"
            className="w-full h-full object-cover filter brightness-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Book Your Bus Tickets Online
            </h1>
            <p className="mt-6 text-xl text-gray-200">
              Travel with comfort and convenience. Book your bus tickets online with BusGo and enjoy a hassle-free journey.
            </p>
            <div className="mt-10">
              <Link to="/search" className="btn btn-primary text-base px-6 py-3">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="bg-white shadow-lg rounded-lg mx-auto max-w-5xl px-4 py-6 md:px-8 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select id="from" className="input pl-10">
                <option value="">Select Departure City</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <select id="to" className="input pl-10">
                <option value="">Select Arrival City</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
              </select>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="date"
                min={new Date().toISOString().split('T')[0]}
                className="input pl-10"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Link to="/search" className="btn btn-primary flex items-center">
            Search Buses <Search className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Popular Routes Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Popular Routes</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Explore our most traveled bus routes across the country
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { from: 'New York', to: 'Boston', price: '$45', time: '4h 30m' },
              { from: 'Los Angeles', to: 'San Francisco', price: '$55', time: '6h 15m' },
              { from: 'Chicago', to: 'Detroit', price: '$35', time: '5h' },
              { from: 'Miami', to: 'Orlando', price: '$30', time: '3h 45m' },
            ].map((route, index) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{route.from}</h3>
                      <div className="flex items-center mt-1">
                        <ArrowRight className="h-4 w-4 text-gray-400 mx-1" />
                        <span className="text-lg font-semibold text-gray-900">{route.to}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500">from</span>
                      <p className="text-lg font-bold text-primary-600">{route.price}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Duration: {route.time}</span>
                    <Link to="/search" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose BusGo</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              We provide the best bus booking experience with these amazing features
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="card p-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <Search className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Easy Search & Booking</h3>
                <p className="mt-2 text-base text-gray-500">
                  Find and book your bus tickets in just a few clicks. Compare prices and schedules easily.
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Flexible Scheduling</h3>
                <p className="mt-2 text-base text-gray-500">
                  Choose from multiple departure times and find the schedule that works best for you.
                </p>
              </div>
              
              <div className="card p-6 text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Top-Rated Service</h3>
                <p className="mt-2 text-base text-gray-500">
                  Enjoy quality service from our partner bus operators with high customer ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">What Our Customers Say</h2>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                        fill={i < testimonial.rating ? 'currentColor' : 'none'}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                <p className="font-medium text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Destinations */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Explore Top Destinations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Discover amazing places with our comfortable bus service
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative rounded-lg overflow-hidden h-80">
              <img
                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Travel destinations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Scenic Journeys</h3>
                <p className="text-sm text-gray-200 mt-2">
                  Experience breathtaking views on your next bus trip
                </p>
                <Link to="/search" className="inline-block mt-4 text-sm font-medium text-white hover:text-primary-100">
                  Explore Routes <ArrowRight className="inline h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
            
            <div className="relative rounded-lg overflow-hidden h-80">
              <img
                src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="City destinations"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">Urban Explorations</h3>
                <p className="text-sm text-gray-200 mt-2">
                  Discover exciting city destinations with comfortable travel
                </p>
                <Link to="/search" className="inline-block mt-4 text-sm font-medium text-white hover:text-primary-100">
                  Find City Routes <ArrowRight className="inline h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">Ready to Start Your Journey?</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-primary-100">
              Book your bus tickets now and travel with comfort and convenience.
            </p>
            <div className="mt-8">
              <Link to="/search" className="btn bg-white text-primary-700 hover:bg-gray-100 text-base px-6 py-3">
                Book Your Ticket Today
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
 
