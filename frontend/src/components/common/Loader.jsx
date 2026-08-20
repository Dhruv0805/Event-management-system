const Loader = ({ label = 'Loading...', fullPage = false }) => (
  <div
    className={`flex flex-col items-center justify-center gap-3 text-text-secondary ${
      fullPage ? 'min-h-[50vh]' : 'py-10'
    }`}
  >
    <span className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
    <span className="text-body-md">{label}</span>
  </div>
);

export default Loader;
