import  { useState } from 'react';
import { Check, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user profile on the backend
    setSavedMessage('Profile updated successfully!');
    setTimeout(() => setSavedMessage(''), 3000);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
        
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Account Information</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Update your personal details here
              </p>
            </div>
            <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
              <User className="h-8 w-8 text-primary-600" />
            </div>
          </div>
          
          {savedMessage && (
            <div className="bg-green-50 border-l-4 border-green-400 p-4 mx-6">
              <div className="flex">
                <Check className="h-5 w-5 text-green-400" />
                <p className="ml-3 text-sm text-green-700">{savedMessage}</p>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-200">
            <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1 input"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Password and Security</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Manage your password and security settings
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="current-password"
                    id="current-password"
                    className="mt-1 input"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="new-password"
                    id="new-password"
                    className="mt-1 input"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    className="mt-1 input"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Preferences</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Customize your booking preferences
            </p>
          </div>
          <div className="border-t border-gray-200">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email-notifications"
                      name="email-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      defaultChecked
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email-notifications" className="font-medium text-gray-700">
                      Email Notifications
                    </label>
                    <p className="text-gray-500">
                      Receive email notifications about your bookings and travel updates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="sms-notifications"
                      name="sms-notifications"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                      SMS Notifications
                    </label>
                    <p className="text-gray-500">
                      Receive SMS alerts for important travel updates
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="marketing-emails"
                      name="marketing-emails"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="marketing-emails" className="font-medium text-gray-700">
                      Marketing Emails
                    </label>
                    <p className="text-gray-500">
                      Receive special offers, discounts, and promotional emails
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
