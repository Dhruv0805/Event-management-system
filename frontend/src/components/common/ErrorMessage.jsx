const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => (
  <div className="card-surface flex flex-col items-center gap-3 p-lg text-center">
    <p className="text-body-md text-danger">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="text-label-md text-primary hover:underline">
        Try again
      </button>
    )}
  </div>
);

export default ErrorMessage;
