import { Helmet } from 'react-helmet-async';
import { PageHero } from '@/components/shared/PageHero';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';

export default function AboutPage() {
  const { settings, isLoading } = useSiteSettings();

  return (
    <div>
      <Helmet>
        <title>About | LSS ABUAD</title>
        <meta name="description" content="Learn about the vision, mission, and leadership of the Law Students' Society, Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      <PageHero title="About the Department" subtitle={settings.site_tagline} />
      <section 
        className="py-16 bg-surface relative overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
          style={{ backgroundImage: "url('/marble-dark.png')", backgroundSize: '400px' }}
        />
        <div className="container relative z-10">
        {isLoading ? (
          <div className="space-y-4"><Skeleton className="h-6 w-full" /><Skeleton className="h-6 w-3/4" /><Skeleton className="h-6 w-full" /></div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">
            <div className="space-y-10">
              <div>
                <p className="text-foreground leading-relaxed whitespace-pre-line">{settings.department_about}</p>
              </div>
              {settings.department_vision && (
                <div>
                  <div className="w-16 h-0.5 bg-primary mb-4" />
                  <h2 className="font-display font-bold text-2xl text-secondary mb-4">Our Vision</h2>
                  <p className="text-muted-foreground leading-relaxed">{settings.department_vision}</p>
                </div>
              )}
              {settings.department_mission && (
                <div>
                  <div className="w-16 h-0.5 bg-primary mb-4" />
                  <h2 className="font-display font-bold text-2xl text-secondary mb-4">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed">{settings.department_mission}</p>
                </div>
              )}
            </div>
            <aside className="space-y-6">
              <div className="bg-white/40 backdrop-blur-sm border border-border/50 rounded-xl p-8 shadow-sm flex flex-col items-center text-center">
                <OptimizedImage 
                  src="/justice-motif.png" 
                  alt="LSS ABUAD" 
                  containerClassName="w-20 h-20 mb-4 bg-transparent"
                  className="w-full h-full object-contain"
                />
                <h3 className="font-display font-bold text-xl text-secondary">The Pursuit of Justice</h3>
                <div className="w-12 h-0.5 bg-primary my-4" />
                <p className="text-sm text-muted-foreground italic">"Justice is the constant and perpetual will to give each his due."</p>
              </div>

              <div className="bg-card border border-border rounded p-6 sticky top-20 space-y-4 shadow-sm">
                <h3 className="font-heading font-bold text-sm text-secondary mb-3 uppercase tracking-wider">Contact Us</h3>
                <div className="w-8 h-0.5 bg-primary/30 mb-4" />
                {settings.contact_email && (
                  <div className="flex items-start gap-3 text-sm group">
                    <Mail className="h-4 w-4 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground font-ui group-hover:text-primary transition-colors">{settings.contact_email}</span>
                  </div>
                )}
                {settings.contact_phone && (
                  <div className="flex items-start gap-3 text-sm group">
                    <Phone className="h-4 w-4 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground font-ui group-hover:text-primary transition-colors">{settings.contact_phone}</span>
                  </div>
                )}
                {settings.contact_address && (
                  <div className="flex items-start gap-3 text-sm group">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-muted-foreground font-ui group-hover:text-primary transition-colors">{settings.contact_address}</span>
                  </div>
                )}
                <div className="flex gap-4 pt-4 border-t border-border/50">
                  {settings.social_facebook && <a href={settings.social_facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Facebook className="h-4 w-4 text-muted-foreground hover:text-primary hover:scale-110 transition-all" /></a>}
                  {settings.social_twitter && <a href={settings.social_twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"><Twitter className="h-4 w-4 text-muted-foreground hover:text-primary hover:scale-110 transition-all" /></a>}
                  {settings.social_instagram && <a href={settings.social_instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram className="h-4 w-4 text-muted-foreground hover:text-primary hover:scale-110 transition-all" /></a>}
                </div>
              </div>
            </aside>
          </div>
        )}
        </div>
      </section>
    </div>
  );
}
