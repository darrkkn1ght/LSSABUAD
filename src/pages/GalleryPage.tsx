import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import type { GalleryImage } from '@/types';

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order')
        .limit(24);
      if (error) throw error;
      return (data ?? []) as GalleryImage[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowRight') setLightboxIndex(i => Math.min((i ?? 0) + 1, images.length - 1));
    if (e.key === 'ArrowLeft') setLightboxIndex(i => Math.max((i ?? 0) - 1, 0));
  }, [lightboxIndex, images.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <div>
      <Helmet>
        <title>Gallery | LSS ABUAD</title>
        <meta name="description" content="A visual journey through moments, events, and academic life at LSS ABUAD." />
      </Helmet>
      <PageHero title="Gallery" subtitle="Moments from the Law Department" />
      <section className="py-16 container">
        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-48 mb-4 rounded" />)}
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No gallery images yet.</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            {images.map((img, i) => (
              <div
                key={img.id}
                className="mb-4 break-inside-avoid group relative rounded overflow-hidden cursor-pointer"
                onClick={() => setLightboxIndex(i)}
              >
                <OptimizedImage
                  src={img.image_url}
                  alt={img.alt_text || img.caption || 'Gallery image'}
                  containerClassName="rounded"
                  className="w-full group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white drop-shadow-lg" />
                  {img.caption && (
                    <p className="absolute bottom-3 left-3 right-3 text-xs text-white font-ui font-medium drop-shadow-md">{img.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button onClick={() => setLightboxIndex(null)} className="absolute top-4 right-4 text-white z-10" aria-label="Close">
            <X className="h-8 w-8" />
          </button>
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i ?? 1) - 1); }}
              className="absolute left-4 text-white z-10"
              aria-label="Previous"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
          )}
          {lightboxIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => (i ?? 0) + 1); }}
              className="absolute right-4 text-white z-10"
              aria-label="Next"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
          )}
          <div className="max-w-4xl max-h-[80vh] p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].image_url}
              alt={images[lightboxIndex].alt_text || images[lightboxIndex].caption || 'Gallery image'}
              className="max-w-full max-h-[70vh] object-contain mx-auto rounded"
            />
            {images[lightboxIndex].caption && (
              <p className="text-center text-white font-ui text-sm mt-4">{images[lightboxIndex].caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
