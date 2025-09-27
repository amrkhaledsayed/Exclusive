import img from "@public/Services.svg";
import img2 from "@public/Services-1.svg";
import img3 from "@public/Services-3.svg";
import ItemServes from "../ui/itemServes";
import React from "react";
const ServesSection = () => {
  const data = [
    {
      img: img,
      title: "FREE AND FAST DELIVERY",
      des: "Free delivery for all orders over $140",
    },
    {
      img: img3,
      title: "24/7 CUSTOMER SERVICE",
      des: "Friendly 24/7 customer support",
    },
    {
      img: img2,
      title: "MONEY BACK GUARANTEE",
      des: "We return money within 30 days",
    },
  ];
  return (
    <div className="mx-auto mt-[130px] flex w-full max-w-full flex-wrap justify-center gap-7 md:max-w-[1200px]">
      {data.map((item, index) => (
        <ItemServes
          key={index}
          img={item.img}
          title={item.title}
          des={item.des}
        />
      ))}
    </div>
  );
};
export default React.memo(ServesSection);
