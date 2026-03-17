import { useCallback, useState, useRef } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { Upload, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ImageUploadProps {
  bucket: string;
  onUpload: (url: string) => void;
  currentUrl?: string | null;
  accept?: string;
  maxSizeMB?: number;
}

export function ImageUpload({
  bucket,
  onUpload,
  currentUrl,
  accept = 'image/jpeg,image/png,image/webp',
  maxSizeMB = 5,
}: ImageUploadProps) {
  const { upload, uploading } = useFileUpload();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);

  const handleFile = useCallback(async (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast({ title: 'File too large', description: `Max size is ${maxSizeMB}MB`, variant: 'destructive' });
      return;
    }
    try {
      const url = await upload(bucket, file);
      setPreview(url);
      onUpload(url);
      toast({ title: 'Image uploaded successfully' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Upload failed';
      toast({ title: 'Upload failed', description: message, variant: 'destructive' });
    }
  }, [bucket, upload, onUpload, maxSizeMB, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative inline-block">
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded border border-border" />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6"
            onClick={() => { setPreview(null); onUpload(''); }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-border rounded p-8 text-center cursor-pointer hover:border-primary transition-colors duration-200"
        >
          {uploading ? (
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          ) : (
            <>
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground font-ui">
                Drop an image or click to browse
              </p>
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />
    </div>
  );
}
