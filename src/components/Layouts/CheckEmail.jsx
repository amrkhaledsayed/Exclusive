import {
  MdKeyboardBackspace,
  MdOutlineSecurity,
  MdOutlineVerified,
} from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as React from 'react';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import { Button } from '../ui/Button';
import supabase from '@/Supabase/supabase-client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Loading } from '../ui/Loading';

export const CheckEmail = () => {
  const [otpValues, setOtpValues] = useState();
  const [loading, setLoading] = useState(false);
  const navigator = useNavigate();
  const location = useLocation();
  const { oldEmail } = location.state || {};
  const { t } = useTranslation();
  const verifyOTP = async () => {
    setLoading(true);

    const { error: errorOTP } = await supabase.auth.verifyOtp({
      email: oldEmail,
      token: otpValues,
      type: 'email_change',
    });
    if (errorOTP) return { success: false, error: errorOTP.message };
    else {
      setTimeout(() => {
        setLoading(false);
        toast.success(t('Email updated successfully'));
        navigator('/');
      }, 2000);
    }
  };
  const num = oldEmail?.match(/^(.{2})([A-Za-z0-9]+)(?=@)/);
  const email = oldEmail?.replace(
    /^(.{2})([A-Za-z0-9]+)(?=@)/,
    `$1` + '*'.repeat(num?.[2].length)
  );

  return (
    <div className="pt-[80px]">
      <div className="mx-auto flex max-w-[600px] flex-col place-items-center items-center justify-center gap-4 rounded-[7px] border-1 border-gray-300 bg-white px-5 py-6">
        <MdOutlineSecurity
          className="text-red z-10 rounded-full bg-red-50 p-3"
          size={50}
        />
        <p className="text-lg font-medium">{t('Verify your identity')}</p>
        <p>
          {t('A verification code has been sent to')} {email}
        </p>
        <p>{t('Please enter the 6-digit verification code')}</p>
        <form
          onSubmit={verifyOTP}
          dir="ltr"
          className="flex w-full flex-col items-center gap-8"
        >
          <OneTimePasswordField.Root
            className="flex flex-nowrap gap-2"
            name="otp"
            value={otpValues}
            onAutoSubmit={verifyOTP}
            dir="ltr"
            onValueChange={setOtpValues}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <OneTimePasswordField.Input
                key={i}
                dir="ltr"
                className="box-border inline-flex h-[40px] w-10 appearance-none items-center justify-center rounded bg-white px-4 text-[15px] leading-none text-black shadow drop-shadow-2xl outline-none hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              />
            ))}
            <OneTimePasswordField.HiddenInput />
          </OneTimePasswordField.Root>
          <Button
            variant="destructive"
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: 400,
              width: '100%',
            }}
            onClick={verifyOTP}
            isFullWidth={true}
            type="button"
            disable={loading}
            className="flex items-center justify-center gap-3.5 text-[20px]"
          >
            <MdOutlineVerified size={30} />
            {t('Verification code')}
            {loading && <Loading />}
          </Button>
        </form>
        <Link className="w-full" to="/Account">
          <Button
            isFullWidth={true}
            className="flex w-full items-center justify-center gap-3.5 text-[20px]"
            style={{
              display: 'flex',
              gap: '15px',
              fontSize: '16px',
              justifyContent: 'center',
              alignItems: 'center',
              fontWeight: 400,
            }}
            variant="outline"
          >
            <MdKeyboardBackspace size={30} />
            {t('Back to Edit')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
