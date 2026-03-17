import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useFileUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = useCallback(async (bucket: string, file: File, folder?: string): Promise<string> => {
    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const filename = `${folder ? folder + '/' : ''}${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from(bucket).upload(filename, file);
      if (error) throw error;
      const { data } = supabase.storage.from(bucket).getPublicUrl(filename);
      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  }, []);

  return { upload, uploading };
}
