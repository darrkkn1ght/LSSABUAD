import { Badge } from '@/components/ui/badge';

type Status = 'published' | 'draft' | 'featured' | 'active' | 'inactive';

const statusStyles: Record<Status, string> = {
  published: 'bg-success text-white',
  draft: 'bg-muted text-muted-foreground',
  featured: 'bg-primary text-primary-foreground',
  active: 'bg-success text-white',
  inactive: 'bg-muted text-muted-foreground',
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <Badge className={`${statusStyles[status]} font-ui text-xs border-0`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
