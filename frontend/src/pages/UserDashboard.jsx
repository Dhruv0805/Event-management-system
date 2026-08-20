import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMyRegistrations } from '../services/registrationService';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const UserDashboard = () => {
  const { account } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRegistrations()
      .then((res) => setRegistrations(res.data))
      .finally(() => setLoading(false));
  }, []);

  const confirmed = registrations.filter((r) => r.status === 'confirmed');
  const upcoming = confirmed.filter((r) => r.eventId && new Date(r.eventId.date) >= new Date());

  if (loading) return <Loader fullPage label="Loading your dashboard..." />;

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-headline-md text-text-primary">Welcome, {account?.name?.split(' ')[0]}</h1>
        <p className="text-body-md text-text-muted">Here's a quick overview of your activity.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="card-surface p-md">
          <p className="text-label-md text-text-muted">Total Registrations</p>
          <p className="text-headline-md text-text-primary">{confirmed.length}</p>
        </div>
        <div className="card-surface p-md">
          <p className="text-label-md text-text-muted">Upcoming Events</p>
          <p className="text-headline-md text-text-primary">{upcoming.length}</p>
        </div>
        <div className="card-surface p-md">
          <p className="text-label-md text-text-muted">Account Status</p>
          <Badge tone="green">Active</Badge>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link to="/events">
          <Button>Browse Events</Button>
        </Link>
        <Link to="/my-events">
          <Button variant="secondary">View My Events</Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost">Manage Profile</Button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
