import { useState, useRef, useEffect, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad'> {
  src: string;
  alt: string;
  webpSrc?: string;
  avifSrc?: string;
  sizes?: string;
  lazy?: boolean;
  placeholder?: 'blur' | 'color' | 'none';
  blurDataURL?: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage = ({
  src,
  alt,
  webpSrc,
  avifSrc,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  lazy = true,
  placeholder = 'blur',
  blurDataURL,
  className,
  onLoad,
  onError,
  ...props
}: OptimizedImageProps): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(!lazy);

  useEffect(() => {
    if (!lazy) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy]);

  useEffect(() => {
    if (!isInView) return;

    const img = new Image();
    
    const handleLoad = (): void => {
      setCurrentSrc(src);
      setIsLoaded(true);
      onLoad?.();
    };

    const handleError = (): void => {
      setIsError(true);
      onError?.();
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    if (avifSrc) {
      img.src = avifSrc;
    } else if (webpSrc) {
      img.src = webpSrc;
    } else {
      img.src = src;
    }
  }, [isInView, src, webpSrc, avifSrc, onLoad, onError]);

  const getPlaceholderStyle = (): React.CSSProperties => {
    if (isLoaded || placeholder === 'none') return {};

    if (placeholder === 'blur' && blurDataURL) {
      return {
        backgroundImage: `url(${blurDataURL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(10px)',
      };
    }

    if (placeholder === 'color') {
      return {
        backgroundColor: 'hsl(var(--muted))',
      };
    }

    return {};
  };

  const getPictureSources = (): JSX.Element[] => {
    const sources: JSX.Element[] = [];

    if (avifSrc) {
      sources.push(
        <source
          key="avif"
          srcSet={avifSrc}
          type="image/avif"
          sizes={sizes}
        />
      );
    }

    if (webpSrc) {
      sources.push(
        <source
          key="webp"
          srcSet={webpSrc}
          type="image/webp"
          sizes={sizes}
        />
      );
    }

    return sources;
  };

  if (isError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted rounded-lg',
          className
        )}
        {...props}
      >
        <span className="text-muted-foreground text-sm">图片加载失败</span>
      </div>
    );
  }

  if (!isInView) {
    return (
      <div
        ref={imgRef}
        className={cn('overflow-hidden rounded-lg', className)}
        style={getPlaceholderStyle()}
        {...props}
      >
        <div className="w-full h-full bg-muted animate-pulse" />
      </div>
    );
  }

  return (
    <picture>
      {getPictureSources()}
      <img
        ref={imgRef}
        src={currentSrc || src}
        alt={alt}
        sizes={sizes}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        className={cn(
          'transition-opacity duration-300',
          isLoaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        onLoad={() => {
          setIsLoaded(true);
          onLoad?.();
        }}
        onError={() => {
          setIsError(true);
          onError?.();
        }}
        {...props}
      />
    </picture>
  );
};

interface ResponsiveImageProps {
  src: string;
  alt: string;
  breakpoints?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
  sizes?: string;
  className?: string;
  lazy?: boolean;
}

export const ResponsiveImage = ({
  src,
  alt,
  breakpoints = {},
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  className,
  lazy = true,
}: ResponsiveImageProps): JSX.Element => {
  const { sm, md, lg, xl } = breakpoints;

  const srcSet = [
    sm ? `${sm} 640w` : null,
    md ? `${md} 768w` : null,
    lg ? `${lg} 1024w` : null,
    xl ? `${xl} 1280w` : null,
    src ? `${src} 1536w` : null,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <OptimizedImage
      src={src}
      alt={alt}
      srcSet={srcSet}
      sizes={sizes}
      lazy={lazy}
      className={className}
    />
  );
};

interface AvatarImageProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AvatarImage = ({
  src,
  alt,
  size = 'md',
  className,
}: AvatarImageProps): JSX.Element => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={cn(
        'rounded-full overflow-hidden bg-muted',
        sizeClasses[size],
        className
      )}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        lazy={false}
      />
    </div>
  );
};
