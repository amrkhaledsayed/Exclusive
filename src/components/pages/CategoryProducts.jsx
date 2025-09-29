import { useParams } from 'react-router-dom';
import useFetchData from '../Hooks/useFetchData';
import React, { useEffect } from 'react';
import Item from '../ui/Item';

const CategoryProducts = () => {
  const { category } = useParams();
  const { products, loading, fetchData } = useFetchData({
    category: category,
  });

  useEffect(() => {
    if (products.length > 0) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [products]);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="mx-auto max-w-[1200px] pt-8">
      <p className="text-center text-[38px] font-semibold">{category}</p>
      <div className="mt-8 flex flex-col items-center">
        <div className="flex flex-wrap justify-evenly gap-2">
          {products?.map((item) => (
            <Item
              key={item.id}
              className="w-full"
              id={item.id}
              image={item.images[0]}
              productName={item.title}
              price={item.price}
              reviews={item.reviews.length}
              discount={item.discountPercentage}
              priceBeforeDiscount={item.price}
              rating={item.rating}
              loading={loading}
              availabilityStatus={item.availabilityStatus}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default React.memo(CategoryProducts);
