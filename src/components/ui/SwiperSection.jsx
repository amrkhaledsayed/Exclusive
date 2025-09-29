import { CarouselItem } from '../ui/carousel';

import { forwardRef } from 'react';
import { Button } from './Button';
import { Sparkles } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from './carousel';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const SwiperSection = forwardRef(
  (
    {
      Timer,
      className,
      titleSection,
      children,
      arrayName,
      title,
      swiper,
      btn,
      loading,
      cate,
    },
    ref
  ) => {
    const { t, i18n } = useTranslation();

    const skeletonArray = Array(10).fill({});
    return (
      <div
        ref={ref}
        className={`mx-auto mt-[140px] w-full flex max-h-[700px] max-w-[1200px] flex-col gap-6 border-gray-600 px-[20px] pb-5 ${className}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="from-red h-12 w-4 rounded-[2px] bg-gradient-to-b to-red-300 shadow-lg"></div>
              <div className="bg-red absolute -top-1 h-3 w-3 animate-ping rounded-full ltr:-right-1 rtl:-left-1"></div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="text-red h-5 w-5 animate-pulse" />
              <span className="text-red text-xl font-bold tracking-wide">
                {t(`${titleSection}`)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          {title && (
            <h3 className="text-[24px] leading-12 font-[700] md:text-4xl">
              {t(`${title}`)}
            </h3>
          )}
          {Timer && (
            <div className="flex flex-col items-start justify-between md:flex-row">
              {Timer}
            </div>
          )}
          {swiper ? (
            !Timer && <div className="w flex gap-3"></div>
          ) : (
            <Button
              size="lg"
              variant="destructive"
              className="mt-[50px] w-57 self-center"
            >
              View All
            </Button>
          )}
        </div>

        <Carousel
          className="h-full max-h-[600px] w-full"
          dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}
        >
          <CarouselContent className="flex space-x-7">
            {(loading ? skeletonArray : arrayName)?.map((item, index) => (
              <CarouselItem
                key={index}
                className={clsx('h-[570px] basis-auto', cate && 'h-fit')}
              >
                {children({ ...item, loading })}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {swiper && btn && (
          <Link
            to="/AllProducts"
            className="h-fit w-fit self-center"
            aria-label={t('View All Products')}
          >
            <Button
              size="lg"
              variant="destructive"
              className="w-57 self-center"
            >
              {t('View All Products')}
            </Button>
          </Link>
        )}
      </div>
    );
  }
);

export default SwiperSection;
