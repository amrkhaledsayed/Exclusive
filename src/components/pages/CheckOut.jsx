import { Link, useLocation, useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useForm } from 'react-hook-form';
import Radio from '@mui/material/Radio';
import React, { useEffect, useState } from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import { Button } from '../ui/Button';

import ItemCheckOut from '../ui/IitemCheck';
import { Input } from '../ui/input';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowRight, MdOutlineMailOutline } from 'react-icons/md';
import clsx from 'clsx';
import { Loading } from '../ui/Loading';
import { SuccessMessage } from '../ui/SuccessMessage';
import { CircleCheckBig } from 'lucide-react';
import { AppContext } from '@/utils/context';

const CheckOut = () => {
  const [value, setValue] = useState('Bank');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    subTotal,
    Tax,
    Shipping,
    total,
    product_id,
    product_name,
    now,
    product_img,
    price,
    quantity,
  } = location.state || {};

  const { user, addOrder, cartList, data, clearData } =
    React.useContext(AppContext);

  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
    },
  });
  useEffect(() => {
    if (data) {
      reset({
        fullName: `${data?.first_name ?? ''} ${data?.last_name ?? ''}`.trim(),
        phone: `${data?.phoneNumber}`,
        email: `${data?.email}`,
      });
    }
  }, [data, reset]);
  const handleCheckout = async (data) => {
    try {
      setOpen(true);
      setLoading(true);

      const products = cartList.map((item) => ({
        product_id: item.product_id,
        product_name: item.product_name,
        product_img: item.product_img,
        price: item.price,
        quantity: item.quantity,
      }));

      const productBuyNow = {
        product_id,
        product_name,
        product_img,
        price,
        quantity,
      };

      const orderData = {
        user_id: user.id,
        state: 'pending',
        fullName: data.fullName,
        Company_Name: data.CompanyName,
        Apartment: data.Apartment,
        Street_Address: data.address,
        Phone_Number: data.phone,
        Email_Address: data.email,
        products: now ? productBuyNow : products,
        subTotal,
        TownCity: data.City,
        shipping: Shipping,
        tax: Tax,
        total,
      };

      await addOrder(orderData);

      clearData();
      reset();
      navigate('/');
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-16 px-3 pt-10 md:pt-20">
      <div className="flex items-center text-sm text-gray-600">
        <Link
          to="/"
          className="transition hover:text-red-500"
          aria-label={t('Account')}
        >
          {t('Account')}
        </Link>
        <MdKeyboardArrowRight
          className={clsx('rotate-0', {
            'rotate-180': i18n.language === 'ar',
          })}
        />{' '}
        <p className="text-gray-800">{t('CheckOut')}</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="flex w-full max-w-[100%] flex-col gap-8 lg:w-[70%]"
        >
          <p className="text-4xl leading-8 font-medium">
            {t('Billing Details')}
          </p>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="fullName"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Full Name')}
            </label>
            <Input
              id="fullName"
              type="text"
              isFullWidth
              placeholder={t('Enter your full name')}
              {...register('fullName', { required: true })}
            />
            {errors.fullName && (
              <p className="text-red-500">{t('First Name is required.')}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="CompanyName"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Company Name')}
            </label>
            <Input
              id="CompanyName"
              type="text"
              isFullWidth
              placeholder={t('Enter your company name')}
              {...register('CompanyName', { required: true })}
            />
            {errors.CompanyName && (
              <p className="text-red-500">{t('Company Name is required.')}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="address"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Street Address*')}
            </label>
            <Input
              id="address"
              type="text"
              isFullWidth
              placeholder={t('Enter your street address')}
              {...register('address', { required: true })}
            />
            {errors.address && (
              <p className="text-red-500">{t('Street Address is required.')}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="Apartment"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Apartment, floor, etc. (optional)')}
            </label>
            <Input
              id="Apartment"
              type="text"
              isFullWidth
              placeholder={t('Apartment, floor, etc. (optional)')}
              {...register('Apartment')}
            />
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="City"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Town/City*')}
            </label>
            <Input
              id="City"
              type="text"
              isFullWidth
              placeholder={t('Enter your city')}
              {...register('City', { required: true })}
            />
            {errors.City && (
              <p className="text-red-500">{t('City is required.')}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="phone"
              className="text-[16px] leading-6 font-normal text-gray-400"
            >
              {t('Phone Number*')}
            </label>
            <Input
              id="phone"
              type="tel"
              isFullWidth
              placeholder={t('Enter your phone number')}
              {...register('phone', { required: true })}
            />
            {errors.phone && (
              <p className="text-red-500">{t('Phone is required.')}</p>
            )}
          </div>

          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="email"
              className="flex items-center gap-2 text-[16px] leading-6 font-normal text-gray-400"
            >
              <MdOutlineMailOutline />
              {t('Email Address*')}
            </label>
            <Input
              id="email"
              type="email"
              isFullWidth
              placeholder={t('Enter your email address')}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">{t('Email is required.')}</p>
            )}
          </div>
        </form>

        <div className="flex w-full flex-col gap-2 rounded-[8px] border-[2px] border-gray-300 px-3 py-4 lg:w-[90%]">
          <div className="rounded-[8px] border-1 border-gray-300">
            <div className="grid min-h-[70px] grid-cols-4 rounded-t-lg bg-gray-100 px-6 py-[24px] text-sm font-semibold text-gray-500">
              <p className="flex-2 text-[18px] font-medium">
                {t('Product Name')}
              </p>
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

            <div className="flex flex-col gap-4">
              {now ? (
                <ItemCheckOut
                  key={product_id}
                  img={product_img}
                  quantities={quantity ?? 1}
                  title={product_name}
                  productId={product_id}
                  price={price}
                />
              ) : (
                cartList?.map((item, index) => (
                  <ItemCheckOut
                    key={index}
                    img={item.product_img}
                    quantities={item.quantity ?? 1}
                    title={item.product_name}
                    productId={item?.product_id}
                    price={item.price}
                  />
                ))
              )}
            </div>
          </div>

          <div className="flex w-[100%] flex-col gap-2 px-3 pt-3">
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-gray-400">{t('Subtotal')}:</p>
              <p>${subTotal?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-gray-400">{t('Shipping')}:</p>
              <p>${Shipping?.toFixed(0)}</p>
            </div>
            <div className="flex items-center justify-between border-b-1 border-gray-300 pb-3 font-[500]">
              <p className="text-gray-400">{t('Tax')}:</p>
              <p>${Tax?.toFixed(0)}</p>
            </div>
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-[16px]">{t('Total')}:</p>
              <p>${total?.toFixed(2)}</p>
            </div>
          </div>

          <RadioGroup value={value} onChange={handleChange}>
            <div className="flex w-full items-center justify-between rounded-[5px] border-1 border-gray-300 px-2.5">
              <FormControlLabel
                value="Bank"
                control={<Radio />}
                label={t('Bank')}
                sx={{ marginInline: 0 }}
              />
              <div className="flex gap-2">
                <img src="/image 30.svg" alt="Bkash" />
                <img src="/image 31.svg" alt="Mastercard" />
                <img src="/image 32.svg" alt="Visa" />
                <img src="/image 33.svg" alt="Nagad" />
              </div>
            </div>
            <FormControlLabel
              value="Cash"
              control={<Radio />}
              label={t('Cash on delivery')}
              className="mt-[10px] w-full rounded-[5px] border-1 border-gray-300 px-2.5"
              sx={{ marginInline: 0 }}
            />
          </RadioGroup>

          <div className="flex w-full items-center justify-between gap-3">
            <Input
              placeholder={t('Coupon Code')}
              className="h-12 w-full rounded-md bg-gray-100 px-4 outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 md:w-72"
            />
            <Button
              variant="destructive"
              className="h-12 w-1/3 border-[#f5a4a4]"
            >
              {t('Apply Coupon')}
            </Button>
          </div>
          <Link to="/" aria-label={t('Home')}>
            <Button
              disabled={loading}
              variant="destructive"
              type="button"
              isFullWidth={true}
              className="h-12 w-full border-[#f5a4a4]"
              onClick={handleSubmit((data) => {
                handleCheckout(data);
              })}
            >
              {t('Place Order')}
              {loading && <Loading />}
            </Button>
          </Link>
        </div>
      </div>
      <SuccessMessage setOpen={setOpen} open={open}>
        <CircleCheckBig size={40} />
        <p className="text-[22px] text-gray-700">
          {t('Your order has been placed successfully!')}
        </p>
        <p className="text-[14px] text-gray-500">
          {t('You can track your order status here.')}
        </p>
        <Button
          variant="destructive"
          className="w-[300px]"
          onClick={() => {
            setOpen(false);
            navigate('/Orders');
          }}
        >
          {t('Track Order')}
        </Button>
      </SuccessMessage>
    </div>
  );
};

export default CheckOut;
