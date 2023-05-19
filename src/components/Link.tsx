import { ReactNode } from 'react';

interface LinkProps {
  children?: ReactNode;
  to?: string;
  className?: string;
  onClick?: Function;
  newTab?: Function;
}

const Link = ({ to, children, className, onClick, newTab }: LinkProps) => {
  const additionalProps = newTab && {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <a
      className={className}
      href={to}
      onClick={() => onClick?.()}
      {...additionalProps}
    >
      {children}
    </a>
  );
};

export { Link };
