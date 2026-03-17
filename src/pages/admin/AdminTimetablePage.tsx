import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import { timetableSchema, type TimetableFormData } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DataTable } from '@/components/shared/DataTable';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import type { TimetableEntry } from '@/types';

const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'] as const;
const LEVELS = ['100L','200L','300L','400L','500L'] as const;
const SEMESTERS = ['First Semester','Second Semester'] as const;

export default function AdminTimetablePage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editEntry, setEditEntry] = useState<TimetableEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [filterSemester, setFilterSemester] = useState<string>('All');

  const { data: entries = [], isLoading } = useQuery<TimetableEntry[]>({
    queryKey: ['admin-timetable'],
    queryFn: async () => {
      const { data, error } = await supabase.from('timetable_entries').select('*').order('day').order('start_time');
      if (error) throw error;
      return (data ?? []) as TimetableEntry[];
    },
  });

  const filtered = entries.filter(e => {
    if (filterLevel !== 'All' && e.level !== filterLevel) return false;
    if (filterSemester !== 'All' && e.semester !== filterSemester) return false;
    return true;
  });

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<TimetableFormData>({
    resolver: zodResolver(timetableSchema),
    defaultValues: { course: '', course_code: '', lecturer: '', day: 'Monday', start_time: '08:00', end_time: '10:00', location: '', level: '100L', semester: 'First Semester' },
  });

  const openNew = () => {
    setEditEntry(null);
    reset({ course: '', course_code: '', lecturer: '', day: 'Monday', start_time: '08:00', end_time: '10:00', location: '', level: '100L', semester: 'First Semester' });
    setDialogOpen(true);
  };

  const openEdit = (entry: TimetableEntry) => {
    setEditEntry(entry);
    reset({
      course: entry.course, course_code: entry.course_code, lecturer: entry.lecturer,
      day: entry.day, start_time: entry.start_time, end_time: entry.end_time,
      location: entry.location, level: entry.level, semester: entry.semester,
    });
    setDialogOpen(true);
  };

  const mutation = useMutation({
    mutationFn: async (formData: TimetableFormData) => {
      const payload = {
        course: formData.course,
        course_code: formData.course_code,
        lecturer: formData.lecturer,
        day: formData.day,
        start_time: formData.start_time,
        end_time: formData.end_time,
        location: formData.location,
        level: formData.level,
        semester: formData.semester,
      };
      if (editEntry) {
        const { error } = await supabase.from('timetable_entries').update(payload).eq('id', editEntry.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('timetable_entries').insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-timetable'] });
      toast({ title: `Entry ${editEntry ? 'updated' : 'created'}` });
      setDialogOpen(false);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('timetable_entries').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-timetable'] });
      toast({ title: 'Entry deleted' });
      setDeleteId(null);
    },
    onError: (err: Error) => toast({ title: 'Error', description: err.message, variant: 'destructive' }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading font-bold text-lg">Timetable</h1>
        <Button size="sm" className="font-ui" onClick={openNew}><Plus className="h-4 w-4 mr-1" /> Add Entry</Button>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-32 font-ui"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Levels</SelectItem>
            {LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterSemester} onValueChange={setFilterSemester}>
          <SelectTrigger className="w-44 font-ui"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Semesters</SelectItem>
            {SEMESTERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        columns={[
          { header: 'Course', accessor: (row) => <span className="font-medium">{row.course}</span> },
          { header: 'Code', accessor: (row) => <span className="font-mono text-xs">{row.course_code}</span> },
          { header: 'Lecturer', accessor: 'lecturer', className: 'hidden md:table-cell' },
          { header: 'Day', accessor: 'day', className: 'hidden md:table-cell' },
          { header: 'Time', accessor: (row) => <span className="font-mono text-xs">{row.start_time}–{row.end_time}</span> },
          { header: 'Location', accessor: 'location', className: 'hidden lg:table-cell' },
          { header: 'Level', accessor: 'level' },
          {
            header: 'Actions',
            accessor: (row) => (
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(row)}><Pencil className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-danger-light" onClick={() => setDeleteId(row.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ),
          },
        ]}
        data={filtered}
        isLoading={isLoading}
        emptyMessage="No timetable entries."
      />

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">{editEntry ? 'Edit' : 'Add'} Timetable Entry</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-ui text-sm">Course *</Label>
                <Input {...register('course')} className="mt-1 font-ui" />
                {errors.course && <p className="text-xs text-danger-light mt-1">{errors.course.message}</p>}
              </div>
              <div>
                <Label className="font-ui text-sm">Course Code *</Label>
                <Input {...register('course_code')} className="mt-1 font-mono" />
                {errors.course_code && <p className="text-xs text-danger-light mt-1">{errors.course_code.message}</p>}
              </div>
            </div>
            <div>
              <Label className="font-ui text-sm">Lecturer *</Label>
              <Input {...register('lecturer')} className="mt-1 font-ui" />
              {errors.lecturer && <p className="text-xs text-danger-light mt-1">{errors.lecturer.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label className="font-ui text-sm">Day</Label>
                <Select value={watch('day')} onValueChange={(v) => setValue('day', v as TimetableFormData['day'])}>
                  <SelectTrigger className="mt-1 font-ui"><SelectValue /></SelectTrigger>
                  <SelectContent>{DAYS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-ui text-sm">Start</Label>
                <Input type="time" {...register('start_time')} className="mt-1 font-mono" />
              </div>
              <div>
                <Label className="font-ui text-sm">End</Label>
                <Input type="time" {...register('end_time')} className="mt-1 font-mono" />
                {errors.end_time && <p className="text-xs text-danger-light mt-1">{errors.end_time.message}</p>}
              </div>
            </div>
            <div>
              <Label className="font-ui text-sm">Location *</Label>
              <Input {...register('location')} className="mt-1 font-ui" />
              {errors.location && <p className="text-xs text-danger-light mt-1">{errors.location.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-ui text-sm">Level</Label>
                <Select value={watch('level')} onValueChange={(v) => setValue('level', v as TimetableFormData['level'])}>
                  <SelectTrigger className="mt-1 font-ui"><SelectValue /></SelectTrigger>
                  <SelectContent>{LEVELS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="font-ui text-sm">Semester</Label>
                <Select value={watch('semester')} onValueChange={(v) => setValue('semester', v as TimetableFormData['semester'])}>
                  <SelectTrigger className="mt-1 font-ui"><SelectValue /></SelectTrigger>
                  <SelectContent>{SEMESTERS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" disabled={mutation.isPending} className="w-full font-ui">
              {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editEntry ? 'Update' : 'Create'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog open={!!deleteId} title="Delete Entry" description="Delete this timetable entry?" onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} onCancel={() => setDeleteId(null)} isLoading={deleteMutation.isPending} />
    </div>
  );
}
