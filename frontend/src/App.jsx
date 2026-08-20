import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './routes/ProtectedRoute';

import Layout from './components/common/Layout';
import NotFound from './components/common/NotFound';

import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import MyEvents from './pages/MyEvents';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';

import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminEvents from './pages/AdminEvents';
import AdminEventDetail from './pages/AdminEventDetail';
import AdminRegistrations from './pages/AdminRegistrations';
import AdminVolunteers from './pages/AdminVolunteers';
import AdminUsers from './pages/AdminUsers';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Routes>
          {/* User Section */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/login" element={<AdminLogin />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute role="user">
                  <UserDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-events"
              element={
                <ProtectedRoute role="user">
                  <MyEvents />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute role="user">
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/notifications"
              element={
                <ProtectedRoute role="user">
                  <Notifications />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Office Section (Admin) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="events/:id" element={<AdminEventDetail />} />
            <Route path="registrations" element={<AdminRegistrations />} />
            <Route path="volunteers" element={<AdminVolunteers />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route element={<Layout />}>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
