import { X, Copy, User, Mail, Building, Shield, Wallet, Calendar, Clock } from 'lucide-react';
import { useState } from 'react';

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
}

interface UserDetails {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  roleInCompany: string;
  status: string;
  walletAddress: string;
  walletBalance: string;
  registerDate: string;
  lastLoginDate: string;
}

export default function UserInfoModal({ isOpen, onClose, userId }: UserInfoModalProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Dummy data for user details
  const getUserDetails = (id: number): UserDetails => {
    const users: UserDetails[] = [
      {
        id: 1,
        username: 'johnsmith',
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@company.com',
        companyName: 'TechCorp Solutions',
        roleInCompany: 'Senior Developer',
        status: 'Active',
        walletAddress: '0x1234567890abcdef1234567890abcdef12345678',
        walletBalance: '2.45 ETH',
        registerDate: '2023-03-15',
        lastLoginDate: '2024-01-15 09:30:00'
      },
      {
        id: 2,
        username: 'sarahjohnson',
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@company.com',
        companyName: 'Digital Innovations Inc',
        roleInCompany: 'Product Manager',
        status: 'Active',
        walletAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
        walletBalance: '1.87 ETH',
        registerDate: '2023-05-22',
        lastLoginDate: '2024-01-15 08:45:00'
      },
      {
        id: 3,
        username: 'mikechen',
        firstName: 'Mike',
        lastName: 'Chen',
        email: 'mike.chen@company.com',
        companyName: 'CloudTech Systems',
        roleInCompany: 'System Administrator',
        status: 'Active',
        walletAddress: '0x9876543210fedcba9876543210fedcba98765432',
        walletBalance: '5.12 ETH',
        registerDate: '2022-11-08',
        lastLoginDate: '2024-01-14 16:20:00'
      },
      {
        id: 4,
        username: 'emilydavis',
        firstName: 'Emily',
        lastName: 'Davis',
        email: 'emily.davis@company.com',
        companyName: 'StartupHub LLC',
        roleInCompany: 'UX Designer',
        status: 'Inactive',
        walletAddress: '0xfedcba0987654321fedcba0987654321fedcba09',
        walletBalance: '0.93 ETH',
        registerDate: '2023-07-12',
        lastLoginDate: '2024-01-10 14:15:00'
      },
      {
        id: 5,
        username: 'robertwilson',
        firstName: 'Robert',
        lastName: 'Wilson',
        email: 'robert.wilson@company.com',
        companyName: 'Enterprise Solutions',
        roleInCompany: 'Business Analyst',
        status: 'Active',
        walletAddress: '0x5555666677778888999900001111222233334444',
        walletBalance: '3.28 ETH',
        registerDate: '2023-01-30',
        lastLoginDate: '2024-01-15 07:30:00'
      }
    ];

    return users.find(user => user.id === id) || users[0];
  };

  const userDetails = getUserDetails(userId);

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const getStatusBadge = (status: string) => {
    return status === 'Active' 
      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium'
      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">User Information</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</label>
                  <p className="text-gray-900 dark:text-white">{userDetails.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white">{userDetails.firstName} {userDetails.lastName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email Address</label>
                  <p className="text-gray-900 dark:text-white">{userDetails.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Building className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company Name</label>
                  <p className="text-gray-900 dark:text-white">{userDetails.companyName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Role in Company</label>
                  <p className="text-gray-900 dark:text-white">{userDetails.roleInCompany}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status</label>
                  <div className="mt-1">
                    <span className={getStatusBadge(userDetails.status)}>{userDetails.status}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wallet Info */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
              <Wallet className="w-5 h-5 mr-2" />
              Wallet Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm font-mono text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded">
                    {userDetails.walletAddress.slice(0, 6)}...{userDetails.walletAddress.slice(-6)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(userDetails.walletAddress)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
                    title="Copy wallet address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  {copiedAddress && (
                    <span className="text-xs text-green-600 dark:text-green-400">Copied!</span>
                  )}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Wallet Balance</label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{userDetails.walletBalance}</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Register Date</label>
                  <p className="text-gray-900 dark:text-white">{new Date(userDetails.registerDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-400" />
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</label>
                  <p className="text-gray-900 dark:text-white">{new Date(userDetails.lastLoginDate).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}