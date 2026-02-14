import { useState, useMemo, useEffect } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, Filter, X, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: keyof T | string;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (row: T) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchableFields?: (keyof T)[];
  selectable?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (ids: string[]) => void;
  idField?: keyof T;
  pageSize?: number;
  loading?: boolean;
  emptyMessage?: string;
  mobileView?: boolean;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  onRowClick,
  searchable = true,
  searchPlaceholder = 'Tìm kiếm...',
  searchableFields,
  selectable = false,
  selectedIds = [],
  onSelectionChange,
  idField = 'id' as keyof T,
  pageSize = 10,
  loading = false,
  emptyMessage = 'Không có dữ liệu',
  mobileView = false,
}: DataTableProps<T>): JSX.Element {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (debouncedSearchTerm && searchableFields) {
      result = result.filter((item) =>
        searchableFields.some((field) => {
          const value = item[field];
          if (value == null) return false;
          return String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        })
      );
    }

    Object.entries(activeFilters).forEach(([key, value]) => {
      if (value) {
        result = result.filter((item) => {
          const itemValue = item[key as keyof T];
          return String(itemValue).toLowerCase() === value.toLowerCase();
        });
      }
    });

    if (sortColumn && sortDirection) {
      result.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortDirection === 'asc' ? 1 : -1;
        if (bValue == null) return sortDirection === 'asc' ? -1 : 1;

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        const comparison = String(aValue).localeCompare(String(bValue));
        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    return result;
  }, [data, debouncedSearchTerm, activeFilters, sortColumn, sortDirection, searchableFields]);

  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredAndSortedData.slice(startIndex, endIndex);

  const handleSort = (column: Column<T>): void => {
    if (!column.sortable) return;

    if (sortColumn === column.key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection('asc');
      }
    } else {
      setSortColumn(column.key);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean): void => {
    if (onSelectionChange) {
      if (checked) {
        const allIds = paginatedData.map((item) => String(item[idField]));
        onSelectionChange([...new Set([...selectedIds, ...allIds])]);
      } else {
        const pageIds = paginatedData.map((item) => String(item[idField]));
        onSelectionChange(selectedIds.filter((id) => !pageIds.includes(id)));
      }
    }
  };

  const handleSelectRow = (id: string, checked: boolean): void => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedIds, id]);
      } else {
        onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
      }
    }
  };

  const allSelected = paginatedData.length > 0 && paginatedData.every((item) =>
    selectedIds.includes(String(item[idField]))
  );
  const someSelected = paginatedData.some((item) =>
    selectedIds.includes(String(item[idField]))
  );

  const getSortIcon = (column: Column<T>): React.ReactNode => {
    if (sortColumn !== column.key) {
      return <ChevronsUpDown className="w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />;
    }
    if (sortDirection === 'asc') {
      return <ChevronUp className="w-4 h-4 text-blue-600" />;
    }
    if (sortDirection === 'desc') {
      return <ChevronDown className="w-4 h-4 text-blue-600" />;
    }
    return null;
  };

  const clearFilters = (): void => {
    setActiveFilters({});
    setSearchTerm('');
    setSortColumn(null);
    setSortDirection(null);
    setCurrentPage(1);
  };

  const hasActiveFilters = debouncedSearchTerm || Object.values(activeFilters).some((v) => v);

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10"
            />
          </div>
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Xóa bộ lọc
            </Button>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {mobileView ? (
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-8 text-center text-gray-500">
                Đang tải...
              </div>
            ) : paginatedData.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                {emptyMessage}
              </div>
            ) : (
              paginatedData.map((row, index) => (
                <div
                  key={String(row[idField]) || index}
                  className={cn(
                    'p-4 hover:bg-gray-50 transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  <div className="space-y-3">
                    {columns.map((column) => (
                      <div key={String(column.key)} className="flex items-start gap-2">
                        <span className="text-sm font-medium text-gray-600 min-w-[100px]">
                          {column.title}:
                        </span>
                        <span className="text-sm text-gray-900 flex-1">
                          {column.render
                            ? column.render(row[column.key], row)
                            : String(row[column.key] ?? '-')}
                        </span>
                      </div>
                    ))}
                    {selectable && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(String(row[idField]))}
                        onChange={(e) => handleSelectRow(String(row[idField]), e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {selectable && (
                    <th className="px-4 py-3 w-12">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        ref={(el) => {
                          if (el) {
                            el.indeterminate = someSelected && !allSelected;
                          }
                        }}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className={cn(
                        'px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider',
                        column.sortable && 'cursor-pointer group hover:bg-gray-100 transition-colors',
                        column.width && `w-[${column.width}]`
                      )}
                      onClick={() => handleSort(column)}
                      style={column.width ? { width: column.width } : undefined}
                    >
                      <div className="flex items-center gap-2">
                        {column.title}
                        {column.sortable && getSortIcon(column)}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                      Đang tải...
                    </td>
                  </tr>
                ) : paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-8 text-center text-gray-500">
                      {emptyMessage}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, index) => (
                    <tr
                      key={String(row[idField]) || index}
                      className={cn(
                        'hover:bg-gray-50 transition-colors',
                        onRowClick && 'cursor-pointer'
                      )}
                      onClick={() => onRowClick?.(row)}
                    >
                      {selectable && (
                        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedIds.includes(String(row[idField]))}
                            onChange={(e) => handleSelectRow(String(row[idField]), e.target.checked)}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                      )}
                      {columns.map((column) => (
                        <td key={String(column.key)} className="px-4 py-3 text-sm text-gray-700">
                          {column.render
                            ? column.render(row[column.key], row)
                            : String(row[column.key] ?? '-')}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-600">
            Hiển thị {startIndex + 1} đến {Math.min(endIndex, filteredAndSortedData.length)} trong tổng số{' '}
            {filteredAndSortedData.length} kết quả
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Trước
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Sau
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
