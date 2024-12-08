import React from 'react';
import { Permission } from '../types';
import { useStore } from '../store/useStore';

interface PermissionFormProps {
  permission?: Permission;
  onClose: () => void;
}

export function PermissionForm({ permission, onClose }: PermissionFormProps) {
  const { addPermission, updatePermission, logActivity } = useStore();
  const [formData, setFormData] = React.useState({
    name: permission?.name || '',
    description: permission?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (permission) {
      updatePermission(permission.id, formData);
      logActivity({
        action: 'update',
        entityType: 'permission',
        entityId: permission.id,
        details: `Updated permission: ${formData.name}`,
        performedBy: 'Admin',
      });
    } else {
      addPermission(formData);
      logActivity({
        action: 'create',
        entityType: 'permission',
        entityId: 'new',
        details: `Created permission: ${formData.name}`,
        performedBy: 'Admin',
      });
    }
    onClose();
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
          Description
        </label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
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
          {permission ? 'Update' : 'Create'} Permission
        </button>
      </div>
    </form>
  );
}