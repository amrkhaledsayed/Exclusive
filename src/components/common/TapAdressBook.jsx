import { useTranslation } from 'react-i18next';
import {
  FaLocationDot,
  FaMapLocationDot,
  FaRegBuilding,
  FaRegHeart,
} from 'react-icons/fa6';
import { AddAdress } from './AddAdress';
import { Card, CardContent } from '@mui/material';
import clsx from 'clsx';
import { CiLocationOn } from 'react-icons/ci';
import { IoHomeOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt } from 'react-icons/fa';
import { EditAddress } from './EditAddress';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { Button } from '../ui/Button';
import React from 'react';
import { MapPinHouse } from 'lucide-react';

const TapAdressBook = ({
  userId,
  addressList,
  deleteAddress,
  handelDefault,
}) => {
  const { t } = useTranslation();
  if (!addressList) {
    return (
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-5 py-20">
        <div className="w-fit rounded-[14px] border-1 border-gray-300 p-5">
          <MapPinHouse size="3rem" className="text-red" />
        </div>
        <p className="text-lg font-semibold">{t(`No Address added yet`)}</p>
      </div>
    );
  }
  return (
    <>
      <div className="border-b-1 border-b-red-100">
        <div className="flex flex-wrap items-center justify-between gap-5 px-5 pt-5 pb-5 sm:flex-row sm:items-center md:gap-2 md:px-11 md:py-6 md:pb-11">
          <div className="flex items-start gap-3 sm:items-center">
            <div className="rounded-lg bg-red-50 p-2">
              <FaLocationDot className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-red-500 sm:text-2xl">
                {t('Address Book')}
              </h3>
              <p className="text-muted-foreground md:text-body-m mt-1 text-sm">
                {t('Manage your saved addresses and contact information')}
              </p>
            </div>
          </div>
          <AddAdress userId={userId} className="w-full" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 px-5 pt-5 pb-5 md:px-11 md:py-6 md:pb-11">
        {addressList?.map((order, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              key={index}
              style={{ borderRadius: '8px' }}
              onClick={() => {
                handelDefault(order.id);
              }}
              className={clsx(
                'rounded-2xl border-red-200 bg-red-50/30 transition-colors duration-200 hover:bg-red-50/50',
                { 'border-2 border-red-100': order.isDefault }
              )}
            >
              <CardContent className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-5 sm:items-center">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="text-muted-foreground text-lg font-semibold">
                        {order.nameContact}
                      </h4>
                      <div className="flex items-center gap-5">
                        {order.type === 'home' && (
                          <div className="flex items-center gap-2 rounded-full p-1 text-blue-500">
                            <IoHomeOutline size={15} />
                            <p>{t('Home')}</p>
                          </div>
                        )}
                        {order.type === 'work' && (
                          <div className="flex items-center gap-2 rounded-full p-1 text-green-500">
                            <FaRegBuilding size={15} />
                            <p>{t('Work')}</p>
                          </div>
                        )}
                        {order.type === 'other' && (
                          <div className="flex items-center gap-2 rounded-full p-1 text-gray-500">
                            <CiLocationOn size={15} />
                            <p>{t('Other')}</p>
                          </div>
                        )}
                        {order.isDefault && (
                          <div className="flex items-center gap-2 rounded-full bg-red-100 px-2 text-red-500">
                            <FaRegHeart size={15} />
                            <p>{t('Default')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-muted-foreground flex flex-col items-start gap-4">
                      <div className="flex items-start gap-2">
                        <FaMapLocationDot className="h-4 w-4" />
                        <div className="flex flex-col">
                          <span>{order.city}</span>
                          <span>{order.Street_Address}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaPhoneAlt className="h-4 w-4" />
                        <span className="font-mono">{order?.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <EditAddress userId={userId} addressId={order?.id} />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteAddress(order?.id)}
                      className="border-red-200 bg-transparent text-red-600 hover:bg-red-50"
                    >
                      <RiDeleteBin5Fill className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
};
export default React.memo(TapAdressBook);
