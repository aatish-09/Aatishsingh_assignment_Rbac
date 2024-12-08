import React from 'react';
import { Role } from '../types';
import { useStore } from '../store/useStore';

interface RoleFormProps {
  role?: Role;
  onClose: () => void;
}

export function RoleForm({ role, onClose }: RoleFormProps) {
  const { permissions, addRole, updateRole, logActivity } = useStore();
  const [formData, setFormData] = React.useState({
    name: role?.name || '',
    permissionIds: role?.permissions.map((p) => p.id) || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPermissions = permissions.filter((p) =>
      formData.permissionIds.includes(p.id)
    );

    if (role) {
      updateRole(role.id, {
        name: formData.name,
        permissions: selectedPermissions,
      });
      logActivity({
        action: 'update',
        entityType: 'role',
        entityId: role.id,
        details: `Updated role: ${formData.name}`,
        performedBy: 'Admin',
      });
    } else {
      addRole({
        name: formData.name,
        permissions: selectedPermissions,
      });
      logActivity({
        action: 'create',
        entityType: 'role',
        entityId: 'new',
        details: `Created role: ${formData.name}`,
        performedBy: 'Admin',
      });
    }
    onClose();
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissionIds: prev.permissionIds.includes(permissionId)
        ? prev.permissionIds.filter((id) => id !== permissionId)
        : [...prev.permissionIds, permissionId],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Permissions
        </label>
        <div className="mt-2 space-y-2">
          {permissions.map((permission) => (
            <label
              key={permission.id}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={formData.permissionIds.includes(permission.id)}
                onChange={() => handlePermissionToggle(permission.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-700"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {permission.name} - {permission.description}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {role ? 'Update' : 'Create'} Role
        </button>
      </div>
    </form>
  );
}