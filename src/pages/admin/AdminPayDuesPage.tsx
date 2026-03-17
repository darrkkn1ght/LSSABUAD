import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, XCircle, Clock, ExternalLink, Eye } from 'lucide-react';
import { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/format';
import type { PaymentSubmission } from '@/types';

export default function AdminPayDuesPage() {
  const { settings, isLoading: loadingSettings } = useSiteSettings();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (!loadingSettings) {
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
  }, [loadingSettings, settings, reset]);

  // Fetch Submissions
  const { data: submissions = [], isLoading: loadingSubmissions } = useQuery<PaymentSubmission[]>({
    queryKey: ['admin-payment-submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payment_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as PaymentSubmission[];
    }
  });

  const settingsMutation = useMutation({
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

  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'verified' | 'rejected' }) => {
      const { error } = await supabase
        .from('payment_submissions')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-payment-submissions'] });
      toast({ title: 'Status updated successfully' });
    },
    onError: (err: Error) => toast({ title: 'Update failed', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-2xl text-secondary">Revenue Management</h1>
      </div>

      <Tabs defaultValue="submissions" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="submissions" className="font-ui font-medium px-8 py-2">Payment Submissions</TabsTrigger>
          <TabsTrigger value="settings" className="font-ui font-medium px-8 py-2">Payment Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="submissions">
          {loadingSubmissions ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
          ) : submissions.length === 0 ? (
            <div className="text-center py-24 bg-muted/30 rounded-3xl border-2 border-dashed border-muted">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-20" />
              <p className="text-secondary/50 font-body">No payment submissions found.</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-border overflow-hidden shadow-sm">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14 pl-8">Student</TableHead>
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14">Matric No.</TableHead>
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14">Amount</TableHead>
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14 text-center">Receipt</TableHead>
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14">Status</TableHead>
                    <TableHead className="font-ui font-bold text-xs uppercase tracking-widest text-secondary/40 h-14 text-right pr-8">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.id} className="hover:bg-muted/30 transition-colors">
                      <TableCell className="pl-8 py-6">
                        <div className="space-y-1">
                          <p className="font-display font-bold text-secondary">{sub.full_name}</p>
                          <p className="text-[10px] text-secondary/40 font-ui">{formatDate(sub.created_at)}</p>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-secondary/60">{sub.matric_number}</TableCell>
                      <TableCell className="font-display font-medium text-secondary">₦{sub.amount}</TableCell>
                      <TableCell className="text-center">
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 text-primary hover:bg-primary/10">
                          <a href={sub.receipt_url} target="_blank" rel="noopener noreferrer">
                            <Eye className="h-5 w-5" />
                          </a>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Badge variant={sub.status === 'verified' ? 'default' : sub.status === 'rejected' ? 'destructive' : 'secondary'} className="rounded-full px-4 py-1 font-ui font-bold text-[10px] uppercase tracking-widest">
                          {sub.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right pr-8">
                        <div className="flex items-center justify-end gap-2">
                          {sub.status === 'pending' && (
                            <>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => statusMutation.mutate({ id: sub.id, status: 'verified' })}
                                disabled={statusMutation.isPending}
                                className="h-9 rounded-xl border-green-200 text-green-600 hover:bg-green-50 hover:border-green-300"
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2" /> Verify
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => statusMutation.mutate({ id: sub.id, status: 'rejected' })}
                                disabled={statusMutation.isPending}
                                className="h-9 rounded-xl border-red-100 text-red-500 hover:bg-red-50 hover:border-red-200"
                              >
                                <XCircle className="h-4 w-4 mr-2" /> Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="settings">
          <div className="bg-white p-10 rounded-3xl border border-border shadow-sm max-w-2xl">
            <h3 className="font-display font-bold text-xl text-secondary mb-8">Financial Portal Configuration</h3>
            <form onSubmit={handleSubmit(d => settingsMutation.mutate(d as Record<string, string>))} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Bank Name</Label>
                  <Input {...register('payment_bank_name')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Account Number</Label>
                  <Input {...register('payment_account_number')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-mono" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Account Name</Label>
                <Input {...register('payment_account_name')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-body" />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Branch</Label>
                  <Input {...register('payment_bank_branch')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-body" />
                </div>
                <div className="space-y-2">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Standard Amount (₦)</Label>
                  <Input {...register('payment_amount')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-display font-bold" placeholder="e.g. 10,000" />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Transfer Instructions</Label>
                <Textarea {...register('payment_bank_instructions')} className="rounded-2xl border-secondary/10 px-5 py-4 focus:ring-primary font-body" rows={3} />
              </div>

              <div className="space-y-2">
                <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Quickteller Instructions</Label>
                <Textarea {...register('payment_quickteller_instructions')} className="rounded-2xl border-secondary/10 px-5 py-4 focus:ring-primary font-body" rows={3} />
              </div>

              <div className="space-y-2">
                <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Quickteller Link</Label>
                <Input {...register('payment_quickteller_link')} className="rounded-2xl border-secondary/10 h-12 px-5 focus:ring-primary font-ui text-sm" />
              </div>

              <div className="space-y-2">
                <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Cash Payment Notes</Label>
                <Textarea {...register('payment_cash_instructions')} className="rounded-2xl border-secondary/10 px-5 py-4 focus:ring-primary font-body" rows={3} />
              </div>

              <Button type="submit" disabled={settingsMutation.isPending} className="w-full h-14 rounded-2xl font-ui font-bold shadow-xl shadow-primary/20">
                {settingsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Update Configuration
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
