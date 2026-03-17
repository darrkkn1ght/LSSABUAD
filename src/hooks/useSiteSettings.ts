import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { SiteSettings } from '@/types';

export function useSiteSettings() {
  const { data: settings = {}, isLoading } = useQuery<SiteSettings>({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');
      if (error) throw error;
      const result: SiteSettings = {
        site_name: 'LSS ABUAD',
        site_tagline: 'Lssabuad.com - The Voice of Law at ABUAD'
      };
      for (const row of data ?? []) {
        result[row.key] = row.value ?? '';
      }
      return result;
    },
    staleTime: 5 * 60 * 1000,
  });

  return { settings, isLoading };
}
