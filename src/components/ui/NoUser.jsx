import React from 'react';
import { FaLock } from 'react-icons/fa6';
import { Button } from './Button';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NoUser = ({ title, message, to, btn }) => {
  const { t } = useTranslation();
  return (
    <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-5 py-20">
      <div className="w-fit rounded-[14px] border-1 border-gray-300 p-5">
        <FaLock size="3rem" className="text-red" />
      </div>
      <div className="text-center text-gray-500">
        <p className="text-lg font-semibold">{t(`${title}`)}</p>
        <p className="mb-3 text-sm">{t(`${message}`)}</p>
        <Link to={to}>
          <Button variant="destructive" className="h-[30px]">
            {t(`${btn}`)}
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default React.memo(NoUser);
