import 'swiper/css';
import 'swiper/css/pagination';
import icon from '@public/logoApple.svg';
import data from '@utils/data.json';

import ProductOffer from '../ui/product-offer';
import { NavigationHover } from '../ui/navigation-hover';
import React, { useMemo } from 'react';
const slidesData = [
  {
    icon: icon,
    iconTitle: 'iPhone 14 Series',
    titleDiscount: 'Up to 10% off Voucher',
    bgColor: '#000000',
  },
];

const HeroSection = () => {
  const womanDataMemo = useMemo(() => data.womanData, []);
  const manDataMemo = useMemo(() => data.manData, []);
  const electronicsDataMemo = useMemo(() => data.electronicsData, []);
  const homeLifestyleDataMemo = useMemo(() => data.homeLifestyleData, []);
  const sportsOutdoorDataMemo = useMemo(() => data.sportsOutdoorData, []);
  const groceriesPetsDataMemo = useMemo(() => data.groceriesPetsData, []);
  const healthBeautyDataMemo = useMemo(() => data.healthBeautyData, []);

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-row-reverse justify-center gap-6 px-4">
      <div className="relative mt-8 h-full w-full">
        {slidesData.map((slide, index) => (
          <div className="h-full" key={index}>
            <ProductOffer
              icon={slide.icon}
              iconTitle={slide.iconTitle}
              titleDiscount={slide.titleDiscount}
              imgProduct={slide.imgProduct}
              bgColor={slide.bgColor}
            />
          </div>
        ))}
      </div>

      <div className="rlt:border-l-gray-300 relative hidden w-fit flex-col gap-2 pt-[40px] md:flex ltr:border-r-[0.5px] ltr:border-r-gray-300 ltr:pr-[16px] rtl:border-l-[0.5px] rtl:pl-[16px]">
        <div className="relative flex max-w-[217px] items-center justify-between">
          <NavigationHover title="Woman's Fashion" staticData={womanDataMemo} />
        </div>
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover title="Men’s Fashion" staticData={manDataMemo} />
        </div>
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover
            title="Electronics"
            staticData={electronicsDataMemo}
          />
        </div>
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover
            title="Home & Lifestyle"
            staticData={homeLifestyleDataMemo}
          />
        </div>{' '}
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover
            title="Sports & Outdoor"
            staticData={sportsOutdoorDataMemo}
          />
        </div>
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover
            title="Groceries & Pets"
            staticData={groceriesPetsDataMemo}
          />
        </div>{' '}
        <div className="flex w-[217px] items-center justify-between">
          <NavigationHover
            title="Health & Beauty"
            staticData={healthBeautyDataMemo}
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
