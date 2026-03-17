import { PageHero } from '@/components/shared/PageHero';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Building, Smartphone, Banknote, Copy, ExternalLink, ShieldCheck, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSubmissionSchema, type PaymentSubmissionFormData } from '@/lib/validation';
import { supabase } from '@/integrations/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { ImageUpload } from '@/components/shared/ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export default function PayDuesPage() {
  const { settings, isLoading } = useSiteSettings();
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<PaymentSubmissionFormData>({
    resolver: zodResolver(paymentSubmissionSchema),
    defaultValues: {
      full_name: '',
      matric_number: '',
      amount: '',
      receipt_url: '',
    }
  });

  const receiptUrl = watch('receipt_url');

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(settings.payment_account_number || '');
    toast({ title: 'Account number copied!', description: 'You can now paste it in your banking app.' });
  };

  const mutation = useMutation({
    mutationFn: async (data: PaymentSubmissionFormData) => {
      const { error } = await supabase
        .from('payment_submissions')
        .insert([{
          full_name: data.full_name,
          matric_number: data.matric_number,
          amount: data.amount,
          receipt_url: data.receipt_url,
          status: 'pending'
        }]);
      if (error) throw error;
    },
    onSuccess: () => {
      toast({ 
        title: 'Payment Confirmed', 
        description: 'Your submission has been received and is pending verification.',
      });
      reset();
    },
    onError: (err: Error) => {
      toast({ 
        title: 'Submission Failed', 
        description: err.message, 
        variant: 'destructive' 
      });
    }
  });

  if (isLoading) {
    return (
      <div className="bg-white">
        <PageHero title="Pay Your Dues" />
        <div className="py-24 container">
          <div className="grid md:grid-cols-3 gap-8">
            <Skeleton className="h-64 rounded-[2.5rem]" />
            <Skeleton className="h-64 rounded-[2.5rem]" />
            <Skeleton className="h-64 rounded-[2.5rem]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <Helmet>
        <title>Pay Dues | LSS ABUAD</title>
        <meta name="description" content="Official instructions for paying departmental dues to the Law Students' Society (LSS ABUAD)." />
      </Helmet>
      
      <PageHero 
        title="Revenue & Dues" 
        subtitle={settings.payment_amount ? `Standard Session Fee: ₦${settings.payment_amount}` : "Official Departmental Payment Portal"} 
        backgroundImage="/hero-bg.jpg"
      />

      <section className="py-24 container relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-primary/[0.02] blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto space-y-24"
        >
          {/* Payment Methods */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={fadeUp} className="glass-panel p-10 rounded-[2.5rem] border-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-500 relative group bg-white">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <Building className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-secondary mb-6">Bank Transfer</h3>
              <div className="space-y-6 text-sm">
                {settings.payment_bank_name && (
                  <div>
                    <p className="text-secondary/40 font-ui text-[10px] uppercase tracking-widest mb-1">Financial Institution</p>
                    <p className="text-secondary font-display font-bold text-lg">{settings.payment_bank_name}</p>
                  </div>
                )}
                {settings.payment_account_number && (
                  <div>
                    <p className="text-secondary/40 font-ui text-[10px] uppercase tracking-widest mb-1">Account Identifier</p>
                    <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-2xl border border-secondary/5">
                      <span className="font-mono text-secondary font-bold text-lg tracking-wider">{settings.payment_account_number}</span>
                      <button 
                        onClick={copyAccountNumber} 
                        className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
                {settings.payment_account_name && (
                  <div>
                    <p className="text-secondary/40 font-ui text-[10px] uppercase tracking-widest mb-1">Account Designation</p>
                    <p className="text-secondary font-body font-medium">{settings.payment_account_name}</p>
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="glass-panel p-10 rounded-[2.5rem] border-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-500 relative group bg-white">
              <div className="h-14 w-14 rounded-2xl bg-secondary/5 flex items-center justify-center mb-8 border border-secondary/5 group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="font-display font-bold text-2xl text-secondary mb-6">Digital Portal</h3>
              <p className="text-secondary/60 font-body text-sm leading-relaxed mb-8">
                {settings.payment_quickteller_instructions || "Secure online processing via Quickteller or Interswitch portals."}
              </p>
              {settings.payment_quickteller_link && (
                <Button asChild className="w-full rounded-2xl py-6 font-ui font-bold shadow-lg hover:shadow-primary/20 bg-secondary hover:bg-secondary/90 transition-all">
                  <a href={settings.payment_quickteller_link} target="_blank" rel="noopener noreferrer">
                    Initialize Online <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              )}
            </motion.div>

            <motion.div variants={fadeUp} className="glass-panel p-10 rounded-[2.5rem] border-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-500 relative group bg-white">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 border border-primary/10">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-2xl text-secondary mb-6">Physical Deposit</h3>
              <p className="text-secondary/60 font-body text-sm leading-relaxed">
                {settings.payment_cash_instructions || "Direct payments can be made at the Student Affairs office during active hours (9:00 AM - 4:00 PM)."}
              </p>
              <div className="mt-8 pt-8 border-t border-secondary/5">
                <div className="flex items-center gap-3 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                  <span className="font-ui text-[10px] font-bold uppercase tracking-widest">Verified Channel</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Confirmation Form */}
          <motion.div variants={fadeUp} className="max-w-4xl mx-auto">
            <div className="glass-panel p-12 rounded-[3rem] border-secondary/5 shadow-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="text-center mb-12">
                <h3 className="font-display font-bold text-3xl text-secondary mb-4">Confirm Your Payment</h3>
                <p className="text-secondary/50 font-body max-w-lg mx-auto">
                  Upload your receipt and student details to initialize the verification process.
                </p>
              </div>

              <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Full Name</Label>
                    <Input {...register('full_name')} className="rounded-2xl border-secondary/10 h-14 px-6 focus:ring-primary focus:border-primary transition-all font-body text-secondary" placeholder="E.g. John Doe" />
                    {errors.full_name && <p className="text-xs text-primary font-ui mt-1">{errors.full_name.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Matric Number</Label>
                    <Input {...register('matric_number')} className="rounded-2xl border-secondary/10 h-14 px-6 focus:ring-primary focus:border-primary transition-all font-mono text-secondary" placeholder="E.g. LAW/2023/1234" />
                    {errors.matric_number && <p className="text-xs text-primary font-ui mt-1">{errors.matric_number.message}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Amount Paid (₦)</Label>
                  <Input {...register('amount')} className="rounded-2xl border-secondary/10 h-14 px-6 focus:ring-primary focus:border-primary transition-all font-display font-bold text-lg text-secondary" placeholder="5,000" />
                  {errors.amount && <p className="text-xs text-primary font-ui mt-1">{errors.amount.message}</p>}
                </div>

                <div className="space-y-4">
                  <Label className="font-ui text-[10px] uppercase font-bold tracking-[0.2em] text-secondary/40 ml-1">Transaction Receipt</Label>
                  <ImageUpload
                    bucket="payment-receipts"
                    currentUrl={receiptUrl}
                    onUpload={(url) => setValue('receipt_url', url)}
                    accept="image/*,application/pdf"
                  />
                  {errors.receipt_url && <p className="text-xs text-primary font-ui mt-1">{errors.receipt_url.message}</p>}
                </div>

                <Button 
                  type="submit" 
                  disabled={mutation.isPending} 
                  className="w-full h-16 rounded-2xl font-ui font-bold text-lg shadow-xl shadow-primary/20 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  {mutation.isPending ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying Credentials...</>
                  ) : (
                    <><CheckCircle2 className="mr-2 h-5 w-5" /> Submit for Verification</>
                  )}
                </Button>
              </form>
            </div>
            
            <div className="mt-12 p-8 glass-panel rounded-[2rem] border-primary/10 bg-primary/5 flex items-start gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h4 className="font-ui font-bold text-xs uppercase tracking-widest text-secondary">Verification Note</h4>
                <p className="text-xs text-secondary/60 font-body leading-relaxed">
                  Verification typically takes 24-48 hours. Once confirmed, you will be cleared for departmental privileges. 
                  Always retain your physical receipt as final proof of payment.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
