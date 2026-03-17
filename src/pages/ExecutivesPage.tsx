import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { Mail, ExternalLink } from 'lucide-react';
import type { Executive } from '@/types';

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
    <div>
      <Helmet>
        <title>Executives | LSS ABUAD</title>
        <meta name="description" content="Meet the leadership team of the Law Students' Society (LSS ABUAD)." />
      </Helmet>
      <PageHero title="Executive Council" subtitle="The leaders of the Law Students' Society" />
      <section className="py-16 container">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-80 rounded" />)}
          </div>
        ) : executives.length === 0 ? (
          <p className="text-center text-muted-foreground">No executives listed yet.</p>
        ) : (
          <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {executives.map((e) => (
              <motion.div
                key={e.id}
                variants={{ initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="bg-card border border-border rounded p-6 text-center group hover:shadow-lg hover:border-t-[3px] hover:border-t-primary transition-all duration-200"
              >
                <div className="mb-4 transition-transform duration-300 group-hover:-translate-y-2">
                  <OptimizedImage 
                    src={e.photo_url || ''} 
                    alt={e.name} 
                    containerClassName="w-32 h-32 rounded-full mx-auto border-2 border-border shadow-md"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-bold text-lg text-secondary">{e.name}</h3>
                <p className="text-primary font-ui text-sm uppercase tracking-[0.08em] mb-3">{e.position}</p>
                {e.bio && <p className="text-sm text-muted-foreground line-clamp-3">{e.bio}</p>}
                <div className="flex justify-center gap-3 mt-4">
                  {e.email && <a href={`mailto:${e.email}`} aria-label={`Email ${e.name}`}><Mail className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" /></a>}
                  {e.social_link && <a href={e.social_link} target="_blank" rel="noopener noreferrer" aria-label={`${e.name} social`}><ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" /></a>}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
