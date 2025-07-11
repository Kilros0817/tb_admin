import { X, UserCheck, UserX, AlertTriangle } from 'lucide-react';

interface UserStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: number;
  currentStatus: string;
  userName: string;
}

export default function UserStatusModal({ isOpen, onClose, userId, currentStatus, userName }: UserStatusModalProps) {
  const isActive = currentStatus === 'Active';
  const newStatus = isActive ? 'Inactive' : 'Active';
  const actionText = isActive ? 'deactivate' : 'activate';
  const ActionIcon = isActive ? UserX : UserCheck;
  const iconColor = isActive ? 'text-red-500' : 'text-green-500';
  const buttonColor = isActive 
    ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
    : 'bg-green-600 hover:bg-green-700 focus:ring-green-500';

  const handleConfirm = () => {
    // Here you would typically make an API call to update the user status
    console.log(`${actionText} user ${userId} (${userName})`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isActive ? 'Deactivate' : 'Activate'} User
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isActive ? 'bg-red-100 dark:bg-red-900' : 'bg-green-100 dark:bg-green-900'
            }`}>
              <ActionIcon className={`w-6 h-6 ${iconColor}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {isActive ? 'Deactivate' : 'Activate'} {userName}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Current status: <span className="font-medium">{currentStatus}</span>
              </p>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Confirm Status Change
                </h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                  Are you sure you want to {actionText} this user? This will change their status to{' '}
                  <span className="font-medium">{newStatus}</span>
                  {isActive && ' and they will lose access to the system'}.
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p><strong>User:</strong> {userName}</p>
            <p><strong>Current Status:</strong> {currentStatus}</p>
            <p><strong>New Status:</strong> {newStatus}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`px-4 py-2 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonColor}`}
          >
            {isActive ? 'Deactivate' : 'Activate'} User
          </button>
        </div>
      </div>
    </div>
  );
}