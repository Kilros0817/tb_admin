'use client';

import { useState, useEffect } from 'react';
import { Shield, Users, Activity, Settings, Eye, Edit, Trash2, Plus, Download, Sun, Moon } from 'lucide-react';

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

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const getActionBadge = (action: string) => {
    const colors = {
      'Login': 'bg-blue-100 text-blue-800',
      'Create Document': 'bg-green-100 text-green-800',
      'Edit Document': 'bg-yellow-100 text-yellow-800',
      'Access Document': 'bg-purple-100 text-purple-800',
      'Document Export': 'bg-orange-100 text-orange-800'
    };
    return `${colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800'} px-2 py-1 rounded-full text-xs font-medium`;
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

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage user accounts and access</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Login</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{user.role}</td>
                      <td className="px-6 py-4">
                        <span className={getStatusBadge(user.status)}>{user.status}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">{user.lastLogin}</td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-800 dark:text-green-400">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 dark:text-red-400">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles & Permissions Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Roles & Permissions</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Configure user roles and their permissions</p>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {roles.map((role) => (
                  <div key={role.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{role.name}</h3>
                      <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded-full text-xs font-medium">
                        {role.userCount} users
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{role.description}</p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">Permissions:</h4>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.map((permission, index) => (
                          <span key={index} className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm">Edit</button>
                      <button className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Activity Log Tab */}
        {activeTab === 'activity' && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Activity Log</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Track user actions and system events</p>
              </div>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {activities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(activity.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                        {activity.userName}
                      </td>
                      <td className="px-6 py-4">
                        <span className={getActionBadge(activity.action)}>{activity.action}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                        {activity.documentName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {activity.details}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}