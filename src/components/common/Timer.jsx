import { useTranslation } from "react-i18next";
import { useTimer } from "react-timer-hook";

function MyTimer({ expiryTimestamp }) {
  const { days, hours, minutes, seconds, isRunning } = useTimer({
    expiryTimestamp,
    onExpire: () => console.log("Timer expired"),
    autoStart: true,
  });
  const { t } = useTranslation();
  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <div className="font-inter flex max-w-full items-center gap-4 overflow-auto text-[20px]">
      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">{t("Days")}</span>
        <span className="text-[25px] font-bold">{formatNumber(days)}</span>
      </div>

      <span className="text-3xl font-bold">:</span>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">{t("Hours")}</span>
        <span className="text-3xl font-bold">{formatNumber(hours)}</span>
      </div>

      <span className="text-3xl font-bold">:</span>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">{t("Minutes")}</span>
        <span className="text-3xl font-bold">{formatNumber(minutes)}</span>
      </div>

      <span className="text-3xl font-bold">:</span>

      <div className="flex flex-col items-center">
        <span className="text-sm font-medium">{t("Seconds")}</span>
        <span className="text-3xl font-bold">{formatNumber(seconds)}</span>
      </div>

      {!isRunning && (
        <span className="ml-2 font-semibold text-red-500">Finished!</span>
      )}
    </div>
  );
}

export default MyTimer;
