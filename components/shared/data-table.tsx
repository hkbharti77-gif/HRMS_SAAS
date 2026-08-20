'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/shared/icon';
import { EmptyState } from '@/components/shared/empty-state';
import { TableSkeleton } from '@/components/shared/skeletons';

export interface Column<T> {
  key: string;
  header: string;
  cell: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortValue?: (row: T) => string | number;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  searchKeys?: (keyof T)[];
  searchPlaceholder?: string;
  pageSize?: number;
  loading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyIcon?: string;
  rowHref?: (row: T) => string;
  onRowClick?: (row: T) => void;
  toolbar?: React.ReactNode;
  footerRow?: React.ReactNode;
  initialSort?: { key: string; dir: 'asc' | 'desc' };
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  searchKeys,
  searchPlaceholder = 'Search...',
  pageSize = 10,
  loading,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting your search or filters.',
  emptyIcon = 'Search',
  rowHref,
  onRowClick,
  toolbar,
  footerRow,
  initialSort,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [sort, setSort] = React.useState<
    { key: string; dir: 'asc' | 'desc' } | null
  >(initialSort ?? null);

  const filtered = React.useMemo(() => {
    if (!query || !searchKeys) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      searchKeys.some((k) =>
        String(row[k] ?? '').toLowerCase().includes(q)
      )
    );
  }, [data, query, searchKeys]);

  const sorted = React.useMemo(() => {
    if (!sort) return filtered;
    const col = columns.find((c) => c.key === sort.key);
    if (!col?.sortValue) return filtered;
    const vals = filtered.map((r) => col.sortValue!(r));
    const idx = filtered.map((_, i) => i);
    idx.sort((a, b) => {
      const av = vals[a];
      const bv = vals[b];
      const cmp =
        typeof av === 'number' && typeof bv === 'number'
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sort.dir === 'asc' ? cmp : -cmp;
    });
    return idx.map((i) => filtered[i]);
  }, [filtered, sort, columns]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageData = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSort = (key: string) => {
    setSort((s) =>
      s?.key === key
        ? s.dir === 'asc'
          ? { key, dir: 'desc' }
          : null
        : { key, dir: 'asc' }
    );
  };

  const RowWrapper = ({ row }: { row: T }) => {
    const content = (
      <TableRow
        key={row.id}
        className={cn(
          (rowHref || onRowClick) && 'cursor-pointer'
        )}
        onClick={() => onRowClick?.(row)}
      >
        {columns.map((col) => (
          <TableCell
            key={col.key}
            className={cn(col.hideOnMobile && 'hidden md:table-cell', col.className)}
          >
            {col.cell(row)}
          </TableCell>
        ))}
      </TableRow>
    );
    if (rowHref) {
      return (
        <Link href={rowHref(row)} className="contents">
          {content}
        </Link>
      );
    }
    return content;
  };

  return (
    <div className="space-y-4">
      {(searchKeys || toolbar) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {searchKeys && (
            <div className="relative w-full sm:max-w-xs">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder={searchPlaceholder}
                className="pl-9"
              />
            </div>
          )}
          {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
        </div>
      )}

      <div className="rounded-lg border bg-card">
        {loading ? (
          <div className="p-4">
            <TableSkeleton rows={pageSize > 6 ? 6 : pageSize} cols={columns.length} />
          </div>
        ) : pageData.length === 0 ? (
          <EmptyState
            icon={emptyIcon}
            title={emptyTitle}
            description={emptyDescription}
            className="m-4 border-0 bg-transparent"
          />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                {columns.map((col) => (
                  <TableHead
                    key={col.key}
                    className={cn(col.hideOnMobile && 'hidden md:table-cell', col.className)}
                  >
                    {col.sortable ? (
                      <button
                        onClick={() => toggleSort(col.key)}
                        className="inline-flex items-center gap-1 hover:text-foreground"
                      >
                        {col.header}
                        <Icon
                          name={
                            sort?.key === col.key
                              ? sort.dir === 'asc'
                                ? 'ChevronUp'
                                : 'ChevronDown'
                              : 'ChevronDown'
                          }
                          className={cn(
                            'h-3.5 w-3.5',
                            sort?.key === col.key
                              ? 'text-foreground'
                              : 'text-muted-foreground/40'
                          )}
                        />
                      </button>
                    ) : (
                      col.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((row) => (
                <RowWrapper key={row.id} row={row} />
              ))}
              {footerRow}
            </TableBody>
          </Table>
        )}
      </div>

      {sorted.length > pageSize && !loading && (
        <div className="flex items-center justify-between text-sm">
          <p className="text-muted-foreground">
            Showing{' '}
            <span className="font-medium text-foreground">
              {(currentPage - 1) * pageSize + 1}
            </span>
            –
            <span className="font-medium text-foreground">
              {Math.min(currentPage * pageSize, sorted.length)}
            </span>{' '}
            of <span className="font-medium text-foreground">{sorted.length}</span>
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <Icon name="ChevronLeft" className="h-4 w-4" />
            </Button>
            <span className="px-2 text-muted-foreground">
              {currentPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={currentPage === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <Icon name="ChevronRight" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
