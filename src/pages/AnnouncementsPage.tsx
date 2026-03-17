import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/format';
import type { Announcement } from '@/types';

const PAGE_SIZE = 10;

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
    <div>
      <Helmet>
        <title>Announcements | LSS ABUAD</title>
        <meta name="description" content="Stay updated with the latest news, events, and legal announcements from LSS ABUAD." />
      </Helmet>
      <PageHero title="Announcements" subtitle="Stay updated with the latest news and events" />
      <section className="py-16 container">
        <div className="flex gap-3 mb-8">
          <Button
            variant={featuredOnly ? 'outline' : 'default'}
            size="sm"
            onClick={() => { setFeaturedOnly(false); setPage(0); }}
            className="font-ui"
          >
            All
          </Button>
          <Button
            variant={featuredOnly ? 'default' : 'outline'}
            size="sm"
            onClick={() => { setFeaturedOnly(true); setPage(0); }}
            className="font-ui"
          >
            Featured
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-6">
            {[1,2,3].map(i => <Skeleton key={i} className="h-32 rounded" />)}
          </div>
        ) : items.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No announcements found.</p>
        ) : (
          <div className="space-y-6">
            {items.map((a) => (
              <Link
                key={a.id}
                to={`/announcements/${a.slug}`}
                className="flex gap-6 bg-card border border-border rounded p-4 hover:shadow-lg hover:border-t-[3px] hover:border-t-primary transition-all duration-200 group"
              >
                <OptimizedImage 
                  src={a.featured_image_url || '/placeholder.svg'} 
                  alt={a.title} 
                  containerClassName="hidden md:block w-60 h-36 flex-shrink-0"
                  className="w-full h-full object-cover group-hover:scale-110" 
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-ui mb-1">
                    {formatDate(a.published_at)} • {a.author}
                    {a.is_featured && <span className="ml-2 text-primary">★ Featured</span>}
                  </p>
                  <h3 className="font-heading font-bold text-lg text-secondary group-hover:text-primary transition-colors mb-2 truncate">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{a.excerpt || ''}</p>
                  <span className="inline-block mt-2 text-primary font-ui text-sm font-medium">Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)} className="font-ui">
              Previous
            </Button>
            <span className="text-sm text-muted-foreground font-ui flex items-center px-3">
              {page + 1} / {totalPages}
            </span>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} className="font-ui">
              Next
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
