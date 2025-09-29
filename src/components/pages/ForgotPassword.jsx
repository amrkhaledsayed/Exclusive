import { useTranslation } from 'react-i18next';
import { Input } from '../ui/input';
import { MdEmail } from 'react-icons/md';
import { ArrowLeft, Mail, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import supabase from '@/Supabase/supabase-client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ForgetPassword = () => {
  const { t } = useTranslation();

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const submitData = async (data) => {
    const { data: checkUser } = await supabase.from('profiles').select('email');

    const confirm = checkUser.find((user) => user.email === data.email);
    if (!confirm) {
      toast.error('Email not registered');
      setSuccess(false);
      setError(true);
      return;
    }
    setError(false);

    const { error: errorLink } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${window.location.href}/reset-password`,
      }
    );

    if (errorLink) {
      toast.error(errorLink.message);
    } else {
      setError(false);

      toast.success('Check your email for the reset link!');
      setSuccess(true);
    }
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <div className="mx-auto pt-[80px]">
      <div className="flex h-full w-full max-w-[400px] flex-col items-center justify-center rounded-[8px] border-[2px] border-white bg-gradient-to-t from-[#f4f7fb] to-white p-6 shadow-[0px_30px_30px_-20px_rgba(133,189,215,0.88)]">
        <div className="mb-10 flex flex-col items-center gap-2 text-center">
          <Mail
            className="text-red h-[50px] w-[50px] rounded-full bg-red-50 p-3"
            size={30}
          />
          <h3 className="text-center text-[26px] font-extrabold text-red-600 md:text-[30px]">
            {t('Reset Password')}
          </h3>
          <p>
            {t(
              "Enter your email address and we'll send you a Link to reset your password."
            )}
          </p>
        </div>
        <form
          className="mt-5 flex w-full flex-col gap-4 self-start"
          onSubmit={handleSubmit(submitData)}
        >
          <div className="relative">
            {success && (
              <div className="mx-auto mb-2 w-fit rounded-[6px] bg-green-400/70 p-2 text-center text-white">
                <p>{t('Check your email for the reset link!')}</p>
              </div>
            )}
            {error && (
              <div className="mx-auto mb-2 flex w-fit items-center gap-0.5 rounded-[6px] bg-red-400/70 p-2 text-center text-white">
                <X />
                <p>{t('No account found with this email')}</p>
              </div>
            )}
            <p className="text-md mb-3 font-medium text-gray-600">
              {t('Email Address')}
            </p>
            <div className="relative">
              <MdEmail className="absolute top-1/2 left-4 translate-y-[-50%]" />
              <Input
                {...register('email', { required: true })}
                type="email"
                placeholder={t('E-mail')}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {t('Please Enter Email')}
              </p>
            )}
          </div>
          <Button variant="destructive">{t('Send Reset Link')}</Button>
          <Link to=".." className="w-full">
            <Button
              variant="outline"
              className="flex w-full rtl:flex-row-reverse"
            >
              <ArrowLeft />
              {t('Go To Back')}
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
export default React.memo(ForgetPassword);
