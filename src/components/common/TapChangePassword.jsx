import { useTranslation } from 'react-i18next';
import { IoLockClosedOutline } from 'react-icons/io5';
import { MdError, MdOutlineSecurity } from 'react-icons/md';
import { InputPassword } from '../ui/inputPassword';
import { Button } from '../ui/Button';
import { FaSave } from 'react-icons/fa';
import React, { useState } from 'react';
import { Loading } from '../ui/Loading';

const TapChangePassword = ({ state, dispatch, handlePasswordUpdate }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    try {
      await handlePasswordUpdate();

      dispatch({ type: 'RESET' });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pb-6">
      <div className="border-b-1 border-b-red-100">
        <div className="flex items-start gap-5 px-5 pt-5 pb-5 sm:flex-row sm:items-center md:gap-2 md:px-11 md:py-6 md:pb-11">
          <div className="rounded-lg bg-red-50 p-2">
            <IoLockClosedOutline className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-heading text-xl text-red-500 sm:text-2xl">
              {t('Change Password')}
            </h3>
            <p className="text-muted-foreground md:text-body-m mt-1 text-sm">
              {t('Update your account password for better security')}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-5 pt-5 pb-5 md:px-11 md:py-6 md:pb-11">
        <div className="border-1-red-100 flex items-start gap-3 rounded-[4px] border-1 bg-red-50 px-2 py-1.5">
          <MdOutlineSecurity className="mt-0.5 h-[2rem] w-[2rem] flex-none text-red-500" />
          <div>
            <h4 className="mb-1 font-medium text-red-800">
              {t('Password Security Tips')}
            </h4>
            <p className="text-sm text-red-700">
              {t(
                'Use a strong password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.'
              )}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 flex w-full max-w-full flex-col gap-4 px-5 pt-5 pb-5 md:px-11 md:py-6 md:pb-11">
        <div className="flex flex-col space-y-5">
          <div className="flex w-full flex-col space-y-2">
            <label
              htmlFor="current-password"
              className="text-foreground text-sm font-medium"
            >
              {t('Current Password')}
            </label>
            <div className="relative">
              <IoLockClosedOutline className="text-muted-foreground ltr:left-3 absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rtl:right-3" />
              <InputPassword
                className="w-full ltr:pl-8 rtl:pr-8"
                placeholder={t('Current Password')}
                id="current-password"
                value={state.currentPassword}
                onChange={(e) =>
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'currentPassword',
                    value: e.target.value,
                  })
                }
              />
            </div>
            {state.currentPasswordError && state.currentPassword.length > 0 && (
              <div className="flex items-center gap-1.5">
                <MdError className="text-red h-4 w-4" />
                <p className="text-red text-[12px]">
                  {t('The password doesn’t match the original password')}
                </p>
              </div>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="new-password"
              className="text-foreground text-sm font-medium"
            >
              {t('New Password')}
            </label>
            <div className="relative">
              <IoLockClosedOutline className="text-muted-foreground ltr:left-3 absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rtl:right-3" />
              <InputPassword
                className="w-full ltr:pl-8 rtl:pr-8"
                placeholder={t('New Password')}
                id="new-password"
                value={state.newPassword}
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'newPassword',
                    value: e.target.value,
                  });
                }}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="confirm-password"
              className="text-foreground text-sm font-medium"
            >
              {t('Confirm New Password')}
            </label>
            <div className="relative">
              <IoLockClosedOutline className="text-muted-foreground ltr:left-3 absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rtl:right-3" />
              <InputPassword
                id="confirm-password"
                className="w-full ltr:pl-8 rtl:pr-8"
                placeholder={t('Confirm New Password')}
                onChange={(e) => {
                  dispatch({
                    type: 'SET_FIELD',
                    field: 'confirmPassword',
                    value: e.target.value,
                  });
                }}
                value={state.confirmPassword}
              />
            </div>
            {state.confirmPasswordError && state.confirmPassword.length > 0 && (
              <div className="flex items-center gap-1.5">
                <MdError className="text-red h-4 w-4" />
                <p className="text-red text-[12px]">
                  {t(
                    'The password confirmation doesn’t match the new password'
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex w-full gap-7 self-end sm:flex-row">
          <Button variant="outline">{t('Cancel')}</Button>
          <Button
            variant="destructive"
            className="flex w-full items-center justify-center gap-2 rounded-md px-6 font-[300] text-white sm:w-fit"
            size="lg"
            disabled={
              loading ||
              state.confirmPasswordError ||
              state.currentPasswordError
            }
            onClick={onClick}
          >
            <FaSave className="text-white" />
            {t('Save Change')}
            {loading && <Loading />}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default React.memo(TapChangePassword);
