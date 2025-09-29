import { IoIosSend, IoLogoInstagram, IoMdCall } from 'react-icons/io';
import { LuMessageCircle, LuSend } from 'react-icons/lu';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { BsTwitterX } from 'react-icons/bs';
import { Input } from '../ui/input';
import { FaFacebookF, FaLinkedinIn, FaRegUser } from 'react-icons/fa6';
import { MdKeyboardArrowRight, MdOutlineMailOutline } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { Textarea } from '../ui/textarea';
import { RiMessage3Line, RiTimer2Line } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import { SuccessMessage } from '../ui/SuccessMessage';
import { useState } from 'react';
import { CircleCheckBig } from 'lucide-react';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState();
  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      reset();
      navigate('/');
    }, 3000);
  };

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-[80px]">
      <div className="mb-8 flex items-center text-[14px] font-normal">
        <Link to="/" className="text-gray-500" aria-label={t('Home')}>
          {t('Home')}
        </Link>

        <MdKeyboardArrowRight
          className={clsx('rotate-0', { 'rotate-180': i18n.language === 'ar' })}
        />

        <p className="text-gray-700">{t('Contact')}</p>
      </div>

      <div className="flex flex-col justify-between gap-6 md:flex-row">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col items-start gap-7 rounded-[10px] border-1 border-gray-200 bg-[#fff] px-[20px] py-[40px] drop-shadow-xl md:max-w-1/2 md:px-[32px]"
        >
          <div className="flex items-center gap-2 text-2xl">
            <LuSend className="text-red w-[35px] md:w-[40px]" />
            <h3 className="text-[20px] font-bold md:text-[22px]">
              {t('Send us a Message')}
            </h3>
          </div>

          <div className="flex w-full flex-col gap-7">
            <div className="flex w-full flex-col justify-between gap-4 sm:flex-row">
              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2">
                  <FaRegUser />
                  <label htmlFor="name">{t('Your Name')}*</label>
                </div>
                <Input
                  id="name"
                  placeholder={t('Your Name')}
                  {...register('name', { required: t('Name is required.') })}
                />
                {errors.name && (
                  <p className="text-red text-[12px]">{errors.name.message}</p>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <div className="flex items-center gap-2">
                  <MdOutlineMailOutline />
                  <label htmlFor="email">{t('Email Address')}*</label>
                </div>
                <Input
                  id="email"
                  placeholder={t('Your Email')}
                  {...register('email', {
                    required: t('Email is required.'),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t('Invalid email address.'),
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red text-[12px]">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="w-full">
              <div className="flex items-center gap-2">
                <FiPhone />
                <label htmlFor="phone">{t('Phone Number')}*</label>
              </div>
              <Input
                id="phone"
                placeholder={t('Your Phone Number')}
                {...register('phone', {
                  required: t('Phone number is required.'),
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: t('Phone number must be 11 digits.'),
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red text-[12px]">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <RiMessage3Line />
                <label htmlFor="message">{t('Your Message')}*</label>
              </div>
              <Textarea
                id="message"
                placeholder={t('Your Message')}
                {...register('message', {
                  required: t('Message is required.'),
                })}
                className="text-body-l h-[207px] w-full resize-none rounded-lg py-2 pl-4"
              />
              {errors.message && (
                <p className="text-red text-[12px]">{errors.message.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" variant="destructive" className="self-end">
            <IoIosSend size={30} />
            {t('Send Your Message')}
          </Button>
        </form>

        <div className="flex flex-col gap-[32px] md:w-1/2">
          <div className="flex flex-col gap-5 sm:flex-row md:flex-col">
            <div className="flex flex-col gap-5 rounded-xl bg-white px-7 py-6 drop-shadow-xl">
              <div className="flex items-center gap-4">
                <FiPhone size={20} className="text-red" />
                <p className="text-[20px] font-medium">{t('Call To Us')}</p>
              </div>
              <div className="flex items-center gap-3">
                <RiTimer2Line size={20} className="text-gray-500" />
                <p className="text-[14px] font-normal">
                  {t('We are available 24/7, 7 days a week.')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <FiPhone size={20} className="text-gray-500" />
                <p className="text-red text-[14px] font-normal">
                  +8801611112222
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 rounded-xl bg-white px-7 py-6 drop-shadow-xl">
              <div className="flex items-center gap-4">
                <MdOutlineMailOutline size={25} className="text-red" />
                <p className="text-[16px] font-medium">{t('Write To US')}</p>
              </div>
              <p className="text-[14px] font-normal text-gray-500">
                {t(
                  'Fill out our form and we will contact you within 24 hours.'
                )}
              </p>
              <div className="flex items-center gap-3">
                <MdOutlineMailOutline size={20} className="text-gray-500" />
                <p className="text-red text-[14px] font-normal">
                  customer@exclusive.com
                </p>
              </div>
              <div className="flex items-center gap-3">
                <MdOutlineMailOutline size={20} className="text-gray-500" />
                <p className="text-red text-[14px] font-normal">
                  support@exclusive.com
                </p>
              </div>
            </div>
          </div>

          <Button variant="destructive">
            <LuMessageCircle />
            {t('Start Live Chat')}
          </Button>

          <div className="flex flex-col gap-5 rounded-xl bg-white px-7 py-6 drop-shadow-xl">
            <p className="text-[18px] font-medium text-gray-700">
              {t('Follow US')}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 rounded-[8px] border-1 border-gray-300 bg-white p-2 transition-all hover:bg-blue-500 hover:text-white">
                <FaFacebookF size={15} />
              </div>
              <div className="w-8 rounded-[8px] border-1 border-gray-300 bg-white p-2 transition-all hover:bg-black hover:text-white">
                <BsTwitterX size={15} />
              </div>
              <div className="w-8 rounded-[8px] border-1 border-gray-300 bg-white p-2 transition-all hover:bg-blue-400 hover:text-white">
                <FaLinkedinIn size={15} />
              </div>
              <div className="w-8 rounded-[8px] border-1 border-gray-300 bg-white p-2 transition-all hover:bg-fuchsia-600 hover:text-white">
                <IoLogoInstagram size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <SuccessMessage setOpen={setOpen} open={open}>
        <CircleCheckBig size={40} />
        <p className="text-2xl text-gray-700">
          {t('Thank you for contacting us')}
        </p>
        <p className="text-[14px] text-gray-500">
          {t('We’ve received your message and will get back to you shortly.')}
        </p>
      </SuccessMessage>
    </div>
  );
};

export default Contact;
