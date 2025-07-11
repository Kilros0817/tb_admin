'use client';

import { Eye, Edit, Trash2, Copy } from 'lucide-react';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  walletAddress: string;
}

export default function UserManagement() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Demo data moved to component level
  const users: User[] = [
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15 09:30', walletAddress: '0x1234567890abcdef1234567890abcdef12345678' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 08:45', walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12' },
    { id: 3, name: 'Mike Chen', email: 'mike.chen@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-14 16:20', walletAddress: '0x9876543210fedcba9876543210fedcba98765432' },
    { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10 14:15', walletAddress: '0xfedcba0987654321fedcba0987654321fedcba09' },
    { id: 5, name: 'Robert Wilson', email: 'robert.wilson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 07:30', walletAddress: '0x5555666677778888999900001111222233334444' }
  ];

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium'
      : 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium';
  };

  const truncateWalletAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  return (
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Wallet Address</th>
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
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-mono text-gray-900 dark:text-white">
                      {truncateWalletAddress(user.walletAddress)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(user.walletAddress)}
                      className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                      title="Copy wallet address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    {copiedAddress === user.walletAddress && (
                      <span className="text-xs text-green-600 dark:text-green-400">Copied!</span>
                    )}
                  </div>
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
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}