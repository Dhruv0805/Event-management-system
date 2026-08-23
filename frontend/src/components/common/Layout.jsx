import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import Footer from './Footer';
import PageTransition from './PageTransition';

// Shell for the User section: Navbar + animated content + Footer.
// Admin pages use AdminLayout instead, so the two sections stay
// independent per the app's modular architecture.
const Layout = () => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative mx-auto w-full max-w-[1440px] flex-1 overflow-hidden px-sm sm:px-lg py-lg">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
