'use client';

import { Eye, UserCheck, UserX, Copy } from 'lucide-react';
import { useState, useMemo } from 'react';
import UserInfoModal from './modals/UserInfoModal';
import UserStatusModal from './modals/UserStatusModal';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  walletAddress: string;
}

export default function UserManagement() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusModalUser, setStatusModalUser] = useState<{ id: number; name: string; status: string } | null>(null);

  // Demo data moved to component level
  const users: User[] = [
    { id: 1, username: 'johnsmith', email: 'john.smith@company.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15 09:30', walletAddress: '0x1234567890abcdef1234567890abcdef12345678' },
    { id: 2, username: 'sarahjohnson', email: 'sarah.johnson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 08:45', walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12' },
    { id: 3, username: 'mikechen', email: 'mike.chen@company.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-14 16:20', walletAddress: '0x9876543210fedcba9876543210fedcba98765432' },
    { id: 4, username: 'emilydavis', email: 'emily.davis@company.com', role: 'Editor', status: 'Inactive', lastLogin: '2024-01-10 14:15', walletAddress: '0xfedcba0987654321fedcba0987654321fedcba09' },
    { id: 5, username: 'robertwilson', email: 'robert.wilson@company.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-15 07:30', walletAddress: '0x5555666677778888999900001111222233334444' }
  ];

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    
    return users.filter(user => 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

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

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  const handleStatusToggle = (user: User) => {
    setStatusModalUser({ id: user.id, name: user.username, status: user.status });
    setIsStatusModalOpen(true);
  };

  const handleCloseStatusModal = () => {
    setIsStatusModalOpen(false);
    setStatusModalUser(null);
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">User Management</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">Manage user accounts and access</p>
          </div>
          <div className="w-80">
            <input
              type="text"
              placeholder="Search users by username or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Wallet Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Last Login</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{user.username}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                  </div>
                </td>
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
                    <button 
                      onClick={() => handleViewUser(user.id)}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400"
                      title="View user details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {user.status === 'Active' ? (
                      <button 
                        onClick={() => handleStatusToggle(user)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400"
                        title="Deactivate user"
                      >
                        <UserX className="w-4 h-4" />
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleStatusToggle(user)}
                        className="text-green-600 hover:text-green-800 dark:text-green-400"
                        title="Activate user"
                      >
                        <UserCheck className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                  {searchTerm ? (
                    <div>
                      <p className="text-lg font-medium">No users found</p>
                      <p className="text-sm">No users match your search criteria for username or email "{searchTerm}"</p>
                    </div>
                  ) : (
                    <p>No users available</p>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      {/* User Info Modal */}
      {selectedUserId && (
        <UserInfoModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          userId={selectedUserId}
        />
      )}

      {/* User Status Modal */}
      {statusModalUser && (
        <UserStatusModal
          isOpen={isStatusModalOpen}
          onClose={handleCloseStatusModal}
          userId={statusModalUser.id}
          currentStatus={statusModalUser.status}
          userName={statusModalUser.name}
        />
      )}
    </>
  );
}