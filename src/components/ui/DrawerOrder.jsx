import * as React from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { useOrder } from '@/Supabase/useOrder';
import { useAuthQuery } from '@/Supabase/useFetchUser';
import { ImCancelCircle } from 'react-icons/im';
import { handleDownload } from '../Hooks/useToPDF';
import { useTranslation } from 'react-i18next';

const DrawerOrder = (props) => {
  const { t } = useTranslation();
  const { date, id, total, products, shipping, tax, subTotal, orderList } =
    props;

  const normalizedProducts = Array.isArray(orderList?.products)
    ? orderList.products
    : orderList?.products
    ? [orderList.products]
    : [];

  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthQuery();
  const { updateOrderState } = useOrder(user?.id);

  // استخراج بيانات الخصم من orderList مع التأكد من وجودها
  const discount = orderList?.discount || 0;
  const discountPercentage = orderList?.discount_percentage || 0;
  const couponCode = orderList?.coupon_code || null;

  // حساب Total قبل الخصم
  const totalBeforeDiscount = subTotal + shipping + tax;
  const hasDiscount = discount > 0;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {t('View details')}
          <IoIosArrowDown />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '10px',
          paddingBottom: '24px',
          maxHeight: '95vh',
        }}
      >
        <div className="z-30 mx-auto w-full max-w-[530px] overflow-auto bg-white opacity-95">
          <div className="sticky top-0 mx-auto mb-4 mt-[8px] h-1.5 w-12 rounded-[4px] bg-gray-600" />
          <DrawerTitle className="my-2 text-[20px] font-medium">
            {t('Order ID:')} {id}
          </DrawerTitle>
          <DrawerDescription className="mb-4 text-[14px] text-gray-400">
            {t('Date:')} {date}
          </DrawerDescription>
          {/* Products List */}
          <div>
            {normalizedProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-300 py-3"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={product.product_img}
                    alt={product.product_name}
                    className="h-[50px] w-[50px] object-cover"
                  />
                  <p className="text-[16px] font-normal">
                    {t(`titles.${product.product_name}`)}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-[12px] text-gray-400">
                    {t('Qty:')} {product.quantity}
                  </p>
                  <p>LE {product.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2 border-t border-gray-300 pt-3">
            <div className="flex justify-between text-gray-600">
              <p>{t('Subtotal')}:</p>
              <p>LE {subTotal?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>{t('Shipping')}:</p>
              <p>LE {shipping?.toFixed(2) || '0.00'}</p>
            </div>
            <div className="flex justify-between text-gray-600">
              <p>{t('Tax')}:</p>
              <p>LE {tax?.toFixed(2) || '0.00'}</p>
            </div>

            {hasDiscount && (
              <>
                <div className="flex justify-between text-gray-400">
                  <p>{t('Total Before Discount:')}</p>
                  <p className="line-through">
                    LE {totalBeforeDiscount.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-3">
                  <div className="flex flex-col">
                    <p className="font-medium text-green-600">
                      {t('Discount')} ({discountPercentage}%):
                    </p>
                    {couponCode && (
                      <p className="text-xs text-gray-500">
                        {t('Coupon')}: {couponCode.toUpperCase()}
                      </p>
                    )}
                  </div>
                  <p className="font-bold text-green-600">
                    -LE {discount.toFixed(2)}
                  </p>
                </div>
              </>
            )}

            <div className="flex justify-between border-t-2 border-gray-300 pt-3 text-lg font-bold">
              <p>{t('Total')}:</p>
              <p className={hasDiscount ? 'text-red-500' : 'text-gray-900'}>
                LE {total?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
          <DrawerFooter
            className="flex w-full flex-row flex-wrap items-center justify-center gap-2"
            style={{ marginTop: '16px', display: 'flex', padding: 0 }}
          >
            <button
              onClick={() =>
                handleDownload({
                  date,
                  id,
                  total,
                  shipping,
                  tax,
                  subTotal,
                  orderList,
                  products,
                  discount,
                  discountPercentage,
                  couponCode,
                })
              }
              className="flex items-center gap-2 rounded-[6px] bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
            >
              <FaDownload />
              {t('Download PDF')}
            </button>
            {orderList?.state === 'pending' && (
              <>
                <button
                  onClick={() =>
                    updateOrderState({ orderId: id, state: 'completed' })
                  }
                  className="flex items-center gap-2 rounded-[6px] bg-green-500 px-4 py-2 text-white transition hover:bg-green-600"
                >
                  <img className="w-[20px]" src="/delivered.png" alt="" />
                  {t('Mark as Delivered')}
                </button>
                <button
                  onClick={() =>
                    updateOrderState({ orderId: id, state: 'canceled' })
                  }
                  className="flex items-center gap-2 rounded-[6px] bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
                >
                  <ImCancelCircle className="text-white" />
                  {t('Mark as Cancel')}
                </button>
              </>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(DrawerOrder);
