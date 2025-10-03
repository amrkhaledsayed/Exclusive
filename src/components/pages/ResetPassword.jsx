import { Check, Lock, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { IoLockClosedOutline } from 'react-icons/io5';
import { InputPassword } from '../ui/inputPassword';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from 'react';
import supabase from '@/Supabase/supabase-client';
import toast from 'react-hot-toast';
import { AppContext } from '@/common/context';

export const ResetPassword = () => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmCapital, setConfirmCapital] = useState(false);
  const [confirmNumber, setConfirmNumber] = useState(false);
  const [confirmLength, setConfirmLength] = useState(false);
  const [showError, setShowError] = useState(false);
  const [match, setMatch] = useState(false);
  const { user } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => {
    let value = e.target.value;
    /[A-Z]/.test(value) ? setConfirmCapital(true) : setConfirmCapital(false);
    /[0-9]/.test(value) ? setConfirmNumber(true) : setConfirmNumber(false);
    value.length > 8 ? setConfirmLength(true) : setConfirmLength(false);
    setNewPassword(value);
    value.length > 0 ? setShowError(true) : setShowError(false);
  };
  const onChangeConfirm = (e) => {
    let value = e.target.value;
    value === newPassword ? setMatch(true) : setMatch(false);
    setConfirmPassword(value);
  };
  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setSessionReady(true);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
  const handlePasswordUpdate = async () => {
    setLoading(true);
    if (!sessionReady) {
      toast.error('Session not ready. Please use the link from your email.');
      return;
    }
    try {
      if (newPassword !== confirmPassword) return;

      const { error } = await supabase.auth.updateUser({
        password: confirmPassword,
      });
      if (error) throw new Error(error.message);
      else {
        await supabase
          .from('profiles')
          .update({ password: confirmPassword })
          .eq('id', user?.id);
        toast.success(t('Update Password successfully'));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[80px]">
      <div className="mx-auto flex w-[400px] max-w-full flex-col place-items-center items-center justify-center gap-4 rounded-[7px] border-1 border-gray-100 bg-white px-5 py-6 drop-shadow-md">
        <Lock className="text-red z-10 rounded-full bg-red-50 p-3" size={50} />
        <p className="text-xl font-bold">{t('Create New Password')}</p>
        <p className="text-sm text-gray-600">
          {t('Choose a strong password to secure your account')}
        </p>
        <form
          onSubmit={handlePasswordUpdate}
          className="flex w-full flex-col items-center gap-8"
        >
          <div className="flex w-full flex-col space-y-2">
            <label className="text-foreground text-sm font-medium">
              {t('New Password')}
            </label>
            <div className="relative">
              <IoLockClosedOutline className="text-muted-foreground lrt:left-3 absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rtl:right-3" />
              <InputPassword
                className="w-full ltr:pl-8 rtl:pr-8"
                placeholder={t('New Password')}
                value={newPassword}
                onChange={onChange}
              />
            </div>
            {showError && (
              <>
                {!confirmCapital && (
                  <div className="text-red flex items-center gap-1">
                    <X size={15} />
                    <p className="text-[12px]">{t('One uppercase letter')}</p>
                  </div>
                )}
                {!confirmNumber && (
                  <div className="text-red flex items-center gap-1">
                    <X size={15} />
                    <p className="text-[12px]">{t('One number')}</p>
                  </div>
                )}
                {!confirmLength && (
                  <div className="text-red flex items-center gap-1">
                    <X size={15} />
                    <p className="text-[12px]">{t('At least 8 characters')}</p>
                  </div>
                )}
              </>
            )}
            {confirmCapital && confirmNumber && confirmLength && (
              <div className="flex items-center gap-1 text-green-500">
                <Check size={15} />
                <p className="text-[12px]">
                  {t('Password meets all requirements')}
                </p>
              </div>
            )}
          </div>
          <div className="flex w-full flex-col space-y-2">
            <label className="text-foreground text-sm font-medium">
              {t('Confirm New Password')}
            </label>
            <div className="relative">
              <IoLockClosedOutline className="text-muted-foreground lrt:left-3 absolute top-1/2 h-4 w-4 -translate-y-1/2 transform rtl:right-3" />
              <InputPassword
                className="w-full ltr:pl-8 rtl:pr-8"
                value={confirmPassword}
                onChange={onChangeConfirm}
                placeholder={t('Confirm New Password')}
              />
            </div>
            {confirmPassword.length > 0 && (
              <>
                {match ? (
                  <div className="flex items-center gap-1 text-green-500">
                    <Check size={15} />
                    <p className="text-[12px]">{t('Passwords match')}</p>
                  </div>
                ) : (
                  <div className="text-red flex items-center gap-1">
                    <X size={15} />
                    <p className="text-[12px]">{t('Passwords do not match')}</p>
                  </div>
                )}
              </>
            )}
          </div>

          <Button
            variant="destructive"
            loading={loading}
            disabled={
              !(
                confirmCapital &&
                confirmNumber &&
                confirmLength &&
                confirmPassword &&
                match
              )
            }
            style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '16px',
              fontWeight: 400,
              width: '100%',
            }}
            onClick={handlePasswordUpdate}
            isFullWidth={true}
            type="button"
            className="flex items-center justify-center gap-3.5 text-[20px]"
          >
            {t('Update Password')}
          </Button>
          <Link className="w-full" to=".." aria-label={t('Back to EmailEntry')}>
            <Button
              isFullWidth={true}
              className="flex w-full items-center justify-center gap-3.5 text-[20px] rtl:flex-row-reverse"
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
              {t('Back to EmailEntry')}
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
