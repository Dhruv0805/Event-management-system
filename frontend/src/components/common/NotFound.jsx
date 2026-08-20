import { Link } from 'react-router-dom';
import Button from './Button';

const NotFound = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <h1 className="text-display-lg-mobile sm:text-display-lg text-text-primary">404</h1>
    <p className="text-body-lg text-text-muted">The page you're looking for doesn't exist.</p>
    <Link to="/">
      <Button>Back to Home</Button>
    </Link>
  </div>
);

export default NotFound;
