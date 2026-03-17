import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const { settings, isLoading } = useSiteSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generalForm = useForm();
  const contactForm = useForm();

  useEffect(() => {
    if (!isLoading) {
      generalForm.reset({
        site_name: settings.site_name || '',
        site_tagline: settings.site_tagline || '',
        department_about: settings.department_about || '',
        department_vision: settings.department_vision || '',
        department_mission: settings.department_mission || '',
      });
      contactForm.reset({
        contact_email: settings.contact_email || '',
        contact_phone: settings.contact_phone || '',
        contact_address: settings.contact_address || '',
        social_facebook: settings.social_facebook || '',
        social_twitter: settings.social_twitter || '',
        social_instagram: settings.social_instagram || '',
      });
    }
  }, [isLoading, settings, generalForm, contactForm]);

  const saveMutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      for (const [key, value] of Object.entries(data)) {
        const { error } = await supabase.from('site_settings').update({ value }).eq('key', key);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({ title: 'Settings saved' });
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-heading font-bold text-lg">Site Settings</h1>
      <Tabs defaultValue="general">
        <TabsList className="font-ui">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value="general" className="mt-6">
          <form onSubmit={generalForm.handleSubmit(d => saveMutation.mutate(d as Record<string, string>))} className="space-y-4">
            <div><Label className="font-ui text-sm">Site Name</Label><Input {...generalForm.register('site_name')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">Tagline</Label><Input {...generalForm.register('site_tagline')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">About</Label><Textarea {...generalForm.register('department_about')} className="mt-1 font-body" rows={6} /></div>
            <div><Label className="font-ui text-sm">Vision</Label><Textarea {...generalForm.register('department_vision')} className="mt-1 font-ui" rows={3} /></div>
            <div><Label className="font-ui text-sm">Mission</Label><Textarea {...generalForm.register('department_mission')} className="mt-1 font-ui" rows={3} /></div>
            <Button type="submit" disabled={saveMutation.isPending} className="font-ui">
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="contact" className="mt-6">
          <form onSubmit={contactForm.handleSubmit(d => saveMutation.mutate(d as Record<string, string>))} className="space-y-4">
            <div><Label className="font-ui text-sm">Email</Label><Input {...contactForm.register('contact_email')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">Phone</Label><Input {...contactForm.register('contact_phone')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">Address</Label><Textarea {...contactForm.register('contact_address')} className="mt-1 font-ui" rows={3} /></div>
            <div><Label className="font-ui text-sm">Facebook</Label><Input {...contactForm.register('social_facebook')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">Twitter</Label><Input {...contactForm.register('social_twitter')} className="mt-1 font-ui" /></div>
            <div><Label className="font-ui text-sm">Instagram</Label><Input {...contactForm.register('social_instagram')} className="mt-1 font-ui" /></div>
            <Button type="submit" disabled={saveMutation.isPending} className="font-ui">
              {saveMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="appearance" className="mt-6">
          <div className="text-center py-16 text-muted-foreground font-ui">
            <p className="text-lg mb-2">Coming Soon</p>
            <p className="text-sm">Appearance customization will be available in a future update.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
