import React from 'react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';

export function ActivityLog() {
  const { activityLogs } = useStore();

  if (!activityLogs || activityLogs.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 dark:text-gray-400">
        No recent activity.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-lg border bg-white shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Recent Activity
          </h3>
        </div>
        <div className="max-h-96 overflow-y-auto">
          <ul
            className="divide-y divide-gray-200 dark:divide-gray-700"
            aria-live="polite"
          >
            {activityLogs.map((log) => (
              <li key={log.id} className="p-4">
                <div className="flex space-x-3">
                  <div>
                    {/* Placeholder for an icon */}
                    <span role="img" aria-label="activity">
                      ⚙️
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900 dark:text-white">
                      {log.details}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDistanceToNow(new Date(log.timestamp))} ago by{' '}
                      {log.performedBy}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
