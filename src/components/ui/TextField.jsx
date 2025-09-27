import React from 'react';

const TextField = ({
  variant = 'primary',
  size = 'lg',
  isFullWidth,
  isDisabled,
  className = '',
  placeholder,
  defaultValue,
  ...rest
}) => {
  const baseStyles =
    'rounded-sm px-6 duration-200 text-[13px]  bg-[#f5f5f5] flex items-center justify-center borde-b-1';

  const variants = {
    primary: 'text-black border border-none ',
  };

  const sizes = {
    sm: 'h-10',
    lg: 'h-12',
  };

  const disabledStyles = isDisabled ? 'cursor-not-allowed opacity-25' : '';

  const fullWidth = isFullWidth ? 'w-full' : '';

  return (
    <input
      placeholder={placeholder}
      disabled={isDisabled}
      defaultValue={defaultValue}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth} ${disabledStyles} ${className} `}
      {...rest}
    />
  );
};

export default React.memo(TextField);
