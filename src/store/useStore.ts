import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockUsers, mockRoles, mockPermissions } from '../data/mockData';
import { Permission, Role, User, ActivityLog, Notification } from '../types';

interface Store {
  users: User[];
  roles: Role[];
  permissions: Permission[];
  activityLogs: ActivityLog[];
  notifications: Notification[];
  darkMode: boolean;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  addRole: (role: Omit<Role, 'id'>) => void;
  updateRole: (id: string, role: Partial<Role>) => void;
  deleteRole: (id: string) => void;
  addPermission: (permission: Omit<Permission, 'id'>) => void;
  updatePermission: (id: string, permission: Partial<Permission>) => void;
  deletePermission: (id: string) => void;
  logActivity: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
  toggleDarkMode: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      users: mockUsers,
      roles: mockRoles,
      permissions: mockPermissions,
      activityLogs: [],
      notifications: [],
      darkMode: false,

      addUser: (user) =>
        set((state) => {
          const newUser = { ...user, id: crypto.randomUUID() };
          return { users: [...state.users, newUser] };
        }),

      updateUser: (id, user) =>
        set((state) => ({
          users: state.users.map((u) => (u.id === id ? { ...u, ...user } : u)),
        })),

      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((u) => u.id !== id),
        })),

      addRole: (role) =>
        set((state) => ({
          roles: [...state.roles, { ...role, id: crypto.randomUUID() }],
        })),

      updateRole: (id, role) =>
        set((state) => ({
          roles: state.roles.map((r) => (r.id === id ? { ...r, ...role } : r)),
        })),

      deleteRole: (id) =>
        set((state) => ({
          roles: state.roles.filter((r) => r.id !== id),
        })),

      addPermission: (permission) =>
        set((state) => ({
          permissions: [...state.permissions, { ...permission, id: crypto.randomUUID() }],
        })),

      updatePermission: (id, permission) =>
        set((state) => ({
          permissions: state.permissions.map((p) =>
            p.id === id ? { ...p, ...permission } : p
          ),
        })),

      deletePermission: (id) =>
        set((state) => ({
          permissions: state.permissions.filter((p) => p.id !== id),
        })),

      logActivity: (log) =>
        set((state) => {
          const newLog = {
            ...log,
            id: crypto.randomUUID(),
            timestamp: new Date(),
          };
          return {
            activityLogs: [newLog, ...state.activityLogs],
          };
        }),

      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: crypto.randomUUID(),
              timestamp: new Date(),
              read: false,
            },
            ...state.notifications,
          ],
        })),

      markNotificationAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      clearNotifications: () =>
        set({
          notifications: [],
        }),

      toggleDarkMode: () =>
        set((state) => ({
          darkMode: !state.darkMode,
        })),
    }),
    {
      name: 'rbac-storage',
    }
  )
);