import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { PremiumEmptyState } from '@/components/shared/PremiumEmptyState';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format';
import { Newspaper, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Announcement } from '@/types';

const PAGE_SIZE = 10;

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function AnnouncementsPage() {
  const [page, setPage] = useState(0);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['announcements', page, featuredOnly],
    queryFn: async () => {
      let query = supabase
        .from('announcements')
        .select('id, title, slug, excerpt, author, featured_image_url, is_featured, published_at', { count: 'exact' })
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
      
      if (featuredOnly) query = query.eq('is_featured', true);
      
      const { data, error, count } = await query;
      if (error) throw error;
      return { items: (data ?? []) as Announcement[], total: count ?? 0 };
    },
    staleTime: 2 * 60 * 1000,
  });

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="bg-white">
      <Helmet>
        <title>Announcements | LSS ABUAD</title>
        <meta name="description" content="Stay updated with the latest news, events, and legal announcements from LSS ABUAD." />
      </Helmet>
      
      <PageHero 
        title="News & Updates" 
        subtitle="The latest dispatches from the Law Students' Society" 
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 container relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-2 p-1 bg-secondary/5 rounded-full w-fit border border-secondary/5">
            <Button
              variant={featuredOnly ? 'ghost' : 'default'}
              size="sm"
              onClick={() => { setFeaturedOnly(false); setPage(0); }}
              className={`font-ui rounded-full px-6 transition-all duration-300 ${!featuredOnly ? 'bg-secondary text-white shadow-lg' : 'text-secondary/60 hover:text-secondary'}`}
            >
              All News
            </Button>
            <Button
              variant={featuredOnly ? 'default' : 'ghost'}
              size="sm"
              onClick={() => { setFeaturedOnly(true); setPage(0); }}
              className={`font-ui rounded-full px-6 transition-all duration-300 ${featuredOnly ? 'bg-primary text-white shadow-lg' : 'text-secondary/60 hover:text-primary'}`}
            >
              <Star className="h-3.5 w-3.5 mr-2" />
              Featured
            </Button>
          </div>
          
          <p className="text-secondary/40 font-ui text-xs uppercase tracking-[0.2em]">
            Showing {items.length} of {total} articles
          </p>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-48 rounded-[2rem]" />)}
          </div>
        ) : items.length === 0 ? (
          <PremiumEmptyState 
            icon={Newspaper}
            title="Silence in Court"
            message="No announcements have been published recently. Please check back later."
          />
        ) : (
          <motion.div
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-8"
          >
            <AnimatePresence mode="popLayout">
              {items.map((a) => (
                <motion.div
                  key={a.id}
                  variants={fadeUp}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <Link
                    to={`/announcements/${a.slug}`}
                    className="flex flex-col md:flex-row gap-8 glass-panel p-6 md:p-8 rounded-[2.5rem] border-secondary/5 hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group relative overflow-hidden bg-white"
                  >
                    {/* Decorative hover gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="relative w-full md:w-80 h-48 md:h-56 flex-shrink-0 overflow-hidden rounded-[1.5rem] shadow-lg">
                      <OptimizedImage 
                        src={a.featured_image_url || '/placeholder.svg'} 
                        alt={a.title} 
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      {a.is_featured && (
                        <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-ui font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                          <Star className="h-3 w-3 fill-white" /> Featured
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-[10px] text-primary font-ui font-bold uppercase tracking-[0.3em]">
                          {formatDate(a.published_at)}
                        </span>
                        <div className="h-px w-8 bg-secondary/10" />
                        <span className="text-[10px] text-secondary/40 font-ui uppercase tracking-widest truncate">
                          By {a.author}
                        </span>
                      </div>
                      
                      <h3 className="font-display font-bold text-2xl md:text-3xl text-secondary group-hover:text-primary transition-colors mb-4 leading-tight">
                        {a.title}
                      </h3>
                      
                      <p className="text-secondary/60 font-body text-base line-clamp-2 md:line-clamp-3 mb-6">
                        {a.excerpt || 'Read the full article to stay updated with the latest from the Law Students\' Society...'}
                      </p>
                      
                      <div className="flex items-center gap-2 text-primary font-ui text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                        Read Full Insight <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="flex justify-center items-center gap-4 mt-16"
          >
            <Button 
              variant="outline" 
              size="lg" 
              disabled={page === 0} 
              onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-ui rounded-full px-8 border-secondary/10 hover:bg-secondary hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              <span className="h-8 w-8 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold font-ui">
                {page + 1}
              </span>
              <span className="text-secondary/40 text-[10px] uppercase font-ui tracking-widest">
                of {totalPages}
              </span>
            </div>
            <Button 
              variant="outline" 
              size="lg" 
              disabled={page >= totalPages - 1} 
              onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="font-ui rounded-full px-8 border-secondary/10 hover:bg-secondary hover:text-white transition-all transform hover:scale-105 active:scale-95"
            >
              Next
            </Button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
