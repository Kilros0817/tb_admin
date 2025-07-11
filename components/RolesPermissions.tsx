'use client';

interface Role {
  id: number;
  name: string;
  description: string;
  userCount: number;
  permissions: string[];
}

export default function RolesPermissions() {
  // Demo data moved to component level
  const roles: Role[] = [
    { id: 1, name: 'Admin', description: 'Full system access and user management', userCount: 2, permissions: ['Create', 'Read', 'Update', 'Delete', 'Manage Users'] },
    { id: 2, name: 'Editor', description: 'Can create and edit documents', userCount: 8, permissions: ['Create', 'Read', 'Update', 'Export'] },
    { id: 3, name: 'Viewer', description: 'Read-only access to documents', userCount: 15, permissions: ['Read'] }
  ];

  return (
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
  );
}