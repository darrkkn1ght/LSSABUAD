import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { PremiumEmptyState } from '@/components/shared/PremiumEmptyState';
import { Mail, GraduationCap } from 'lucide-react';
import type { Lecturer } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function LecturersPage() {
  const { data: lecturers = [], isLoading } = useQuery<Lecturer[]>({
    queryKey: ['lecturers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('lecturers')
        .select('*')
        .eq('is_active', true)
        .order('display_order');
      if (error) throw error;
      return (data ?? []) as Lecturer[];
    },
    staleTime: 2 * 60 * 1000,
  });

  return (
    <div className="bg-white">
      <Helmet>
        <title>Faculty | LSS ABUAD</title>
        <meta name="description" content="Distinguished faculty members of the ABUAD Law Department." />
      </Helmet>

      <PageHero 
        title="The Faculty" 
        subtitle="Meet the distinguished legal scholars and practitioners shaping the future of law."
        backgroundImage="/law-library.png"
      />

      <section className="py-24 container relative overflow-hidden">
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-secondary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => <Skeleton key={i} className="aspect-[4/5] rounded-[2rem]" />)}
          </div>
        ) : lecturers.length === 0 ? (
          <PremiumEmptyState 
            icon={GraduationCap}
            title="Faculty Directory"
            message="The faculty list is currently being compiled. Please check back shortly."
          />
        ) : (
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16"
          >
            {lecturers.map((l) => (
              <motion.div
                key={l.id}
                variants={fadeUp}
                className="group relative"
              >
                <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-[2rem] bg-secondary-900 border border-secondary/5 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-primary/20">
                  <OptimizedImage 
                    src={l.photo_url || 'https://www.transparenttextures.com/patterns/black-marble.png'} 
                    alt={l.name} 
                    containerClassName="w-full h-full"
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 ${!l.photo_url ? 'opacity-20 contrast-125' : ''}`}
                  />
                  
                  {/* Premium Overlays */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/20 transition-all duration-500 rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  {/* Quick Mail Access */}
                  {l.email && (
                    <div className="absolute top-4 right-4 translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                      <a href={`mailto:${l.email}`} className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-colors">
                        <Mail className="h-4 w-4" />
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="text-center transform group-hover:-translate-y-2 transition-transform duration-500 px-4">
                  <h3 className="font-display font-bold text-2xl text-secondary mb-1 group-hover:text-primary transition-colors">
                    {l.name}
                  </h3>
                  <div className="flex flex-col items-center">
                    <span className="text-primary font-ui text-[10px] uppercase tracking-[0.4em] font-bold">
                      {l.title}
                    </span>
                    {l.specialization && (
                      <span className="mt-2 px-3 py-1 bg-secondary/5 text-[10px] text-secondary/60 font-ui uppercase tracking-widest rounded-full border border-secondary/5">
                        {l.specialization}
                      </span>
                    )}
                    {l.bio && (
                      <p className="mt-4 text-secondary/50 font-body italic text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        "{l.bio}"
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
