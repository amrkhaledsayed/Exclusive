import { FaPhoneAlt, FaUser } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { Button } from '../ui/Button';
import { useContext } from 'react';
import { AppContext } from '@/utils/context';

export default function SignUp() {
  const { t } = useTranslation();
  const { handleGoogleSignIn, SignUp } = useContext(AppContext);

  const addUser = async (data) => {
    const cleanEmail = data.email.trim().toLowerCase();
    SignUp({
      email: cleanEmail,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="w-full mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-10 px-4 pt-[60px] md:flex-row md:gap-[130px]">
      <div className="hidden w-full max-w-[805px] lg:block">
        <img
          src="./Mobile wireframe-cuate.svg"
          alt={t('Side')}
          className="w-full"
        />
      </div>

      <div className="w-full max-w-[400px] rounded-[8px] border-[2px] border-white bg-gradient-to-t from-[#f4f7fb] to-white p-6 shadow-[0px_30px_30px_-20px_rgba(133,189,215,0.88)]">
        <h1 className="text-center text-[26px] font-extrabold text-red-600 md:text-[30px]">
          {t('Create an account')}
        </h1>

        <form
          className="mt-5 flex flex-col gap-4"
          onSubmit={handleSubmit(addUser)}
        >
          <div className="relative flex gap-2">
            <div className="relative flex flex-col gap-0.5">
              <label
                htmlFor="firstName"
                className="text-md mb-3 font-medium text-gray-600"
              >
                {t('First Name')}
              </label>
              <div className="relative flex flex-col gap-0.5">
                <FaUser className="absolute top-1/2 left-4 translate-y-[-50%]" />
                <Input
                  type="text"
                  id="firstName"
                  placeholder={t('First Name')}
                  {...register('firstName', {
                    required: t('First name cannot be empty.'),
                  })}
                />
              </div>
              {errors.firstName && (
                <p className="text-[12px] text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="relative flex flex-col gap-0.5">
              <label
                htmlFor="lastName"
                className="text-md mb-3 font-medium text-gray-600"
              >
                {t('Last Name')}
              </label>
              <div className="relative flex-1">
                <FaUser className="absolute top-1/2 left-4 translate-y-[-50%]" />

                <Input
                  type="text"
                  id="lastName"
                  placeholder={t('Last Name')}
                  {...register('lastName', {
                    required: t('Last name cannot be empty.'),
                  })}
                />
              </div>
              {errors.lastName && (
                <p className="text-[12px] text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>
          <div className="relative flex flex-col gap-0.5">
            <label
              htmlFor="phoneNumber"
              className="text-md mb-3 font-medium text-gray-600"
            >
              {t('Phone Number')}
            </label>
            <div className="relative flex-1">
              <FaPhoneAlt className="absolute top-1/2 left-4 translate-y-[-50%]" />
              <Input
                type="text"
                id="phoneNumber"
                placeholder={t('Phone Number')}
                {...register('phoneNumber', {
                  required: t('Phone Number cannot be empty.'),
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-[12px] text-red-500">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
          <div className="relative flex flex-col gap-0.5">
            <label
              htmlFor="email"
              className="text-md mb-3 font-medium text-gray-600"
            >
              {t('Email Address')}
            </label>
            <div className="relative">
              <MdEmail className="absolute top-1/2 left-4 translate-y-[-50%]" />
              <Input
                type="email"
                id="email"
                placeholder={t('E-mail')}
                {...register('email', {
                  required: t('Email cannot be empty.'),
                })}
              />
            </div>
            {errors.email && (
              <p className="text-[12px] text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="relative flex flex-col gap-0.5">
            <label
              htmlFor="password"
              className="text-md mb-3 font-medium text-gray-600"
            >
              {t('Password')}
            </label>
            <div className="relative">
              <TbLockPassword className="absolute top-1/2 left-4 translate-y-[-50%]" />
              <Input
                type="password"
                id="password"
                placeholder={t('Password')}
                {...register('password', {
                  required: t('Password cannot be empty.'),
                })}
              />
            </div>
            {errors.password && (
              <p className="text-[12px] text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="button"
            className="relative mt-5 w-full rounded-lg bg-gradient-to-r from-red-600 via-[#f08b8b] to-red-600 bg-[length:200%_200%] bg-[position:100%_0] py-2 font-bold text-white shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.88)] transition-all duration-1000 ease-in-out hover:bg-[position:0_0] active:scale-95"
            onClick={handleSubmit((data) => {
              addUser(data);
            })}
          >
            {t('Create Account')}
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-center text-sm font-medium text-black transition-all duration-200 ease-in"
          >
            <FcGoogle size={25} />
            {t('Continue with Google')}
          </Button>
        </form>

        <span className="mt-[25px] flex items-center justify-center gap-3.5">
          <p className="text-center text-[16px]">
            {t('Already have account?')}
          </p>
          <Link to="/sign-in" className="text-[16px] underline">
            {t('Log in')}
          </Link>
        </span>
      </div>
    </div>
  );
}
