import { useTranslation } from 'react-i18next';

const CardInfo = (props) => {
  const { logo, children, des } = props;
  const { t } = useTranslation();
  return (
    <div className="group flex h-[300px] w-[280px] flex-col items-center rounded-lg border-1 border-gray-300 px-[35px] py-[32px] transition-all ease-in-out hover:bg-red-400 hover:text-white">
      <img
        src={logo}
        alt={t(`${des}`)}
        className="mb-4 rounded-[50%] bg-[#978f8f] group-hover:text-white"
      />
      <div className="mt-auto flex gap-1">{children}</div>
      <p className="mt-auto text-[16px] font-normal">{t(`${des}`)}</p>
    </div>
  );
};
export default CardInfo;
