import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

import { useEffect } from 'react';
import { usePayment } from '@/Supabase/usePayment';
import { IoIosArrowForward } from 'react-icons/io';

import supabase from '@/Supabase/supabase-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { useAddress } from '@/Supabase/useAddress';
import SwitchButtonsManage from '../common/SwitchButtonsManage';
import TapAccount from '../common/TapAccount';
import TapChangePassword from '../common/TapChangePassword';
import TapAdressBook from '../common/TapAdressBook';
import TapPayement from '../common/TapPayement';
import NoUser from '../ui/NoUser';
import { AppContext } from '@/utils/context';

const initialState = {
  currentPassword: '',
  currentPasswordError: false,
  confirmPasswordError: false,
  newPassword: '',
  confirmPassword: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, [action.error]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const Account = () => {
  const { t } = useTranslation();
  const { user, data, updateEmail, updateName } = React.useContext(AppContext);

  const { addressList, handelDefault, deleteAddress } = useAddress(user?.id);
  const [firstName, setFirstName] = useState(user?.user_metadata?.first_name);
  const { CardsList } = usePayment(user?.id);
  const [email, setEmail] = useState(user?.email);
  const [massageOTP, setMassageOTP] = useState(false);
  const [lastName, setLastName] = useState(user?.user_metadata?.last_name);
  const [phone, setPhone] = useState(data?.phoneNumber);
  const [activeTab, setActiveTab] = useState('myAccount');
  const oldEmail = user?.email;

  useEffect(() => {
    setFirstName(
      user?.user_metadata?.first_name ||
        user?.user_metadata?.full_name?.split(' ')[0] ||
        ''
    );

    setLastName(
      user?.user_metadata?.last_name ||
        user?.user_metadata?.full_name?.split(' ')[1] ||
        ''
    );

    setEmail(user?.email || '');
    setPhone(data?.phoneNumber || '');
  }, [user, data]);

  useEffect(() => {
    email === user?.email ? setMassageOTP(false) : setMassageOTP(true);
  }, [email]);

  const changeOther = () => {
    updateName({
      firstName,
      lastName,
      phone,
    });
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.currentPassword !== data?.password) {
      dispatch({
        type: 'SET_ERRORS',
        error: 'currentPasswordError',
        value: true,
      });
    } else {
      dispatch({
        type: 'SET_ERRORS',
        error: 'currentPasswordError',
        value: false,
      });
    }
    if (state.newPassword !== state.confirmPassword) {
      dispatch({
        type: 'SET_ERRORS',
        error: 'confirmPasswordError',
        value: true,
      });
    } else {
      dispatch({
        type: 'SET_ERRORS',
        error: 'confirmPasswordError',
        value: false,
      });
    }
  }, [
    state.currentPassword,
    state.confirmPassword,
    state.newPassword,
    data?.password,
  ]);

  const handleSendOTP = async () => {
    await updateEmail({ email, oldEmail });
    if (firstName || lastName || phone) changeOther();
  };

  const handlePasswordUpdate = async () => {
    if (state.currentPasswordError) {
      toast.error(t('Incorrect Password Error'));
      return;
    }
    if (state.newPassword === state.confirmPassword) {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email,
        password: state.currentPassword,
      });

      if (signInError) {
        toast.error(t('Incorrect current password'));
        return;
      }
      const { error } = await supabase.auth.updateUser({
        password: state.confirmPassword,
      });
      if (error) throw new Error(error.message);
      else {
        await supabase
          .from('profiles')
          .update({ password: state.confirmPassword })
          .eq('id', user?.id);
        dispatch({ type: 'RESET' });
      }
    }
  };
  return (
    <>
      {!user ? (
        <NoUser
          title="You are not logged in"
          message="Please log in to view your profile."
          to="/sign-in"
          btn="Log in"
        />
      ) : (
        <div className="w-full mx-auto max-w-[1200px] px-4 pt-[80px]">
          <div className="mb-8 flex items-center text-[14px] font-normal">
            <Link to="/" className="text-gray-500" aria-label={t('Home')}>
              {t('Home')}
            </Link>
            <IoIosArrowForward />
            <p className="ml-1 text-gray-700">{t('Account')}</p>
          </div>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row">
            <SwitchButtonsManage
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-full items-start rounded-[18px] bg-white shadow drop-shadow-xl"
            >
              {activeTab === 'myAccount' && (
                <TapAccount
                  setFirstName={setFirstName}
                  firstName={firstName}
                  lastName={lastName}
                  massageOTP={massageOTP}
                  setEmail={setEmail}
                  email={email}
                  setPhone={setPhone}
                  setLastName={setLastName}
                  phone={phone}
                  handleSendOTP={handleSendOTP}
                  changeOther={changeOther}
                />
              )}

              {activeTab === 'changepassword' && (
                <TapChangePassword
                  state={state}
                  dispatch={dispatch}
                  handlePasswordUpdate={handlePasswordUpdate}
                />
              )}

              {activeTab === 'AddressBook' && (
                <TapAdressBook
                  deleteAddress={deleteAddress}
                  handelDefault={handelDefault}
                  addressList={addressList}
                  userId={user?.id}
                />
              )}

              {activeTab === 'MyPaymentOptions' && (
                <TapPayement CardsList={CardsList} />
              )}
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};
export default React.memo(Account);
