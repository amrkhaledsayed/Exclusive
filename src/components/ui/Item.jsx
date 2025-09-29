import React, { useState } from 'react';
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
  const { addItem } = useCart(user?.id);
  const [loaded, setLoaded] = useState(false);

  const [isFavorite, setIsFavorite] = useState(wishlist);
  const [open, setOpen] = useState(false);

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
      className="group glassmorphism bg-card/60 relative h-[450px] w-[240px] overflow-hidden border-white/20 transition-all duration-500 hover:drop-shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div
          ref={ref}
          className="from-muted/50 to-muted relative aspect-square overflow-hidden bg-gradient-to-br"
        >
          <Link to={`/product/${id}`} className="relative z-10">
            {inView && (
              <img
                src={image}
                onLoad={() => setLoaded(true)}
                loading="lazy"
                alt={productName}
                className="h-full max-h-[280px] w-full max-w-[280px] object-cover transition-all duration-700 group-hover:scale-110"
              />
            )}
            {loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <TrophySpin
                  color="#ff1010"
                  size="medium"
                  text=""
                  textColor=""
                />
              </div>
            )}
          </Link>

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

          <Badge className="bg-red absolute top-4 left-4 animate-pulse border-0 px-3 py-1 text-sm font-bold text-white shadow-lg">
            <Zap className="mr-1 h-3 w-3" />-{Number(discount?.toFixed(0))}%
          </Badge>

          <div
            className={`absolute top-4 right-4 z-100 flex flex-col gap-3 transition-all duration-300 ${
              isHovered
                ? 'translate-x-0 opacity-100'
                : 'translate-x-4 opacity-0'
            }`}
          >
            <Button
              size="icon"
              className="glassmorphism border-red h-10 w-10 rounded-full bg-[#c8c8c8] transition-all duration-300 hover:scale-110"
              onClick={handleAddFavorite}
            >
              <Heart
                className={`h-4 w-4 transition-colors duration-200 ${
                  isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
                }`}
              />
            </Button>

            <Button
              onClick={() => setOpen(true)}
              size="icon"
              className="glassmorphism h-10 w-10 rounded-full border-white/30 bg-[#c8c8c8] transition-all duration-300 hover:scale-110"
            >
              <Eye className="h-4 w-4 text-white" />
            </Button>
          </div>

          <div className="absolute inset-0 -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
        </div>

        <div className="from-card/80 to-card h-full space-y-4 bg-gradient-to-b p-6">
          <h3 className="text-card-foreground group-hover:text-primary line-clamp-1 h-full text-xl leading-tight font-bold transition-colors duration-300">
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
            variant="destructive"
            onClick={() =>
              addItem({
                user_id: user?.id,
                product_id: Number(id),
                product_name: productName,
                price: Number(priceAfterDiscount.toFixed(2)),
                product_img: image,
                quantity: 1,
              })
            }
            className="group/button relative mt-[1rem] w-fit overflow-hidden rounded-full border-0 px-3 font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            size="lg"
          >
            <IoMdAdd />

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
