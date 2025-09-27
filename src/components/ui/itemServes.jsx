import React from 'react';
import { useTranslation } from 'react-i18next';

const ItemServes = (props) => {
  const { img, des, title } = props;
  const { t } = useTranslation();

  return (
    <div className="flex h-full w-full max-w-[400px] flex-col items-center gap-1 rounded-[10px] bg-white py-5 drop-shadow-xl">
      <img src={img} alt={title} />
      <p className="text-[20px] font-semibold">{t(`${title}`)}</p>
      <p className="text-[14px] font-normal">{t(`${des}`)}</p>
    </div>
  );
};
export default React.memo(ItemServes);
