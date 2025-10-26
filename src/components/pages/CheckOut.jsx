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
import { MdKeyboardArrowRight } from 'react-icons/md';
import clsx from 'clsx';
import { Loading } from '../ui/Loading';
import { AppContext } from '@/utils/context';
import toast from 'react-hot-toast';

const CheckOut = () => {
  const [value, setValue] = useState('Bank');
  const [loading, setLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const {
    subTotal: initialSubTotal,
    Tax: initialTax,
    Shipping: initialShipping,
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
    criteriaMode: 'all',
  });

  const subTotal = initialSubTotal || 0;
  const Tax = initialTax || 0;
  const Shipping = initialShipping || 0;
  const totalBeforeDiscount = subTotal + Tax + Shipping;
  const finalTotal = totalBeforeDiscount - appliedDiscount;

  useEffect(() => {
    if (data) {
      reset({
        fullName: `${data?.first_name ?? ''} ${data?.last_name ?? ''}`.trim(),
        phone: `${data?.phoneNumber || ''}`,
        email: `${data?.email || ''}`,
      });
    }
  }, [data, reset]);

  const handleApplyCoupon = () => {
    const trimmedCode = couponCode.toLowerCase().trim();

    if (trimmedCode === 'exclusive15') {
      const discountAmount = subTotal * 0.15;
      setAppliedDiscount(discountAmount);
      setDiscountPercentage(15);
      toast.success(t('Coupon applied successfully! 15% off'));
    } else if (trimmedCode === 'save10') {
      const discountAmount = subTotal * 0.1;
      setAppliedDiscount(discountAmount);
      setDiscountPercentage(10);
      toast.success(t('Coupon applied successfully! 10% off'));
    } else if (trimmedCode === 'welcome20') {
      const discountAmount = subTotal * 0.2;
      setAppliedDiscount(discountAmount);
      setDiscountPercentage(20);
      toast.success(t('Coupon applied successfully! 20% off'));
    } else if (trimmedCode === '') {
      toast.error(t('Please enter a coupon code'));
    } else {
      toast.error(t('Invalid coupon code!'));
      setAppliedDiscount(0);
      setDiscountPercentage(0);
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setAppliedDiscount(0);
    setDiscountPercentage(0);
    toast.success(t('Coupon removed'));
  };

  const handleCheckout = async (formData) => {
    try {
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
        fullName: formData.fullName,
        Company_Name: formData.CompanyName,
        Apartment: formData.Apartment,
        Street_Address: formData.address,
        Phone_Number: formData.phone,
        Email_Address: formData.email,
        products: now ? productBuyNow : products,
        subTotal,
        TownCity: formData.City,
        shipping: Shipping,
        tax: Tax,
        discount: appliedDiscount,
        discount_percentage: discountPercentage,
        total: finalTotal,
        coupon_code: couponCode || null,
      };

      await addOrder(orderData);
      clearData();
      reset();
      toast.success(t('Order placed successfully!'));
      setTimeout(() => {
        navigate('/Orders');
      }, 1000);
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(t('Failed to place order. Please try again.'));
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
        />
        <p className="text-gray-800">{t('CheckOut')}</p>
      </div>

      <div className="flex flex-col items-start justify-between gap-8 lg:flex-row">
        <form
          onSubmit={handleSubmit(handleCheckout)}
          className="flex w-full max-w-[100%] flex-col gap-8 lg:w-[70%]"
        >
          <p className="text-4xl font-medium leading-8">
            {t('Billing Details')}
          </p>

          {/* Full Name */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="fullName"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Full Name*')}
            </label>
            <Input
              id="fullName"
              type="text"
              isFullWidth
              placeholder={t('Enter your full name')}
              {...register('fullName', {
                required: t('Full name is required.'),
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="CompanyName"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Company Name*')}
            </label>
            <Input
              id="CompanyName"
              type="text"
              isFullWidth
              placeholder={t('Enter your company name')}
              {...register('CompanyName', {
                required: t('Company name is required.'),
              })}
            />
            {errors.CompanyName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.CompanyName.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="address"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Street Address*')}
            </label>
            <Input
              id="address"
              type="text"
              isFullWidth
              placeholder={t('Enter your street address')}
              {...register('address', {
                required: t('Street address is required.'),
              })}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* Apartment */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="Apartment"
              className="text-[16px] font-normal leading-6 text-gray-400"
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

          {/* City */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="City"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Town/City*')}
            </label>
            <Input
              id="City"
              type="text"
              isFullWidth
              placeholder={t('Enter your city')}
              {...register('City', { required: t('City is required.') })}
            />
            {errors.City && (
              <p className="mt-1 text-sm text-red-500">{errors.City.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="phone"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Phone Number*')}
            </label>
            <Input
              id="phone"
              type="tel"
              isFullWidth
              placeholder={t('Enter your phone number')}
              {...register('phone', {
                required: t('Phone number is required.'),
                pattern: {
                  value: /^[0-9]+$/,
                  message: t('Phone number must contain digits only.'),
                },
                maxLength: {
                  value: 11,
                  message: t('Phone number must be 11 digits or less.'),
                },
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="email"
              className="text-[16px] font-normal leading-6 text-gray-400"
            >
              {t('Email Address*')}
            </label>
            <Input
              id="email"
              type="email"
              isFullWidth
              placeholder={t('Enter your email address')}
              {...register('email', {
                required: t('Email is required.'),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t('Please enter a valid email address.'),
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>
        </form>

        <div className="flex w-full flex-col gap-4 rounded-[8px] border-[2px] border-gray-300 px-3 py-4 lg:w-[90%]">
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
          <div className="flex flex-col gap-3 rounded-lg bg-gray-50 py-4 px-2 ">
            <p className="text-sm font-medium text-gray-700">
              {t('Have a coupon?')}
            </p>
            <div className="flex gap-2">
              <Input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t('Enter coupon code')}
                className="flex-1"
                disabled={appliedDiscount > 0}
              />
              {appliedDiscount > 0 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRemoveCoupon}
                  className="whitespace-nowrap"
                >
                  {t('Remove')}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleApplyCoupon}
                  className="whitespace-nowrap"
                >
                  {t('Apply')}
                </Button>
              )}
            </div>
            {appliedDiscount > 0 && (
              <p className="text-sm font-medium text-green-600">
                ✓ {t('Coupon applied')}: {discountPercentage}% {t('off')}
              </p>
            )}
            <p className="text-xs text-gray-500">
              {t('Try')}: exclusive15, save10, welcome20
            </p>
          </div>
          <div className="flex w-full flex-col gap-2 px-3 pt-3">
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-gray-400">{t('Subtotal')}:</p>
              <p>LE {subTotal?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-gray-400">{t('Shipping')}:</p>
              <p>LE {Shipping?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between pb-3 font-[500]">
              <p className="text-gray-400">{t('Tax')}:</p>
              <p>LE {Tax?.toFixed(2)}</p>
            </div>

            {appliedDiscount > 0 && (
              <>
                <div className="flex items-center justify-between pb-3 font-[500]">
                  <p className="text-gray-400">{t('Total Before Discount')}:</p>
                  <p className="text-gray-400 line-through">
                    LE {totalBeforeDiscount?.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between pb-3 font-[500]">
                  <p className="text-green-600">
                    {t('Discount')} ({discountPercentage}%):
                  </p>
                  <p className="font-bold text-green-600">
                    -LE {appliedDiscount?.toFixed(2)}
                  </p>
                </div>
              </>
            )}

            <div className="flex items-center justify-between border-t-2 border-gray-300 pt-3 font-bold">
              <p className="text-[18px]">{t('Total')}:</p>
              <p className="text-[18px] text-red-500">
                LE {finalTotal?.toFixed(2)}
              </p>
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
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
