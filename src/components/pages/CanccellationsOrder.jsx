import { Link } from 'react-router-dom';
import { OrederBox } from '../ui/OrederBox';

import React, { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowRight } from 'react-icons/md';
import clsx from 'clsx';
import { Button } from '../ui/Button';
import { AppContext } from '@/common/context';

const CanccellationsOrder = () => {
  const { orderList } = React.useContext(AppContext);

  const MessageContext = createContext();
  const { t, i18n } = useTranslation();

  const orderCancel = orderList.filter((order) => order.state === 'canceled');
  return (
    <MessageContext.Provider value={orderList}>
      <div className="mx-auto w-full max-w-[1200px] px-4 pt-[80px]">
        <div>
          <div className="mb-8 flex items-center text-[14px] font-normal">
            <Link to="/" className="text-gray-500" aria-label={t('Home')}>
              {t('Home')}
            </Link>
            <MdKeyboardArrowRight
              className={clsx('rotate-0', {
                'rotate-180': i18n.language === 'ar',
              })}
            />
            <p className="ml-1.5 text-gray-700">{t('Canccellations Order')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-[32px] font-medium">
                {t('Canccellations Order')}
              </p>
              <Button variant="destructive">
                {t('Order')} ({orderCancel?.length})
              </Button>
            </div>
            {orderCancel.length === 0 && (
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/no order.webp"
                  alt="no order "
                  className="w-[30rem] max-w-full"
                />
                <p className="text-[28px] font-bold">
                  {t('No orders have been canceled yet.')}
                </p>
              </div>
            )}
            <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
              {orderCancel.map((order, index) => (
                <OrederBox
                  key={index}
                  index={index}
                  date={order?.created_at}
                  id={order.id}
                  total={order.total}
                  subTotal={order.subTotal}
                  shipping={order.shipping}
                  tax={order.tax}
                  products={order.products}
                  orderList={orderCancel[index]}
                  state={order.state}
                />
              ))}
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </MessageContext.Provider>
  );
};
export default React.memo(CanccellationsOrder);
