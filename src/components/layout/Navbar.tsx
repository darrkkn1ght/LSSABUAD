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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-secondary z-[60] lg:hidden flex flex-col"
          >
            {/* Drawer Header */}
            <div className="h-20 container flex items-center justify-between border-b border-white/5">
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="/logo.png" alt="LSS ABUAD Logo" className="h-10 w-auto brightness-0 invert" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
                className="text-white hover:bg-white/10 h-12 w-12 rounded-full"
              >
                <X className="h-8 w-8" />
              </Button>
            </div>

            {/* Decorative Background for Drawer */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/20 blur-[100px] rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full" />
              <img src="/logo.png" alt="" className="absolute bottom-[-10%] right-[-10%] h-[60%] w-auto opacity-5 grayscale" />
            </div>

            <div className="flex-1 relative z-10 container py-12 flex flex-col justify-between overflow-y-auto">
              <motion.div 
                className="flex flex-col gap-6"
                initial="initial"
                animate="animate"
                variants={{
                  animate: { transition: { staggerChildren: 0.05 } }
                }}
              >
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.to;
                  return (
                    <motion.div
                      key={link.to}
                      variants={{
                        initial: { opacity: 0, x: 20 },
                        animate: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col"
                      >
                        <div className="flex items-center gap-4">
                          <span className={`h-px w-0 bg-primary transition-all duration-300 ${isActive ? 'w-8' : 'group-hover:w-4'}`} />
                          <span className={`font-display text-4xl font-bold transition-colors ${
                            isActive ? 'text-white' : 'text-white/40 hover:text-white'
                          }`}>
                            {link.label}
                          </span>
                        </div>
                        {isActive && (
                          <span className="text-[10px] text-primary font-ui uppercase tracking-[0.3em] font-bold mt-1 ml-12">
                            Current Page
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 pt-8 border-t border-white/5 flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-white/40 font-ui text-xs uppercase tracking-widest">
                  <span>Connect With Us</span>
                  <div className="flex-1 h-px bg-white/5" />
                </div>
                <div className="flex gap-4">
                  <Button asChild variant="outline" className="flex-1 h-12 rounded-xl border-white/10 text-white hover:bg-white/5">
                    <Link to="/contact">Send Inquiry</Link>
                  </Button>
                  <Button asChild className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white">
                    <Link to="/pay-dues">Student Portal</Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
