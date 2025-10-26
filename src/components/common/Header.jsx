import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRegHeart, FaRegStar, FaUserCircle } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { CiHeart, CiLogout, CiSearch, CiShoppingCart } from 'react-icons/ci';
import { FiShoppingBag, FiUser } from 'react-icons/fi';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import SelectVariants from '../ui/List';
import SwipeableTemporaryDrawer from '../ui/Drawer0';
import DialogDemo from '../ui/Dialog';

import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import useFetchData from '../Hooks/useFetchData';
import { Button } from '../ui/Button';
import { useTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import MenuDock from '../ui/shadcn-io/menu-dock';
import { AppContext } from '@/utils/context';
import { Loading } from '../ui/Loading';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [value, setValue] = useState('');
  const openMenu = Boolean(anchorEl);
  const {
    user: activeUser,
    logOut,
    wishlist,
    cartList,
  } = React.useContext(AppContext);
  const { products, fetchData } = useFetchData({ search: value });

  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handelLogout = () => {
    setLoading(true);
    logOut.mutate(undefined, {
      onSuccess: () => {
        setOpenDialog(false);
        setLoading(false);
      },
      onError: (error) => {
        toast.error(error.message);
        setOpenDialog(false);
        setLoading(false);
      },
    });
  };
  useEffect(() => {
    if (value && value.length > 1) {
      fetchData();
    }
  }, [value, fetchData]);
  const handleLogoutAndClose = async () => {
    try {
      await handelLogout();
      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <header className="mx-auto">
      <div className="flex min-h-12 items-center bg-black">
        <div className="mx-auto flex max-w-[900px] items-center justify-center gap-2 px-2.5 text-sm text-white md:justify-between md:text-base">
          <div className="flex gap-1 text-center md:flex-row md:items-center">
            <p className="text-[10px] md:text-[14px]">
              {t(
                'Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%'
              )}
              <Link
                to="/allProducts"
                className="underline  md:text-[14px] text-[10px]"
              >
                {t('Shop Now')}!
              </Link>
            </p>
          </div>
          <SelectVariants className="md:flex hidden w-[100px] outline-none" />
        </div>
      </div>

      <div className="border-b border-b-gray-300 bg-white">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-2.5 py-4">
          <Link to="/">
            <h1 className="text-xl font-bold sm:text-2xl">{t('Exclusive')}</h1>
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex lg:gap-12 lg:text-base">
            <NavLink
              to="/"
              className="link_nav"
              aria-label={t('Go to Home page')}
            >
              {t('Home')}
            </NavLink>

            <Link
              to="/contact"
              className="link_nav"
              aria-label={t('Contact us page')}
            >
              {t('Contact')}
            </Link>

            <NavLink
              to="/about"
              className="link_nav"
              aria-label={t('About us page')}
            >
              {t('About')}
            </NavLink>

            {!activeUser && (
              <NavLink
                to="sign-up"
                className="link_nav"
                aria-label={t('Create a new account')}
              >
                {t('Sign Up')}
              </NavLink>
            )}
          </nav>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setShowSearch((prev) => !prev)}
              className="text-gray-700"
              aria-label={t('Open search')}
            >
              <CiSearch size={22} />
            </button>

            <Link
              to="/wishlist"
              className="relative md:block hidden"
              aria-label={t('Wishlist')}
            >
              {wishlist && wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">
                  {wishlist.length}
                </span>
              )}
              <CiHeart className="cursor-pointer" size="22px" />
            </Link>

            <Link
              to="/cart"
              className="relative md:block hidden"
              aria-label={t('Cart')}
            >
              {cartList && cartList.length > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1 text-xs text-white">
                  {cartList.length}
                </span>
              )}
              <CiShoppingCart size={22} />
            </Link>

            {activeUser ? (
              <div className="relative md:block hidden">
                <button
                  onClick={handleClick}
                  className="flex items-center gap-2.5"
                  aria-label={t('Open account menu')}
                >
                  <FaUserCircle
                    className="cursor-pointer text-red-500"
                    size="22px"
                  />
                </button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      color: 'white',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '4px',
                      marginTop: '18px',
                      minWidth: '180px',
                      backgroundColor: '#17171770',
                      boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link to="/Account" className="flex items-center gap-2.5">
                      <FiUser />
                      {t('My Account')}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link to="/Orders" className="flex items-center gap-2.5">
                      <FiShoppingBag /> {t('My order')}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      to="/Canccellations-Order"
                      className="flex items-center gap-2.5"
                    >
                      <IoIosCloseCircleOutline /> {t('My Cancellations')}
                    </Link>
                  </MenuItem>
                  <MenuItem className="flex items-center gap-2.5">
                    <Link to="/Reviews" className="flex items-center gap-2.5">
                      <FaRegStar /> {t('My Reviews')}
                    </Link>
                  </MenuItem>
                  <MenuItem
                    className="flex items-center gap-2.5"
                    onClick={() => {
                      setOpenDialog(true);
                      setAnchorEl(null);
                    }}
                    aria-label={t('Log out')}
                  >
                    <CiLogout /> {t('Log out')}
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="sign-in">
                <Button variant="destructive" className="h-[30px]">
                  {t('Log in')}
                </Button>
              </Link>
            )}

            <SwipeableTemporaryDrawer open={open} setOpen={setOpen} />
          </div>
        </div>

        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative overflow-hidden border-t border-gray-300 bg-gray-50"
            >
              <form className="relative mx-auto max-w-[600px] h-[80px] p-3">
                {showSearch && (
                  <Autocomplete
                    freeSolo
                    options={products || []}
                    getOptionLabel={(option) => option.title}
                    renderOption={(props, option) => (
                      <Link
                        key={option.id}
                        to={`product/${option.id}`}
                        onClick={() => {
                          setValue('');
                          setShowSearch(false);
                        }}
                      >
                        <li
                          {...props}
                          className="flex items-center gap-2 p-2 hover:bg-gray-100"
                        >
                          <img
                            src={option.thumbnail}
                            alt={option.title}
                            className="h-10 w-10 object-cover"
                          />
                          <span>{option.title}</span>
                        </li>
                      </Link>
                    )}
                    inputValue={value}
                    onInputChange={(event, newValue) => setValue(newValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        placeholder={t('Search by name')}
                        className="h-[40px]"
                      />
                    )}
                  />
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogDemo
          isOpen={openDialog}
          setOpen={setOpenDialog}
          title={t('Confirm Logout')}
        >
          <p className="mt-2 text-sm text-gray-600">
            {t('Are you sure you want to log out of your account?')}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button onClick={() => setOpenDialog(false)} variant="outline">
              {t('Cancel')}
            </Button>
            <Button
              variant="destructive"
              onClick={handleLogoutAndClose}
              disabled={logOut.isLoading || loading}
            >
              {t('Log out')}
              {logOut.isLoading || (loading && <Loading />)}
            </Button>
          </div>
        </DialogDemo>
      </div>
      <MenuDock
        wishlistLength={wishlist.length || 0}
        cartLength={cartList.length || 0}
        className="fixed bottom-0 z-50 pt-3 w-full md:hidden"
        setOpen={setOpen}
      />
    </header>
  );
};

export default React.memo(Header);
