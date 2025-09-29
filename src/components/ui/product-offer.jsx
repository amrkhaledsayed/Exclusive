import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const ProductOffer = (props) => {
  const { icon, iconTitle, titleDiscount, bgColor } = props;
  const { t } = useTranslation();

  return (
    <div
      className="relative flex h-full w-full max-w-full flex-col-reverse items-center justify-center overflow-hidden rounded-2xl text-white shadow-lg md:ml-0 md:w-full md:max-w-full md:flex-row md:justify-between"
      style={{ background: bgColor }}
    >
      <div className="z-10 flex h-full w-full flex-col items-center gap-4 bg-black/70 px-6 py-8 text-center md:items-start md:px-8 md:py-10 md:text-left lg:px-12 lg:py-12 xl:px-16 xl:py-16">
        <div className="flex items-center justify-center gap-3 text-white md:justify-start md:gap-4">
          <img
            src={icon || '/placeholder.svg'}
            alt="Brand Logo"
            className="h-8 w-8 object-contain md:h-10 md:w-10"
            loading="lazy"
          />
          <p className="text-sm font-medium md:text-base lg:text-lg">
            {t(`${iconTitle}`)}
          </p>
        </div>

        <h3
          aria-label={t(`${titleDiscount}`)}
          className="max-w-sm text-2xl leading-tight font-bold md:max-w-md md:text-3xl md:leading-tight lg:text-4xl lg:leading-tight xl:text-5xl xl:leading-tight"
        >
          {t(`${titleDiscount}`)}
        </h3>

        <button className="group mt-4 flex cursor-pointer rtl:flex-row-reverse items-center justify-center border-none bg-transparent transition-all duration-300 hover:scale-105 md:mt-6 md:justify-start">
          <Link
            to="/allProducts"
            aria-label="Shop All Products"
            className="relative pr-3 text-xs font-semibold tracking-wider text-white uppercase transition-all duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:content-[''] group-hover:after:origin-bottom-left group-hover:after:scale-x-100 md:text-sm md:tracking-widest"
          >
            {t('SHOP NOW')}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="8"
            viewBox="0 0 46 16"
            className="transform fill-white transition-transform duration-300 group-hover:translate-x-1 group-active:scale-90"
          >
            <path
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              transform="translate(30)"
            />
          </svg>
        </button>
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/video-poster.jpg"
        className="absolute top-0 left-0 h-full w-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default React.memo(ProductOffer);
