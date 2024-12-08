import React from 'react';
import { Layout } from './components/Layout';
import { UserList } from './components/UserList';
import { RoleList } from './components/RoleList';
import { PermissionList } from './components/PermissionList';
import { UserForm } from './components/UserForm';
import { RoleForm } from './components/RoleForm';
import { PermissionForm } from './components/PermissionForm';
import { ActivityLog } from './components/ActivityLog';
import { Modal } from './components/Modal';
import { Plus } from 'lucide-react';
import { User, Role, Permission } from './types';
import { useStore } from './store/useStore';

type View = 'users' | 'roles' | 'permissions';

function App() {
  const [currentView, setCurrentView] = React.useState<View>('users');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState<
    User | Role | Permission | null
  >(null);
  const darkMode = useStore((state) => state.darkMode);

  const handleAdd = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: User | Role | Permission) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const getModalTitle = () => {
    const action = selectedItem ? 'Edit' : 'Add';
    const type = currentView.slice(0, -1); // Remove 's' from plural
    return `${action} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
  };

  const getModalContent = () => {
    switch (currentView) {
      case 'users':
        return (
          <UserForm
            user={selectedItem as User}
            onClose={handleCloseModal}
          />
        );
      case 'roles':
        return (
          <RoleForm
            role={selectedItem as Role}
            onClose={handleCloseModal}
          />
        );
      case 'permissions':
        return (
          <PermissionForm
            permission={selectedItem as Permission}
            onClose={handleCloseModal}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        <div className="space-y-4 px-4 py-6 md:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-bold dark:text-white">
              {currentView.charAt(0).toUpperCase() + currentView.slice(1)}
            </h1>
            <button
              onClick={handleAdd}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add {currentView.slice(0, -1)}
            </button>
          </div>

          <div className="rounded-lg bg-white shadow-sm dark:bg-gray-800">
            {currentView === 'users' && <UserList onEdit={handleEdit} />}
            {currentView === 'roles' && <RoleList onEdit={handleEdit} />}
            {currentView === 'permissions' && (
              <PermissionList onEdit={handleEdit} />
            )}
          </div>

          <div className="mt-8">
            <ActivityLog />
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={getModalTitle()}
        >
          {getModalContent()}
        </Modal>
      </Layout>
    </div>
  );
}

export default App;