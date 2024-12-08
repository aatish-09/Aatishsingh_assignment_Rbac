import React from 'react';
import { useStore } from '../store/useStore';

export function RoleHierarchy() {
  const { roles } = useStore();

  const buildHierarchy = () => {
    const hierarchy: { [key: string]: string[] } = {};
    const rootRoles: string[] = [];

    roles.forEach((role) => {
      if (role.parentRole) {
        if (!hierarchy[role.parentRole]) {
          hierarchy[role.parentRole] = [];
        }
        hierarchy[role.parentRole].push(role.id);
      } else {
        rootRoles.push(role.id);
      }
    });

    return { hierarchy, rootRoles };
  };

  const renderRole = (roleId: string, level: number = 0) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return null;

    const { hierarchy } = buildHierarchy();
    const children = hierarchy[roleId] || [];

    return (
      <div key={role.id} style={{ marginLeft: `${level * 24}px` }}>
        <div className="my-2 flex items-center rounded-lg border bg-white p-3 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 dark:text-white">{role.name}</h4>
            <div className="mt-1 flex flex-wrap gap-1">
              {role.permissions.map((permission) => (
                <span
                  key={permission.id}
                  className="inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {permission.name}
                </span>
              ))}
            </div>
          </div>
        </div>
        {children.map((childId) => renderRole(childId, level + 1))}
      </div>
    );
  };

  const { rootRoles } = buildHierarchy();

  return (
    <div className="space-y-4 rounded-lg border bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Role Hierarchy
      </h3>
      <div className="space-y-2">
        {rootRoles.map((roleId) => renderRole(roleId))}
      </div>
    </div>
  );
}