import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { formatDate } from '@/lib/format';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { ArrowDown, ArrowRight } from 'lucide-react';
import type { Announcement, Executive, GalleryImage } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function HomePage() {
  const { settings } = useSiteSettings();

  const { data: announcements = [], isLoading: loadingAnn } = useQuery<Announcement[]>({
    queryKey: ['announcements-latest'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, slug, excerpt, author, featured_image_url, published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data ?? []) as Announcement[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const { data: executives = [], isLoading: loadingExec } = useQuery<Executive[]>({
    queryKey: ['executives-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('executives')
        .select('*')
        .eq('is_active', true)
        .order('display_order')
        .limit(8);
      if (error) throw error;
      return (data ?? []) as Executive[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const { data: gallery = [], isLoading: loadingGallery } = useQuery<GalleryImage[]>({
    queryKey: ['gallery-preview'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order')
        .limit(6);
      if (error) throw error;
      return (data ?? []) as GalleryImage[];
    },
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div>
      <Helmet>
        <title>Home | LSS ABUAD</title>
        <meta name="description" content="Welcome to the official website of the Law Students' Society, Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      {/* Hero */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden bg-secondary-950">
        {/* Parallax Background Layer */}
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: `url('/hero-bg.jpg')` } as any}
        />
        
        {/* Complex Gradient Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-secondary via-transparent to-transparent opacity-60" />

        <div className="container relative z-20">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="glass-panel p-8 md:p-12 rounded-2xl border-white/5 inline-block"
            >
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-3 mb-6"
              >
                <div className="h-px w-8 bg-primary/60" />
                <span className="text-primary font-ui text-xs tracking-[0.3em] uppercase font-bold">
                  Afe Babalola University
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.45, 0.32, 0.9] }}
                className="font-display font-bold text-5xl md:text-8xl text-white mb-8 leading-[0.95] tracking-tight"
              >
                The Voice <br /> 
                <span className="text-white/40 italic font-medium">of</span> Law <br />
                <span className="text-secondary-100">at ABUAD</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-lg md:text-xl text-white/60 font-body italic max-w-xl mb-10 leading-relaxed"
              >
                "Empowering the next generation of legal minds through integrity, excellence, and a commitment to justice."
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.5 }}
                className="flex gap-4 flex-wrap"
              >
                <Button asChild size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-ui text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                  <Link to="/announcements">Explorer Latest Updates</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 font-ui text-base tracking-wide backdrop-blur-sm transition-all duration-300 flex items-center gap-2">
                  <Link to="/pay-dues">Portal Login & Dues</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] text-white/30 uppercase tracking-[0.4em] font-ui">Discover</span>
          <div className="h-12 w-px bg-gradient-to-b from-primary/60 to-transparent animate-pulse" />
        </motion.div>
      </section>

      {/* Latest Announcements — High-end Bento Grid */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-secondary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-12 bg-primary" />
                <span className="text-primary font-ui text-xs tracking-[0.2em] uppercase font-bold">Stay Informed</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-secondary leading-tight">
                Latest from <br className="md:hidden" /> 
                <span className="italic font-medium text-secondary/60">LSS ABUAD</span>
              </h2>
            </div>
            <Link to="/announcements" className="group flex items-center gap-2 text-secondary font-ui text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              View All News 
              <div className="h-10 w-10 rounded-full border border-secondary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                <ArrowRight className="h-4 w-4 group-hover:text-white transition-colors" />
              </div>
            </Link>
          </motion.div>

          {loadingAnn ? (
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
              <Skeleton className="md:col-span-2 md:row-span-2 rounded-2xl" />
              <Skeleton className="md:col-span-2 rounded-2xl" />
              <Skeleton className="md:col-span-1 rounded-2xl" />
              <Skeleton className="md:col-span-1 rounded-2xl" />
            </div>
          ) : announcements.length === 0 ? (
            <div className="glass-panel p-12 rounded-2xl text-center">
              <p className="text-secondary/50 font-body italic italic">The law is silent for now. No announcements available.</p>
            </div>
          ) : (
            <motion.div 
              variants={stagger} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }} 
              className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 min-h-[600px]"
            >
              {announcements.map((a, idx) => {
                // Feature the first announcement
                const isFeature = idx === 0;
                return (
                  <motion.div 
                    key={a.id} 
                    variants={fadeUp}
                    className={`group relative overflow-hidden rounded-2xl border border-secondary/5 bg-secondary/5 transition-all duration-500 hover:shadow-2xl hover:border-secondary/10 ${
                      isFeature ? 'md:col-span-2 md:row-span-2' : idx === 1 ? 'md:col-span-2' : 'md:col-span-1'
                    }`}
                  >
                    <Link to={`/announcements/${a.slug}`} className="block h-full w-full">
                      <div className="absolute inset-0 z-0">
                        <OptimizedImage 
                          src={a.featured_image_url || '/placeholder.svg'} 
                          alt={a.title} 
                          containerClassName="h-full w-full"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60" 
                        />
                      </div>
                      
                      {/* Gradient overlay for text legibility */}
                      <div className="absolute inset-0 z-10 bg-gradient-to-t from-secondary via-secondary/40 to-transparent group-hover:via-secondary/60 transition-all duration-500" />

                      <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-end">
                        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-[10px] text-primary font-ui uppercase tracking-[0.3em] font-bold mb-3">
                            {formatDate(a.published_at)}
                          </p>
                          <h3 className={`font-display font-bold text-white mb-3 leading-tight transition-colors group-hover:text-primary ${
                            isFeature ? 'text-2xl md:text-3xl' : 'text-lg md:text-xl'
                          }`}>
                            {a.title}
                          </h3>
                          {isFeature && (
                            <p className="text-sm text-white/50 font-body line-clamp-2 md:line-clamp-3 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {a.excerpt || 'Read the latest updates from the Law Students\' Society...'}
                            </p>
                          )}
                          <div className="flex items-center gap-2 text-[10px] text-white/40 uppercase tracking-widest font-ui opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                            Read Article <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      {/* Executives — Premium Leadership Gallery */}
      <section className="py-24 md:py-32 bg-secondary-950 relative overflow-hidden">
        {/* Subtle marble texture layer */}
        <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/black-marble.png')]" />
        
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-0.5 w-8 bg-primary/60" />
              <span className="text-primary font-ui text-xs tracking-[0.4em] uppercase font-bold">Leadership</span>
              <div className="h-0.5 w-8 bg-primary/60" />
            </div>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6">
              The <span className="italic font-medium text-white/40">Executives</span>
            </h2>
            <p className="text-white/50 font-body italic text-lg max-w-2xl mx-auto">
              Meet the visionary leaders driving the Law Students' Society towards excellence and innovation.
            </p>
          </motion.div>

          {loadingExec ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[1,2,3,4].map(i => <Skeleton key={i} className="aspect-[3/4] rounded-2xl" />)}
            </div>
          ) : (
            <motion.div 
              variants={stagger} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }} 
              className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12"
            >
              {executives.map((e) => (
                <motion.div 
                  key={e.id} 
                  variants={fadeUp} 
                  className="group relative"
                >
                  <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-2xl bg-secondary-900 border border-white/5">
                    <OptimizedImage 
                      src={e.photo_url || 'https://www.transparenttextures.com/patterns/black-marble.png'} 
                      alt={e.name} 
                      containerClassName="w-full h-full"
                      className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105 ${!e.photo_url ? 'opacity-20 contrast-125' : ''}`}
                    />
                    {/* Prestigious border overlay on hover */}
                    <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-lg pointer-events-none" />
                    
                    {/* Shadow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  </div>
                  
                  <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-500">
                    <h3 className="font-display font-bold text-xl text-white mb-1 group-hover:text-primary transition-colors">
                      {e.name}
                    </h3>
                    <p className="text-[10px] text-primary font-ui uppercase tracking-[0.3em] font-bold">
                      {e.position}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-16"
          >
            <Link to="/executives" className="inline-flex items-center gap-3 text-white/40 hover:text-white transition-colors font-ui text-xs uppercase tracking-[0.3em] group">
              View Full Directory
              <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Gallery — Premium Bento Showcase */}
      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-0.5 w-12 bg-primary" />
                <span className="text-primary font-ui text-xs tracking-[0.2em] uppercase font-bold">Visual Journey</span>
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-secondary leading-tight">
                Our <span className="italic font-medium text-secondary/60">Gallery</span>
              </h2>
            </div>
            <Link to="/gallery" className="group flex items-center gap-2 text-secondary font-ui text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors">
              Explore History 
              <div className="h-10 w-10 rounded-full border border-secondary/20 flex items-center justify-center group-hover:border-primary group-hover:bg-primary transition-all duration-300">
                <ArrowRight className="h-4 w-4 group-hover:text-white transition-colors" />
              </div>
            </Link>
          </motion.div>

          {loadingGallery ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 aspect-video">
              {[1,2,3,4].map(i => <Skeleton key={i} className="rounded-2xl h-full" />)}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-h-[500px]">
              {gallery.map((img, idx) => {
                const isLarge = idx === 0 || idx === 3;
                return (
                  <motion.div 
                    key={img.id} 
                    variants={fadeUp}
                    whileInView="animate"
                    initial="initial"
                    viewport={{ once: true }}
                    className={`group relative rounded-2xl overflow-hidden border border-secondary/5 bg-secondary/5 ${
                      isLarge ? 'md:col-span-2 md:row-span-2' : ''
                    }`}
                  >
                    <OptimizedImage
                      src={img.image_url}
                      alt={img.alt_text || img.caption || 'Gallery image'}
                      containerClassName="h-full w-full"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                      <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {img.caption && (
                          <p className="text-sm text-white font-ui font-medium drop-shadow-md mb-2">
                            {img.caption}
                          </p>
                        )}
                        <span className="text-[10px] text-white/60 uppercase tracking-widest font-ui">
                          View Details
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Pay Dues CTA — Cinematic Transformation */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-secondary">
        {/* Background Image with Parallax & Texture */}
        <div className="absolute inset-0 z-0 opacity-20 filter grayscale contrast-125 bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-secondary via-secondary/90 to-primary/40 mix-blend-multiply" />
        <div className="noise-overlay opacity-5" />

        <div className="container relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto glass-panel p-12 md:p-16 rounded-[2.5rem] border-white/10"
          >
            <div className="mb-8">
              <span className="text-primary font-ui text-xs tracking-[0.5em] uppercase font-bold mb-4 block">Institutional Responsibility</span>
              <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-6 leading-tight">
                Support Your <br /> <span className="text-white/40 italic">Society</span>
              </h2>
              <div className="h-px w-24 bg-primary/60 mx-auto mb-8" />
              <p className="text-white/60 font-body text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                "Maintaining the standard of excellence requires collective support. Pay your departmental dues to enable upcoming programs."
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <div className="text-white/80 font-ui text-sm uppercase tracking-widest border-b border-primary/40 pb-1 mb-4 md:mb-0">
                Amount: <span className="text-white font-bold ml-2">{settings.payment_amount || '₦5,000'}</span>
              </div>
              <Button asChild size="lg" className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-ui text-base tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_10px_30px_rgba(var(--primary),0.3)]">
                <Link to="/pay-dues">Proceed to Payment Portal</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
