import { Helmet } from 'react-helmet-async';
import { PageHero } from '@/components/shared/PageHero';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';

export default function ContactPage() {
  const { settings } = useSiteSettings();

  return (
    <div>
      <Helmet>
        <title>Contact | LSS ABUAD</title>
        <meta name="description" content="Get in touch with the Law Students' Society at Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      <PageHero title="Contact Us" subtitle="Get in touch with the society" />
      <section className="py-16 container">
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="space-y-6">
            {settings.contact_email && (
              <div className="bg-card border border-border rounded p-5 flex items-start gap-4 shadow-sm">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-ui mb-1">Email</p>
                  <a href={`mailto:${settings.contact_email}`} className="text-secondary font-ui hover:text-primary transition-colors">
                    {settings.contact_email}
                  </a>
                </div>
              </div>
            )}
            {settings.contact_phone && (
              <div className="bg-card border border-border rounded p-5 flex items-start gap-4 shadow-sm">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-ui mb-1">Phone</p>
                  <a href={`tel:${settings.contact_phone}`} className="text-secondary font-ui hover:text-primary transition-colors">
                    {settings.contact_phone}
                  </a>
                </div>
              </div>
            )}
            {settings.contact_address && (
              <div className="bg-card border border-border rounded p-5 flex items-start gap-4 shadow-sm">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-ui mb-1">Address</p>
                  <p className="text-secondary font-ui text-sm">{settings.contact_address}</p>
                </div>
              </div>
            )}
            <div className="flex gap-4 pt-2">
              {settings.social_facebook && <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></a>}
              {settings.social_twitter && <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></a>}
              {settings.social_instagram && <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" /></a>}
            </div>
          </div>
          <div className="bg-card border border-border rounded p-6 flex items-center justify-center min-h-[300px] shadow-sm">
            <div className="text-center text-muted-foreground">
              <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
              <p className="font-ui text-sm">{settings.contact_address || 'Afe Babalola University, Ado-Ekiti, Ekiti State, Nigeria'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
