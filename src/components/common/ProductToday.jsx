import { useRef, useState } from 'react';
import useFetchData from '../Hooks/useFetchData';
import Item from '../ui/Item';
import MyTimer from './Timer';
import SwiperSection from '../ui/SwiperSection';
import { LifeLine } from 'react-loading-indicators';
import { useWishlist } from '../../Supabase/useAddtofavorites';
import { useTranslation } from 'react-i18next';
import { useFetchOnView } from '@/utils/observer';

const ProductToday = () => {
  const expiryTime = new Date();
  expiryTime.setDate(expiryTime.getDate() + 5);
  const { t } = useTranslation();

  const { products, loading, fetchData } = useFetchData({
    productId: false,
    limit: 15,
    skip: 50,
  });

  const {
    addToFavorites,
    deleteItem,
    isLoading: favoritesLoading,
  } = useWishlist();

  const sectionRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);
  useFetchOnView({
    sectionRef,
    hasFetched,
    setHasFetched,
    fetchData,
  });
  return (
    <>
      {favoritesLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0000005a] backdrop:blur-2xl">
          <LifeLine color="#cd3232" size="medium" text="" textColor="" />{' '}
        </div>
      )}

      <SwiperSection
        ref={sectionRef}
        swiper="true"
        Timer={
          <div className="flex flex-wrap items-start gap-9 md:flex-row">
            <h2 className="from-red to-red/50 bg-gradient-to-r bg-clip-text font-sans text-5xl font-black tracking-tight text-transparent lg:text-7xl">
              {t(`Flash Sales`)}
            </h2>{' '}
            <MyTimer expiryTimestamp={expiryTime} />
          </div>
        }
        titleSection="Today's"
        uniqueId="new"
        btn="true"
        arrayName={loading ? Array(10).fill({}) : products}
        loading={loading}
      >
        {(item) => (
          <Item
            addToFavorites={addToFavorites}
            product={item}
            id={item?.id}
            deleteItem={deleteItem}
            image={item?.images?.[0]}
            availabilityStatus={item?.availabilityStatus}
            productName={item?.title}
            price={item?.price}
            reviews={item?.reviews?.length}
            discount={item?.discountPercentage}
            priceBeforeDiscount={item?.price}
            rating={item?.rating}
            loading={loading}
          />
        )}
      </SwiperSection>
    </>
  );
};

export default ProductToday;
