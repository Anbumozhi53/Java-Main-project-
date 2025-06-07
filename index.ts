import  axios from 'axios';
import { City, Route, Booking, User } from '../types';

// This would typically be your backend API URL
const API_URL = 'http://localhost:8080/api';

// In a real application, you would connect this to your backend
// For now, we'll use mock data
const mockCities: City[] = [
  { id: '1', name: 'New York' },
  { id: '2', name: 'Los Angeles' },
  { id: '3', name: 'Chicago' },
  { id: '4', name: 'Houston' },
  { id: '5', name: 'Phoenix' },
  { id: '6', name: 'Philadelphia' },
  { id: '7', name: 'San Antonio' },
  { id: '8', name: 'San Diego' },
  { id: '9', name: 'Dallas' },
  { id: '10', name: 'San Jose' }
];

const mockRoutes: Route[] = [
  {
    id: '1',
    from: 'New York',
    to: 'Los Angeles',
    departureTime: '2023-07-01T08:00:00',
    arrivalTime: '2023-07-02T06:00:00',
    duration: '22h',
    price: 120,
    bus: {
      id: '1',
      name: 'Express Liner',
      busNumber: 'EL-123',
      totalSeats: 40,
      availableSeats: 25,
      type: 'Sleeper',
      features: ['WiFi', 'USB Charging', 'AC', 'Blanket', 'Snacks'],
      rating: 4.5
    }
  },
  {
    id: '2',
    from: 'New York',
    to: 'Los Angeles',
    departureTime: '2023-07-01T10:00:00',
    arrivalTime: '2023-07-02T08:00:00',
    duration: '22h',
    price: 100,
    bus: {
      id: '2',
      name: 'City Connect',
      busNumber: 'CC-456',
      totalSeats: 36,
      availableSeats: 20,
      type: 'Semi-Sleeper',
      features: ['WiFi', 'AC', 'Water Bottle'],
      rating: 4.0
    }
  },
  {
    id: '3',
    from: 'New York',
    to: 'Chicago',
    departureTime: '2023-07-01T09:00:00',
    arrivalTime: '2023-07-01T18:00:00',
    duration: '9h',
    price: 80,
    bus: {
      id: '3',
      name: 'Fast Track',
      busNumber: 'FT-789',
      totalSeats: 45,
      availableSeats: 30,
      type: 'AC',
      features: ['WiFi', 'USB Charging', 'AC', 'Snacks'],
      rating: 4.2
    }
  }
];

const mockBookings: Booking[] = [];

let mockUsers: User[] = [];

const api = {
  // User related API calls
  registerUser: async (userData: { name: string; email: string; password: string }): Promise<User> => {
    try {
      // In a real app, this would be a POST request to your backend
      // const response = await axios.post(`${API_URL}/users/register`, userData);
      // return response.data;
      
      // Mock implementation
      const newUser = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email
      };
      mockUsers.push(newUser);
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },
  
  loginUser: async (credentials: { email: string; password: string }): Promise<User> => {
    try {
      // In a real app, this would be a POST request to your backend
      // const response = await axios.post(`${API_URL}/users/login`, credentials);
      // return response.data;
      
      // Mock implementation
      const user = mockUsers.find(u => u.email === credentials.email);
      if (user) {
        return user;
      }
      throw new Error('Invalid credentials');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
  
  // City related API calls
  getCities: async (): Promise<City[]> => {
    try {
      // In a real app, this would be a GET request to your backend
      // const response = await axios.get(`${API_URL}/cities`);
      // return response.data;
      
      // Mock implementation
      return mockCities;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },
  
  // Route related API calls
  searchRoutes: async (from: string, to: string, date: string): Promise<Route[]> => {
    try {
      // In a real app, this would be a GET request to your backend with query params
      // const response = await axios.get(`${API_URL}/routes/search?from=${from}&to=${to}&date=${date}`);
      // return response.data;
      
      // Mock implementation
      return mockRoutes.filter(route => route.from === from && route.to === to);
    } catch (error) {
      console.error('Error searching routes:', error);
      throw error;
    }
  },
  
  // Booking related API calls
  createBooking: async (bookingData: Omit<Booking, 'id' | 'bookingDate' | 'status'>): Promise<Booking> => {
    try {
      // In a real app, this would be a POST request to your backend
      // const response = await axios.post(`${API_URL}/bookings`, bookingData);
      // return response.data;
      
      // Mock implementation
      const newBooking: Booking = {
        ...bookingData,
        id: Date.now().toString(),
        bookingDate: new Date().toISOString(),
        status: 'CONFIRMED'
      };
      mockBookings.push(newBooking);
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },
  
  getUserBookings: async (userId: string): Promise<Booking[]> => {
    try {
      // In a real app, this would be a GET request to your backend
      // const response = await axios.get(`${API_URL}/users/${userId}/bookings`);
      // return response.data;
      
      // Mock implementation
      return mockBookings.filter(booking => booking.userId === userId);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      throw error;
    }
  }
};

export default api;
 
