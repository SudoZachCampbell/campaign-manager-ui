import { ReactNode } from 'react';

interface LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const Link = ({ to, children, className }: LinkProps) => {
  return (
    <a className={className} href={to}>
      {children}
    </a>
  );
};

export { Link };
