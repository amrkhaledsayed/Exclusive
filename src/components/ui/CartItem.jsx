import { IoIosCloseCircle } from 'react-icons/io';
import { FiTrash2 } from 'react-icons/fi';
import { useCart } from '../../Supabase/useCart';
import { useAuthQuery } from '../../Supabase/useFetchUser';
import { useTranslation } from 'react-i18next';

const CartItem = ({
  img,
  title,
  Price,
  productId,
  quantity,
  onQuantityChange,
  color,
  size,
}) => {
  const { user } = useAuthQuery();
  const { deleteItem, updateQuantity } = useCart(user?.id);
  const { t } = useTranslation();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      onQuantityChange(productId, newQuantity);
      updateQuantity({
        product_id: productId,
        quantity: newQuantity,
      });
    }
  };

  return (
    <div className="border-b border-gray-200 bg-white last:border-b-0">
      {/* Desktop Layout - Grid */}
      <div className="hidden grid-cols-4 gap-6 px-6 py-6 sm:grid">
        {/* Product Column */}
        <div className="flex items-center gap-4">
          <img src={img} alt={title} className="h-16 w-16 object-contain" />
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {t(`titles.${title}`) || title}
            </h3>
            {color && (
              <p className="mt-1 text-xs text-gray-600">
                Color: <span className="font-medium">{color}</span>
              </p>
            )}
            {size && (
              <p className="text-xs text-gray-600">
                Size: <span className="font-medium">{size}</span>
              </p>
            )}
          </div>
        </div>

        {/* Price Column */}
        <div className="flex items-center justify-center">
          <p className="font-medium text-gray-900">
            LE {Number(Price).toFixed(2)}
          </p>
        </div>

        {/* Quantity Column */}
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="w-8 text-center text-base font-medium">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal Column */}
        <div className="flex flex-col items-center justify-center">
          <p className="font-semibold text-gray-900">
            LE {(quantity * Price).toFixed(2)}
          </p>
          <button
            onClick={() => deleteItem(productId)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-red-500 hover:text-red-500"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="px-4 py-6 sm:hidden">
        {/* Product Info and Image */}
        <div className="flex gap-4">
          <img
            src={img}
            alt={title}
            className="h-24 w-24 flex-shrink-0 object-contain"
          />
          <div className="flex flex-1 flex-col">
            <h3 className="text-lg font-medium text-gray-900">
              {t(`titles.${title}`) || title}
            </h3>
            <p className="text-sm font-semibold text-gray-900s">
              LE {Number(Price).toFixed(2)}
            </p>
            {color && (
              <p className="mt-2 text-sm text-gray-600">Color: {color}</p>
            )}
            {size && <p className="text-sm text-gray-600">Size: {size}</p>}
          </div>
          <p className=" mt-1 text-2xl font-bold text-gray-900">
            LE {(quantity * Price).toFixed(2)}
          </p>
          <button
            onClick={() => deleteItem(productId)}
            className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-red-500 hover:text-red-500"
          >
            <FiTrash2 size={24} />
          </button>
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              −
            </button>
            <span className="text-xl font-medium">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600 transition hover:bg-gray-200"
            >
              +
            </button>
          </div>

          <div className="flex flex-col items-center gap-2">
            <button
              onClick={() => deleteItem(productId)}
              className="flex h-14 w-14 items-center justify-center rounded-lg border border-gray-300 text-gray-600 transition hover:border-red-500 hover:text-red-500"
            >
              <FiTrash2 size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
