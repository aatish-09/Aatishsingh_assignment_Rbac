import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Permission } from '../types';

interface PermissionListProps {
  onEdit: (permission: Permission) => void;
}

export function PermissionList({ onEdit }: PermissionListProps) {
  const { permissions, deletePermission, logActivity } = useStore();
  const [search, setSearch] = React.useState('');

  const filteredPermissions = permissions.filter(
    (permission) =>
      permission.name.toLowerCase().includes(search.toLowerCase()) ||
      permission.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (permission: Permission) => {
    if (confirm('Are you sure you want to delete this permission?')) {
      deletePermission(permission.id);
      logActivity({
        action: 'delete',
        entityType: 'permission',
        entityId: permission.id,
        details: `Deleted permission: ${permission.name}`,
        performedBy: 'Admin',
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search permissions..."
          className="w-full rounded-lg border p-2 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {filteredPermissions.map((permission) => (
              <tr key={permission.id}>
                <td className="whitespace-nowrap px-6 py-4 dark:text-white">
                  {permission.name}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  {permission.description}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(permission)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(permission)}
                      className="rounded p-1 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
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