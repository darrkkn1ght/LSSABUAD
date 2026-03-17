import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import type { Executive } from '@/types';

export default function AdminExecutivesPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: executives = [], isLoading } = useQuery<Executive[]>({
    queryKey: ['admin-executives'],
    queryFn: async () => {
      const { data, error } = await supabase.from('executives').select('*').order('display_order');
      if (error) throw error;
      return (data ?? []) as Executive[];
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: boolean }) => {
      const { error } = await supabase.from('executives').update({ is_active: value }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-executives'] }),
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('executives').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-executives'] });
      toast({ title: 'Executive deleted' });
      setDeleteId(null);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg">Executives</h1>
        <Button asChild size="sm" className="font-ui">
          <Link to="/admin/executives/new"><Plus className="h-4 w-4 mr-1" /> Add Executive</Link>
        </Button>
      </div>

      <DataTable
        columns={[
          {
            header: 'Photo',
            accessor: (row) => (
              <div className="w-10 h-10 rounded-full bg-elevated overflow-hidden">
                {row.photo_url ? (
                  <img src={row.photo_url} alt={row.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-sm font-display text-primary">{row.name.charAt(0)}</div>
                )}
              </div>
            ),
          },
          { header: 'Name', accessor: (row) => <span className="font-medium">{row.name}</span> },
          { header: 'Position', accessor: 'position', className: 'hidden md:table-cell' },
          { header: 'Order', accessor: (row) => <span className="font-mono text-xs">{row.display_order}</span> },
          {
            header: 'Active',
            accessor: (row) => (
              <Switch checked={row.is_active} onCheckedChange={(v) => toggleMutation.mutate({ id: row.id, value: v })} />
            ),
          },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex gap-2">
                <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                  <Link to={`/admin/executives/${row.id}/edit`}><Pencil className="h-4 w-4" /></Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-danger-light" onClick={() => setDeleteId(row.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ),
          },
        ]}
        data={executives}
        isLoading={isLoading}
        emptyMessage="No executives yet. Click 'Add Executive' to create one."
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Executive"
        description="Are you sure? This cannot be undone."
        onConfirm={() => deleteId && deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
