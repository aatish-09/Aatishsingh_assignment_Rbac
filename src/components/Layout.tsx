import React from 'react';
import { Menu, Users, Shield, Key, Sun, Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { useStore } from '../store/useStore';
import { NotificationCenter } from './NotificationCenter';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export function Layout({ children, currentView, onNavigate }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { darkMode, toggleDarkMode } = useStore();

  const navItems = [
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles', icon: Shield },
    { id: 'permissions', label: 'Permissions', icon: Key },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div
          className={clsx(
            'bg-white shadow-lg transition-all duration-300 dark:bg-gray-800',
            isSidebarOpen ? 'w-64' : 'w-20'
          )}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <h1
              className={clsx(
                'font-bold dark:text-white',
                isSidebarOpen ? 'text-xl' : 'hidden'
              )}
            >
              Admin Dashboard
            </h1>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6 dark:text-white" />
            </button>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={clsx(
                  'flex w-full items-center px-4 py-3 transition-colors',
                  currentView === item.id
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700'
                )}
              >
                <item.icon className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-3">{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
            <NotificationCenter />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <main className="p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}