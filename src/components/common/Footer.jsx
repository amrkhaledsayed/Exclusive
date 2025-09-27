import Qr from "@public/Qr Code.svg";
import apple from "@public/download-appstore.svg";
import { GrFacebookOption } from "react-icons/gr";
import { FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import andro from "@public/png-transparent-google-play-store-logo-google-play-app-store-android-wallets-text-label-logo.svg";
import { useTranslation } from "react-i18next";
import React from "react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="rounded-t-3xl bg-black">
      <div className="mx-auto flex max-w-full flex-col flex-wrap gap-[87px] py-[80px] pl-[20px] text-white md:max-w-[1200px] md:flex-row rtl:pr-[20px]">
        <div className="flex flex-none flex-col gap-4">
          <p className="title-footer">{t("Exclusive")}</p>
          <p className="label-footer">{t("Subscribe")}</p>
          <p className="label-footer">{t("Get 10% off your first order")}</p>
          <div className="relative mt-6 w-[217px]">
            <input
              type="email"
              placeholder={t("Email Address")}
              autoComplete="email"
              className="block w-full rounded-2xl border border-neutral-300 bg-transparent py-4 pr-20 pl-6 text-base/6 text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-500 focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-none"
            />
            <div className="absolute inset-y-1 right-1 flex justify-end">
              <button
                type="submit"
                className="flex aspect-square h-full items-center justify-center rounded-xl bg-neutral-950 text-white transition hover:bg-neutral-800"
              >
                <svg viewBox="0 0 16 6" aria-hidden="true" className="w-4">
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 3 10 .5v2H0v1h10v2L16 3Z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="title-footer">{t("Support")}</p>
          <p className="label-footer">
            {t("111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.")}
          </p>
          <p className="label-footer">exclusive@gmail.com</p>
          <p className="label-footer">+88015-88888-9999</p>
        </div>

        <div className="flex flex-none flex-col gap-4">
          <p className="title-footer">{t("Account")}</p>
          <p className="label-footer">{t("My Account")}</p>
          <p className="label-footer">{t("Login / Register")}</p>
          <p className="label-footer">{t("Cart")}</p>
          <p className="label-footer">{t("Wishlist")}</p>
          <p className="label-footer">{t("Shop Now")}</p>
        </div>

        <div className="flex flex-none flex-col gap-4">
          <p className="title-footer">{t("Quick Link")}</p>
          <p className="label-footer">{t("Privacy Policy")}</p>
          <p className="label-footer">{t("Terms Of Use")}</p>
          <p className="label-footer">{t("Contact")}</p>
        </div>

        <div className="flex flex-none flex-col gap-4">
          <p className="title-footer">{t("Download App")}</p>
          <p className="text-body-m leading-5 font-medium text-[#fafafa]">
            {t("Save $3 with App New User Only")}
          </p>
          <div className="flex items-center gap-[8px]">
            <img src={Qr} alt="" />
            <div className="flex flex-col gap-2">
              <img src={apple} alt="" />
              <img src={andro} alt="" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <GrFacebookOption size={30} />
            <FaTwitter size={30} />
            <FaInstagram size={30} />
            <FaLinkedinIn size={30} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
