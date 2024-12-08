import { Permission, Role, User } from '../types';

export const mockPermissions: Permission[] = [
  { id: '1', name: 'read:users', description: 'View users' },
  { id: '2', name: 'write:users', description: 'Create/Edit users' },
  { id: '3', name: 'delete:users', description: 'Delete users' },
  { id: '4', name: 'read:roles', description: 'View roles' },
  { id: '5', name: 'write:roles', description: 'Create/Edit roles' },
  { id: '6', name: 'delete:roles', description: 'Delete roles' },
];

export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    permissions: mockPermissions,
  },
  {
    id: '2',
    name: 'Editor',
    permissions: mockPermissions.filter((p) => !p.name.startsWith('delete')),
  },
  {
    id: '3',
    name: 'Viewer',
    permissions: mockPermissions.filter((p) => p.name.startsWith('read')),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: mockRoles[0],
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: mockRoles[1],
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: mockRoles[2],
    status: 'inactive',
  },
];