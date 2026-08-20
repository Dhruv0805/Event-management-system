import { Link } from 'react-router-dom';
import Table from '../common/Table';
import Badge from '../common/Badge';
import Button from '../common/Button';

const statusTone = {
  upcoming: 'blue',
  published: 'green',
  completed: 'gray',
  cancelled: 'red',
  draft: 'amber',
};

// Table-driven view of Admin → Event Management (docs section 13):
// create/edit/delete plus a link into per-event registration & volunteer
// management. Purely presentational — the page owns data + handlers.
const EventManagement = ({ events, onEdit, onDelete }) => {
  const columns = [
    { key: 'title', header: 'Event' },
    {
      key: 'date',
      header: 'Date',
      render: (row) => new Date(row.date).toLocaleDateString(),
    },
    { key: 'venue', header: 'Venue' },
    { key: 'capacity', header: 'Capacity' },
    {
      key: 'status',
      header: 'Status',
      render: (row) => <Badge tone={statusTone[row.status] || 'blue'}>{row.status}</Badge>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Link to={`/admin/events/${row._id}`}>
            <Button variant="secondary" size="sm">
              Manage
            </Button>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => onEdit(row)}>
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={() => onDelete(row._id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table columns={columns} data={events} emptyMessage="No events created yet." />;
};

export default EventManagement;
