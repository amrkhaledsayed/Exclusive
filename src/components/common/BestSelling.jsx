import { useRef } from 'react';
import useFetchData from '../Hooks/useFetchData';
import Item from '../ui/Item';
import SwiperSection from '../ui/SwiperSection';
import { useState } from 'react';
import { useFetchOnView } from '@/utils/observer';

const BestSelling = () => {
  const { products, loading, fetchData } = useFetchData({
    productId: false,
    limit: 10,
    skip: 100,
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
        titleSection="This Month"
        uniqueId="best"
        title="Best Selling Products"
        btn={false}
        arrayName={loading ? Array(10).fill({}) : products}
        loading={loading}
      >
        {(item) => (
          <Item
            id={item?.id}
            image={item?.images?.[0]}
            productName={item?.title}
            product={item}
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

export default BestSelling;
