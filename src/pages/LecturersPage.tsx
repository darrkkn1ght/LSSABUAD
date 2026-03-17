import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { Mail } from 'lucide-react';
import type { Lecturer } from '@/types';

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
    <div>
      <Helmet>
        <title>Faculty | LSS ABUAD</title>
        <meta name="description" content="Distinguished faculty members of the ABUAD Law Department." />
      </Helmet>
      <PageHero title="Our Lecturers" subtitle="Distinguished faculty members of the Law Department" />
      <section className="py-16 container">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => <Skeleton key={i} className="h-72 rounded" />)}
          </div>
        ) : lecturers.length === 0 ? (
          <p className="text-center text-muted-foreground">No lecturers listed yet.</p>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {lecturers.map((l) => (
              <motion.div
                key={l.id}
                variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="bg-card border border-border rounded overflow-hidden group hover:shadow-lg hover:border-t-[3px] hover:border-t-primary transition-all duration-200"
              >
                <OptimizedImage 
                  src={l.photo_url || ''} 
                  alt={l.name} 
                  containerClassName="h-48"
                  className="w-full h-full object-cover group-hover:scale-110"
                />
                <div className="p-4">
                  <h3 className="font-heading font-bold text-sm text-secondary">{l.name}</h3>
                  <p className="text-xs text-muted-foreground font-ui">{l.title}</p>
                  {l.specialization && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-muted text-xs font-ui text-secondary rounded-full">
                      {l.specialization}
                    </span>
                  )}
                  {l.bio && <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{l.bio}</p>}
                  {l.email && (
                    <a href={`mailto:${l.email}`} className="inline-flex items-center gap-1 text-xs text-primary font-ui mt-2 hover:underline">
                      <Mail className="h-3 w-3" /> Email
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
