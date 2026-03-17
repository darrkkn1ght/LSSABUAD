import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { lecturerSchema, type LecturerFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function AdminLecturerFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<LecturerFormData>({
    resolver: zodResolver(lecturerSchema),
    defaultValues: { name: '', title: '', specialization: '', bio: '', email: '', display_order: 0, is_active: true },
  });

  const { isLoading: loadingData } = useQuery({
    queryKey: ['admin-lecturer', id],
    queryFn: async () => {
      const { data, error } = await supabase.from('lecturers').select('*').eq('id', id!).single();
      if (error) throw error;
      reset({ name: data.name, title: data.title, specialization: data.specialization || '', bio: data.bio || '', email: data.email || '', display_order: data.display_order, is_active: data.is_active });
      if (data.photo_url) setPhotoUrl(data.photo_url);
      return data;
    },
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: async (formData: LecturerFormData) => {
      const payload = {
        name: formData.name,
        title: formData.title,
        specialization: formData.specialization || null,
        bio: formData.bio || null,
        email: formData.email || null,
        display_order: formData.display_order,
        is_active: formData.is_active,
        photo_url: photoUrl,
      };
      if (isEdit) {
        const { error } = await supabase.from('lecturers').update(payload).eq('id', id!);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('lecturers').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-lecturers'] });
      toast({ title: `Lecturer ${isEdit ? 'updated' : 'created'}` });
      navigate('/admin/lecturers');
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  if (isEdit && loadingData) return <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="max-w-2xl space-y-6">
      <Link to="/admin/lecturers" className="inline-flex items-center gap-1 text-primary text-sm font-ui hover:underline"><ArrowLeft className="h-4 w-4" /> Back</Link>
      <h1 className="font-heading font-bold text-lg">{isEdit ? 'Edit' : 'Add'} Lecturer</h1>
      <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-4">
        <div>
          <Label className="font-ui text-sm">Name *</Label>
          <Input {...register('name')} className="mt-1 font-ui" />
          {errors.name && <p className="text-xs text-danger-light mt-1 font-ui">{errors.name.message}</p>}
        </div>
        <div>
          <Label className="font-ui text-sm">Title *</Label>
          <Input {...register('title')} className="mt-1 font-ui" />
          {errors.title && <p className="text-xs text-danger-light mt-1 font-ui">{errors.title.message}</p>}
        </div>
        <div>
          <Label className="font-ui text-sm">Specialization</Label>
          <Input {...register('specialization')} className="mt-1 font-ui" />
        </div>
        <div>
          <Label className="font-ui text-sm">Bio</Label>
          <Textarea {...register('bio')} className="mt-1 font-ui" rows={4} />
        </div>
        <div>
          <Label className="font-ui text-sm">Email</Label>
          <Input {...register('email')} className="mt-1 font-ui" />
          {errors.email && <p className="text-xs text-danger-light mt-1 font-ui">{errors.email.message}</p>}
        </div>
        <div>
          <Label className="font-ui text-sm">Display Order</Label>
          <Input type="number" {...register('display_order', { valueAsNumber: true })} className="mt-1 font-ui w-24" />
        </div>
        <div>
          <Label className="font-ui text-sm mb-2 block">Photo</Label>
          <ImageUpload bucket="lecturer-photos" currentUrl={photoUrl} onUpload={(url) => setPhotoUrl(url || null)} />
        </div>
        <div className="flex items-center gap-2">
          <Switch id="is_active" checked={watch('is_active')} onCheckedChange={(v) => setValue('is_active', v)} />
          <Label htmlFor="is_active" className="font-ui text-sm">Active</Label>
        </div>
        <Button type="submit" disabled={mutation.isPending} className="font-ui">
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEdit ? 'Update' : 'Create'}
        </Button>
      </form>
    </div>
  );
}
