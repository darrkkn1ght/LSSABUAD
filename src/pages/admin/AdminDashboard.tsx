import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/format';
import { FileText, Users, GraduationCap, Image, Plus } from 'lucide-react';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ann, exec, lect, gal] = await Promise.all([
        supabase.from('announcements').select('id', { count: 'exact', head: true }),
        supabase.from('executives').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('lecturers').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('gallery_images').select('id', { count: 'exact', head: true }),
      ]);
      return {
        announcements: ann.count ?? 0,
        executives: exec.count ?? 0,
        lecturers: lect.count ?? 0,
        gallery: gal.count ?? 0,
      };
    },
    staleTime: 60 * 1000,
  });

  const { data: recentAnn = [] } = useQuery({
    queryKey: ['admin-recent-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('id, title, author, published_at, is_published')
        .order('created_at', { ascending: false })
        .limit(5);
      if (error) throw error;
      return data ?? [];
    },
    staleTime: 60 * 1000,
  });

  const statCards = [
    { label: 'Announcements', value: stats?.announcements, icon: FileText },
    { label: 'Executives', value: stats?.executives, icon: Users },
    { label: 'Lecturers', value: stats?.lecturers, icon: GraduationCap },
    { label: 'Gallery Images', value: stats?.gallery, icon: Image },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(s => (
          <div key={s.label} className="bg-card border border-border rounded p-4">
            <div className="flex items-center gap-3 mb-2">
              <s.icon className="h-5 w-5 text-primary" />
              <p className="text-xs text-muted-foreground font-ui">{s.label}</p>
            </div>
            {isLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <p className="text-2xl font-display font-bold text-foreground">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-bold text-base">Recent Announcements</h2>
          <Button asChild size="sm" className="font-ui">
            <Link to="/admin/announcements/new"><Plus className="h-4 w-4 mr-1" /> New</Link>
          </Button>
        </div>
        <div className="bg-card border border-border rounded overflow-hidden">
          <table className="w-full font-ui text-sm">
            <thead>
              <tr className="bg-elevated border-b border-border">
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Title</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium hidden md:table-cell">Author</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium hidden md:table-cell">Date</th>
                <th className="text-left px-4 py-2 text-muted-foreground font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentAnn.map(a => (
                <tr key={a.id} className="border-b border-border">
                  <td className="px-4 py-2 text-foreground">{a.title}</td>
                  <td className="px-4 py-2 text-muted-foreground hidden md:table-cell">{a.author}</td>
                  <td className="px-4 py-2 text-muted-foreground hidden md:table-cell">{formatDate(a.published_at)}</td>
                  <td className="px-4 py-2">
                    <StatusBadge status={a.is_published ? 'published' : 'draft'} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link to="/admin/announcements" className="text-primary text-sm font-ui hover:underline mt-2 inline-block">
          View all →
        </Link>
      </div>
    </div>
  );
}
