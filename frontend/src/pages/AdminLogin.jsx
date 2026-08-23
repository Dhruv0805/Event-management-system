import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

// Admin (Office Section) login is intentionally a separate page/route
// from the User login, per docs section 28.
const AdminLogin = () => {
  const { adminLogin } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await adminLogin(form);
    setLoading(false);
    if (result.success) {
      navigate('/admin/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 py-xl">
      <div className="text-center">
        <h1 className="font-display text-headline-md text-text-primary">Office Section</h1>
        <p className="text-body-md text-text-muted">Admin login for event management.</p>
      </div>

      <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 p-lg">
        {error && <p className="rounded bg-danger/10 p-3 text-label-md text-danger">{error}</p>}
        <Input label="Admin Email" name="email" type="email" value={form.email} onChange={handleChange} required />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" loading={loading} className="w-full">
          Login as Admin
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
