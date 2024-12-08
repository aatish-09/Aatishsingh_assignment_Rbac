import React from 'react';
import { useStore } from '../store/useStore';
import { User } from '../types';
import { ImageUpload } from './ImageUpload';

interface UserFormProps {
  user?: User;
  onClose: () => void;
}

export function UserForm({ user, onClose }: UserFormProps) {
  const { roles, addUser, updateUser, logActivity } = useStore();
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    roleId: user?.role.id || roles[0]?.id || '',
    status: user?.status || 'active',
    photo: user?.photo || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedRole = roles.find((r) => r.id === formData.roleId);
    if (!selectedRole) {
      console.error('Role not found');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      role: selectedRole,
      status: formData.status as 'active' | 'inactive',
      photo: formData.photo,
    };

    if (user) {
      updateUser(user.id, userData);
      logActivity({
        action: 'update',
        entityType: 'user',
        entityId: user.id,
        details: `Updated user: ${userData.name}`,
        performedBy: 'Admin',
      });
    } else {
      addUser(userData);
      logActivity({
        action: 'create',
        entityType: 'user',
        entityId: 'new',
        details: `Created user: ${userData.name}`,
        performedBy: 'Admin',
      });
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6">
        <ImageUpload
          currentImage={formData.photo}
          onImageSelected={(imageData) =>
            setFormData({ ...formData, photo: imageData })
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <select
          required
          value={formData.roleId}
          onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="">Select a role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) =>
            setFormData({
              ...formData,
              status: e.target.value as 'active' | 'inactive',
            })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="mt-6 flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {user ? 'Update' : 'Create'} User
        </button>
      </div>
    </form>
  );
}