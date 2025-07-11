'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Shield, Users, Activity, Settings } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  const handleAdminAccess = () => {
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
          <p className="text-gray-600">Secure access to system administration</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>User Management</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4" />
              <span>Activity Logs</span>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
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

        <button
          onClick={handleAdminAccess}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Access Admin Dashboard
        </button>

        <p className="text-xs text-gray-400 mt-6">
          Authorized personnel only
        </p>
      </div>
    </div>
  );
}