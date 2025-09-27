import { Link } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
const CategoryCard = ({ img, titleCategory, value }) => {
  const { t } = useTranslation();

  return (
    <Link to={`AllProducts/${value}`}>
      <div className="group hover:bg-red flex min-h-[145px] min-w-[170px] flex-col items-center justify-center gap-6 rounded-md border-1 border-gray-400 transition-all">
        <div className="group-hover:text-white">{img}</div>
        <p className="font-400 text-black group-hover:text-white">
          {t(`${titleCategory}`)}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
