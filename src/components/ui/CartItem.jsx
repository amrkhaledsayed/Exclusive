import { IoIosCloseCircle } from "react-icons/io";
import { useCart } from "../../Supabase/useCart";
import { useAuthQuery } from "../../Supabase/useFetchUser";
import { useTranslation } from "react-i18next";

const CartItem = ({
  img,
  title,
  Price,
  productId,
  quantity,
  onQuantityChange,
}) => {
  const { user } = useAuthQuery();
  const { deleteItem, updateQuantity } = useCart(user?.id);
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 items-center bg-white px-6 py-4 shadow-md transition last:rounded-b-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={() => deleteItem(productId)}
          className="text-red-500 transition hover:text-red-700"
        >
          <IoIosCloseCircle size={22} />
        </button>
        <img src={img} alt={title} className="h-12 w-12 object-contain" />
        <p className="text-sm font-medium text-gray-800">
          {t(`titles.${title}`)}
        </p>
      </div>

      <p className="text-center text-gray-700">${Number(Price)}</p>

      <div className="flex justify-center">
        <input
          type="number"
          min={1}
          value={quantity}
          defaultValue={1}
          onChange={(e) => {
            const newQuantity = Number(e.target.value);
            onQuantityChange(productId, newQuantity);
            updateQuantity({
              product_id: productId,
              quantity: newQuantity,
            });
          }}
          className="h-10 w-16 rounded-md border border-red-300 text-center text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-400"
        />
      </div>

      <p className="text-center font-semibold text-gray-900">
        ${(quantity * Price).toFixed(2)}
      </p>
    </div>
  );
};

export default CartItem;
