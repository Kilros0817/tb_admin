'use client';

import { Download } from 'lucide-react';

interface Activity {
  id: number;
  timestamp: string;
  userName: string;
  action: string;
  documentName: string;
  details: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
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
  );
}