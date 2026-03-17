import { Skeleton } from '@/components/ui/skeleton';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  isLoading,
  emptyMessage = 'No entries found.',
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="rounded border border-border overflow-hidden">
        <table className="w-full font-ui text-sm">
          <thead>
            <tr className="bg-elevated border-b border-border">
              {columns.map((col, i) => (
                <th key={i} className="text-left px-4 py-3 text-muted-foreground font-medium">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-border">
                {columns.map((_, j) => (
                  <td key={j} className="px-4 py-3">
                    <Skeleton className="h-4 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground font-ui">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="rounded border border-border overflow-hidden overflow-x-auto">
      <table className="w-full font-ui text-sm">
        <thead>
          <tr className="bg-elevated border-b border-border">
            {columns.map((col, i) => (
              <th key={i} className={`text-left px-4 py-3 text-muted-foreground font-medium ${col.className ?? ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-border hover:bg-secondary/50 transition-colors duration-200">
              {columns.map((col, j) => (
                <td key={j} className={`px-4 py-3 ${col.className ?? ''}`}>
                  {typeof col.accessor === 'function'
                    ? col.accessor(row)
                    : String(row[col.accessor] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
