import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

import CartItem from '../ui/CartItem';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import NoUser from '../ui/NoUser';
import { Loading } from '../ui/Loading';
import { AppContext } from '@/common/context';

const Cart = () => {
  const { user, cartList, clearData } = React.useContext(AppContext);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  const subTotal = useMemo(() => {
    return cartList?.reduce(
      (acc, item) => acc + item?.price * item?.quantity,
      0
    );
  }, [cartList]);

  const Tax = useMemo(() => subTotal * 0.12, []);
  const Shipping = useMemo(() => subTotal * 0.14, []);
  const total = useMemo(() => subTotal + Tax + Shipping, []);

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };
  const handleCheckOut = () => {
    setLoading(true);
    navigate('checkOut', {
      state: { subTotal, Tax, Shipping, total, now: false },
    });
    setLoading(false);
  };

  return (
    <>
      {!user ? (
        <NoUser
          title={'You are not logged in'}
          message={'Please log in to view your Cart and save your cart items.'}
          to={'/sign-in'}
          btn="Log in"
        />
      ) : (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-3 pt-10 md:pt-20">
          <div className="flex items-center text-sm text-gray-600">
            <Link
              to="/"
              className="transition hover:text-red-500"
              aria-label={t('Account')}
            >
              {t('Account')}
            </Link>
            <span className="mx-2">/</span>
            <p className="text-gray-800">{t('Cart')}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="grid min-h-[70px] grid-cols-4 rounded-t-lg bg-gray-100 px-6 py-[24px] text-sm font-semibold text-gray-700 shadow">
              <p className="text-[18px] font-medium">{t('Product Name')}</p>
              <p className="text-center text-[18px] font-medium">
                {t('Price')}
              </p>
              <p className="text-center text-[18px] font-medium">
                {t('Quantity')}
              </p>
              <p className="text-center text-[18px] font-medium">
                {t('Total')}
              </p>
            </div>

            {cartList.length <= 0 ? (
              <div className="flex w-full flex-col items-center justify-center gap-5 py-20">
                <div className="rounded-xl border border-gray-300 p-5">
                  <img
                    src="./cart.png"
                    alt="Empty Cart"
                    className="h-12 w-12"
                  />
                </div>
                <div className="text-center text-gray-500">
                  <p className="text-lg font-semibold">
                    {t('Your cart is empty')}
                  </p>
                  <p className="text-sm">
                    {t(
                      'Browse our collection and add items you love to your cart.'
                    )}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="nth-last-1:rounded-b-lg">
                  {cartList.map((item) => (
                    <CartItem
                      key={item?.product_id}
                      img={item?.product_img}
                      title={item?.product_name}
                      Price={item?.price}
                      productId={item?.product_id}
                      quantity={
                        quantities[item?.product_id] ?? item?.quantity ?? 1
                      }
                      onQuantityChange={handleQuantityChange}
                    />
                  ))}
                </div>

                <div className="mt-6 flex justify-between">
                  <Link to="/" aria-label={t('Home')}>
                    <Button variant="destructive">{t('Return To Shop')}</Button>
                  </Link>
                  <Button onClick={clearData} variant="outline">
                    {t('Update Cart')}
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-6 md:flex-row">
            <div className="flex w-full items-center gap-3 md:w-auto">
              <Input
                placeholder={t('Coupon Code')}
                value={'Under Maintenance'}
                className="h-12 w-full  rounded-md bg-gray-100 px-4 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 md:w-72"
              />
              <Button
                variant="destructive"
                disable={true}
                className="h-12 w-full max-w-[173px] border-[#f5a4a4]"
              >
                {t('Apply Coupon')}
              </Button>
            </div>

            <div className="w-full max-w-[470px] rounded-lg border border-red-200 bg-white p-6 shadow-md">
              <p className="mb-4 text-lg font-semibold">{t('Cart Total')}</p>
              <div className="flex w-[100%] flex-col gap-2 pt-3">
                <div className="flex items-center justify-between pb-3 font-[500]">
                  <p className="text-gray-400">{t('Subtotal')}:</p>
                  <p>${subTotal.toFixed(2)}</p>
                </div>

                <div className="flex items-center justify-between pb-3 font-[500]">
                  <p className="text-gray-400">{t('Shipping')}:</p>
                  <p>${Shipping.toFixed(0)}</p>
                </div>

                <div className="flex items-center justify-between border-b-1 border-gray-300 pb-3 font-[500]">
                  <p className="text-gray-400">{t('Tax')}:</p>
                  <p>${Tax.toFixed(0)}</p>
                </div>

                <div className="flex items-center justify-between pb-3 font-[500]">
                  <p className="text-[16px]">{t('Total')}:</p>
                  <p>${total.toFixed(2)}</p>
                </div>
              </div>

              <Button
                disabled={loading}
                variant="destructive"
                className="mt-6 w-full"
                onClick={() => handleCheckOut()}
              >
                {t('Proceed to Checkout')}
                {loading && <Loading />}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
