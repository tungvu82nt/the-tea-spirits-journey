import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps): JSX.Element => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-200', className)}
      role="status"
      aria-label="Đang tải..."
    />
  );
};

interface SkeletonCardProps {
  count?: number;
  className?: string;
}

export const SkeletonCard = ({ count = 1, className }: SkeletonCardProps): JSX.Element => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="p-6 border border-gray-200 rounded-lg bg-white"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="w-12 h-12 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

interface SkeletonTableProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const SkeletonTable = ({ rows = 5, columns = 6, className }: SkeletonTableProps): JSX.Element => {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="space-y-2">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-10 w-32 ml-auto" />
      </div>
      <div className="border border-gray-200 rounded-lg bg-white overflow-hidden">
        <div className="grid gap-px bg-gray-200" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={`header-${i}`} className="bg-gray-50 p-4">
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={`row-${rowIndex}`} className="grid gap-px bg-gray-200" style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={`cell-${rowIndex}-${colIndex}`} className="bg-white p-4">
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

interface SkeletonFormProps {
  fields?: number;
  className?: string;
}

export const SkeletonForm = ({ fields = 5, className }: SkeletonFormProps): JSX.Element => {
  return (
    <div className={cn('space-y-4', className)}>
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <div className="flex gap-3 pt-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

interface SkeletonAvatarProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SkeletonAvatar = ({ size = 'md', className }: SkeletonAvatarProps): JSX.Element => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <Skeleton className={cn(sizeClasses[size], 'rounded-full', className)} />
  );
};

interface SkeletonListProps {
  items?: number;
  className?: string;
}

export const SkeletonList = ({ items = 5, className }: SkeletonListProps): JSX.Element => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
};
