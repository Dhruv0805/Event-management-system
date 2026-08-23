import { useEffect, useState } from 'react';
import { fetchUsers, updateUserStatus } from '../services/userService';
import { getErrorMessage } from '../services/api';
import UserManagement from '../components/admin/UserManagement';
import SearchBar from '../components/common/SearchBar';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    fetchUsers({ search })
      .then((res) => setUsers(res.data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timeout = setTimeout(load, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleToggleStatus = async (user) => {
    const nextStatus = user.status === 'active' ? 'blocked' : 'active';
    try {
      await updateUserStatus(user._id, nextStatus);
      load();
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-headline-md text-text-primary">User Management</h1>
      <div className="sm:max-w-sm">
        <SearchBar value={search} onChange={setSearch} placeholder="Search users by name or email..." />
      </div>

      {loading && <Loader label="Loading users..." />}
      {!loading && error && <ErrorMessage message={error} onRetry={load} />}
      {!loading && !error && (
        <div className="card-surface p-md">
          <UserManagement users={users} onToggleStatus={handleToggleStatus} />
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
