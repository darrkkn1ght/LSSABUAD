import { useState, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { OptimizedImage } from '@/components/shared/OptimizedImage';
import { PremiumEmptyState } from '@/components/shared/PremiumEmptyState';
import { X, ChevronLeft, ChevronRight, ZoomIn, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { GalleryImage } from '@/types';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.05 } }
};

export default function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order');
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
    <div className="bg-white">
      <Helmet>
        <title>Gallery | LSS ABUAD</title>
        <meta name="description" content="A visual journey through moments, events, and academic life at LSS ABUAD." />
      </Helmet>
      
      <PageHero 
        title="Visual Legacy" 
        subtitle="Capturing the moments that define our legal community." 
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 container relative overflow-hidden">
        {isLoading ? (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="w-full h-64 mb-6 rounded-[2rem]" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <PremiumEmptyState 
            icon={Camera}
            title="The Lens is Waiting"
            message="No moments have been captured in the gallery yet. Stay tuned for future events."
          />
        ) : (
          <motion.div
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
          >
            {images.map((img, i) => (
              <motion.div
                key={img.id}
                variants={fadeUp}
                className="break-inside-avoid group relative rounded-[2rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-secondary/5"
                onClick={() => setLightboxIndex(i)}
              >
                <OptimizedImage
                  src={img.image_url}
                  alt={img.alt_text || img.caption || 'Gallery image'}
                  containerClassName="rounded-[2rem]"
                  className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Glassmorphism Overlay */}
                <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                  <div className="flex flex-col items-center justify-center h-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white mb-4">
                      <ZoomIn className="h-6 w-6" />
                    </div>
                    {img.caption && (
                      <p className="text-sm text-white font-ui font-medium drop-shadow-md text-center">
                        {img.caption}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Polished Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && images[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setLightboxIndex(null)}
          >
            <button 
              onClick={() => setLightboxIndex(null)} 
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
            >
              <X className="h-10 w-10" />
            </button>
            
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
              <button
                disabled={lightboxIndex === 0}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.max((i ?? 0) - 1, 0)); }}
                className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary disabled:opacity-20 transition-all active:scale-95"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              
              <div className="text-white/40 font-ui text-xs tracking-[0.4em] uppercase">
                {lightboxIndex + 1} <span className="mx-2">/</span> {images.length}
              </div>
              
              <button
                disabled={lightboxIndex === images.length - 1}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(i => Math.min((i ?? 0) + 1, images.length - 1)); }}
                className="h-14 w-14 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary disabled:opacity-20 transition-all active:scale-95"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              key={images[lightboxIndex].id}
              className="relative max-w-full max-h-full flex flex-col items-center" 
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[lightboxIndex].image_url}
                alt={images[lightboxIndex].alt_text || images[lightboxIndex].caption || 'Gallery image'}
                className="max-w-[90vw] max-h-[70vh] object-contain rounded-2xl shadow-2xl border border-white/10"
              />
              {images[lightboxIndex].caption && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 text-center"
                >
                  <p className="text-white font-display text-2xl font-bold mb-2">
                    {images[lightboxIndex].caption}
                  </p>
                  <div className="h-px w-12 bg-primary/40 mx-auto" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
