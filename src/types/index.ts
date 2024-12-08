export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: 'active' | 'inactive';
  photo?: string;
};

export type Role = {
  id: string;
  name: string;
  permissions: Permission[];
  parentRole?: string; // For role hierarchy
};

export type Permission = {
  id: string;
  name: string;
  description: string;
};

export type ActivityLog = {
  id: string;
  action: 'create' | 'update' | 'delete';
  entityType: 'user' | 'role' | 'permission';
  entityId: string;
  details: string;
  timestamp: Date;
  performedBy: string;
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
};