import { PageHero } from '@/components/shared/PageHero';
import { Helmet } from 'react-helmet-async';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { Building, Smartphone, Banknote, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

export default function PayDuesPage() {
  const { settings, isLoading } = useSiteSettings();
  const { toast } = useToast();

  const copyAccountNumber = () => {
    navigator.clipboard.writeText(settings.payment_account_number || '');
    toast({ title: 'Account number copied!' });
  };

  if (isLoading) {
    return (
      <div>
        <PageHero title="Pay Your Dues" />
        <div className="py-16 container"><Skeleton className="h-64 rounded" /></div>
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Pay Dues | LSS ABUAD</title>
        <meta name="description" content="Official instructions for paying departmental dues to the Law Students' Society (LSS ABUAD)." />
      </Helmet>
      <PageHero title="Pay Your Dues" subtitle={settings.payment_amount ? `Amount: ${settings.payment_amount}` : undefined} />
      <section className="py-16 container">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-card border border-border rounded p-6 shadow-sm">
            <Building className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-heading font-bold text-base text-secondary mb-4">Bank Transfer</h3>
            <div className="space-y-3 text-sm font-ui">
              {settings.payment_bank_name && (
                <div><p className="text-muted-foreground text-xs">Bank</p><p className="text-foreground">{settings.payment_bank_name}</p></div>
              )}
              {settings.payment_account_number && (
                <div>
                  <p className="text-muted-foreground text-xs">Account Number</p>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-foreground">{settings.payment_account_number}</span>
                    <button onClick={copyAccountNumber} className="text-primary hover:text-primary/80 transition-colors" aria-label="Copy account number">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
              {settings.payment_account_name && (
                <div><p className="text-muted-foreground text-xs">Account Name</p><p className="text-foreground">{settings.payment_account_name}</p></div>
              )}
              {settings.payment_bank_branch && (
                <div><p className="text-muted-foreground text-xs">Branch</p><p className="text-foreground">{settings.payment_bank_branch}</p></div>
              )}
            </div>
            {settings.payment_bank_instructions && (
              <p className="text-xs text-muted-foreground mt-4">{settings.payment_bank_instructions}</p>
            )}
          </div>

          <div className="bg-card border border-border rounded p-6 shadow-sm">
            <Smartphone className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-heading font-bold text-base text-secondary mb-4">Quickteller</h3>
            {settings.payment_quickteller_instructions && (
              <p className="text-sm text-muted-foreground mb-4">{settings.payment_quickteller_instructions}</p>
            )}
            {settings.payment_quickteller_link && (
              <Button asChild size="sm" className="font-ui">
                <a href={settings.payment_quickteller_link} target="_blank" rel="noopener noreferrer">
                  Pay on Quickteller <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </Button>
            )}
          </div>

          <div className="bg-card border border-border rounded p-6 shadow-sm">
            <Banknote className="h-8 w-8 text-primary mb-4" />
            <h3 className="font-heading font-bold text-base text-secondary mb-4">Cash Payment</h3>
            {settings.payment_cash_instructions && (
              <p className="text-sm text-muted-foreground">{settings.payment_cash_instructions}</p>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 p-4 bg-muted border border-border rounded text-center">
          <p className="text-sm text-muted-foreground font-ui">
            ⚠️ This platform does not process payments. After payment, present your receipt to the Student Affairs office.
          </p>
        </div>
      </section>
    </div>
  );
}
