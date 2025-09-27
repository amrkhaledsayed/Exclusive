import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const convertWebpToPng = async (webpUrl, maxWidth = 300) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = webpUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");

        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const pngUrl = canvas.toDataURL("image/png");
        resolve(pngUrl);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = (err) => reject(err);
  });
};
