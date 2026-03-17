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
    <>
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
      </nav>
  
      {/* Mobile drawer — outside nav to avoid stacking context issues */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-secondary/40 backdrop-blur-sm z-[60] lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%', transition: { duration: 0.4, ease: "easeInOut" } }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
              }}
              className="fixed right-0 top-0 bottom-0 w-[75%] max-w-[320px] bg-background z-[70] lg:hidden flex flex-col shadow-2xl border-l border-border/50"
            >
              {/* Drawer Header */}
              <div className="h-20 px-6 flex items-center justify-between border-b border-border/10 bg-white">
                <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="LSS" className="h-10 w-auto" />
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base text-secondary leading-none">LSS ABUAD</span>
                    <span className="text-[8px] text-primary font-ui uppercase tracking-widest font-bold mt-1">Official Portal</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  className="text-secondary hover:bg-secondary/5 h-10 w-10 rounded-full"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
  
              {/* Drawer Body - Navigation Links */}
              <div className="flex-1 overflow-y-auto py-8">
                <div className="flex flex-col">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setOpen(false)}
                        className={`px-8 py-3.5 flex items-center text-base font-ui transition-all duration-200 border-l-[3px] ${
                          isActive 
                            ? 'border-primary text-primary font-bold bg-primary/5' 
                            : 'border-transparent text-secondary/70 hover:text-primary hover:border-primary hover:bg-muted/30'
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
  
              {/* Drawer Footer */}
              <div className="p-8 border-t border-border/10 bg-muted/10">
                <p className="text-[10px] text-secondary/40 font-ui uppercase tracking-[0.2em] font-bold mb-4">
                  Stay Connected
                </p>
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-secondary/60 font-body italic leading-relaxed">
                    "The Voice of Law at Afe Babalola University."
                  </p>
                  <div className="flex gap-3">
                    <div className="h-8 w-8 rounded-lg bg-secondary/5 flex items-center justify-center text-secondary/40 hover:text-primary transition-colors">
                      <Scale className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
