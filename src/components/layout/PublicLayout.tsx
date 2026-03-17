import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="noise-overlay" />
      <Navbar />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
