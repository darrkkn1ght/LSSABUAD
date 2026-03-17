import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { announcementSchema, type AnnouncementFormData } from '@/lib/validation';
import { slugify } from '@/lib/format';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminAnnouncementFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<AnnouncementFormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '', slug: '', author: '', excerpt: '', content: '',
      published_at: new Date().toISOString().slice(0, 16),
      is_featured: false, is_published: true,
    },
  });

  const title = watch('title');

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEdit && title) {
      setValue('slug', slugify(title));
    }
  }, [title, isEdit, setValue]);

  // Load existing data for edit
  const { isLoading: loadingData } = useQuery({
    queryKey: ['admin-announcement', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .eq('id', id!)
        .single();
      if (error) throw error;
      reset({
        title: data.title,
        slug: data.slug,
        author: data.author,
        excerpt: data.excerpt || '',
        content: data.content,
        published_at: data.published_at?.slice(0, 16) || new Date().toISOString().slice(0, 16),
        is_featured: data.is_featured,
        is_published: data.is_published,
      });
      if (data.featured_image_url) setImageUrl(data.featured_image_url);
      return data;
    },
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: async (formData: AnnouncementFormData) => {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        author: formData.author,
        excerpt: formData.excerpt || null,
        content: formData.content,
        published_at: formData.published_at,
        is_featured: formData.is_featured,
        is_published: formData.is_published,
        featured_image_url: imageUrl,
      };
      if (isEdit) {
        const { error } = await supabase.from('announcements').update(payload).eq('id', id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('announcements').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      toast({ title: `Announcement ${isEdit ? 'updated' : 'created'}` });
      navigate('/admin/announcements');
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  if (isEdit && loadingData) {
    return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/admin/announcements" className="inline-flex items-center gap-1 text-primary text-sm font-ui hover:underline">
        <ArrowLeft className="h-4 w-4" /> Back to Announcements
      </Link>
      <h1 className="font-heading font-bold text-lg">{isEdit ? 'Edit' : 'New'} Announcement</h1>

      <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-4">
        <div>
          <Label className="font-ui text-sm">Title *</Label>
          <Input {...register('title')} className="mt-1 font-ui" />
          {errors.title && <p className="text-xs text-danger-light mt-1 font-ui">{errors.title.message}</p>}
        </div>

        <div>
          <Label className="font-ui text-sm">Slug *</Label>
          <Input {...register('slug')} className="mt-1 font-mono text-sm" />
          {errors.slug && <p className="text-xs text-danger-light mt-1 font-ui">{errors.slug.message}</p>}
        </div>

        <div>
          <Label className="font-ui text-sm">Author *</Label>
          <Input {...register('author')} className="mt-1 font-ui" />
          {errors.author && <p className="text-xs text-danger-light mt-1 font-ui">{errors.author.message}</p>}
        </div>

        <div>
          <Label className="font-ui text-sm">Excerpt (max 200 chars)</Label>
          <Textarea {...register('excerpt')} className="mt-1 font-ui" rows={2} />
          {errors.excerpt && <p className="text-xs text-danger-light mt-1 font-ui">{errors.excerpt.message}</p>}
        </div>

        <div>
          <Label className="font-ui text-sm">Content *</Label>
          <Textarea {...register('content')} className="mt-1 font-body min-h-[200px]" rows={8} />
          {errors.content && <p className="text-xs text-danger-light mt-1 font-ui">{errors.content.message}</p>}
        </div>

        <div>
          <Label className="font-ui text-sm">Published Date</Label>
          <Input type="datetime-local" {...register('published_at')} className="mt-1 font-ui" />
        </div>

        <div>
          <Label className="font-ui text-sm mb-2 block">Featured Image</Label>
          <ImageUpload
            bucket="announcement-images"
            currentUrl={imageUrl}
            onUpload={(url) => setImageUrl(url || null)}
          />
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Switch id="is_featured" checked={watch('is_featured')} onCheckedChange={(v) => setValue('is_featured', v)} />
            <Label htmlFor="is_featured" className="font-ui text-sm">Featured</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="is_published" checked={watch('is_published')} onCheckedChange={(v) => setValue('is_published', v)} />
            <Label htmlFor="is_published" className="font-ui text-sm">Published</Label>
          </div>
        </div>

        <Button type="submit" disabled={mutation.isPending} className="font-ui">
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Update' : 'Create'} Announcement
        </Button>
      </form>
    </div>
  );
}
