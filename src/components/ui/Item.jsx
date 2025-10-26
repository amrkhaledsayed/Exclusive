import React, { useState, useMemo } from 'react';
import Rating from '@mui/material/Rating';
import Skeleton from '@mui/material/Skeleton';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Supabase/useAddtofavorites';
import { useAuthQuery } from '../../Supabase/useFetchUser';
import { useCart } from '../../Supabase/useCart';
import { TrophySpin } from 'react-loading-indicators';
import { Heart, Eye, Star, ShoppingCart, Zap } from 'lucide-react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { useInView } from 'react-intersection-observer';
import { IoMdAdd } from 'react-icons/io';
import { QuickView } from '../common/QuickView';
import { BsCartPlus } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa';

const Item = (props) => {
  const {
    id,
    image,
    productName,
    product,
    price,
    reviews,
    discount,
    priceBeforeDiscount,
    rating,
    availabilityStatus,
    loading = false,
    wishlist = false,
  } = props;
  const { user } = useAuthQuery();
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '100px',
  });
  const { t, i18n } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const priceAfterDiscount = price - (discount / 100) * price;
  const { addToFavorites, removeFromFavorites } = useWishlist(user?.id);
  const { addItem, deleteItem, cartList } = useCart(user?.id);
  const [loaded, setLoaded] = useState(false);

  const [isFavorite, setIsFavorite] = useState(wishlist);
  const [open, setOpen] = useState(false);

  // Check if item is in cart
  const isInCart = useMemo(() => {
    return cartList?.some((item) => item.product_id === id);
  }, [cartList, id]);

  const formattedBeforePrice =
    i18n.language === 'ar'
      ? Number(priceBeforeDiscount?.toFixed(2)).toLocaleString('ar-EG')
      : Number(priceBeforeDiscount?.toFixed(2));

  const formattedPrice =
    i18n.language === 'ar'
      ? Number(priceAfterDiscount?.toFixed(2)).toLocaleString('ar-EG')
      : Number(priceAfterDiscount?.toFixed(2));

  const handleAddFavorite = () => {
    if (isFavorite) {
      removeFromFavorites(id);
      setIsFavorite(false);
    } else {
      addToFavorites({
        user_id: user?.id,
        product_id: id,
        nameproduct: productName,
        price: priceAfterDiscount,
        product_img: image,
        discount: Number(Math.floor(discount)),
        availabilityStatus,
        rating,
        reviews,
      });
      setIsFavorite(true);
    }
  };

  const handleToggleCart = () => {
    if (isInCart) {
      // Remove from cart
      deleteItem(id);
    } else {
      // Add to cart
      addItem({
        user_id: user?.id,
        product_id: Number(id),
        product_name: productName,
        price: Number(priceAfterDiscount.toFixed(2)),
        product_img: image,
        quantity: 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-[500px] w-[270px] flex-col gap-3">
        <Skeleton
          animation="wave"
          variant="rectangular"
          height={270}
          className="h-full w-full rounded-lg"
        />
        <Skeleton variant="text" animation="wave" width="80%" height={24} />
        <Skeleton variant="text" width="60%" animation="wave" height={24} />
        <Skeleton variant="text" animation="wave" width="50%" height={20} />
      </div>
    );
  }

  return (
    <Card
      className="group glassmorphism relative h-[450px] w-[240px] overflow-hidden border-white/20 bg-card/60 transition-all duration-500 hover:drop-shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div
          ref={ref}
          className="from-muted/50 to-muted relative aspect-square overflow-hidden bg-gradient-to-br"
        >
          <Link
            to={`/product/${id}`}
            className="relative z-10"
            aria-label={t('details')}
          >
            {inView && (
              <img
                src={image}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                alt={productName}
                width="237.5"
                height="237.5"
                fetchpriority="low"
                className={`h-full max-h-[280px] w-full max-w-[280px] object-cover transition-all duration-700 group-hover:scale-110 
      ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
            )}

            {!loaded && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-gray-200">
                <TrophySpin color="#ff1010" size="medium" />
              </div>
            )}
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <Badge className="bg-red absolute left-4 top-4 animate-pulse border-0 px-3 py-1 text-sm font-bold text-white shadow-lg">
            <Zap className="mr-1 h-3 w-3" />-{Number(discount?.toFixed(0))}%
          </Badge>

          <div
            className={`absolute right-4 top-4 z-50 flex flex-col gap-3 transition-all duration-300 ${
              isHovered
                ? 'translate-x-0 opacity-100'
                : 'max-md:translate-x-0 max-md:opacity-100 md:translate-x-4 md:opacity-0'
            }`}
          >
            <Button
              size="icon"
              className="glassmorphism h-10 w-10 rounded-full border-white/30 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
              onClick={handleAddFavorite}
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-200 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                }`}
              />
            </Button>

            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="glassmorphism h-10 w-10 rounded-full border-white/30 bg-white/80 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white"
            >
              <Eye className="h-4 w-4 text-gray-700" />
            </Button>
          </div>

          <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
        </div>

        <div className="from-card/80 to-card h-full space-y-4 bg-gradient-to-b p-6">
          <h3 className="text-card-foreground group-hover:text-primary line-clamp-1 h-full text-xl font-bold leading-tight transition-colors duration-300">
            {t(`titles.${productName}`, { defaultValue: productName })}{' '}
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-red text-2xl font-black">
              {i18n.language === 'ar'
                ? `${formattedPrice}${t('$')}`
                : `$${formattedPrice}`}
            </span>
            <span className="text-muted-foreground text-sm font-medium line-through">
              {i18n.language === 'ar'
                ? `${formattedBeforePrice}${t('$')}`
                : `$${formattedBeforePrice}`}
            </span>
          </div>

          <div className="mb-auto flex items-center gap-2">
            <div className="flex items-center gap-1" dir="rtl">
              <Rating
                dir="ltr"
                name="half-rating-read"
                value={rating}
                precision={0.5}
                readOnly
              />
            </div>
            <span className="text-muted-foreground text-sm font-medium">
              ({reviews})
            </span>
          </div>

          <Button
            variant={isInCart ? 'outline' : 'destructive'}
            onClick={handleToggleCart}
            className={`group/button relative mt-[1rem] w-full overflow-hidden rounded-lg border-0 px-3 font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              isInCart
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'text-white'
            }`}
            size="lg"
          >
            {isInCart ? (
              <>
                <FaCheck className="mr-2" />
                {t('In Cart')}
              </>
            ) : (
              <>
                <BsCartPlus className="mr-2" />
                {t('Add To cart')}
              </>
            )}
            <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover/button:translate-x-full"></div>
          </Button>
        </div>
        <QuickView
          open={open}
          product={product}
          handleAddFavorite={handleAddFavorite}
          setOpen={setOpen}
          priceAfterDiscount={priceAfterDiscount}
        />
      </CardContent>
    </Card>
  );
};

export default React.memo(Item);
