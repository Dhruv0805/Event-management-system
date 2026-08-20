import Button from '../common/Button';

// Confirmation step shown on the Event Details page before submitting
// a registration. Deliberately has no knowledge of the API layer —
// the parent page owns the submit handler and loading/error state.
const RegistrationForm = ({ event, onSubmit, loading, disabled, disabledReason }) => (
  <div className="card-surface flex flex-col gap-4 p-md">
    <h3 className="text-headline-sm text-text-primary">Register for this event</h3>
    <ul className="flex flex-col gap-1 text-body-md text-text-secondary">
      <li>📅 {new Date(event.date).toLocaleDateString()}</li>
      <li>🕒 {event.startTime} - {event.endTime}</li>
      <li>📍 {event.venue}</li>
      <li>🎟️ {event.availableSeats} seat(s) available</li>
    </ul>
    {disabled && disabledReason && <p className="text-label-md text-danger">{disabledReason}</p>}
    <Button onClick={onSubmit} loading={loading} disabled={disabled} className="w-full">
      Confirm Registration
    </Button>
  </div>
);

export default RegistrationForm;
