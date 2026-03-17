import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { formatDate } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Announcement } from '@/types';

export default function AdminAnnouncementsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: announcements = [], isLoading } = useQuery<Announcement[]>({
    queryKey: ['admin-announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return (data ?? []) as Announcement[];
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: 'is_published' | 'is_featured'; value: boolean }) => {
      const { error } = await supabase.from('announcements').update({ [field]: value }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-announcements'] }),
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('announcements').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-announcements'] });
      toast({ title: 'Announcement deleted' });
      setDeleteId(null);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg">Announcements</h1>
        <Button asChild size="sm" className="font-ui">
          <Link to="/admin/announcements/new"><Plus className="h-4 w-4 mr-1" /> New Announcement</Link>
        </Button>
      </div>

      <DataTable
        columns={[
          { header: 'Title', accessor: (row) => <span className="font-medium">{row.title}</span> },
          { header: 'Author', accessor: 'author', className: 'hidden md:table-cell' },
          { header: 'Date', accessor: (row) => formatDate(row.published_at), className: 'hidden md:table-cell' },
          {
            header: 'Featured',
            accessor: (row) => (
              <Switch
                checked={row.is_featured}
                onCheckedChange={(v) => toggleMutation.mutate({ id: row.id, field: 'is_featured', value: v })}
              />
            ),
          },
          {
            header: 'Published',
            accessor: (row) => (
              <Switch
                checked={row.is_published}
                onCheckedChange={(v) => toggleMutation.mutate({ id: row.id, field: 'is_published', value: v })}
              />
            ),
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                  <Link to={`/admin/announcements/${row.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-danger-light" onClick={() => setDeleteId(row.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ),
          },
        ]}
        data={announcements}
        isLoading={isLoading}
        emptyMessage="No announcements yet. Click 'New Announcement' to create one."
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Announcement"
        description="Are you sure you want to delete this announcement? This action cannot be undone."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
