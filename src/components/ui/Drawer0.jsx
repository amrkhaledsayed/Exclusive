import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { IoCloseSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import SelectVariants from './List';

import {
  CircleX,
  Heart,
  LogOut,
  ShoppingBag,
  ShoppingCart,
  Contact,
  Star,
  House,
  Info,
  UserPlus,
} from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '@/common/context';
import { useTranslation } from 'react-i18next';

export default function SwipeableTemporaryDrawer({ open, setOpen }) {
  const { user, logOut } = useContext(AppContext);

  const userName = `${user?.user_metadata?.first_name ?? ''} ${
    user?.user_metadata?.last_name ?? ''
  }`;
  const { t } = useTranslation();
  const data = [
    {
      text: 'Home',
      link: '/',
      icon: <House className="text-red-400" />,
    },
    {
      text: 'Contact',
      link: '/contact',
      icon: <Contact className="text-red-400" />,
    },
    {
      text: 'About',
      link: '/about',
      icon: <Info className="text-red-400" />,
    },
    {
      text: 'Sign Up',
      link: '/sign-up',
      icon: <UserPlus className="text-red-400" />,
    },
    {
      text: 'Wishlist',
      link: '/wishlist',
      icon: <Heart className="text-red-400" />,
    },
    {
      text: 'Cart',
      link: '/cart',
      icon: <ShoppingCart className="text-red-400" />,
    },

    {
      text: 'Orders',
      link: '/orders',
      icon: <ShoppingBag className="text-red-400" />,
    },
    {
      text: 'Canccellations Orders',
      link: '/Canccellations-Order',
      icon: <CircleX className="text-red-400" />,
    },
    {
      text: 'Reviews',
      link: '/Reviews',
      icon: <Star className="text-red-400" />,
    },
  ];

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const list = () => (
    <Box sx={{ width: 250, zIndex: 54 }} role="presentation">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          alignItems: 'center',
        }}
        className="bg-red-400 text-white"
      >
        <div className="flex items-center gap-2">
          <CgProfile size="2rem" />
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">Exclusive</h2>
            <p className="text-[10px] font-normal">{userName}</p>
          </div>
        </div>
        <IoCloseSharp
          size={24}
          style={{ cursor: 'pointer' }}
          onClick={toggleDrawer(false)}
        />
      </Box>

      <List>
        {data.map((item) =>
          item.text === 'Sign up' && user ? null : (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={Link}
                to={item.link}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(item.text)} />
              </ListItemButton>
            </ListItem>
          )
        )}
        <ListItem key={'logOut'} disablePadding>
          <ListItemButton
            component={Link}
            onClick={() => {
              logOut.mutate();
              toggleDrawer(false);
            }}
          >
            <ListItemIcon>{<LogOut className="text-red-400" />}</ListItemIcon>
            <ListItemText primary={t('Log out')} />
          </ListItemButton>
        </ListItem>
        <SelectVariants />
      </List>
    </Box>
  );

  return (
    <SwipeableDrawer
      className="md:hidden z-[50]"
      sx={{ zIndex: 50 }}
      style={{ zIndex: 50 }}
      anchor="left"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      {list()}
    </SwipeableDrawer>
  );
}
