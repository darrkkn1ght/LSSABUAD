import { Link } from 'react-router-dom';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Scale } from 'lucide-react';

export function Footer() {
  const { settings } = useSiteSettings();

  return (
    <footer className="bg-[hsl(234,28%,14%)] text-white">
      <div className="w-full h-0.5 bg-primary" />
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center gap-2 mb-4 bg-white/10 rounded p-2 inline-flex w-fit hover:bg-white/20 transition-colors">
              <img src="/logo.png" alt="LSS ABUAD Logo" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {settings.site_tagline || 'The Voice of Law at ABUAD'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <div className="w-10 h-0.5 bg-primary mb-3" />
            <h4 className="font-heading font-bold text-sm text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: '/about', label: 'About' },
                { to: '/announcements', label: 'Announcements' },
                { to: '/timetable', label: 'Timetable' },
                { to: '/pay-dues', label: 'Pay Dues' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-white/60 hover:text-primary transition-colors duration-200 font-ui">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="w-10 h-0.5 bg-primary mb-3" />
            <h4 className="font-heading font-bold text-sm text-white mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-white/60 font-ui">
              {settings.contact_email && <p>{settings.contact_email}</p>}
              {settings.contact_phone && <p>{settings.contact_phone}</p>}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs text-white/40 font-ui">
          © {new Date().getFullYear()} {settings.site_name || 'LSS ABUAD (Law Students society)'}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
