import { InputHTMLAttributes } from 'react';

const Input = ({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`w-full h-[48px] py-3 px-4 rounded-[4px] border border-[#D1D1D1] outline-none text-[16px] placeholder:text-[#BABABA] ${className || ''}`}
      {...props}
    />
  );
};

export default Input;
