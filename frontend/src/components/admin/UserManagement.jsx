import Table from '../common/Table';
import Badge from '../common/Badge';
import Button from '../common/Button';

// Admin → User Management (docs section 16): lists registered users
// and lets the Admin toggle their account status.
const UserManagement = ({ users, onToggleStatus }) => {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone', render: (row) => row.phone || '—' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <Badge tone={row.status === 'active' ? 'green' : 'red'}>{row.status}</Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <Button
          variant={row.status === 'active' ? 'danger' : 'secondary'}
          size="sm"
          onClick={() => onToggleStatus(row)}
        >
          {row.status === 'active' ? 'Block' : 'Unblock'}
        </Button>
      ),
    },
  ];

  return <Table columns={columns} data={users} emptyMessage="No users registered yet." />;
};

export default UserManagement;
