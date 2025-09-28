import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { FaLocationDot, FaPaypal } from 'react-icons/fa6';
import { AddCard } from './AddCard';
import { RiVisaLine } from 'react-icons/ri';
import { GrAmex } from 'react-icons/gr';
import React from 'react';
import { CreditCard } from 'lucide-react';

const TapPayement = ({ CardsList }) => {
  const { t } = useTranslation();
  if (CardsList.length === 0) {
    return (
      <div className="mx-auto flex max-w-[500px] flex-col items-center justify-center gap-5 py-20">
        <div className="w-fit rounded-[14px] border-1 border-gray-300 p-5">
          <CreditCard size="3rem" className="text-red" />
        </div>
        <p className="text-lg font-semibold">{t(`No Payement added yet`)}</p>
      </div>
    );
  }
  return (
    <div className="font-sans">
      <div className="border-b-1 border-b-red-100">
        <div className="flex flex-wrap items-center justify-between gap-5 px-5 pt-5 pb-5 sm:flex-row sm:items-center md:gap-2 md:px-11 md:py-6 md:pb-11">
          <div className="flex items-start gap-3 md:items-center">
            <div className="rounded-lg bg-red-50 p-2">
              <FaLocationDot className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-red-500 md:text-2xl">
                {t('My Payment Options')}
              </h3>
              <p className="text-muted-foreground md:text-body-m mt-1 text-sm">
                {t('Manage your payment methods and billing information')}
              </p>
            </div>
          </div>
          <AddCard />
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1 content-center justify-items-center gap-4 px-5 pt-5 pb-5 md:grid-cols-2 md:px-11 md:py-6 md:pb-11">
        {CardsList.length === 0 && (
          <p className="text-gray-600">
            {t('You haven’t added any payment methods yet.')}
          </p>
        )}
        {CardsList.map((card, index) => (
          <div
            key={index}
            className="flip-card font-inter h-[11rem] w-full max-w-[310px] sm:w-[19rem]"
          >
            <div className="flip-card-inner">
              <div
                className={clsx(
                  'flip-card-front bg-repeat-space px-3',
                  card.Card_type === 'payPal' &&
                    'glass bg-[url("/freepik__retouch__70372.png")] bg-cover bg-center bg-no-repeat shadow-lg backdrop-blur-sm',
                  card.Card_type === 'visa' &&
                    'bg-[url(https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg)]',
                  card.Card_type === 'mastercard' &&
                    'bg-[url("/Zi6v09P-mgur.png")] bg-center',
                  card.Card_type === 'vodafonecash' &&
                    'bg-[#ee2222a2] bg-center backdrop-blur-2xl'
                )}
              >
                <div className="mb-4 flex items-center justify-between">
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="30px"
                    height="30px"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                  >
                    <image
                      id="image0"
                      width={50}
                      height={50}
                      x={0}
                      y={0}
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
                              fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
                              ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
                              e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
                              ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
                              u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
                              fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
                              lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
                              tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
                              g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
                              /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
                              orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
                              GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
                              OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
                              I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
                              lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
                              JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
                              qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
                              1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
                              BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
                              amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
                              S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
                              cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
                              MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
                              LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
                    />
                  </svg>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="20px"
                    height="20px"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <image
                      id="image0"
                      width={50}
                      height={50}
                      x={0}
                      y={0}
                      href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
                              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
                              cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
                              lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
                              fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
                              GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
                              VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
                              HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
                              bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
                              DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
                              qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
                              sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
                              Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
                              XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
                              cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
                              nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
                              xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
                              MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
                              OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
                              MDowMIXeN6gAAAAASUVORK5CYII="
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col items-start gap-1">
                    <p className="font-mono text-[17px] md:text-lg">
                      {card.Card_number}
                    </p>
                    <div className="flex w-full items-center justify-between">
                      <p className="text-[10px] font-bold tracking-wide text-gray-400">
                        {t('VALID THRU')}
                      </p>
                      <p className="date_8264">{card.Expiry_date}</p>
                    </div>
                    <p className="name tracking-[0.15rem]">
                      {card.Card_owner.toUpperCase()}
                    </p>
                  </div>
                  {card.Card_type === 'mastercard' && (
                    <svg
                      className="logo"
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width={36}
                      height={36}
                      viewBox="0 0 48 48"
                    >
                      <path
                        fill="#ff9800"
                        d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                      />
                      <path
                        fill="#d50000"
                        d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                      />
                      <path
                        fill="#ff3d00"
                        d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                      />
                    </svg>
                  )}
                  {card.Card_type === 'visa' && (
                    <RiVisaLine className="logo self-end" size={36} />
                  )}
                  {card.Card_type === 'vodafonecash' && (
                    <img
                      src="/vodafone.png"
                      className="logo self-end"
                      size={36}
                    />
                  )}
                  {card.Card_type === 'Amex' && (
                    <GrAmex className="logo self-end" size={36} />
                  )}
                  {card.Card_type === 'payPal' && (
                    <FaPaypal className="self-end" size={36} />
                  )}
                </div>
              </div>
              <div
                className={clsx(
                  'flip-card-back',
                  card.Card_type === 'payPal' &&
                    'glass bg-[url("/freepik__retouch__70372.png")] bg-cover bg-center bg-no-repeat shadow-lg backdrop-blur-sm',
                  card.Card_type === 'visa' &&
                    'bg-[url(https://i.ibb.co/LPLv5MD/Payment-Card-01.jpg)]',
                  card.Card_type === 'mastercard' &&
                    'bg-[url("/Zi6v09P-mgur.png")] bg-center',
                  card.Card_type === 'vodafonecash' &&
                    'bg-[#ee2222a2] bg-center backdrop-blur-2xl'
                )}
              >
                <div className="strip" />
                <div className="mt-5 flex items-center justify-between gap-5">
                  <div className="mstrip" />
                  <div className="sstrip">
                    <p className="code">{card.CVV2}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default React.memo(TapPayement);
