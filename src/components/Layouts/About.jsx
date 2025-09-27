import { Link } from 'react-router-dom';
import CountUp from '../common/CountUp';
import CardInfo from '../ui/CardInfo';
import CardPerson from '../ui/CardPerson';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import ServesSection from '../common/ServesSection';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

const About = () => {
  const { t, i18n } = useTranslation();
  const CardsInfo = [
    {
      logo: './Services0.svg',
      des: 'Sellers active on our site',
      from: 0,
      to: 13.5,
    },
    {
      logo: './Services01.svg',
      des: 'Monthly Product Sale',
      from: 0,
      to: 33,
    },
    {
      logo: './Services02.svg',
      des: 'Customers active in our site',
      from: 20,
      to: 45.5,
    },
    {
      logo: './Services03.svg',
      des: 'Annual gross sale in our site',
      from: 0,
      to: 25,
    },
  ];
  const teamMembers = [
    {
      image: './image 46.svg',
      name: 'Tom Cruise',
      title: 'Founder & Chairman',
    },
    { image: './image 48.svg', name: 'Emma Watson', title: 'Co-Founder' },
    { image: './image 46.svg', name: 'Chris Evans', title: 'Marketing Head' },
    {
      image: './image 48.svg',
      name: 'Scarlett Johansson',
      title: 'Lead Designer',
    },
    {
      image: './image 46.svg',
      name: 'Tom Cruise',
      title: 'Founder & Chairman',
    },
    { image: './image 48.svg', name: 'Emma Watson', title: 'Co-Founder' },
  ];
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-[80px]">
      <div className="mb-8 flex items-center text-[14px] font-normal">
        <Link to="/" className="text-gray-500">
          {t('Home')}
        </Link>
        <MdKeyboardArrowRight
          className={clsx('rotate-0', { 'rotate-180': i18n.language === 'ar' })}
        />
        <p className="text-gray-700">{t('About')}</p>
      </div>

      <div className="flex flex-col items-center justify-between gap-[75px] lg:flex-row">
        <div className="flex flex-col gap-[24px] lg:w-1/2">
          <p className="text-[54px] leading-16 font-semibold">
            {t('Our Story')}
          </p>
          <p className="text-[16px] leading-7 font-normal">
            {t(
              `Launched in 2015, Exclusive is South Asia’s premier online shopping marketplace with an active presence in Bangladesh. Supported by a wide range of tailored marketing, data, and service solutions, Exclusive has 10,500 sellers and 300 brands and serves 3 million customers across the region.`
            )}
          </p>

          <p className="text-[16px] font-normal">
            {t(
              `Exclusive has more than 1 Million products to offer, growing at a very fast pace. Exclusive offers a diverse assortment in categories ranging from consumer.`
            )}
          </p>
        </div>
        <div className="h-[400px] w-full flex-none rounded-xl bg-[#EB7EA8] lg:h-[610px] lg:w-[700px]"></div>
      </div>

      <div className="mt-[140px] flex flex-wrap justify-center gap-6">
        {CardsInfo.map((item, index) => (
          <CardInfo
            key={index}
            logo={item.logo}
            des={item.des}
            className="group min-w-[200px] flex-1"
          >
            <CountUp
              from={item.from}
              to={item.to}
              duration={2}
              className="text-4xl font-extrabold text-gray-900 group-hover:text-white md:text-6xl"
            />
            <span className="text-4xl font-extrabold text-gray-900 group-hover:text-white md:text-6xl">
              {t('K')}
            </span>
          </CardInfo>
        ))}
      </div>
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-20">
        <div className="container mx-auto">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              {t('Our Team')}
            </div>
            <h2 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
              {t('Meet Our')}{' '}
              <span className="text-red-600">{t('Experts')}</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              {t(
                'Our dedicated team of professionals brings years of experience and passion to help you achieve your goals with excellence and innovation.'
              )}
            </p>
          </div>

          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 15,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            pagination={{
              clickable: true,
              bulletClass:
                'swiper-pagination-bullet !w-4 rounded-xl !h-4 !bg-gray-400 !opacity-70 !mx-2',
              bulletActiveClass:
                'swiper-pagination-bullet-active rounded-xl !bg-red-500 !opacity-100 !scale-125',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={40}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 30,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 50,
              },
            }}
            className="pb-16"
            style={{
              overflow: 'hidden',
              maxWidth: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <CardPerson
                  image={member.image}
                  name={t(member.name)}
                  title={t(member.title)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <ServesSection />
    </div>
  );
};

export default About;
