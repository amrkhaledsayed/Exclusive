'use client';
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Heart, CircleUserRound, ShoppingCart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';

const MenuDock = ({
  items,
  className,
  setOpen,
  wishlistLength,
  cartLength,
  variant = 'default',
  orientation = 'horizontal',
  showLabels = true,
}) => {
  const defaultItems = [
    { label: 'Home', icon: Home, link: '/' },
    {
      label: 'favourite',
      icon: Heart,
      link: '/wishlist',
      lengthNum: wishlistLength,
    },
    { label: 'Cart', icon: ShoppingCart, link: '/cart', lengthNum: cartLength },
    { label: 'My Profile', icon: CircleUserRound, link: '/Account' },
  ];
  const { t } = useTranslation();
  const finalItems = useMemo(() => {
    const isValid =
      items && Array.isArray(items) && items.length >= 2 && items.length <= 8;
    if (!isValid) {
      console.warn(
        "MenuDock: 'items' prop is invalid or missing. Using default items.",
        items
      );
      return defaultItems;
    }
    return items;
  }, [items]);

  const [activeIndex, setActiveIndex] = useState(0);

  const textRefs = useRef([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    if (activeIndex >= finalItems.length) {
      setActiveIndex(0);
    }
  }, [finalItems, activeIndex]);

  const getVariantStyles = () => {
    switch (variant) {
      case 'compact':
        return {
          container: 'p-1',
          item: 'p-2 min-w-12',
          icon: 'h-4 w-4',
          text: 'text-xs',
        };
      case 'large':
        return {
          container: 'p-3',
          item: 'p-3 min-w-16',
          icon: 'h-6 w-6',
          text: 'text-base',
        };
      default:
        return {
          container: 'p-2',
          item: 'p-2 min-w-14',
          icon: 'h-5 w-5',
          text: 'text-sm',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <nav
      className={cn(
        'relative z-30 pt-3 inline-flex  items-center justify-between rounded-t-2xl border border-white/20 bg-[#99999962] shadow-2xl backdrop-blur-2xl dark:bg-gray-900/80',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        styles.container,
        className
      )}
      role="navigation"
    >
      {finalItems.map((item, index) => {
        const IconComponent = item.icon;

        return (
          <>
            <NavLink
              key={index}
              to={item.link}
              end={item.link === '/'}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={({ isActive, isPending }) =>
                cn(
                  'relative flex flex-col items-center justify-center transition-all duration-300 ease-out',
                  'focus-visible:ring-primary/50 focus-visible:ring-2 focus-visible:outline-none dark:hover:bg-gray-800/60',
                  'group',
                  styles.item,
                  isPending && 'pointer-events-none opacity-50',
                  isActive &&
                    'text-primary after:right-0  after:w-full after:absolute after:-top-[12px]  after:h-[3px] after:rounded-[4px] after:bg-red  ',
                  !isActive &&
                    'text-muted-foreground hover:text-foreground rounded-xl hover:scale-105'
                )
              }
              aria-label={item.label}
            >
              {({ isActive }) => (
                <>
                  <div
                    className={cn(
                      'relative flex items-center justify-center transition-all duration-300 ease-out',
                      orientation === 'horizontal' && showLabels ? 'mb-1' : '',
                      orientation === 'vertical' && showLabels ? 'mb-1' : ''
                    )}
                  >
                    <IconComponent
                      className={cn(
                        styles.icon,
                        'text-white transition-all duration-300 ease-out',
                        isActive &&
                          'text-red brightness-110 drop-shadow-lg filter'
                      )}
                    />
                    {item.lengthNum > 0 && item?.label === 'Cart' && (
                      <p className="bg-red text-white text-center pt-0.5 absolute -top-[12px] -right-[12px] text-[12px] w-5 h-5 rounded-full">
                        {' '}
                        {item?.lengthNum}{' '}
                      </p>
                    )}
                    {item.lengthNum > 0 && item?.label === 'favourite' && (
                      <p className="bg-red text-white text-center pt-0.5 absolute -top-[12px] -right-[12px] text-[12px] w-5 h-5 rounded-full">
                        {' '}
                        {item?.lengthNum}{' '}
                      </p>
                    )}
                  </div>
                  {showLabels && (
                    <div className="relative">
                      <span
                        ref={(el) => {
                          textRefs.current[index] = el;
                        }}
                        className={cn(
                          'font-medium hidden sm:block text-white capitalize transition-all duration-300 ease-out',
                          styles.text,
                          'relative z-200 whitespace-nowrap',
                          isActive && 'text-red font-semibold drop-shadow-sm'
                        )}
                      >
                        {t(`${item.label}`)}
                      </span>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                </>
              )}
            </NavLink>
          </>
        );
      })}
      <div
        className={cn(
          'relative flex flex-col items-center justify-center transition-all duration-300 ease-out',
          'focus-visible:ring-primary/50  focus-visible:ring-2 focus-visible:outline-none dark:hover:bg-gray-800/60',
          'group',
          styles.item
        )}
        onClick={() => setOpen(true)}
        aria-label={'More'}
      >
        <div
          className={cn(
            'relative flex items-center justify-center transition-all duration-300 ease-out',
            orientation === 'horizontal' && showLabels ? 'mb-1' : '',
            orientation === 'vertical' && showLabels ? 'mb-1' : ''
          )}
        >
          <Menu
            className={cn(
              styles.icon,
              'text-white transition-all duration-300 ease-out'
            )}
          />
        </div>
        {showLabels && (
          <span
            className={cn(
              'font-medium hidden sm:block text-white capitalize transition-all duration-300 ease-out',
              styles.text,
              'relative z-200 whitespace-nowrap'
            )}
          >
            {t(`More`)}
          </span>
        )}
      </div>
      {/* {showLabels && orientation === 'horizontal' && (
        <div
          className={cn(
            'absolute top-0 h-1 rounded-full transition-all duration-300 ease-out',
            'shadow-primary/50 bg-red shadow-lg',
            animated ? 'transition-all duration-300' : ''
          )}
          style={{
            width: `${underlineWidth}px`,
            left: `${underlineLeft}px`,
          }}
        />
      )} */}
      {(!showLabels || orientation === 'vertical') && (
        <div
          className={cn(
            'absolute rounded-full transition-all duration-300 ease-out',
            'from-primary to-secondary shadow-primary/50 bg-gradient-to-br shadow-lg',
            orientation === 'vertical'
              ? 'left-1 h-8 w-1.5'
              : 'bottom-0.5 h-1.5 w-8'
          )}
          style={{
            [orientation === 'vertical' ? 'top' : 'left']:
              orientation === 'vertical'
                ? `${
                    activeIndex *
                      (variant === 'large'
                        ? 64
                        : variant === 'compact'
                        ? 56
                        : 60) +
                    (variant === 'large' ? 19 : variant === 'compact' ? 16 : 18)
                  }px`
                : `${
                    activeIndex *
                      (variant === 'large'
                        ? 64
                        : variant === 'compact'
                        ? 56
                        : 60) +
                    (variant === 'large' ? 19 : variant === 'compact' ? 16 : 18)
                  }px`,
          }}
        />
      )}
    </nav>
  );
};
export default React.memo(MenuDock);
