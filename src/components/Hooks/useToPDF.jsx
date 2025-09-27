import React from "react";
import { pdf } from "@react-pdf/renderer";
import { convertWebpToPng } from "@/lib/utils";
import { MyDocument } from "../ui/MyDocument";

export const handleDownload = async ({
  date,
  id,
  total,
  shipping,
  tax,
  subTotal,
  orderList,
  products,
}) => {
  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = (err) => reject(err);
    });
  };
  try {
    const convertedProducts = [];

    for (const p of products) {
      if (!p.product_img) {
        convertedProducts.push(p);
        continue;
      }

      await preloadImage(p.product_img);

      let finalImg = p.product_img;

      if (p.product_img.endsWith(".webp")) {
        finalImg = await convertWebpToPng(p.product_img, 300);
      }

      convertedProducts.push({
        ...p,
        product_img: finalImg,
      });
    }

    const doc = (
      <MyDocument
        date={date}
        id={id}
        total={total}
        products={convertedProducts}
        shipping={shipping}
        tax={tax}
        subTotal={subTotal}
        orderList={orderList}
      />
    );

    const blob = await pdf(doc).toBlob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `order-${id}.pdf`;
    a.click();
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
