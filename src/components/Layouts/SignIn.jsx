import { useContext, useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

import { Input } from '../ui/input';
import { IoLockClosedOutline } from 'react-icons/io5';
import { Link } from 'react-router';
import { Button } from '../ui/Button';

import { Loading } from '../ui/Loading';
import { AppContext } from '@/utils/context';

export default function SignIn() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { handleGoogleSignIn, SignIn } = useContext(AppContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      SignIn.mutate({ email, password });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="w-full mx-auto flex max-w-[1200px] flex-col items-center justify-center gap-10 px-4 pt-[60px] md:flex-row md:gap-[130px]">
      <div className="hidden w-full max-w-[805px] lg:block">
        <img
          src="./Mobile wireframe-cuate.svg"
          alt={'Side Imag'}
          className="w-full"
        />
      </div>

      <div className="flex h-full w-full max-w-[400px] flex-col items-center rounded-[8px] border-[2px] border-white bg-gradient-to-t from-[#f4f7fb] to-white p-6 shadow-[0px_30px_30px_-20px_rgba(133,189,215,0.88)]">
        <div className="mb-10 flex flex-col items-center gap-2">
          <IoLockClosedOutline
            className="text-red h-[50px] w-[50px] rounded-full bg-red-50 p-3"
            size={30}
          />

          <h3 className="text-center text-[26px] font-extrabold text-red-600 md:text-[30px]">
            {t('Sign in to your account')}
          </h3>
          <p>{t('Enter your credentials to access your dashboard')}</p>
        </div>
        <form
          className="mt-5 flex w-full flex-col gap-4 self-start"
          onSubmit={handleSubmit}
        >
          <div className="relative">
            <label
              htmlFor="email"
              className="text-md mb-3 font-medium text-gray-600"
            >
              {t('Email Address')}
            </label>
            <MdEmail className="absolute top-1/2 left-4 -translate-y-[-50%]" />
            <Input
              type="email"
              id="email"
              placeholder={t('E-mail')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="text-md mb-3 font-medium text-gray-600"
            >
              {t('Password')}
            </label>
            <TbLockPassword className="absolute top-1/2 left-4 -translate-y-[-50%]" />
            <Input
              type="password"
              id="password"
              placeholder={t('Password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <span className="mt-2 ml-2 block text-left">
            <Link
              to="Forget-Password"
              className="text-[11px] text-red-500 no-underline"
            >
              {t('Forgot Password ?')}
            </Link>
          </span>

          <Button
            disabled={!(email && password) || SignIn.isLoading || loading}
            type="submit"
            className="relative w-full rounded-lg bg-gradient-to-r from-red-600 via-[#f08b8b] to-red-600 bg-[length:200%_200%] bg-[position:100%_0] py-3 font-bold text-white shadow-[0px_20px_10px_-15px_rgba(133,189,215,0.88)] transition-all duration-1000 ease-in-out hover:bg-[position:0_0] active:scale-95"
          >
            {t('Sign In')}
            {SignIn.isLoading || (loading && <Loading />)}
          </Button>
          <Button
            variant="outline"
            onClick={handleGoogleSignIn}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-1 border-gray-200 bg-white px-4 py-2 text-center text-sm font-medium text-black shadow transition-all duration-200 ease-in"
          >
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="w-6"
            >
              <path
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                fill="#FFC107"
              ></path>
              <path
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                fill="#FF3D00"
              ></path>
              <path
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                fill="#4CAF50"
              ></path>
              <path
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                fill="#1976D2"
              ></path>
            </svg>
            {t('Continue with Google')}
          </Button>
        </form>
        <p className="mt-3 text-gray-600">
          {t("Don't have an account?")}
          <Link to="/sign-up" className="text-red">
            {t('Sign Up')}
          </Link>
        </p>
      </div>
    </div>
  );
}
