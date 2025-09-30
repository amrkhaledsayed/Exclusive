import CategoryCard from '../ui/CategoryCard';
import SwiperSection from '../ui/SwiperSection';

const Category = () => {
  const Categories = [
    {
      icon: <img src="/ipad.webp" className="w-[40px]" />,
      name: 'Tablets',
      value: 'tablets',
    },
    {
      icon: <img src="/smartphone.webp" className="w-[40px]" />,
      name: 'Smart Phones',
      value: 'smartphones',
    },
    {
      icon: <img src="/laptop.webp" className="w-[40px]" />,
      name: 'Laptops',
      value: 'laptops',
    },
    {
      icon: <img src="/shopping-bag.webp" className="w-[40px]" />,
      name: 'Groceries',
      value: 'groceries',
    },
    {
      icon: <img src="/house-decoration.webp" className="w-[40px]" />,
      name: 'Home Decoration',
      value: 'home-decoration',
    },
    {
      icon: <img src="/furniture.webp" className="w-[40px]" />,
      name: 'Furniture',
      value: 'furniture',
    },
    {
      icon: <img src="/blouse.webp" className="w-[40px]" />,
      name: 'Tops',
      value: 'tops',
    },
    {
      icon: <img src="/dress.webp" className="w-[40px]" />,
      name: 'Womens Dresses',
      value: 'womens-dresses',
    },
    {
      icon: <img src="/high-heels.webp" className="w-[40px]" />,
      name: 'Womens Shoes',
      value: 'womens-shoes',
    },
    {
      icon: <img src="/perfume-spray.webp" className="w-[40px]" />,
      name: 'Fragrances',
      value: 'fragrances',
    },
    {
      icon: <img src="/skincare.webp" className="w-[40px]" />,
      name: 'Skincare',
      value: 'skincare',
    },
    {
      icon: <img src="/t-shirt.webp" className="w-[40px]" />,
      name: 'Mens Shirts',
      value: 'mens-shirts',
    },
    {
      icon: <img src="/sign.webp" className="w-[40px]" />,
      name: 'Mens Shoes',
      value: 'mens-shoes',
    },
    {
      icon: <img src="/watch.webp" className="w-[40px]" />,
      name: 'Mens Watches',
      value: 'mens-watches',
    },
    {
      icon: <img src="/handbag.webp" className="w-[40px]" />,
      name: 'Womens Bags',
      value: 'womens-bags',
    },
    {
      icon: <img src="/clock.webp" className="w-[40px]" />,
      name: 'Womens Watches',
      value: 'womens-watches',
    },
    {
      icon: <img src="/jewelry.webp" className="w-[40px]" />,
      name: 'Womens Jewellery',
      value: 'womens-jewellery',
    },
    {
      icon: <img src="/sunglasses.webp" className="w-[40px]" />,
      name: 'Sunglasses',
      value: 'sunglasses',
    },
    {
      icon: <img src="/car.webp" className="w-[40px]" />,
      name: 'Automotive',
      value: 'vehicle',
    },
    {
      icon: <img src="/motorbike.webp" className="w-[40px]" />,
      name: 'Motorcycle',
      value: 'motorcycle',
    },
    {
      icon: <img src="/light.webp" className="w-[40px]" />,
      name: 'Lighting',
      value: 'lighting',
    },
  ];

  return (
    <SwiperSection
      titleSection="Categories"
      arrayName={Categories}
      uniqueId="flash"
      swiper="false"
      title="Browse By Category"
      cate="true"
      style={{ maxHeight: '20rem' }}
      className="max-h-[20rem]"
      btn={false}
    >
      {(item) => (
        <CategoryCard
          img={item.icon}
          titleCategory={item.name}
          value={item.value}
        />
      )}
    </SwiperSection>
  );
};

export default Category;
