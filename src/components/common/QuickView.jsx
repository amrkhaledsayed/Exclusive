import { Button } from '../ui/Button';
import DialogDemo from '../ui/Dialog';
import { useCallback, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { useTranslation } from 'react-i18next';
import { Rating, Skeleton } from '@mui/material';
import { FaRegHeart } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

export const QuickView = ({
  open,
  setOpen,
  handleAddFavorite,
  product,
  priceAfterDiscount,
}) => {
  const [countItem, setCountItem] = useState(1);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const increase = useCallback(() => {
    setCountItem((prev) => prev + 1);
  }, []);

  const decrease = useCallback(() => {
    setCountItem((prev) => {
      const newValue = prev - 1;
      return newValue > 0 ? newValue : 1;
    });
  }, []);
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

  return (
    <DialogDemo
      isOpen={open}
      setOpen={setOpen}
      quick={true}
      className={'py-0 md:pl-auto pl-0 ltr:pl-0 rtl:pr-0'}
    >
      <div className="flex md:h-[307px] md:flex-row flex-col w-full max-w-full md:max-w-[60rem] justify-between gap-3">
        <div className="flex w-full max-w-full md:max-w-[336px] flex-none justify-center bg-[#f5f5f5]">
          <Carousel className="w-full max-w-xs">
            <CarouselContent
              classNameQuickView={true}
              className="bg-[#f5f5f5] pl-[30px]"
            >
              {product?.images?.map((img, index) => (
                <CarouselItem key={index}>
                  <img src={img} alt={`img item ${index}`} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="mt-6 flex px-3 md:px-0 pb-3 md:pl-3 md:pb-0 flex-col gap-4">
          <div className="flex justify-between">
            <p className="text-xl font-semibold text-gray-600">
              {t(`titles.${product?.title}`)}
            </p>
          </div>
          <div className="flex h-fit shrink-0 items-center gap-0.5 overflow-auto scroll-smooth  ltr:pr-2 rtl:pl-2">
            <Rating
              dir="ltr"
              name="half-rating-read"
              value={product?.rating || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <p className="text-[12px] font-normal text-gray-500">
              ({product?.reviews?.length} {t('Reviews')})
            </p>
          </div>
          <div className="flex items-center gap-3 text-lg font-medium rtl:flex-row-reverse rtl:justify-end">
            <p className="text-red font-heading text-md font-bold">
              <>
                {priceAfterDiscount?.toFixed(2)} {t('$')}
              </>
            </p>
            <p className="text-muted-foreground font-body text-sm line-through">
              {product?.price}
              {t('$')}
            </p>
          </div>

          <p className="text-sm font-normal text-gray-400">
            {t(`description.${product?.description}`)}
          </p>
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
              <p className="font-inter h-full w-[50px] pt-[7px] text-center font-bold">
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
            <Button onClick={handleAddFavorite} variant="outline">
              <FaRegHeart />
            </Button>
            <Button
              onClick={handleBuyNow}
              variant="destructive"
              className="h-[44px] w-full"
            >
              {t('Buy Now')}
            </Button>
          </div>
        </div>
      </div>
    </DialogDemo>
  );
};
