import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(form);
    setLoading(false);
    if (result.success) {
      navigate(location.state?.from || '/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 py-xl">
      <div className="text-center">
        <h1 className="font-display text-headline-md text-text-primary">Welcome back</h1>
        <p className="text-body-md text-text-muted">Login to your account to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 p-lg">
        {error && <p className="rounded bg-danger/10 p-3 text-label-md text-danger">{error}</p>}
        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" loading={loading} className="w-full">
          Login
        </Button>
      </form>

      <p className="text-center text-body-md text-text-muted">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </p>
      <p className="text-center text-label-md text-text-muted">
        Are you an Admin?{' '}
        <Link to="/admin/login" className="text-primary hover:underline">
          Office login
        </Link>
      </p>
    </div>
  );
};

export default Login;
