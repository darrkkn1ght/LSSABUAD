import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/executives', label: 'Executives' },
  { to: '/lecturers', label: 'Lecturers' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/timetable', label: 'Timetable' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/pay-dues', label: 'Pay Dues' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="LSS ABUAD Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2 text-sm font-ui transition-colors duration-200 relative ${
                  isActive ? 'text-secondary font-medium' : 'text-secondary/70 hover:text-primary'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-secondary p-2"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-20 bg-background z-40 lg:hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded font-ui text-base transition-colors duration-200 ${
                      isActive
                        ? 'bg-muted text-primary font-medium'
                        : 'text-secondary hover:text-primary hover:bg-muted'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
