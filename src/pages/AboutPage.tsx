import { Helmet } from 'react-helmet-async';
import { PageHero } from '@/components/shared/PageHero';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { motion } from 'framer-motion';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function AboutPage() {
  const { settings, isLoading } = useSiteSettings();

  return (
    <div className="bg-white">
      <Helmet>
        <title>About | LSS ABUAD</title>
        <meta name="description" content="Learn about the vision, mission, and leadership of the Law Students' Society, Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      
      <PageHero 
        title="Our Institution" 
        subtitle={settings.site_tagline || "The Pursuit of Excellence in Legal Education"}
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="container relative z-10">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-full" />
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_350px] gap-16 items-start">
              <motion.div 
                variants={stagger}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="space-y-16"
              >
                <motion.div variants={fadeIn} className="prose prose-lg prose-secondary max-w-none">
                  <p className="text-secondary/80 leading-relaxed font-body text-xl italic whitespace-pre-line border-l-4 border-primary pl-8 py-4 bg-secondary/5 rounded-r-2xl">
                    {settings.department_about}
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                  {settings.department_vision && (
                    <motion.div variants={fadeIn} className="glass-panel p-8 rounded-[2rem] border-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                        <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                      </div>
                      <h2 className="font-display font-bold text-3xl text-secondary mb-4">Our Vision</h2>
                      <p className="text-secondary/60 leading-relaxed font-body">{settings.department_vision}</p>
                    </motion.div>
                  )}
                  {settings.department_mission && (
                    <motion.div variants={fadeIn} className="glass-panel p-8 rounded-[2rem] border-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-6">
                        <div className="h-2 w-2 bg-secondary rounded-full animate-pulse" />
                      </div>
                      <h2 className="font-display font-bold text-3xl text-secondary mb-4">Our Mission</h2>
                      <p className="text-secondary/60 leading-relaxed font-body">{settings.department_mission}</p>
                    </motion.div>
                  )}
                </div>

                <motion.div variants={fadeIn} className="relative aspect-video rounded-[2.5rem] overflow-hidden group shadow-2xl">
                  <OptimizedImage 
                    src="/hero-bg.jpg" 
                    alt="ABUAD Campus" 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-10 left-10">
                    <p className="text-white/40 font-ui text-xs uppercase tracking-[0.4em] mb-2">Location</p>
                    <h4 className="text-white font-display text-2xl font-bold">Afe Babalola University, Ado-Ekiti</h4>
                  </div>
                </motion.div>
              </motion.div>

              <motion.aside 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8 sticky top-32"
              >
                <div className="glass-panel p-10 rounded-[2.5rem] border-secondary/5 shadow-xl flex flex-col items-center text-center">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <OptimizedImage 
                      src="/logo.png" 
                      alt="LSS ABUAD" 
                      containerClassName="w-24 h-24 mb-0 bg-transparent relative z-10"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-secondary mb-2">The Pursuit of Justice</h3>
                  <div className="h-px w-12 bg-primary/40 mb-6" />
                  <p className="text-sm text-secondary/50 font-body italic leading-relaxed">
                    "Justice is the constant and perpetual will to give each his due."
                  </p>
                </div>

                <div className="bg-secondary p-10 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[60px] rounded-full" />
                  
                  <h3 className="font-ui font-bold text-xs text-primary uppercase tracking-[0.4em] relative z-10">Connect</h3>
                  
                  <div className="space-y-6 relative z-10 text-white/70">
                    {settings.contact_email && (
                      <div className="flex items-start gap-4 text-sm group">
                        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                          <Mail className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="group-hover:text-white transition-colors pt-1.5">{settings.contact_email}</span>
                      </div>
                    )}
                    {settings.contact_phone && (
                      <div className="flex items-start gap-4 text-sm group">
                        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                          <Phone className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="group-hover:text-white transition-colors pt-1.5">{settings.contact_phone}</span>
                      </div>
                    )}
                    {settings.contact_address && (
                      <div className="flex items-start gap-4 text-sm group">
                        <div className="h-8 w-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all duration-300">
                          <MapPin className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="group-hover:text-white transition-colors pt-1.5 leading-relaxed">{settings.contact_address}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 pt-8 border-t border-white/5">
                    {[
                      { icon: Facebook, link: settings.social_facebook },
                      { icon: Twitter, link: settings.social_twitter },
                      { icon: Instagram, link: settings.social_instagram }
                    ].map((s, i) => s.link && (
                      <a 
                        key={i} 
                        href={s.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-primary transition-all duration-300 hover:-translate-y-1"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
