import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { PremiumEmptyState } from '@/components/shared/PremiumEmptyState';
import { Mail, ExternalLink, Users } from 'lucide-react';
import type { Executive } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function ExecutivesPage() {
  const { data: executives = [], isLoading } = useQuery<Executive[]>({
    queryKey: ['executives'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('executives')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return (data ?? []) as Executive[];
    },
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Executives | LSS ABUAD</title>
        <meta name="description" content="Meet the leadership team of the Law Students' Society (LSS ABUAD)." />
      </Helmet>
      
      <PageHero 
        title="Executive Council" 
        subtitle="The visionary leaders driving the Law Students' Society towards excellence."
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 container relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/2 opacity-30 blur-[150px] pointer-events-none" />
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="aspect-[3/4] rounded-[2rem]" />)}
          </div>
        ) : executives.length === 0 ? (
          <PremiumEmptyState 
            icon={Users}
            title="Council in Session"
            message="The leadership directory is currently being updated. Please check back later."
          />
        ) : (
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {executives.map((e) => (
              <motion.div
                key={e.id}
                variants={fadeUp}
                className="group relative"
              >
                <div className="relative aspect-[3/4] mb-6 overflow-hidden rounded-[2rem] bg-secondary-900 border border-secondary/5 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/20">
                  <OptimizedImage 
                    src={e.photo_url || 'https://www.transparenttextures.com/patterns/black-marble.png'} 
                    alt={e.name} 
                    containerClassName="w-full h-full"
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 ${!e.photo_url ? 'opacity-20 contrast-125' : ''}`}
                  />
                  
                  {/* Premium Overlays */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Social Quick-actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {e.social_link && (
                      <a href={e.social_link} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-500 px-4">
                  <h3 className="font-display font-bold text-2xl text-secondary mb-1 group-hover:text-primary transition-colors">
                    {e.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <span className="text-primary font-ui text-[10px] uppercase tracking-[0.4em] font-bold">
                      {e.position}
                    </span>
                    {e.bio && (
                      <p className="mt-4 text-secondary/50 font-body italic text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        "{e.bio}"
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
