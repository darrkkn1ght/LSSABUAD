import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';
import { PageHero } from '@/components/shared/PageHero';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import type { TimetableEntry } from '@/types';

const LEVELS = ['All', '100L', '200L', '300L', '400L', '500L'] as const;
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export default function TimetablePage() {
  const [level, setLevel] = useState<string>('All');
  const [semester, setSemester] = useState<'First Semester' | 'Second Semester'>('First Semester');

  const { data: entries = [], isLoading } = useQuery<TimetableEntry[]>({
    queryKey: ['timetable'],
    queryFn: async () => {
      const { data, error } = await supabase.from('timetable_entries').select('*');
      if (error) throw error;
      return (data ?? []) as TimetableEntry[];
    },
    staleTime: 2 * 60 * 1000,
  });

  const filtered = useMemo(() => {
    return entries.filter(e => {
      if (e.semester !== semester) return false;
      if (level !== 'All' && e.level !== level) return false;
      return true;
    });
  }, [entries, level, semester]);

  const timeSlots = useMemo(() => {
    const slots = new Set<string>();
    filtered.forEach(e => slots.add(`${e.start_time}-${e.end_time}`));
    return Array.from(slots).sort();
  }, [filtered]);

  return (
    <div>
      <Helmet>
        <title>Timetable | LSS ABUAD</title>
        <meta name="description" content="Academic schedule for Law Students at Afe Babalola University (LSS ABUAD)." />
      </Helmet>
      <PageHero title="Class Timetable" subtitle="Academic schedule for LSS ABUAD students" />
      <section className="py-16 container">
        <div className="space-y-4 mb-8">
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map(l => (
              <Button
                key={l}
                variant={level === l ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLevel(l)}
                className="font-ui"
              >
                {l}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            {(['First Semester', 'Second Semester'] as const).map(s => (
              <Button
                key={s}
                variant={semester === s ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSemester(s)}
                className="font-ui"
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <Skeleton className="h-64 w-full rounded" />
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No timetable entries for this selection.</p>
        ) : (
          <>
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full border border-border rounded font-ui text-sm">
                <thead>
                  <tr className="bg-secondary">
                    <th className="px-3 py-2 text-left text-white/80 font-medium border-b border-border">Time</th>
                    {DAYS.map(d => (
                      <th key={d} className="px-3 py-2 text-left text-white/80 font-medium border-b border-border">{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map(slot => (
                    <tr key={slot} className="border-b border-border">
                      <td className="px-3 py-2 font-mono text-xs text-muted-foreground whitespace-nowrap">{slot}</td>
                      {DAYS.map(day => {
                        const [start, end] = slot.split('-');
                        const entry = filtered.find(e => e.day === day && e.start_time === start && e.end_time === end);
                        return (
                          <td key={day} className="px-3 py-2 border-l border-border">
                            {entry ? (
                              <div>
                                <p className="font-medium text-secondary text-xs">{entry.course}</p>
                                <p className="font-mono text-xs text-primary">{entry.course_code}</p>
                                <p className="text-xs text-muted-foreground">{entry.location}</p>
                              </div>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-6">
              {DAYS.map(day => {
                const dayEntries = filtered.filter(e => e.day === day).sort((a, b) => a.start_time.localeCompare(b.start_time));
                if (dayEntries.length === 0) return null;
                return (
                  <div key={day}>
                    <h3 className="font-heading font-bold text-sm text-primary mb-3">{day}</h3>
                    <div className="space-y-2">
                      {dayEntries.map(e => (
                        <div key={e.id} className="bg-card border border-border rounded p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-ui font-medium text-sm text-secondary">{e.course}</p>
                              <p className="font-mono text-xs text-primary">{e.course_code}</p>
                            </div>
                            <span className="font-mono text-xs text-muted-foreground">{e.start_time}–{e.end_time}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{e.lecturer} • {e.location}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
