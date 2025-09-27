import React from 'react';
import { useTranslation } from 'react-i18next';

const ItemCheckOut = ({ img, title, price, quantities }) => {
  const totalPrice = price * (quantities || 1);
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 grid-rows-1 items-center gap-4 border-b border-gray-200 py-3 nth-last-1:border-0">
      <div className="flex items-center gap-2">
        <img
          src={img}
          alt={title}
          className="max-h-[50px] max-w-[50px] object-contain"
        />
        <p className="text-[12px] font-medium text-gray-700">
          {t(`titles.${title}`)}
        </p>
      </div>

      <p className="text-center text-[16px] font-semibold">
        ${price.toFixed(2)}
      </p>

      <div className="flex justify-center">
        <p>{quantities}</p>
      </div>

      <p className="text-center text-[16px] font-semibold">
        ${totalPrice.toFixed(2)}
      </p>
    </div>
  );
};

export default React.memo(ItemCheckOut);
