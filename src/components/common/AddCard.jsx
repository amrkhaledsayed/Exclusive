import { useState } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/Button';
import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '../ui/TextField';
import { LiaCcAmex } from 'react-icons/lia';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FaCcMastercard, FaCcPaypal, FaCcVisa, FaPlus } from 'react-icons/fa6';
import { useForm, Controller } from 'react-hook-form';
import { usePayment } from '@/Supabase/usePayment';
import { useTranslation } from 'react-i18next';
import { AppContext } from '@/common/context';

const AddCard = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('visa');
  const [cardNumber, setCardNumber] = useState('');

  function formatEvery4(value) {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 16);
    return digitsOnly.replace(/(.{4})/g, '$1 ').trim();
  }

  const { user } = React.useContext(AppContext);
  const { addCard } = usePayment(user?.id);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      NameOwner: '',
      CVV: '',
    },
  });

  const handleAddVisa = (data) => {
    const visaInfo = {
      user_id: user?.id,
      Card_number: data.cardNumber,
      Card_owner: data.NameOwner,
      Expiry_date: data.date ? data.date.format('MM/YY') : null,
      CVV2: data.CVV,
      Card_type: data.option,
    };

    addCard(visaInfo);
    setIsOpen(false);
    reset({ NameOwner: '', CVV: '', option: 'visa' });
    setCardNumber('');
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen} trapFocus={false}>
      <DrawerTrigger asChild>
        <Button variant="destructive" isFullWidth={true}>
          <FaPlus />
          {t('Add Payment Method')}
        </Button>
      </DrawerTrigger>

      <DrawerContent
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '20px',
          maxHeight: '95vh',
        }}
      >
        <div className="mx-auto w-full max-w-[530px]">
          <div className="sticky top-0 mx-auto mt-2 mb-4 h-1.5 w-12 rounded bg-gray-600" />

          <div className="space-y-4 p-4">
            <DrawerTitle className="text-[23px] font-medium">
              {t('Add Card')}
            </DrawerTitle>
            <DrawerDescription className="sr-only">
              {t('Add your payment card details')}
            </DrawerDescription>
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit(handleAddVisa)}
            >
              <div className="flex gap-3 flex-col sm:flex-row">
                <div className="flex flex-col items-start gap-2">
                  <TextField
                    className="w-full border-1 border-gray-300 bg-white text-[15px]"
                    placeholder={t('Name Owner')}
                    variant="outlined"
                    {...register('NameOwner', {
                      required: t('Name Owner is required.'),
                    })}
                  />
                  {errors.NameOwner && (
                    <p className="text-red text-[12px] text-nowrap">
                      {errors.NameOwner.message}
                    </p>
                  )}
                </div>
                <Controller
                  name="option"
                  control={control}
                  defaultValue="visa"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      className="h-[56px]"
                      value={field.value}
                      onValueChange={(val) => {
                        field.onChange(val);
                        setType(val);
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('Select Payment Card')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="visa">{t('Visa')}</SelectItem>
                          <SelectItem value="payPal">{t('PayPal')}</SelectItem>
                          <SelectItem value="mastercard">
                            {t('MasterCard')}
                          </SelectItem>
                          <SelectItem value="vodafonecash">
                            {t('Vodafone Cash')}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div>
                <div className="flex h-[56px] items-center justify-center overflow-hidden rounded-lg border border-gray-300 bg-[#fff] p-1 text-[18px]">
                  <Controller
                    name="cardNumber"
                    control={control}
                    rules={{ required: 'Card Number is required' }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder="0000 0000 0000 0000"
                        value={field.value || ''}
                        onChange={(e) => {
                          const formatted = formatEvery4(e.target.value);
                          field.onChange(formatted);
                        }}
                        inputProps={{ maxLength: 19 }}
                        className="h-full w-full rounded-[2px] border-1 border-gray-300 bg-white pl-2 text-sm font-semibold caret-orange-500 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    )}
                  />
                  <div className="flex items-center justify-center">
                    {type === 'visa' && <FaCcVisa size={30} />}
                    {type === 'payPal' && <FaCcPaypal size={30} />}
                    {type === 'mastercard' && <FaCcMastercard size={30} />}
                    {type === 'amex' && <LiaCcAmex size={30} />}
                  </div>
                </div>
                {errors.cardNumber && (
                  <p className="text-red text-[12px]">
                    {errors.cardNumber.message}
                  </p>
                )}
              </div>

              <div className="flex gap-3 flex-col sm:flex-row">
                <Controller
                  name="date"
                  control={control}
                  style={{ display: 'flex' }}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        value={field.value ?? null}
                        onChange={field.onChange}
                        format="MM/YY"
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            sx: {
                              display: 'flex',
                              flexDirection:
                                i18n.language === 'ar' ? 'row-reverse' : 'row',
                              '& .MuiInputAdornment-root': {
                                order: i18n.language === 'ar' ? -1 : 1,
                              },
                            },
                          },
                        }}
                      />
                    </LocalizationProvider>
                  )}
                />
                <div className="sm:w-1/3 w-full">
                  <TextField
                    className="h-[56px] w-full rounded-[2px] border-1 border-gray-300 bg-white text-[15px]"
                    placeholder={t('CVV')}
                    variant="outlined"
                    type="text"
                    {...register('CVV', {
                      required: t('CVV is required.'),
                      maxLength: 3,
                    })}
                    maxLength={3}
                  />
                  {errors.CVV && (
                    <p className="text-red text-[12px]">{errors.CVV.message}</p>
                  )}
                </div>
              </div>

              <Button type="submit" variant="destructive" className="w-full">
                <FaPlus />
                {t('Add Payment Card')}
              </Button>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
export default React.memo(AddCard);
