
-- Payment Submissions table
CREATE TABLE public.payment_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  matric_number TEXT NOT NULL,
  amount TEXT NOT NULL,
  receipt_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;

-- Allow public to insert (anyone can submit a payment)
CREATE POLICY "Public insert payment_submissions" ON public.payment_submissions FOR INSERT WITH CHECK (true);

-- Allow authenticated (admin) to read/update/delete
CREATE POLICY "Auth read payment_submissions" ON public.payment_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Auth update payment_submissions" ON public.payment_submissions FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth delete payment_submissions" ON public.payment_submissions FOR DELETE TO authenticated USING (true);

CREATE TRIGGER update_payment_submissions_updated_at BEFORE UPDATE ON public.payment_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for receipts
INSERT INTO storage.buckets (id, name, public) VALUES ('payment-receipts', 'payment-receipts', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for receipts
CREATE POLICY "Public read payment-receipts" ON storage.objects FOR SELECT USING (bucket_id = 'payment-receipts');
CREATE POLICY "Public upload payment-receipts" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'payment-receipts');
CREATE POLICY "Auth update/delete payment-receipts" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'payment-receipts');
