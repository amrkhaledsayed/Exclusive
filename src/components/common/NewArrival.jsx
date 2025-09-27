import playStation from '@public/ps5-slim-goedkope-playstation_large 1.svg';
import speaker from '@public/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.svg';
import perfume from '@public/652e82cd70aa6522dd785109a455904c.svg';
import { useTranslation } from 'react-i18next';
import ItemArrival from '../ui/ItemArrival';

const NewArrival = () => {
  const { t } = useTranslation();
  const data = [
    {
      img: speaker,
      title: 'Speakers',
      des: 'Amazon wireless speakers',
    },
    {
      img: perfume,
      title: 'Perfume',
      des: 'GUCCI INTENSE OUD EDP',
    },
  ];
  return (
    <div className="mx-auto mt-[50px] w-full max-w-[1200px] px-4">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="h-[40px] w-[20px] rounded-[5px] bg-[#db4444]"></span>
          <p className="text-lg font-medium text-[#db4444]">{t('Featured')}</p>
        </div>
        <h3 className="text-4xl leading-tight font-semibold">
          {t('New Arrival')}
        </h3>
      </div>

      <div className="flex flex-col w-full gap-8 md:flex-row">
        <div className="relative w-full md:w-1/2 overflow-hidden rounded-lg bg-black px-8 pt-24 ">
          <img
            loading="lazy"
            src={playStation}
            alt="PlayStation 5"
            className="relative z-10"
          />
          <div className="absolute bottom-0 left-0 z-20 flex w-full flex-col items-start gap-3 bg-[#00000044] p-4 text-white backdrop-blur-sm">
            <p className="text-lg font-semibold">{t('PlayStation 5')}</p>
            <p className="mt-1 text-sm">
              {t('Black and White version of the PS5 coming out on sale.')}
            </p>
            <button className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-full border-2 border-white/30 px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-in-out hover:scale-105 hover:border-white/60 rtl:flex-row-reverse">
              {t('SHOP NOW')}
              <svg
                className="h-6 w-6 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                className="absolute top-0 left-[-100px] h-full w-[100px] bg-gradient-to-r from-transparent via-white/80 to-transparent opacity-60"
                style={{
                  animation: 'shine 1.5s ease-out infinite',
                  position: 'absolute',
                }}
              ></span>
              <style>
                {`
          @keyframes shine {
            0% { left: -100px; }
            100% { left: 100%; }
          }
        `}
              </style>
            </button>
          </div>
        </div>

        <div className="flex md:w-1/2 flex-col gap-8 w-full">
          <div className="relative overflow-hidden rounded-lg bg-black px-6 pt-36 pb-6">
            <ItemArrival
              className="max-h-[100px]"
              img={false}
              title={'Women’s Collections'}
              des={'Featured woman collections that give you another vibe.'}
            />
          </div>
          <div className="flex flex-1 flex-col md:flex-row gap-6 md:gap-4">
            {data?.map((item, index) => (
              <ItemArrival
                key={index}
                img={item.img}
                title={item.title}
                des={item.des}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
