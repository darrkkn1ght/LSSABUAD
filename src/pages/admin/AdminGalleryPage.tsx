import { useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import type { GalleryImage } from '@/types';

export default function AdminGalleryPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { upload, uploading } = useFileUpload();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editingCaption, setEditingCaption] = useState<{ id: string; value: string } | null>(null);

  const { data: images = [], isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['admin-gallery'],
    queryFn: async () => {
      const { data, error } = await supabase.from('gallery_images').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as GalleryImage[];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      for (const file of Array.from(files)) {
        if (file.size > 10 * 1024 * 1024) {
          toast({ title: `${file.name} is too large (max 10MB)`, variant: 'destructive' });
          continue;
        }
        const url = await upload('gallery-images', file);
        const { error } = await supabase.from('gallery_images').insert({
          image_url: url,
          caption: '',
          alt_text: file.name,
          display_order: images.length,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast({ title: 'Images uploaded' });
    },
    onError: (err: Error) => toast({ title: 'Upload failed', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('gallery_images').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      toast({ title: 'Image deleted' });
      setDeleteId(null);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const captionMutation = useMutation({
    mutationFn: async ({ id, caption }: { id: string; caption: string }) => {
      const { error } = await supabase.from('gallery_images').update({ caption }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-gallery'] });
      setEditingCaption(null);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg">Gallery</h1>
        <Button size="sm" className="font-ui" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Plus className="h-4 w-4 mr-1" />}
          Upload Images
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => e.target.files && uploadMutation.mutate(e.target.files)}
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-48 rounded" />)}
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-muted-foreground py-16 font-ui">No gallery images yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group bg-card border border-border rounded overflow-hidden">
              <img src={img.image_url} alt={img.alt_text || img.caption || 'Gallery'} className="w-full h-48 object-cover" loading="lazy" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => setDeleteId(img.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="p-2">
                {editingCaption?.id === img.id ? (
                  <Input
                    autoFocus
                    value={editingCaption.value}
                    onChange={(e) => setEditingCaption({ ...editingCaption, value: e.target.value })}
                    onBlur={() => captionMutation.mutate({ id: img.id, caption: editingCaption.value })}
                    onKeyDown={(e) => e.key === 'Enter' && captionMutation.mutate({ id: img.id, caption: editingCaption.value })}
                    className="text-xs font-ui h-7"
                  />
                ) : (
                  <p
                    className="text-xs text-muted-foreground font-ui cursor-pointer hover:text-foreground"
                    onClick={() => setEditingCaption({ id: img.id, value: img.caption || '' })}
                  >
                    {img.caption || 'Click to add caption'}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog open={!!deleteId} title="Delete Image" description="Delete this image?" onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} onCancel={() => setDeleteId(null)} isLoading={deleteMutation.isPending} />
    </div>
  );
}
