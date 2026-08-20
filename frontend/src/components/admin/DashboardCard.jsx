// Small metric tile used across the Admin Dashboard stat grid.
const DashboardCard = ({ label, value, icon }) => (
  <div className="card-surface flex items-center gap-4 p-md">
    {icon && <span className="text-3xl">{icon}</span>}
    <div>
      <p className="text-label-md text-text-muted">{label}</p>
      <p className="text-headline-md text-text-primary">{value}</p>
    </div>
  </div>
);

export default DashboardCard;
