import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { CiLocationOn, CiLock } from 'react-icons/ci';
import { FiUser } from 'react-icons/fi';
import { MdPayment } from 'react-icons/md';

export const SwitchButtonsManage = ({ activeTab, setActiveTab }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full rounded-[8px] border-1 border-gray-100 bg-white p-5 drop-shadow-xl lg:w-[334px]">
      <div className="flex w-full flex-col gap-4">
        <p className="text-[16px] font-medium">{t('Manage My Account')}</p>
        <div className="flex w-full flex-col items-start gap-5 rounded-md pl-5">
          <button
            onClick={() => setActiveTab('myAccount')}
            className={clsx(
              'flex w-full items-center gap-1.5 py-2 text-[16px] font-normal text-gray-400 transition-all ltr:rounded-tr-xl ltr:rounded-br-xl ltr:pl-2 rtl:rounded-tl-xl rtl:rounded-bl-xl rtl:pr-2',
              {
                'ltr:border-l-red rtl:border-r-red text-red bg-gray-100 ltr:border-l-8 rtl:border-r-8':
                  activeTab === 'myAccount',
              }
            )}
          >
            <FiUser size={20} />
            {t('My Profile')}
          </button>
          <button
            onClick={() => setActiveTab('changepassword')}
            className={clsx(
              'flex w-full items-center gap-1.5 py-2 text-[16px] font-normal text-gray-400 transition-all ltr:rounded-tr-xl ltr:rounded-br-xl ltr:pl-2 rtl:rounded-tl-xl rtl:rounded-bl-xl rtl:pr-2',
              {
                'ltr:border-l-red rtl:border-r-red text-red bg-gray-100 ltr:border-l-8 rtl:border-r-8':
                  activeTab === 'changepassword',
              }
            )}
          >
            <CiLock size={20} />
            {t('Change Password')}
          </button>
          <button
            onClick={() => setActiveTab('AddressBook')}
            className={clsx(
              'flex w-full items-center gap-1.5 py-2 text-[16px] font-normal text-gray-400 transition-all ltr:rounded-tr-xl ltr:rounded-br-xl ltr:pl-2 rtl:rounded-tl-xl rtl:rounded-bl-xl rtl:pr-2',
              {
                'ltr:border-l-red rtl:border-r-red text-red bg-gray-100 ltr:border-l-8 rtl:border-r-8':
                  activeTab === 'AddressBook',
              }
            )}
          >
            <CiLocationOn size={20} />
            {t('Address Book')}
          </button>
          <button
            onClick={() => setActiveTab('MyPaymentOptions')}
            className={clsx(
              'flex w-full items-center gap-1.5 py-2 text-[16px] font-normal text-gray-400 transition-all ltr:rounded-tr-xl ltr:rounded-br-xl ltr:pl-2 rtl:rounded-tl-xl rtl:rounded-bl-xl rtl:pr-2',
              {
                'ltr:border-l-red rtl:border-r-red text-red bg-gray-100 ltr:border-l-8 rtl:border-r-8':
                  activeTab === 'MyPaymentOptions',
              }
            )}
          >
            <MdPayment />
            {t('My Payment Options')}
          </button>
        </div>
      </div>
    </div>
  );
};
