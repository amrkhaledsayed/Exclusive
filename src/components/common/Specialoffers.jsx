import Countdown from "react-countdown";
import Img from "@public/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.svg";
import { useTranslation } from "react-i18next";
import React from "react";
import { Link } from "react-router";

const SpecialOffers = () => {
  const { t } = useTranslation();

  const targetDate = Date.now() + 5 * 24 * 60 * 60 * 1000;

  return (
    <div className="mt-[40px] w-full bg-black">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center px-6 py-12 md:flex-row md:px-12 md:py-16 lg:px-16">
        <div className="flex flex-[0_0_auto] flex-col items-start gap-6 text-center md:items-start md:gap-8 md:text-left lg:gap-12">
          <p className="text-sm font-semibold text-[#00FF66] md:text-base">
            {t("Categories")}
          </p>
          <p className="text-3xl leading-snug font-semibold text-[#fafafa] md:text-5xl md:leading-tight lg:text-6xl">
            {t("Enhance Your Music Experience")}{" "}
          </p>

          <Countdown
            date={targetDate}
            renderer={({ days, hours, minutes, seconds }) => (
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "center",
                    background: "#a9daff",
                    width: "60px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {days}
                  </div>
                  <div style={{ fontSize: "12px" }}>{t("Days")}</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    background: "#a9daff",
                    width: "60px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {hours}
                  </div>
                  <div style={{ fontSize: "12px" }}>{t("Hours")}</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    background: "#a9daff",
                    width: "60px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {minutes}
                  </div>
                  <div style={{ fontSize: "12px" }}> {t("Minutes")}</div>
                </div>

                <div
                  style={{
                    textAlign: "center",
                    background: "#a9daff",
                    width: "60px",
                    padding: "10px",
                    borderRadius: "10px",
                  }}
                >
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {seconds}
                  </div>
                  <div style={{ fontSize: "12px" }}> {t("Seconds")}</div>
                </div>
              </div>
            )}
          />

          <div className="relative mt-8 flex w-full justify-center md:mt-0 md:ml-8 md:hidden md:w-auto md:justify-end lg:ml-12">
            <img
              src={Img}
              alt="Special Offer"
              className="z-10 h-auto w-[90%] max-w-full drop-shadow-[0_0px_100px_rgba(118,116,116,0.6)]"
            />
          </div>
          <Link to="AllProducts">
            <button className="relative mt-4 overflow-hidden rounded-xl border-0 bg-[#ecd448] px-6 py-3 text-sm font-bold text-[#131313] shadow-[0_2px_0_2px_#000] transition-all duration-300 before:absolute before:top-1/2 before:h-[120%] before:w-[100px] before:-translate-x-[150%] before:-translate-y-1/2 before:skew-x-[30deg] before:bg-[#ff6700] before:transition-all before:duration-500 before:content-[''] hover:bg-[#4cc9f0] hover:text-white hover:shadow-[0_2px_0_2px_#0d3b66] hover:before:translate-x-[150%] hover:before:delay-100 active:scale-90 md:mt-6 md:px-8 md:py-4 md:text-[15px]">
              {t("Shop now!")}
            </button>
          </Link>
        </div>

        <div className="relative mt-8 hidden w-full justify-center md:mt-0 md:ml-8 md:flex md:w-auto md:justify-end lg:ml-12">
          <img
            src={Img}
            alt="Special Offer"
            className="z-10 h-auto max-w-full drop-shadow-[0_0px_100px_rgba(118,116,116,0.6)]"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(SpecialOffers);
