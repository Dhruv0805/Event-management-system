import { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, loginAdmin, registerUser, fetchMe } from '../services/authService';
import { getErrorMessage } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [account, setAccount] = useState(() => {
    const stored = localStorage.getItem('ems_account');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('ems_token');
    if (!token) {
      setLoading(false);
      return;
    }
    fetchMe()
      .then((res) => persistAccount(res.data))
      .catch(() => clearAccount())
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const persistAccount = (data) => {
    localStorage.setItem('ems_token', data.token || localStorage.getItem('ems_token'));
    localStorage.setItem('ems_account', JSON.stringify(data));
    setAccount(data);
  };

  const clearAccount = () => {
    localStorage.removeItem('ems_token');
    localStorage.removeItem('ems_account');
    setAccount(null);
  };

  const login = async (credentials) => {
    try {
      const res = await loginUser(credentials);
      persistAccount(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const adminLogin = async (credentials) => {
    try {
      const res = await loginAdmin(credentials);
      persistAccount(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const register = async (payload) => {
    try {
      const res = await registerUser(payload);
      persistAccount(res.data);
      return { success: true };
    } catch (error) {
      return { success: false, message: getErrorMessage(error) };
    }
  };

  const logout = () => clearAccount();

  return (
    <AuthContext.Provider
      value={{
        account,
        isAuthenticated: !!account,
        isAdmin: account?.role === 'admin',
        loading,
        login,
        adminLogin,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
