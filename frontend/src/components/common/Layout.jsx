import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Shell for the User section: Navbar + content + Footer.
// Admin pages use AdminLayout instead, so the two sections stay
// independent per the docs' modular architecture principle.
const Layout = () => (
  <div className="flex min-h-screen flex-col">
    <Navbar />
    <main className="mx-auto w-full max-w-[1440px] flex-1 px-sm sm:px-lg py-lg">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
