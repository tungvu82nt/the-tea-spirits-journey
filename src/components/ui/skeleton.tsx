import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variantStyles = {
    default: 'rounded-md',
    text: 'rounded-sm h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-none'
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: ''
  };

  const style = {
    width: width || '100%',
    height: height || '100%'
  };

  return (
    <div
      className={cn(
        'bg-gray-200 dark:bg-gray-700',
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
      style={style}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton variant="rectangular" height={200} />
      <div className="p-4 space-y-3">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="circular" width={40} height={40} />
        </div>
      </div>
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="30%" />
        </div>
        <Skeleton variant="text" width="20%" />
      </div>
      <div className="flex gap-4">
        <Skeleton variant="rectangular" width={80} height={80} />
        <Skeleton variant="rectangular" width={80} height={80} />
        <Skeleton variant="rectangular" width={80} height={80} />
      </div>
      <div className="flex justify-between items-center pt-4 border-t">
        <Skeleton variant="text" width="25%" />
        <Skeleton variant="text" width="20%" />
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Skeleton variant="rectangular" width={100} height={100} />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="30%" />
        <div className="flex justify-between items-center">
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="rectangular" width={120} height={36} />
        </div>
      </div>
    </div>
  );
}

export function AddressCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton variant="text" width="30%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="40%" />
        </div>
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
}

export function CouponCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="50%" />
        </div>
        <Skeleton variant="rectangular" width={100} height={36} />
      </div>
      <div className="pt-2 border-t">
        <Skeleton variant="text" width="30%" />
      </div>
    </div>
  );
}

export function WishlistItemSkeleton() {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm">
      <Skeleton variant="rectangular" width={120} height={120} />
      <div className="flex-1 space-y-3">
        <Skeleton variant="text" width="50%" />
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="40%" />
        <div className="flex justify-between items-center pt-2">
          <Skeleton variant="text" width="20%" />
          <Skeleton variant="rectangular" width={120} height={36} />
        </div>
      </div>
    </div>
  );
}

export function CollectionItemSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Skeleton variant="rectangular" height={160} />
      <div className="p-4 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="30%" />
      </div>
    </div>
  );
}

export function PaymentMethodSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="50%" />
          <Skeleton variant="text" width="30%" />
        </div>
        <Skeleton variant="circular" width={32} height={32} />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rectangular" width={80} height={32} />
        <Skeleton variant="rectangular" width={80} height={32} />
      </div>
    </div>
  );
}

export function SettingsSectionSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
      <Skeleton variant="text" width="30%" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between items-center">
            <div className="space-y-1">
              <Skeleton variant="text" width="40%" />
              <Skeleton variant="text" width="60%" />
            </div>
            <Skeleton variant="rectangular" width={40} height={24} />
          </div>
        ))}
      </div>
    </div>
  );
}
