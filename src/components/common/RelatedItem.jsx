import React, { useRef, useState } from 'react';
import useFetchData from '../Hooks/useFetchData';
import Item from '../ui/Item';
import SwiperSection from '../ui/SwiperSection';
import { useFetchOnView } from '@/utils/observer';

const RelatedItem = ({ categroyName }) => {
  const { products, loading, fetchData } = useFetchData({
    category: categroyName,
  });
  const sectionRef = useRef(null);
  const [hasFetched, setHasFetched] = useState(false);

  useFetchOnView({
    sectionRef,
    hasFetched,
    setHasFetched,
    fetchData,
  });
  return (
    <SwiperSection
      swiper=" "
      ref={sectionRef}
      loading={loading}
      Timer={false}
      titleSection="Related Item"
      arrayName={products}
      uniqueId="best"
      btn={false}
    >
      {(item) => (
        <Item
          id={item?.id}
          image={item?.images?.[0]}
          productName={item?.title}
          price={item?.price}
          reviews={item?.reviews?.length}
          discount={item?.discountPercentage}
          priceBeforeDiscount={item?.price}
          rating={item?.rating}
          loading={loading}
          availabilityStatus={item?.availabilityStatus}
        />
      )}
    </SwiperSection>
  );
};
export default React.memo(RelatedItem);
