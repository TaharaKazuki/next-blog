import { type ReactNode } from 'react';

type HeaderProps = {
  children: ReactNode;
};

const Header = ({ children }: HeaderProps) => {
  return <div className="bg-gray-100 p-8 dark:bg-gray-800">{children}</div>;
};

export default Header;
