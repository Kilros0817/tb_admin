'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Activity, Calendar, User } from 'lucide-react';

interface ActivityLog {
  id: number;
  timestamp: string;
  action: string;
  documentName: string;
  details: string;
}

export default function UserActivityLog() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params.id as string);

  // Get user name based on ID
  const getUserName = (id: number): string => {
    const users = [
      { id: 1, name: 'John Smith' },
      { id: 2, name: 'Sarah Johnson' },
      { id: 3, name: 'Mike Chen' },
      { id: 4, name: 'Emily Davis' },
      { id: 5, name: 'Robert Wilson' }
    ];
    return users.find(user => user.id === id)?.name || 'Unknown User';
  };

  // Get activity logs for specific user
  const getUserActivityLogs = (id: number): ActivityLog[] => {
    const allActivities = [
      // John Smith (ID: 1)
      { id: 1, timestamp: '2024-01-15 10:30:00', action: 'Create Document', documentName: 'Q1 Financial Report', details: 'Created new document' },
      { id: 4, timestamp: '2024-01-15 09:30:00', action: 'Login', documentName: '-', details: 'User logged into system' },
      { id: 9, timestamp: '2024-01-13 14:45:00', action: 'Access Document', documentName: 'Budget Analysis', details: 'Opened document for viewing' },
      { id: 10, timestamp: '2024-01-12 16:20:00', action: 'Edit Document', documentName: 'Q1 Financial Report', details: 'Modified financial data section' },
      
      // Sarah Johnson (ID: 2)
      { id: 2, timestamp: '2024-01-15 10:15:00', action: 'Access Document', documentName: 'Marketing Strategy 2024', details: 'Opened document for viewing' },
      { id: 6, timestamp: '2024-01-15 08:45:00', action: 'Login', documentName: '-', details: 'User logged into system' },
      { id: 11, timestamp: '2024-01-12 11:20:00', action: 'Create Document', documentName: 'Meeting Notes', details: 'Created new document' },
      { id: 12, timestamp: '2024-01-11 09:30:00', action: 'Document Export', documentName: 'Marketing Strategy 2024', details: 'Exported as PDF' },
      
      // Mike Chen (ID: 3)
      { id: 3, timestamp: '2024-01-15 09:45:00', action: 'Edit Document', documentName: 'Employee Handbook', details: 'Modified section 3.2' },
      { id: 8, timestamp: '2024-01-14 16:20:00', action: 'Login', documentName: '-', details: 'User logged into system' },
      { id: 13, timestamp: '2024-01-11 15:10:00', action: 'Create Document', documentName: 'Technical Specifications', details: 'Created new document' },
      { id: 14, timestamp: '2024-01-10 14:30:00', action: 'Access Document', documentName: 'Employee Handbook', details: 'Opened document for viewing' },
      
      // Emily Davis (ID: 4)
      { id: 5, timestamp: '2024-01-15 09:20:00', action: 'Document Export', documentName: 'Project Timeline', details: 'Exported as PDF' },
      { id: 15, timestamp: '2024-01-12 08:20:00', action: 'Create Document', documentName: 'Project Timeline', details: 'Created new document' },
      { id: 16, timestamp: '2024-01-10 14:15:00', action: 'Login', documentName: '-', details: 'User logged into system' },
      
      // Robert Wilson (ID: 5)
      { id: 7, timestamp: '2024-01-14 16:30:00', action: 'Access Document', documentName: 'Company Policies', details: 'Opened document for viewing' },
      { id: 17, timestamp: '2024-01-15 07:30:00', action: 'Login', documentName: '-', details: 'User logged into system' },
      { id: 18, timestamp: '2024-01-08 16:30:00', action: 'Create Document', documentName: 'Company Policies', details: 'Created new document' }
    ];

    // Filter activities by user ID and sort by timestamp (newest first)
    const userActivities = allActivities.filter(activity => {
      switch (id) {
        case 1: return [1, 4, 9, 10].includes(activity.id);
        case 2: return [2, 6, 11, 12].includes(activity.id);
        case 3: return [3, 8, 13, 14].includes(activity.id);
        case 4: return [5, 15, 16].includes(activity.id);
        case 5: return [7, 17, 18].includes(activity.id);
        default: return false;
      }
    });

    return userActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  };

  const userName = getUserName(userId);
  const activityLogs = getUserActivityLogs(userId);

  const getActionBadge = (action: string) => {
    const colors = {
      'Login': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      'Create Document': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'Edit Document': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
      'Access Document': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
      'Document Export': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
    };
    return `${colors[action as keyof typeof colors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'} px-2 py-1 rounded-full text-xs font-medium`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              title="Go back"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">User Activity Log</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Activity history for {userName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
          {/* User Info Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{userName}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total activities: {activityLogs.length}</p>
              </div>
            </div>
          </div>

          {/* Activity Log Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {activityLogs.length > 0 ? (
                  activityLogs.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(activity.timestamp).toLocaleString()}
                          </span>
                        </div>
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      <div>
                        <Activity className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-lg font-medium">No activity found</p>
                        <p className="text-sm">This user has no recorded activity yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}