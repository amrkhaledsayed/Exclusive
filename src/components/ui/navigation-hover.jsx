"use client";

import { useState } from "react";
import { ListItem } from "./ListItem";
import { useTranslation } from "react-i18next";
import { IoIosArrowForward } from "react-icons/io";

export const NavigationHover = ({ title, staticData }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <div
        className="flex cursor-pointer items-center justify-between rounded-[6px] px-2 transition-all hover:bg-gray-200"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <p className="cursor-pointer py-2 text-gray-700 transition-colors hover:text-gray-900">
          {t(`${title}`)}
        </p>
        <IoIosArrowForward className="ltr:rotate-0 rtl:rotate-180" />
      </div>
      {open && (
        <div
          className="absolute top-0 z-20 mt-2 w-[600px] rounded-xl border border-gray-200 bg-white/95 p-6 shadow-xl backdrop-blur-md ltr:left-[13.5rem] rtl:right-[13.5rem]"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="grid grid-cols-3 gap-4">
            {staticData?.map((item, index) => (
              <ListItem
                key={index}
                title={item?.title}
                href={item?.Link}
                image={item?.image}
                description={item?.description}
                price={item?.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
