import { Rating } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

import { FaRegUserCircle } from 'react-icons/fa';
import React, { useContext } from 'react';
import { AppContext } from '@/util/context';

const Reviews = () => {
  const { reviewsList } = useContext(AppContext);

  const { t, i18n } = useTranslation();

  return (
    <section className="mx-auto w-full max-w-[1200px] px-4 pt-[80px]">
      <div className="mb-8 flex items-center text-[14px] font-normal">
        <Link to="/" className="text-gray-500" aria-label={t('Home')}>
          {t('Home')}
        </Link>
        <MdKeyboardArrowRight
          className={clsx('rotate-0', {
            'rotate-180': i18n.language === 'ar',
          })}
        />{' '}
        <p className="ml-1 text-gray-700">{t('Reviews')}</p>
      </div>
      <div>
        <div className="text-center">
          <h4 className="text-red bg-clip-text text-4xl font-bold text-balance">
            {t('My Reviews')}
          </h4>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-pretty text-gray-500">
            {t(
              'Share your experiences and discover what others are saying about products, services, and places you love.'
            )}
          </p>
        </div>
        {reviewsList?.length === 0 && (
          <div className="flex flex-col items-center justify-center">
            <img
              src="/no reviews.webp"
              alt="no reviews"
              className="max-w-[35rem]"
            />
            <p className="text-xl text-gray-500">
              {t('No reviews yet. Be the first to share your experience!')}
            </p>
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviewsList.map((review, index) => (
            <Card
              key={index}
              className="group max-w-[20rem] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              {review.img && (
                <div className="w-ful flex aspect-video max-w-[300px] justify-center overflow-hidden rounded-t-lg">
                  <img
                    src={review.img}
                    alt={review.review_title}
                    className="h-full w-fit object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2 text-lg text-balance">
                      {review.review_title}
                    </CardTitle>
                    <div className="mt-2 flex items-center gap-2">
                      <Rating
                        name="read-only"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                        size="medium"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="mb-4 line-clamp-3 text-sm text-pretty text-gray-600">
                  {review?.review_content}
                </p>
                <div className="flex items-center gap-3">
                  <FaRegUserCircle size={20} />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-lg font-medium">
                      {review.name}
                    </p>
                    <p className="text-muted-foreground text-sm">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default React.memo(Reviews);
