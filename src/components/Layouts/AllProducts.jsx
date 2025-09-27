import Item from '../ui/Item';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useFetchData from '../Hooks/useFetchData';
import { Button } from '../ui/Button';

const AllProducts = () => {
  const { products, skipAll, loading, page, fetchData, goToPage } =
    useFetchData({
      allProduct: true,
    });
  useEffect(() => {
    fetchData();
  }, [page, skipAll]);

  const { t } = useTranslation();
  return (
    <div className="mx-auto max-w-[1200px] pt-[80px]">
      <p className="mb-6 text-center text-[38px] font-semibold">
        {t('All Products')}
      </p>
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap justify-evenly gap-2">
          {products.map((item) => (
            <Item
              key={item.id}
              className="w-full"
              id={item.id}
              product={item}
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

        <Button
          disable={loading}
          variant="destructive"
          className="w-[250px] mt-8"
          onClick={() => goToPage((prev) => prev + 1)}
        >
          {t('Load More')}
        </Button>
      </div>
    </div>
  );
};

export default AllProducts;
