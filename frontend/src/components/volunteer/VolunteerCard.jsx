import Badge from '../common/Badge';
import Button from '../common/Button';

const statusTone = { assigned: 'blue', 'in-progress': 'amber', completed: 'green' };

// Event-scoped volunteer display (docs section 14) — volunteers belong
// to one event only, so this never references a global volunteer list.
const VolunteerCard = ({ volunteer, onEdit, onRemove }) => (
  <div className="card-surface flex flex-col gap-2 p-md">
    <div className="flex items-center justify-between">
      <h4 className="text-headline-sm text-text-primary">{volunteer.name}</h4>
      <Badge tone={statusTone[volunteer.status] || 'blue'}>{volunteer.status}</Badge>
    </div>
    <p className="text-body-md text-text-secondary">📞 {volunteer.contact}</p>
    {volunteer.email && <p className="text-body-md text-text-secondary">✉️ {volunteer.email}</p>}
    <p className="text-body-md text-text-primary">
      <span className="text-text-muted">Task:</span> {volunteer.task}
    </p>
    {volunteer.notes && <p className="text-label-md text-text-muted">{volunteer.notes}</p>}
    <div className="mt-2 flex gap-2">
      <Button variant="secondary" size="sm" onClick={() => onEdit(volunteer)}>
        Edit
      </Button>
      <Button variant="danger" size="sm" onClick={() => onRemove(volunteer._id)}>
        Remove
      </Button>
    </div>
  </div>
);

export default VolunteerCard;
