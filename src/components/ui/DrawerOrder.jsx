import * as React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from '@/components/ui/Button';
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { useOrder } from "@/Supabase/useOrder";
import { useAuthQuery } from "@/Supabase/useFetchUser";
import { ImCancelCircle } from "react-icons/im";
import { handleDownload } from "../Hooks/useToPDF";
import { useTranslation } from "react-i18next";

export const DrawerOrder = (props) => {
  const { t } = useTranslation();
  const { date, id, total, products, shipping, tax, subTotal, orderList } =
    props;
  console.log(orderList.products);
  const normalizedProducts = Array.isArray(orderList?.products)
    ? orderList.products
    : orderList?.products
      ? [orderList.products] // لو Object حطه جوه Array
      : [];
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuthQuery();
  const { updateOrderState } = useOrder(user?.id);
  console.log(products);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          {t("View details")}
          <IoIosArrowDown />
        </Button>
      </DrawerTrigger>

      <DrawerContent
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          padding: "10px",
          paddingBottom: "24px",
          maxHeight: "95vh",
        }}
      >
        <div className="z-30 mx-auto w-full max-w-[530px] overflow-auto bg-white opacity-95">
          <div className="sticky top-0 mx-auto mt-[8px] mb-4 h-1.5 w-12 rounded-[4px] bg-gray-600" />

          <p className="my-2 text-[20px] font-medium">
            {t("Order ID:")} {id}
          </p>
          <p className="mb-4 text-[14px] text-gray-400">
            {t("Date:")} {date}
          </p>

          <div>
            {normalizedProducts.map((product, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-gray-300 py-3"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={product.product_img}
                    alt={product.product_name}
                    className="h-[50px] w-[50px] object-cover"
                  />
                  <p className="text-[16px] font-normal">
                    {t(`titles.${product.product_name}`)}
                  </p>
                </div>

                <div className="flex flex-col items-center">
                  <p className="text-[12px] text-gray-400">
                    {t("Qty:")} {product.quantity}
                  </p>
                  <p>${product.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 pt-3">
            <div className="flex justify-between text-gray-400">
              <p>{t("SubTotal:")}</p>
              <p>${subTotal}</p>
            </div>
            <div className="flex justify-between text-gray-400">
              <p>{t("Shipping:")}</p>
              <p>${shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between border-b border-gray-300 pb-3 text-gray-400">
              <p>{t("Tax:")}</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-medium">
              <p>{t("Total:")}</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>

          <DrawerFooter
            className="flex w-full flex-row flex-wrap items-center justify-center"
            style={{ marginTop: "16px", display: "flex", padding: 0 }}
          >
            <button
              onClick={() =>
                handleDownload({
                  date,
                  id,
                  total,
                  shipping,
                  tax,
                  subTotal,
                  orderList,
                  products,
                })
              }
              style={{
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                padding: "8px 16px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaDownload />
              {t("Download PDF")}
            </button>
            {orderList?.state === "pending" && (
              <>
                <button
                  onClick={() =>
                    updateOrderState({ orderId: id, state: "completed" })
                  }
                  className="flex items-center gap-2 rounded-[6px] bg-green-500 px-4 py-2 text-white"
                >
                  <img className="w-[20px]" src="/delivered.png" alt="" />
                  {t("Mark as Delivered")}
                </button>
                <button
                  onClick={() =>
                    updateOrderState({ orderId: id, state: "canceled" })
                  }
                  className="bg-red flex items-center gap-2 rounded-[6px] px-4 py-2 text-white"
                >
                  <ImCancelCircle className="text-white" />
                  {t("Mark as Cancel")}
                </button>
              </>
            )}
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
