import { useEffect, useState } from 'react';
import { fetchNotifications, markNotificationRead } from '../services/notificationService';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import Badge from '../components/common/Badge';

const typeTone = { info: 'blue', success: 'green', warning: 'amber', reminder: 'violet' };

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications()
      .then((res) => setNotifications(res.data))
      .finally(() => setLoading(false));
  }, []);

  const handleClick = async (n) => {
    if (n.isRead) return;
    await markNotificationRead(n._id);
    setNotifications((prev) => prev.map((x) => (x._id === n._id ? { ...x, isRead: true } : x)));
  };

  if (loading) return <Loader fullPage label="Loading notifications..." />;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-headline-md text-text-primary">Notifications</h1>
      {notifications.length === 0 ? (
        <EmptyState title="No notifications" description="You're all caught up." />
      ) : (
        <div className="flex flex-col gap-3">
          {notifications.map((n) => (
            <button
              key={n._id}
              onClick={() => handleClick(n)}
              className={`card-surface flex flex-col gap-1 p-md text-left transition-opacity ${
                n.isRead ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-headline-sm text-text-primary">{n.title}</span>
                <Badge tone={typeTone[n.type] || 'blue'}>{n.type}</Badge>
              </div>
              <p className="text-body-md text-text-secondary">{n.message}</p>
              <span className="text-label-sm text-text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
