import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { FileText, Users, Search, Loader2 } from 'lucide-react';
import type { Announcement, Executive } from '@/types';

interface SearchOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchOverlay({ open, onOpenChange }: SearchOverlayProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Fetch data for search
  const { data: results, isLoading } = useQuery({
    queryKey: ['global-search'],
    queryFn: async () => {
      const [annRes, execRes] = await Promise.all([
        supabase.from('announcements').select('id, title, slug').eq('is_published', true).limit(50),
        supabase.from('executives').select('id, name, position').eq('is_active', true).limit(50),
      ]);

      return {
        announcements: (annRes.data ?? []) as any[],
        executives: (execRes.data ?? []) as any[],
      };
    },
    enabled: open,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [onOpenChange, open]);

  const handleSelect = (path: string) => {
    onOpenChange(false);
    navigate(path);
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search updates, executives, or resources..." 
        value={query}
        onValueChange={setQuery}
      />
      <CommandList className="max-h-[300px] overflow-y-auto">
        <CommandEmpty>
          {isLoading ? (
            <div className="flex items-center justify-center py-6 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin mr-2" /> Searching...
            </div>
          ) : (
            'No results found.'
          )}
        </CommandEmpty>
        
        {results?.announcements && results.announcements.length > 0 && (
          <CommandGroup heading="Announcements">
            {results.announcements.map((a) => (
              <CommandItem
                key={a.id}
                onSelect={() => handleSelect(`/announcements/${a.slug}`)}
                className="flex items-center gap-3 cursor-pointer py-3"
              >
                <FileText className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-display font-medium text-secondary">{a.title}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">News Release</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {results?.executives && results.executives.length > 0 && (
          <CommandGroup heading="Executives">
            {results.executives.map((e) => (
              <CommandItem
                key={e.id}
                onSelect={() => handleSelect('/executives')}
                className="flex items-center gap-3 cursor-pointer py-3"
              >
                <Users className="h-4 w-4 text-primary" />
                <div className="flex flex-col">
                  <span className="font-display font-medium text-secondary">{e.name}</span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{e.position}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
}
