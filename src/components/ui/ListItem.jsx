import { useTranslation } from "react-i18next";
import { Link } from "react-router";

export function ListItem({ title, description, href, image, price }) {
  const { t } = useTranslation();

  return (
    <Link
      to={href}
      className="flex h-full max-w-[200px] flex-col items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
    >
      {image && (
        <div className="flex w-full justify-center">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="h-32 w-32 rounded-md object-cover transition-all duration-300 ease-in-out hover:scale-105"
          />
        </div>
      )}
      <div className="flex w-full flex-col gap-2">
        <h3 className="text-lg leading-tight font-semibold text-gray-900">
          {t(`titles.${title}`)}
        </h3>
        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {t(`description.${description}`)}
        </p>
        {price && (
          <div className="mt-auto border-t border-gray-100 pt-3">
            <p className="text-xl font-bold text-red-500">{price}</p>
          </div>
        )}
      </div>
    </Link>
  );
}
