import {  useRef, useState } from 'react';

import useFetchData from '../Hooks/useFetchData';
import Item from '../ui/Item';

import SwiperSection from '../ui/SwiperSection';
import { useFetchOnView } from '@/utils/observer';

const OurProducts = () => {
  const { products, loading, fetchData } = useFetchData({
    productId: false,
    limit: 20,
    skip: 70,
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
    <div ref={sectionRef}>
      <SwiperSection
        swiper=" "
        Timer={false}
        titleSection="Our Products"
        uniqueId="best"
        title="Best Selling Products"
        btn={false}
        arrayName={loading ? Array(10).fill({}) : products}
        loading={loading}
      >
        {(item) => (
          <Item
            id={item?.id}
            product={item}
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
    </div>
  );
};

export default OurProducts;
