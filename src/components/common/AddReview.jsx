import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import DialogDemo from '../ui/Dialog';
import toast from 'react-hot-toast';
import { Rating } from '@mui/material';
import { Button } from '../ui/Button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import React, { useState } from 'react';
import { Loading } from '../ui/Loading';
import { AppContext } from '@/util/context';

export const AddReview = ({
  setOpenDialog,
  img,
  openDialog,
  addReviews,
  setInvalidAdd,
  fetchReviewsList,
  product_id,
}) => {
  const [loading, setLoading] = useState();
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      rating: 0,
      content: '',
    },
  });
  const handleCancel = () => {
    setOpenDialog(false);
    reset();
  };
  const { user, data: userData } = React.useContext(AppContext);

  const { t } = useTranslation();

  const onSubmit = async (data) => {
    setLoading(true);
    const review = {
      user_id: user?.id,
      img,
      name: `${userData?.first_name ?? ''} ${userData?.last_name ?? ''}`,
      review_title: data.title,
      rating: data?.rating,
      review_content: data?.content,
      product_id,
    };
    try {
      await addReviews(review);
      setInvalidAdd(true);
      await fetchReviewsList();
      reset();
      setLoading(false);
      setOpenDialog(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DialogDemo
      isOpen={openDialog}
      setOpen={setOpenDialog}
      title={t('Add New Review')}
    >
      <p className="mt-2 text-sm text-gray-600">
        {t('Share your experience and help others make informed decisions.')}
      </p>

      <form
        className="mt-5 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="title-review"
            className="text-lg font-semibold text-gray-800"
          >
            {t('Review Title')}
          </label>
          <Input
            id="title-review"
            {...register('title', { required: t('Title is required') })}
            placeholder={t('What did you review?')}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">Please Enter Title</p>
          )}
        </div>

        <div>
          <label
            htmlFor="rating"
            className="text-lg font-semibold text-gray-800"
          >
            {t('Rating')}
          </label>
          <Controller
            name="rating"
            id="rating"
            control={control}
            rules={{ required: t('Rating is required') }}
            render={({ field }) => (
              <Rating
                {...field}
                value={Number(field.value)}
                onChange={(_, value) => field.onChange(value)}
                size="large"
                sx={{ direction: 'ltr' }}
              />
            )}
          />
          {errors.rating && (
            <p className="mt-1 text-sm text-red-500">{errors.rating.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="text-lg font-semibold text-gray-800"
          >
            {t('Review Content')}
          </label>
          <Textarea
            id="content"
            {...register('content', { required: t('Content is required') })}
            placeholder={t('Share your detailed experience...')}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-500">Please Enter Content</p>
          )}
        </div>

        <div className="mt-6 flex justify-between gap-3">
          <Button variant="outline" onClick={handleCancel}>
            {t('Cancel')}
          </Button>
          <Button type="submit" variant="destructive" disabled={loading}>
            {t('Add Review')}
            {loading && <Loading />}
          </Button>
        </div>
      </form>
    </DialogDemo>
  );
};
