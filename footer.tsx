import  { Bus, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <Bus className="h-8 w-8 text-primary-400" />
              <span className="ml-2 text-2xl font-bold text-white">BusGo</span>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              Book your bus tickets with ease. Travel anywhere with comfort and safety.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white text-sm">Book Tickets</Link>
              </li>
              <li>
                <Link to="/bookings" className="text-gray-300 hover:text-white text-sm">My Bookings</Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-300 hover:text-white text-sm">Profile</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Routes</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">New York to Los Angeles</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Chicago to Houston</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">Philadelphia to Phoenix</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white text-sm">San Antonio to San Diego</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-gray-400 mt-0.5" />
                <span className="text-gray-300 text-sm">123 Main Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">support@busgo.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} BusGo. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
 
