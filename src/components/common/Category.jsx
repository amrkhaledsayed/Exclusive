import CategoryCard from "../ui/CategoryCard";
import SwiperSection from "../ui/SwiperSection";

const Category = () => {
  const Categories = [
    {
      icon: <img src="/ipad.png" className="w-[40px]" />,
      name: "Tablets",
      value: "tablets",
    },
    {
      icon: <img src="/smartphone.png" className="w-[40px]" />,
      name: "Smart Phones",
      value: "smartphones",
    },
    {
      icon: <img src="/laptop.png" className="w-[40px]" />,
      name: "Laptops",
      value: "laptops",
    },
    {
      icon: <img src="/shopping-bag.png" className="w-[40px]" />,
      name: "Groceries",
      value: "groceries",
    },
    {
      icon: <img src="/house-decoration.png" className="w-[40px]" />,
      name: "Home Decoration",
      value: "home-decoration",
    },
    {
      icon: <img src="/furniture.png" className="w-[40px]" />,
      name: "Furniture",
      value: "furniture",
    },
    {
      icon: <img src="/blouse.png" className="w-[40px]" />,
      name: "Tops",
      value: "tops",
    },
    {
      icon: <img src="/dress.png" className="w-[40px]" />,
      name: "Womens Dresses",
      value: "womens-dresses",
    },
    {
      icon: <img src="/high-heels.png" className="w-[40px]" />,
      name: "Womens Shoes",
      value: "womens-shoes",
    },
    {
      icon: <img src="/perfume-spray.png" className="w-[40px]" />,
      name: "Fragrances",
      value: "fragrances",
    },
    {
      icon: <img src="/skincare.png" className="w-[40px]" />,
      name: "Skincare",
      value: "skincare",
    },
    {
      icon: <img src="/t-shirt.png" className="w-[40px]" />,
      name: "Mens Shirts",
      value: "mens-shirts",
    },
    {
      icon: <img src="/sign.png" className="w-[40px]" />,
      name: "Mens Shoes",
      value: "mens-shoes",
    },
    {
      icon: <img src="/watch.png" className="w-[40px]" />,
      name: "Mens Watches",
      value: "mens-watches",
    },
    {
      icon: <img src="/handbag.png" className="w-[40px]" />,
      name: "Womens Bags",
      value: "womens-bags",
    },
    {
      icon: <img src="/clock.png" className="w-[40px]" />,
      name: "Womens Watches",
      value: "womens-watches",
    },
    {
      icon: <img src="/jewelry.png" className="w-[40px]" />,
      name: "Womens Jewellery",
      value: "womens-jewellery",
    },
    {
      icon: <img src="/sunglasses.png" className="w-[40px]" />,
      name: "Sunglasses",
      value: "sunglasses",
    },
    {
      icon: <img src="/car.png" className="w-[40px]" />,
      name: "Automotive",
      value: "vehicle",
    },
    {
      icon: <img src="/motorbike.png" className="w-[40px]" />,
      name: "Motorcycle",
      value: "motorcycle",
    },
    {
      icon: <img src="/light.png" className="w-[40px]" />,
      name: "Lighting",
      value: "lighting",
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
      style={{ maxHeight: "20rem" }}
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
