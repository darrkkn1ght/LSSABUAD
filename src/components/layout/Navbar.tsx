import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Scale, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchOverlay } from '@/components/shared/SearchOverlay';
import { Button } from '@/components/ui/button';

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
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="LSS ABUAD Logo" className="h-10 md:h-14 w-auto transition-transform hover:scale-105" />
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
          
          <div className="ml-4 pl-4 border-l border-border/50 flex items-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-2 text-secondary/40 hover:text-primary h-10 px-4 rounded-full bg-secondary/5 hover:bg-primary/5 transition-all duration-300"
            >
              <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
              <span className="text-[10px] items-center gap-1 font-ui uppercase tracking-widest hidden xl:flex">
                Search <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 uppercase tracking-normal">⌘K</kbd>
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSearchOpen(true)}
            className="text-secondary"
          >
            <Search className="h-5 w-5" />
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className="text-secondary p-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />

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
