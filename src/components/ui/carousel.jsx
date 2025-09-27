import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from './Button';

const CarouselContext = React.createContext(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef(
  (
    {
      orientation = 'horizontal',
      opts,
      setApi,
      plugins,
      className,
      children,
      dir = 'ltr', // Add dir prop for RTL support
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
        direction: dir, // Pass dir to EmblaCarousel for RTL support
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api) => {
      if (!api) {
        return;
      }

      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev();
    }, [api]);

    const scrollNext = React.useCallback(() => {
      api?.scrollNext();
    }, [api]);

    const handleKeyDown = React.useCallback(
      (event) => {
        // Adjust keyboard navigation for RTL
        if (dir === 'rtl') {
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollNext();
          }
        } else {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollPrev();
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollNext();
          }
        }
      },
      [scrollPrev, scrollNext, dir]
    );

    React.useEffect(() => {
      if (!api || !setApi) {
        return;
      }

      setApi(api);
    }, [api, setApi]);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      onSelect(api);
      api.on('reInit', onSelect);
      api.on('select', onSelect);

      return () => {
        api?.off('select', onSelect);
      };
    }, [api, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api: api,
          opts,
          orientation:
            orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          dir, // Add dir to context
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn('relative', className)}
          role="region"
          aria-roledescription="carousel"
          dir={dir} // Apply dir to the container
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef(
  ({ className, classNameQuickView, ...props }, ref) => {
    const { carouselRef, orientation, dir } = useCarousel();

    return (
      <div
        ref={carouselRef}
        className={`overflow-hidden ${
          classNameQuickView ? 'px-0' : 'px-[1.5rem]'
        }`}
      >
        <div
          ref={ref}
          className={cn(
            'flex',
            orientation === 'horizontal'
              ? dir === 'rtl'
                ? '-mr-4' // Adjust margin for RTL
                : '-ml-4'
              : '-mt-4 flex-col gap-[14px]',
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef(({ className, ...props }, ref) => {
  const { orientation, dir } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal'
          ? dir === 'rtl'
            ? 'pr-0' // Adjust padding for RTL
            : 'pl-0'
          : 'pt-4',
        className
      )}
      {...props}
    />
  );
});
CarouselItem.displayName = 'CarouselItem';

const CarouselPrevious = React.forwardRef(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev, dir } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? dir === 'rtl'
              ? 'top-1/2 right-0 -translate-y-1/2' // Swap left/right for RTL
              : 'top-1/2 left-0 -translate-y-1/2'
            : 'top-0 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        {dir === 'rtl' ? (
          <ArrowRight className="h-4 w-4" /> // Swap arrows for RTL
        ) : (
          <ArrowLeft className="h-4 w-4" />
        )}
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  }
);
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef(
  ({ className, variant = 'outline', size = 'icon', ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext, dir } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          'absolute h-8 w-8 rounded-full',
          orientation === 'horizontal'
            ? dir === 'rtl'
              ? 'top-1/2 left-0 -translate-y-1/2' // Swap left/right for RTL
              : 'top-1/2 right-0 -translate-y-1/2'
            : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
          className
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        {dir === 'rtl' ? (
          <ArrowLeft className="h-4 w-4" /> // Swap arrows for RTL
        ) : (
          <ArrowRight className="h-4 w-4" />
        )}
        <span className="sr-only">Next slide</span>
      </Button>
    );
  }
);
CarouselNext.displayName = 'CarouselNext';

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
