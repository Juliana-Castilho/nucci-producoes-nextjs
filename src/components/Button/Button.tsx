import { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLBRElement> {
  children: ReactNode;
  icon?: ReactElement;
}

export const Button = ({ children, icon }: IButtonProps) => {
  return (
    <button className="rounded-md font-bold flex justify-center item-center gap-3 p-2 bg-primary text-1xl mt-4 mb-4 w-52">
      <span>{children}</span>
      {icon}
    </button>
  );
};
