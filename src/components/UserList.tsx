import React, { useState } from 'react';
import { Edit2, Trash2, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { User } from '../types';
import { Modal } from './Modal';
import { FilterPanel } from './FilterPanel';

interface UserListProps {
  onEdit: (user: User) => void;
}

export function UserList({ onEdit }: UserListProps) {
  const { users, deleteUser, logActivity } = useStore();
  const [search, setSearch] = useState('');
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [filters, setFilters] = useState({
    status: 'all',
    role: 'all',
  });

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus =
      filters.status === 'all' || user.status === filters.status;
    
    const matchesRole =
      filters.role === 'all' || user.role.name === filters.role;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleDeleteUser = () => {
    if (userToDelete) {
      deleteUser(userToDelete.id);
      logActivity({
        action: 'delete',
        entityType: 'user',
        entityId: userToDelete.id,
        details: `Deleted user: ${userToDelete.name}`,
        performedBy: 'Admin',
      });
      setDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-lg border p-2 pr-10 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          onClick={() => setIsFilterOpen(true)}
          className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center">
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white">
                  {user.role.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteModalOpen(true);
                      }}
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

      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />

      {isDeleteModalOpen && userToDelete && (
        <Modal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          title="Delete User"
        >
          <div className="mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Are you sure you want to delete {userToDelete.name}? This action cannot be
              undone.
            </p>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setDeleteModalOpen(false)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteUser}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}