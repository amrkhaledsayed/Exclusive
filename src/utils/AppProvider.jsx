import { useAuthQuery } from '@/Supabase/useFetchUser';
import { AppContext } from './context';
import { useWishlist } from '@/Supabase/useAddtofavorites';
import { useCart } from '@/Supabase/useCart';
import { useOrder } from '@/Supabase/useOrder';
import useReviews from '@/Supabase/useReviews';

export const AppProvider = ({ children }) => {
  const {
    user,
    handleGoogleSignIn,
    SignIn,
    data,
    SignUp,
    logOut,
    updateEmail,
    updateName,
  } = useAuthQuery();
  const { wishlist, addToFavorites, isLoading } = useWishlist(user?.id);
  const { cartList, clearData } = useCart(user?.id);
  const { orderList, addOrder } = useOrder(user?.id);
  const { addReviews, reviewsList } = useReviews(user?.id);

  return (
    <AppContext.Provider
      value={{
        user,
        data,
        logOut,
        isLoading,
        SignUp,
        updateEmail,
        addReviews,
        updateName,
        wishlist,
        SignIn,
        handleGoogleSignIn,
        reviewsList,
        cartList,
        orderList,
        addOrder,
        clearData,
        addToFavorites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
