import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scale, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const { signIn, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (!authLoading && isAdmin) navigate('/admin', { replace: true });
  }, [isAdmin, authLoading, navigate]);

  const onSubmit = async (data: LoginForm) => {
    setError('');
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate('/admin', { replace: true });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Helmet>
        <title>Admin Login | LSS ABUAD</title>
      </Helmet>
      <div className="w-full max-w-sm bg-card border border-border rounded p-8">
        <div className="flex items-center justify-center mb-6">
          <img src="/logo.png" alt="LSS ABUAD Logo" className="max-h-16 w-auto" />
        </div>
        <h1 className="font-heading text-center text-base font-bold mb-6">LSS ABUAD Admin</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="font-ui text-sm">Email</Label>
            <Input id="email" type="email" {...register('email')} className="mt-1 font-ui" />
            {errors.email && <p className="text-xs text-danger-light mt-1 font-ui">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password" className="font-ui text-sm">Password</Label>
            <Input id="password" type="password" {...register('password')} className="mt-1 font-ui" />
            {errors.password && <p className="text-xs text-danger-light mt-1 font-ui">{errors.password.message}</p>}
          </div>
          {error && <p className="text-sm text-danger-light font-ui">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full font-ui">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}
