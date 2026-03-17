import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export default function AdminPayDuesPage() {
  const { settings, isLoading } = useSiteSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!isLoading) {
      reset({
        payment_bank_name: settings.payment_bank_name || '',
        payment_account_number: settings.payment_account_number || '',
        payment_account_name: settings.payment_account_name || '',
        payment_bank_branch: settings.payment_bank_branch || '',
        payment_amount: settings.payment_amount || '',
        payment_bank_instructions: settings.payment_bank_instructions || '',
        payment_quickteller_instructions: settings.payment_quickteller_instructions || '',
        payment_quickteller_link: settings.payment_quickteller_link || '',
        payment_cash_instructions: settings.payment_cash_instructions || '',
      });
    }
  }, [isLoading, settings, reset]);

  const mutation = useMutation({
    mutationFn: async (data: Record<string, string>) => {
      for (const [key, value] of Object.entries(data)) {
        const { error } = await supabase.from('site_settings').update({ value }).eq('key', key);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({ title: 'Payment settings saved' });
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="font-heading font-bold text-lg">Payment Settings</h1>
      <form onSubmit={handleSubmit(d => mutation.mutate(d as Record<string, string>))} className="space-y-4">
        <div><Label className="font-ui text-sm">Bank Name</Label><Input {...register('payment_bank_name')} className="mt-1 font-ui" /></div>
        <div><Label className="font-ui text-sm">Account Number</Label><Input {...register('payment_account_number')} className="mt-1 font-mono" /></div>
        <div><Label className="font-ui text-sm">Account Name</Label><Input {...register('payment_account_name')} className="mt-1 font-ui" /></div>
        <div><Label className="font-ui text-sm">Branch</Label><Input {...register('payment_bank_branch')} className="mt-1 font-ui" /></div>
        <div><Label className="font-ui text-sm">Amount</Label><Input {...register('payment_amount')} className="mt-1 font-ui" placeholder="e.g. ₦5,000" /></div>
        <div><Label className="font-ui text-sm">Bank Transfer Instructions</Label><Textarea {...register('payment_bank_instructions')} className="mt-1 font-ui" rows={3} /></div>
        <div><Label className="font-ui text-sm">Quickteller Instructions</Label><Textarea {...register('payment_quickteller_instructions')} className="mt-1 font-ui" rows={3} /></div>
        <div><Label className="font-ui text-sm">Quickteller Link</Label><Input {...register('payment_quickteller_link')} className="mt-1 font-ui" /></div>
        <div><Label className="font-ui text-sm">Cash Payment Instructions</Label><Textarea {...register('payment_cash_instructions')} className="mt-1 font-ui" rows={3} /></div>
        <Button type="submit" disabled={mutation.isPending} className="font-ui">
          {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Settings
        </Button>
      </form>
    </div>
  );
}
