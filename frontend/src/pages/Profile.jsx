import { useEffect, useState } from 'react';
import { fetchProfile, updateProfile } from '../services/userService';
import { getErrorMessage } from '../services/api';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';

const Profile = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile()
      .then((res) => setForm({ name: res.data.name, email: res.data.email, phone: res.data.phone || '' }))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');
    try {
      await updateProfile({ name: form.name, phone: form.phone });
      setMessage('Profile updated successfully.');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader fullPage label="Loading profile..." />;

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-6">
      <h1 className="text-headline-md text-text-primary">My Profile</h1>
      <form onSubmit={handleSubmit} className="card-surface flex flex-col gap-4 p-lg">
        {message && <p className="rounded bg-success/10 p-3 text-label-md text-success">{message}</p>}
        {error && <p className="rounded bg-danger/10 p-3 text-label-md text-danger">{error}</p>}
        <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
        <Input label="Email" name="email" value={form.email} disabled />
        <Input label="Phone" name="phone" value={form.phone} onChange={handleChange} />
        <Button type="submit" loading={saving} className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default Profile;
