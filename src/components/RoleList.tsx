import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Role } from '../types';

interface RoleListProps {
  onEdit: (role: Role) => void;
}

export function RoleList({ onEdit }: RoleListProps) {
  const { roles, deleteRole, logActivity } = useStore();
  const [search, setSearch] = React.useState('');

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (role: Role) => {
    if (confirm('Are you sure you want to delete this role?')) {
      deleteRole(role.id);
      logActivity({
        action: 'delete',
        entityType: 'role',
        entityId: role.id,
        details: `Deleted role: ${role.name}`,
        performedBy: 'Admin',
      });
    }
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search roles..."
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
                Permissions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {filteredRoles.map((role) => (
              <tr key={role.id}>
                <td className="whitespace-nowrap px-6 py-4 dark:text-white">
                  {role.name}
                </td>
                <td className="px-6 py-4 dark:text-white">
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.map((permission) => (
                      <span
                        key={permission.id}
                        className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {permission.name}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(role)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(role)}
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