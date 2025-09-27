import { useTranslation } from 'react-i18next';
import { CiSettings } from 'react-icons/ci';
import { FaRegUser } from 'react-icons/fa6';
import { Input } from '../ui/input';
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineSecurity,
} from 'react-icons/md';
import { Button } from '../ui/Button';
import { FaSave } from 'react-icons/fa';
import React, { useState } from 'react';
import { Loading } from '../ui/Loading';

const TapAccount = ({
  setFirstName,
  firstName,
  massageOTP,
  setLastName,
  email,
  handleSendOTP,
  phone,
  setPhone,
  setEmail,
  changeOther,
  lastName,
}) => {
  const [loading, setLoading] = useState(false);
  const handelSave = () => {
    setLoading(true);
    setTimeout(() => {
      changeOther();
      setLoading(false);
    }, 3000);
  };
  const handelVerify = () => {
    setLoading(true);
    setTimeout(() => {
      handleSendOTP();
      setLoading(false);
    }, 3000);
  };
  const { t } = useTranslation();
  return (
    <div>
      <div className="border-b-1 border-b-red-100">
        <div className="flex items-start gap-5 px-5 pt-5 pb-5 sm:flex-row md:items-center md:gap-2 md:px-11 md:py-6 md:pb-11">
          <CiSettings
            className="text-red flex-none rounded-md bg-red-50 p-1"
            size={40}
          />
          <div className="flex flex-col gap-2">
            <p className="font-heading text-xl text-red-500 sm:text-2xl">
              {t('Edit Your Profile')}
            </p>
            <p className="text-muted-foreground md:text-body-m mt-1 text-sm">
              {t('Update your personal information and contact details')}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-5 pt-5 pb-5 md:px-11 md:py-6 md:pb-11">
        <div className="flex flex-col gap-[30px] border-b-1 border-b-red-100 pb-8">
          <div className="flex items-center gap-1.5">
            <p className="font-heading text-foreground text-lg font-semibold">
              {t('Personal Information')}
            </p>
            <p className="text-[12px] text-gray-300">{t('Required')}</p>
          </div>
          <div className="flex flex-col justify-between gap-3 sm:flex-row">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <FaRegUser />
                <label htmlFor="firstName" className="text-[16px]">
                  {t('First Name')}
                </label>
              </div>
              <Input
                id="firstName"
                className="w-full md:w-[300px]"
                placeholder={t('First Name')}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1">
                <FaRegUser />
                <label htmlFor="lastName" className="text-[16px]">
                  {t('Last Name')}
                </label>
              </div>
              <Input
                id="lastName"
                className="w-full md:w-[300px]"
                placeholder={t('Last Name')}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[30px] border-b-1 border-b-red-100 pb-6">
          <h3 className="font-heading text-foreground text-lg font-semibold">
            {t('Contact Information')}
          </h3>
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
            <div className="flex w-full flex-col gap-1.5 md:w-fit">
              <div className="flex items-center gap-1">
                <MdOutlineEmail size={20} />
                <label
                  htmlFor="email"
                  className="text-foreground text-sm font-medium"
                >
                  {t('Email Address')}
                </label>
                {massageOTP && (
                  <p className="ml-3 rounded-[6px] bg-green-600 px-2 py-0.5 text-[12px] text-white">
                    {t('Verification required')}
                  </p>
                )}
              </div>
              <div className="w-full">
                <Input
                  id="email"
                  className="w-full md:w-[300px]"
                  placeholder={t('Email')}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-1.5 md:w-fit">
              <div className="flex items-center gap-1">
                <MdOutlineLocalPhone size={20} />
                <label htmlFor="phone" className="text-[16px]">
                  {t('Phone')}
                </label>
              </div>
              <Input
                id="phone"
                className="w-full max-w-full md:w-[300px]"
                type="text"
                placeholder={t('Phone Number')}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </div>
          </div>
          {massageOTP && (
            <div className="flex items-center gap-1.5 rounded-[6px] border-1 px-3 py-2 text-[15px]">
              <MdOutlineSecurity className="text-red" size={30} />
              <p>
                {t(
                  'The email has been changed. A verification code will be sent to confirm the changes.'
                )}
              </p>
            </div>
          )}
        </div>
        <div className="flex w-full gap-3 self-end md:gap-8">
          <Button variant="outline">{t('Cancel')}</Button>
          {massageOTP ? (
            <Button
              variant="destructive"
              className="w-full max-w-full md:max-w-[200px]"
              onClick={handelVerify}
              disabled={loading}
            >
              {loading && <Loading />}
              {t('Verify your email')}
            </Button>
          ) : (
            <Button
              onClick={handelSave}
              disabled={loading}
              variant="destructive"
              className="md:max-w-[200px]items-center flex w-full max-w-full justify-center gap-2 rounded-md px-6 font-[300] text-white"
              size="lg"
            >
              {loading && <Loading />}
              <FaSave className="text-white" />
              {t('Save Change')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default React.memo(TapAccount);
