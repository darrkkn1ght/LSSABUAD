import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDate } from '@/lib/format';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { ArrowLeft } from 'lucide-react';
import type { Announcement } from '@/types';

export default function AnnouncementDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: announcement, isLoading, error } = useQuery<Announcement | null>({
    queryKey: ['announcement', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('slug', slug!)
        .eq('is_published', true)
        .single();
      if (error) throw error;
      return data as Announcement;
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!slug,
  });

  const { data: related = [] } = useQuery<Announcement[]>({
    queryKey: ['announcements-related', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, slug, excerpt, published_at, featured_image_url, author')
        .eq('is_published', true)
        .neq('slug', slug!)
        .order('published_at', { ascending: false })
        .limit(3);
      if (error) throw error;
      return (data ?? []) as Announcement[];
    },
    staleTime: 2 * 60 * 1000,
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="py-16 container max-w-3xl">
        <Skeleton className="h-80 w-full mb-8 rounded" />
        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/2 mb-8" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (error || !announcement) {
    return (
      <div className="py-32 container text-center">
        <p className="text-muted-foreground mb-4">Announcement not found.</p>
        <Link to="/announcements" className="text-primary font-ui hover:underline">
          ← Back to Announcements
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>{announcement.title} | ABUAD Law Announcements</title>
        <meta name="description" content={announcement.excerpt || 'Read the full announcement at ABUAD Law Department.'} />
      </Helmet>
      {announcement.featured_image_url && (
        <OptimizedImage 
          src={announcement.featured_image_url} 
          alt={announcement.title} 
          containerClassName="w-full h-[320px] md:h-[480px]"
          className="w-full h-full object-cover"
        />
      )}
      <article className="py-16 container max-w-3xl">
        <Link to="/announcements" className="inline-flex items-center gap-1 text-primary font-ui text-sm hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Announcements
        </Link>
        <h1 className="font-display font-bold text-3xl md:text-5xl text-secondary mb-4 leading-tight">
          {announcement.title}
        </h1>
        <p className="text-muted-foreground font-ui text-sm mb-8">
          By {announcement.author} • {formatDate(announcement.published_at)}
        </p>
        <div className="text-foreground leading-relaxed whitespace-pre-line">
          {announcement.content}
        </div>
      </article>

      {related.length > 0 && (
        <section className="py-16 bg-surface">
          <div className="container max-w-3xl">
            <div className="w-16 h-0.5 bg-primary mb-4" />
            <h2 className="font-display font-bold text-2xl text-secondary mb-6">Related Announcements</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link key={r.id} to={`/announcements/${r.slug}`} className="bg-card border border-border rounded p-4 hover:shadow-lg hover:border-t-[3px] hover:border-t-primary transition-all duration-200">
                  <p className="text-xs text-muted-foreground font-ui mb-1">{formatDate(r.published_at)}</p>
                  <h3 className="font-heading font-bold text-sm text-secondary">{r.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
