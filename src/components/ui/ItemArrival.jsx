import React from 'react';
import { useTranslation } from 'react-i18next';

const ItemArrival = (props) => {
  const { img, title, des, className } = props;
  const { t } = useTranslation();
  return (
    <div
      className={`relative flex flex-1 justify-center  rounded-lg bg-black p-8 ${className}`}
    >
      {img && (
        <img
          loading="lazy"
          src={img}
          alt={title}
          className="relative z-10 drop-shadow-[0_0_70px_#807f7f9b]"
        />
      )}
      <div className="absolute bottom-0 left-0 z-20 w-full bg-[#00000006] p-4 text-white backdrop-blur-sm">
        <p className="text-lg font-semibold">{t(`${title}`)}</p>
        <p className="mt-1 text-sm">{t(`${des}`)}</p>
        <button className="group mt-4 flex cursor-pointer items-center gap-5 border-none bg-transparent p-0 rtl:flex-row-reverse">
          <Link
            to="/allProducts"
            className="relative text-[12px] tracking-[2px] uppercase after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 md:text-[14px] md:tracking-[4px]"
          >
            {t('Shop Now')}
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="10"
            viewBox="0 0 46 16"
            className="-translate-x-2 transform fill-white transition-transform duration-300 group-hover:translate-x-0 group-active:scale-90"
          >
            <path
              d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z"
              transform="translate(30)"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default React.memo(ItemArrival);
