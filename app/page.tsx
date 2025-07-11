'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Shield, Users, Activity, Settings, Sun, Moon } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    setTheme(initialTheme);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleAdminAccess = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-200">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700"
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 text-gray-600" />
        ) : (
          <Sun className="w-5 h-5 text-yellow-500" />
        )}
      </button>

      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700 transition-colors duration-200">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-200">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">Admin Portal</h1>
          <p className="text-gray-600 dark:text-gray-300 transition-colors duration-200">Secure access to system administration</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Activity Logs</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Permissions</span>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>System Settings</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
        </div>

        <button
          onClick={handleAdminAccess}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Access Admin Dashboard
        </button>

        <p className="text-xs text-gray-400 dark:text-gray-500 mt-6 transition-colors duration-200">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}