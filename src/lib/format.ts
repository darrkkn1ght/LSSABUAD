import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string | null): string {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), 'd MMMM yyyy');
  } catch {
    return dateString;
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
