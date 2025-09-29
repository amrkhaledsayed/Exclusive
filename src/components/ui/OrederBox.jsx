import { FaCheck, FaIdCard } from 'react-icons/fa';
import { HiMiniCalendarDateRange } from 'react-icons/hi2';
import { IoTimerOutline } from 'react-icons/io5';
import { ImCancelCircle } from 'react-icons/im';
import { MdOutlineDateRange } from 'react-icons/md';
import { AiFillDollarCircle } from 'react-icons/ai';
import { LuBox } from 'react-icons/lu';
import { handleDownload } from '../Hooks/useToPDF';
import { Button } from './Button';
import { FaDownload } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';
import DrawerOrder from './DrawerOrder';

export const OrederBox = (props) => {
  const { t } = useTranslation();
  const {
    date: dateFull,
    id,
    total,
    products,
    subTotal,
    orderList,
    tax,
    shipping,
  } = props;
  const date = new Date(dateFull);
  const formattedDate = date?.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex w-full justify-between rounded-[8px] bg-white px-5.5 py-4 drop-shadow-xl transition-all hover:drop-shadow-2xl">
      <div className="flex w-full flex-col items-start gap-3">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-0.5">
            <div className="flex items-center gap-2">
              <FaIdCard size={20} className="text-red" />
              <p className="text-[18px] font-[500] text-gray-700">
                {t('Order ID #')}
              </p>
            </div>
            <p className="text-[18px] font-medium">{id}</p>
          </div>

          {orderList.state === 'pending' && (
            <button className="mt-auto flex items-center gap-1.5 self-end rounded-[8px] bg-gray-200 px-2 py-1">
              <IoTimerOutline />
              {t('pending')}
            </button>
          )}
          {orderList.state === 'completed' && (
            <button className="mt-auto flex items-center gap-1.5 self-end rounded-[8px] bg-green-500 px-2 py-1 text-white">
              <FaCheck />
              {t('completed')}
            </button>
          )}
          {orderList.state === 'canceled' && (
            <button className="mt-auto flex items-center gap-1.5 self-end rounded-[8px] bg-red-500 px-2 py-1 text-white">
              <ImCancelCircle className="text-white" />
              {t('canceled')}
            </button>
          )}
        </div>
        <div className="flex w-full flex-wrap items-center justify-between px-4">
          <div className="flex items-center gap-1">
            <MdOutlineDateRange size={20} className="text-red" />
            <div className="flex flex-col items-start">
              <p className="text-[18px] font-[500] text-gray-700">
                {t('Date Order')}
              </p>
              <p className="text-[15px] font-medium">{formattedDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <LuBox size={20} className="text-red" />
            <div className="flex flex-col items-start">
              <p className="text-[18px] font-[500] text-gray-700">
                {t('The number of products')}
              </p>
              <div>
                <p className="text-[15px] font-medium">
                  {t('Product')} {orderList.products.length}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <AiFillDollarCircle size={20} className="text-red" />
            <div className="flex flex-col items-start">
              <p className="text-[18px] font-[500] text-gray-700">
                {t('Total')}
              </p>
              <p className="text-red text-[15px] font-[500]">
                ${total.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between border-t-1 border-t-red-100 px-4"></div>
        <div className="flex w-full items-center justify-between gap-3">
          <DrawerOrder
            date={formattedDate}
            shipping={shipping}
            tax={tax}
            id={id}
            subTotal={subTotal}
            total={total}
            products={products}
            orderList={orderList}
          />
          <Button
            variant="destructive"
            onClick={() =>
              handleDownload({
                date: formattedDate,
                id,
                total,
                shipping,
                tax,
                subTotal,
                orderList,
                products,
              })
            }
          >
            <FaDownload />
            {t('Download PDF')}
          </Button>
        </div>
      </div>
    </div>
  );
};
