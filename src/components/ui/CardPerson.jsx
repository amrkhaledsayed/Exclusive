import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa6';
import { RiInstagramLine } from 'react-icons/ri';
const CardPerson = (props) => {
  const { image, name, title } = props;
  return (
    <div className="group mx-auto max-w-sm transform rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative mb-6">
        <div className="relative mx-auto">
          <img
            src={image || '/placeholder.svg'}
            alt={name}
            className="h-full w-full rounded-full border-4 border-gray-100 object-cover transition-colors duration-300 group-hover:border-red-200"
          />
        </div>
      </div>
      <h3 className="mb-2 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-red-600">
        {name}
      </h3>
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <div className="mt-4 flex justify-center space-x-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-red-500 hover:text-white">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-red-500 hover:text-white">
          <FaLinkedinIn className="h-4 w-4" />
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-red-500 hover:text-white">
          <RiInstagramLine className="h-4 w-4" />
        </div>{' '}
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-red-500 hover:text-white">
          <FaFacebookF className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};
export default CardPerson;
