'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Activity, Settings, Plus, Sun, Moon } from 'lucide-react';
import UserManagement from '../../components/UserManagement';
import RolesPermissions from '../../components/RolesPermissions';
import ActivityLog from '../../components/ActivityLog';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
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

  // Demo data
  const users = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15 09:30' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 08:45' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-14 16:20' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10 14:15' },
    { id: 5, name: 'Robert Wilson', email: 'robert.wilson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 07:30' }
  ];

  const roles = [
    { id: 1, name: 'Admin', description: 'Full system access and user management', userCount: 2, permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage Users'] },
    { id: 2, name: 'Editor', description: 'Can create and edit documents', userCount: 8, permissions: ['Create', 'Read', 'Update', 'Export'] },
    { id: 3, name: 'Viewer', description: 'Read-only access to documents', userCount: 15, permissions: ['Read'] }
  ];

  const activities = [
    { id: 1, timestamp: '2024-01-15 10:30:00', userName: 'John Smith', action: 'Create Document', documentName: 'Q1 Financial Report', details: 'Created new document' },
    { id: 2, timestamp: '2024-01-15 10:15:00', userName: 'Sarah Johnson', action: 'Access Document', documentName: 'Marketing Strategy 2024', details: 'Opened document for viewing' },
    { id: 3, timestamp: '2024-01-15 09:45:00', userName: 'Mike Chen', action: 'Edit Document', documentName: 'Employee Handbook', details: 'Modified section 3.2' },
    { id: 4, timestamp: '2024-01-15 09:30:00', userName: 'John Smith', action: 'Login', documentName: '-', details: 'User logged into system' },
    { id: 5, timestamp: '2024-01-15 09:20:00', userName: 'Emily Davis', action: 'Document Export', documentName: 'Project Timeline', details: 'Exported as PDF' },
    { id: 6, timestamp: '2024-01-15 08:45:00', userName: 'Sarah Johnson', action: 'Login', documentName: '-', details: 'User logged into system' },
    { id: 7, timestamp: '2024-01-14 16:30:00', userName: 'Robert Wilson', action: 'Access Document', documentName: 'Company Policies', details: 'Opened document for viewing' },
    { id: 8, timestamp: '2024-01-14 16:20:00', userName: 'Mike Chen', action: 'Login', documentName: '-', details: 'User logged into system' }
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagement users={users} />;
      case 'roles':
        return <RolesPermissions roles={roles} />;
      case 'activity':
        return <ActivityLog activities={activities} />;
      default:
        return <UserManagement users={users} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">User & Activity Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                )}
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'roles', label: 'Roles & Permissions', icon: Settings },
              { id: 'activity', label: 'Activity Log', icon: Activity }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Active Tab Content */}
        {renderActiveTab()}
      </div>
    </div>
  );
}