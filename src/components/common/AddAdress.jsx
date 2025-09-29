import { useState, useEffect } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '../ui/Button';
import { MdEdit, MdModeEditOutline } from 'react-icons/md';
import { IoClose, IoHomeOutline } from 'react-icons/io5';
import { IoMdAdd } from 'react-icons/io';
import { FaRegBuilding } from 'react-icons/fa6';
import { CiLocationOn, CiUser } from 'react-icons/ci';
import { GoPlus } from 'react-icons/go';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { FiPhone } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useAddress } from '@/Supabase/useAddress';
import { useTranslation } from 'react-i18next';

const AddressDrawer = ({ userId, mode = 'add', addressId = null }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [addressType, setAddressType] = useState('home');
  const { addressList, addAddress, editAddress } = useAddress(userId);

  const isEditMode = mode === 'edit';
  const address =
    isEditMode && addressList
      ? addressList.find((item) => item.id === addressId)
      : null;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      city: '',
      phoneNumber: '',
      fullAddress: '',
      Name: '',
    },
  });

  useEffect(() => {
    if (isEditMode && address) {
      setValue('city', address.city || '');
      setValue('phoneNumber', address.phoneNumber || '');
      setValue('fullAddress', address.Street_Address || '');
      setValue('Name', address.nameContact || '');
      setAddressType(address.type || 'home');
    }
  }, [isEditMode, address, setValue]);

  const submitData = (data) => {
    if (isEditMode) {
      editAddress({
        addressId,
        city: data.city,
        phoneNumber: data.phoneNumber,
        Street_Address: data.fullAddress,
        nameContact: data.Name,
        type: addressType,
      });
    } else {
      const newAddress = {
        user_id: userId,
        city: data.city,
        phoneNumber: data.phoneNumber,
        Street_Address: data.fullAddress,
        isDefault: false,
        nameContact: data.Name,
        type: addressType,
      };
      addAddress(newAddress);
      reset({ Name: '', city: '', phoneNumber: '', fullAddress: '' });
      setAddressType('home');
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
    if (!isEditMode) {
      reset({ Name: '', city: '', phoneNumber: '', fullAddress: '' });
      setAddressType('home');
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} trapFocus={false}>
      <DrawerTrigger asChild>
        {isEditMode ? (
          <Button
            variant="outline"
            size="sm"
            className="border-red-200 bg-transparent text-red-600 hover:bg-red-50"
          >
            <MdModeEditOutline className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            variant="destructive"
            className="flex w-full max-w-full items-center justify-center gap-2 rounded-md px-6 py-2 font-[300] text-white md:w-[200px]"
          >
            <GoPlus className="mr-2 h-4 w-4" />
            {t('Add Address')}
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent
        className="rounded-t-2xl"
        style={{
          backgroundColor: '#ffffff',
          padding: '20px',
          maxHeight: '95vh',
        }}
      >
        <div className="mx-auto w-full max-w-[530px]">
          <div className="sticky top-0 mx-auto mt-2 mb-4 h-1.5 w-12 rounded bg-gray-600" />
          <div className="border-b-1 border-b-red-100">
            <div className="flex items-center gap-3 pb-11">
              <div className="rounded-lg bg-red-50 p-2">
                {isEditMode ? (
                  <MdEdit className="h-6 w-6 text-red-500" />
                ) : (
                  <GoPlus className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <DrawerTitle className="font-heading text-2xl text-red-500">
                  {isEditMode ? t('Edit Address') : t('Add New Address')}
                </DrawerTitle>
                <DrawerDescription className="text-muted-foreground mt-1">
                  {t('Fill in the details for your new address')}
                </DrawerDescription>
              </div>
            </div>
          </div>
          <div>
            <form
              className="mt-6 flex flex-col gap-5 text-gray-600"
              onSubmit={handleSubmit(submitData)}
            >
              <div className="mt-8 flex flex-col gap-3">
                <label htmlFor="address-type">{t('Address Type')}</label>

                <RadioGroup.Root
                  id="address-type"
                  className="flex gap-3"
                  value={addressType}
                  onValueChange={setAddressType}
                >
                  <div className="flex items-center gap-2">
                    <RadioGroup.Item
                      value="home"
                      id="home-type"
                      className="h-3 w-3 rounded-full p-1 data-[state=checked]:bg-blue-500"
                    />
                    <label
                      htmlFor="home-type"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <IoHomeOutline className="h-4 w-4 text-blue-500" />
                      {t('Home')}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroup.Item
                      value="work"
                      id="work-type"
                      className="h-3 w-3 rounded-full p-1 data-[state=checked]:bg-green-500"
                    />
                    <label
                      htmlFor="work-type"
                      className="flex cursor-pointer items-center gap-2"
                    >
                      <FaRegBuilding className="h-4 w-4 text-green-500" />
                      {t('Work')}
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroup.Item
                      value="other"
                      id="other-type"
                      className="h-3 w-3 rounded-full p-1 data-[state=checked]:bg-gray-500"
                    />
                    <label
                      htmlFor="other-type"
                      className="flex cursor-pointer items-center gap-2 text-gray-500"
                    >
                      <CiLocationOn className="h-4 w-4 text-gray-500" />
                      {t('Other')}
                    </label>
                  </div>
                </RadioGroup.Root>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">{t('Contact Name*')}</label>
                <div className="relative">
                  <CiUser className="absolute top-2 left-3" size={20} />
                  <Input
                    className="pl-9"
                    id="name"
                    placeholder={t('Contact Name')}
                    {...register('Name', {
                      required: t('Contact Name is required.'),
                    })}
                  />
                </div>
                {errors.Name && (
                  <p className="text-red text-[12px]">{errors.Name.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="fullAddress">{t('Full Address*')}</label>
                <div className="relative">
                  <CiLocationOn className="absolute top-2 left-3" size={20} />
                  <Textarea
                    id="fullAddress"
                    className="pl-9"
                    placeholder={t(
                      'Enter complete address including street, building number, etc.'
                    )}
                    {...register('fullAddress', {
                      required: t('Full Address is required.'),
                    })}
                  />
                </div>
                {errors.fullAddress && (
                  <p className="text-red text-[12px]">
                    {errors.fullAddress.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="city">{t('City/Location*')}</label>
                <div className="relative">
                  <CiLocationOn className="absolute top-2 left-3" size={20} />
                  <Input
                    id="city"
                    className="pl-9"
                    placeholder={t('Enter City Or Location')}
                    {...register('city', { required: t('City is required.') })}
                  />
                </div>
                {errors.city && (
                  <p className="text-red text-[12px]">{errors.city.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="phone">{t('Phone Number*')}</label>
                <div className="relative">
                  <FiPhone className="absolute top-2 left-3" size={20} />
                  <Input
                    id="phone"
                    className="pl-9"
                    placeholder={t('Enter Phone Number')}
                    {...register('phoneNumber', {
                      required: t('Phone Number is required.'),
                    })}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-red text-[12px]">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" variant="destructive">
                  {isEditMode ? (
                    <>
                      <MdEdit />
                      {t('Edit Address')}
                    </>
                  ) : (
                    <>
                      <IoMdAdd />
                      {t('Add Address')}
                    </>
                  )}
                </Button>

                <Button type="button" variant="outline" onClick={handleCancel}>
                  <IoClose />
                  {t('Cancel')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default React.memo(AddressDrawer);
