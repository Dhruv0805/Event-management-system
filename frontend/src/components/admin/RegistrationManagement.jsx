import Table from '../common/Table';
import Badge from '../common/Badge';

const statusTone = { confirmed: 'green', cancelled: 'red', waitlisted: 'amber' };

// Admin → Registration Management (docs section 15): read-heavy table
// of who registered for which event.
const RegistrationManagement = ({ registrations }) => {
  const columns = [
    { key: 'participant', header: 'Participant', render: (row) => row.userId?.name || '—' },
    { key: 'email', header: 'Email', render: (row) => row.userId?.email || '—' },
    { key: 'event', header: 'Event', render: (row) => row.eventId?.title || '—' },
    {
      key: 'registrationDate',
      header: 'Registered On',
      render: (row) => new Date(row.registrationDate || row.createdAt).toLocaleDateString(),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge tone={statusTone[row.status] || 'blue'}>{row.status}</Badge>,
    },
  ];

  return <Table columns={columns} data={registrations} emptyMessage="No registrations yet." />;
};

export default RegistrationManagement;
