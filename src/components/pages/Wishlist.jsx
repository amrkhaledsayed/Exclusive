import Item from '../ui/Item';
import Skeleton from '@mui/material/Skeleton';
import { FaHeart, FaLock } from 'react-icons/fa';

import { useTranslation } from 'react-i18next';
import NoUser from '../ui/NoUser';
import { useContext } from 'react';
import { AppContext } from '@/common/context';

const Wishlist = () => {
  const { t } = useTranslation();
  const { user, wishlist, isLoading } = useContext(AppContext);

  return (
    <>
      {!user ? (
        <NoUser
          title="You are not logged in"
          message="Please log in to view your wishlist and save your favorite items."
          to="/sign-in"
          btn="Log in"
        />
      ) : (
        <div className="mx-auto w-full max-w-[1200px] px-4 pt-[80px]">
          <div className="flex items-center gap-2">
            <p className="h-[40px] w-[20px] rounded-[5px] bg-[#db4444]"></p>
            <p className="text-lg text-[#db4444]">{t('Wishlist')}</p>
          </div>

          {isLoading ? (
            <div className="mt-[80px] flex w-full flex-wrap justify-center gap-4">
              {Array.from(Array(5)).map((_, index) => (
                <div
                  className="flex h-[400px] w-[270px] flex-col gap-3"
                  key={index}
                >
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={270}
                    className="h-full w-full rounded-lg"
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="80%"
                    height={24}
                  />
                  <Skeleton
                    variant="text"
                    width="60%"
                    animation="wave"
                    height={24}
                  />
                  <Skeleton
                    variant="text"
                    animation="wave"
                    width="50%"
                    height={20}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-[80px] flex w-full flex-wrap justify-center gap-4">
              {wishlist.map((item, index) => (
                <Item
                  key={index}
                  id={item?.product_id}
                  loading={isLoading}
                  image={item?.product_img}
                  availabilityStatus={item?.availabilityStatus}
                  productName={item?.nameproduct}
                  price={item?.price}
                  reviews={item?.reviews}
                  discount={item?.discount}
                  priceBeforeDiscount={item?.price}
                  rating={item?.rating}
                  wishlist={true}
                />
              ))}
            </div>
          )}
          {!wishlist.length && (
            <div className="flex flex-col items-center justify-center gap-5 py-20">
              <div className="w-fit rounded-[14px] border-1 border-gray-300 p-5">
                <FaHeart size="3rem" className="text-red" />
              </div>
              <div className="text-center text-gray-500">
                <p className="text-lg font-semibold">
                  {t('Oops! Nothing in your wishlist')}
                </p>
                <p className="text-sm">
                  {t('Start exploring and add your favorite products here.')}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Wishlist;
