import { Link, useNavigate, useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';

import clsx from 'clsx';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
import RelatedItem from '../common/RelatedItem';

import ReviwsItem from '../ui/ReviwsItem';
import { useFetchDetails } from '../Hooks/useFetchDetails';
import { Button } from '../ui/Button';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { Badge } from '../ui/badge';
import { FaArrowsRotate } from 'react-icons/fa6';
import { CiDeliveryTruck } from 'react-icons/ci';
import { useTranslation } from 'react-i18next';
import { Check, LogIn, MessageSquareDot, X } from 'lucide-react';

import { AddReview } from '../common/AddReview';
import supabase from '@/Supabase/supabase-client';
import toast from 'react-hot-toast';
import { AppContext } from '@/utils/context';
const Details = () => {
  const { user, addToFavorites, addReviews, reviewsList } =
    useContext(AppContext);

  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading } = useFetchDetails(id);
  const [active, setActive] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const [countItem, setCountItem] = useState(1);
  const firstImg = product?.images?.[0];
  const [activeImg, setActiveImg] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [reviews, setReviews] = useState();
  const [invalidAdd, setInvalidAdd] = useState(false);

  const fetchReviewsList = async () => {
    const { data, error } = await supabase
      .from('Reviews')
      .select('*')
      .eq('product_id', id);

    if (error) {
      toast.error(error.message);
      return;
    }

    setReviews(data);
  };

  useEffect(() => {
    fetchReviewsList();
  }, [id, reviewsList]);
  useEffect(() => {
    if (firstImg) {
      setActiveImg(firstImg);
    }
  }, [firstImg]);
  useEffect(() => {
    const check = reviews?.some(
      (review) =>
        String(review.product_id) === String(id) &&
        String(review.user_id) === String(user?.id)
    );

    setInvalidAdd(check);
  }, [reviews, id, user?.id]);

  const increase = useCallback(() => {
    setCountItem((prev) => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    setCountItem((prev) => {
      const newValue = prev - 1;
      return newValue > 0 ? newValue : 1;
    });
  }, []);
  const { t, i18n } = useTranslation();
  const priceAfterDiscount = useMemo(() => {
    if (!product) return 0;
    return product.price - (product.discountPercentage / 100) * product.price;
  }, [product]);

  const colors = useMemo(() => ['blue', 'red'], []);
  const sizes = useMemo(() => ['XS', 'S', 'M', 'L', 'XL'], []);
  const handleBuyNow = () => {
    navigate('/cart/CheckOut', {
      state: {
        subTotal: priceAfterDiscount * countItem,
        Tax: priceAfterDiscount * countItem * 0.12,
        Shipping: priceAfterDiscount * countItem * 0.14,
        total: priceAfterDiscount * countItem * 1.26,
        product_id: product.id,
        product_name: product.title,
        product_img: product.images[0],
        price: priceAfterDiscount,
        quantity: countItem,
        now: true,
      },
    });
  };
  const handelAddFavority = () => {
    addToFavorites(
      {
        user_id: user?.id,
        product_id: Math.floor(Number(id)),
        nameproduct: product?.title,
        price: priceAfterDiscount?.toFixed(2),
        product_img: product?.images?.[0],
        discount: Number(Math.floor(product.discountPercentage)),
        availabilityStatus: product?.availabilityStatus,
        rating: product?.rating,
        reviews: product?.reviews?.length,
      },
      {}
    );
  };

  const formattedBeforePrice =
    i18n.language === 'ar'
      ? Number(product?.price?.toFixed(2)).toLocaleString('ar-EG')
      : Number(product?.price?.toFixed(2));

  const formattedPrice =
    i18n.language === 'ar'
      ? Number(priceAfterDiscount?.toFixed(2)).toLocaleString('ar-EG')
      : Number(priceAfterDiscount?.toFixed(2));

  if (loading) {
    return (
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 pt-20 lg:flex-row lg:justify-evenly">
        <div className="flex h-full w-full flex-row gap-2 lg:w-fit lg:flex-row lg:gap-4">
          <div className="flex h-fit w-fit flex-col justify-between gap-2 lg:w-[100px] lg:flex-col">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton
                style={{ height: '5rem', width: '6rem' }}
                key={index}
                animation="wave"
                variant="rectangular"
                className="h-[100px] w-[65px] rounded-lg lg:h-full lg:w-full"
              />
            ))}
          </div>

          <Skeleton
            animation="wave"
            variant="rectangular"
            style={{ height: '21.5rem' }}
            className="h-full w-full rounded-lg lg:h-[420px] lg:w-[400px]"
          />
        </div>

        <div className="flex w-full flex-col gap-2 lg:w-[400px]">
          <Skeleton variant="text" animation="wave" className="h-6 w-3/4" />
          <Skeleton variant="text" animation="wave" className="h-6 w-1/2" />
          <Skeleton variant="text" animation="wave" className="h-5 w-1/4" />

          <div className="flex flex-col gap-1">
            <Skeleton variant="text" animation="wave" className="h-2 w-full" />
            <Skeleton variant="text" animation="wave" className="h-2 w-full" />
            <Skeleton variant="text" animation="wave" className="h-2 w-1/2" />
          </div>

          <Skeleton variant="text" animation="wave" className="h-10 w-full" />
          <Skeleton variant="text" animation="wave" className="h-10 w-full" />
          <Skeleton variant="text" animation="wave" className="h-10 w-full" />
          <Skeleton variant="text" animation="wave" className="h-44 w-full" />
        </div>
      </div>
    );
  }
  const ratingUser = reviews?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.rating,
    0
  );
  const ratingApi = product.reviews?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.rating,
    0
  );
  let rating =
    (ratingUser / reviews?.length + ratingApi / product?.reviews?.length) / 2 ||
    ratingApi / product?.reviews?.length;

  return (
    <div>
      <div className="mx-auto max-w-[1200px] px-[7px] pt-[20px] md:pt-[50px]">
        <div className="mb-8 line-clamp-1 flex items-center text-[14px] font-normal text-gray-500">
          <Link to="/" className="text-gray-500 md:text-lg">
            {t('Account')}
          </Link>
          <MdKeyboardArrowRight />

          <Link className="ml-1 text-nowrap text-gray-500 md:text-lg">
            {product?.category}
          </Link>
          <MdKeyboardArrowRight />

          <p className="ml-1 text-nowrap text-gray-700 md:text-lg">
            {t(`titles.${product?.title}`, { defaultValue: product.title })}
          </p>
        </div>
        <div className="flex flex-col items-start justify-between gap-[70px] lg:flex-row">
          <div className="flex w-full max-w-[600px] flex-none items-start gap-2">
            {product?.images?.length > 1 && (
              <div className="m-0 flex h-full w-[105px] flex-col space-y-2.5 p-0">
                {product?.images.map((item, index) => (
                  <div
                    key={index}
                    className="cursor-pointer bg-[#f5f5f5] first:mt-0 last:mb-0"
                    onMouseMove={() => setActiveImg(item)}
                  >
                    <img src={item} loading="lazy" className="m-0 p-0" />
                  </div>
                ))}
              </div>
            )}

            <div className="flex w-full max-w-[100%] items-center bg-[#f5f5f5]">
              <Zoom>
                <img
                  src={activeImg}
                  alt={product?.title}
                  className="h-full w-[100%]"
                />
              </Zoom>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2.5 border-b-1 border-b-gray-300 pb-3">
              <p className="font-heading mb-2 text-4xl font-semibold text-balance text-gray-800">
                {t(`titles.${product?.title}`, { defaultValue: product.title })}
              </p>
              <div className="flex gap-2">
                <div className="flex h-fit shrink-0 items-center gap-0.5 overflow-auto scroll-smooth ltr:border-r-1 ltr:border-gray-400 ltr:pr-2 rtl:border-l-1 rtl:border-gray-400 rtl:pl-2">
                  <Rating
                    dir="ltr"
                    name="half-rating-read"
                    value={rating.toFixed(2)}
                    precision={0.5}
                    readOnly
                  />

                  <p className="text-[14px] font-normal text-gray-500">
                    ({product?.reviews?.length + reviews?.length} {t('Reviews')}
                    )
                  </p>
                </div>
                <Badge className="bg-red text-[13px] leading-5 font-medium text-nowrap text-white">
                  {t(`${product?.availabilityStatus}`, {
                    defaultValue: product.availabilityStatus,
                  })}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-lg font-medium rtl:flex-row-reverse rtl:justify-end">
                <p className="text-red font-heading text-3xl font-bold">
                  {i18n.language === 'ar' ? (
                    <>
                      {formattedPrice} {t('$')}
                    </>
                  ) : (
                    <>$ {formattedPrice}</>
                  )}
                </p>
                <p className="text-muted-foreground font-body text-xl line-through">
                  {i18n.language === 'ar' ? (
                    <>
                      {formattedBeforePrice}
                      {t('$')}{' '}
                    </>
                  ) : (
                    <>$ {formattedPrice}</>
                  )}
                </p>
              </div>
              <p className="text-foreground font-body mb-6 leading-relaxed">
                {t(`description.${product?.description}`, {
                  defaultValue: product.description,
                })}
              </p>
            </div>
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center gap-5">
                <p className="text-[20px] font-normal">Colours:</p>
                <div className="flex gap-1.5">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setActive(index)}
                      className={clsx(
                        'h-[20px] w-[20px] cursor-pointer rounded-full',
                        {
                          'border-2 border-black': active === index,
                        },
                        color === 'blue' && 'bg-blue-400',
                        color === 'red' && 'bg-red-400'
                      )}
                    ></button>
                  ))}
                </div>
              </div>
              {product?.category?.includes('mens-shirts') && (
                <div className="flex items-center gap-5">
                  <p className="text-[20px] font-normal">Size:</p>
                  <div className="flex gap-1.5">
                    {sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveSize(index)}
                        className={clsx(
                          'h-[32px] w-[32px] cursor-pointer rounded-[4px] border-1 border-gray-300',
                          {
                            'bg-red border-none text-white':
                              activeSize === index,
                          }
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-[24px]">
              <div className="flex items-center gap-4">
                <div className="flex h-full w-fit items-center rounded-[4px] border-1 border-gray-200">
                  <button
                    className="h-[33px] w-[30px] px-[7px] hover:bg-gray-300 md:h-[44px] md:w-[40px] md:px-[12px]"
                    onClick={increase}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <p className="font-inter h-full w-[50px] text-center font-bold">
                    {countItem}
                  </p>
                  <button
                    className="h-[33px] w-[30px] px-[7px] hover:bg-gray-300 md:h-[44px] md:w-[40px] md:px-[12px]"
                    onClick={decrease}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <button
                  onClick={handelAddFavority}
                  className="h-[40px] w-[40px] cursor-pointer rounded-[4px] border-1 border-gray-300 p-2.5"
                >
                  <FaRegHeart />
                </button>
                <Button
                  variant="destructive"
                  onClick={handleBuyNow}
                  className="h-[44px] w-full"
                >
                  {t('Buy Now')}
                </Button>
              </div>
              <div className="mt-[40px] rounded-[5px] border-1 border-gray-300 bg-gray-100">
                <div className="border-b-1 border-gray-300">
                  <div className="flex items-center gap-2.5 py-6 pr-[51px] pl-[16px]">
                    <CiDeliveryTruck size={25} />
                    <div className="flex flex-col items-start">
                      <p className="text-[16px] font-medium">
                        {t('Free Delivery')}
                      </p>
                      <p className="text-[12px] font-medium">
                        {t('Enter your postal code for Delivery Availability')}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2.5 py-6 pr-[51px] pl-[16px]">
                    <FaArrowsRotate size={25} />
                    <div className="flex flex-col items-start">
                      <p className="text-[16px] font-medium">
                        {t('Return Delivery')}
                      </p>
                      <p className="text-[12px] font-medium">
                        {t('Free 30 Days Delivery Returns. Details')}{' '}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col place-content-stretch justify-between rounded-[16px] bg-white p-10">
          <div className="mb-4 flex items-center justify-between">
            <h6 className="text-2xl font-semibold text-gray-700">
              {t('Customer Reviews')}
            </h6>
            {!user ? (
              <Link to="/sign-in">
                <Button variant="outline" className="text-lg">
                  <LogIn /> {t('Log in')}
                </Button>
              </Link>
            ) : invalidAdd ? (
              <div className="flex items-center gap-2 rounded-[6px] bg-red-400 p-1 px-2 text-white">
                <Check /> {t('Review Added')}
              </div>
            ) : (
              <Button
                variant="outline"
                className="text-lg"
                onClick={() => setOpenDialog(true)}
              >
                <MessageSquareDot />
                {t('Add Review')}
              </Button>
            )}
          </div>
          <div className="grid w-full grid-cols-1 place-content-stretch justify-between gap-4 lg:grid-cols-3">
            {product?.reviews?.map((item, index) => (
              <ReviwsItem
                rating={item?.rating}
                name={item?.reviewerName}
                comment={item?.comment}
                date={item?.date}
                key={index}
              />
            ))}
            {reviews?.map((item, index) => (
              <ReviwsItem
                rating={item?.rating}
                name={item?.name}
                comment={item?.review_content}
                date={item?.created_at}
                key={index}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <RelatedItem categroyName={product?.category} idFilter={id} />
        </div>
      </div>
      <AddReview
        setOpenDialog={setOpenDialog}
        fetchReviewsList={fetchReviewsList}
        setInvalidAdd={setInvalidAdd}
        openDialog={openDialog}
        img={firstImg}
        product_id={id}
        addReviews={addReviews}
      />
    </div>
  );
};
export default Details;
