import { ReactNode } from 'react';
import './Link.styles.scss';

interface LinkProps {
  children?: ReactNode;
  to?: string;
  className?: string;
  onClick?: Function;
  newTab?: Function;
  removeDefaultFormatting?: boolean;
}

const Link = ({
  to,
  children,
  className,
  onClick,
  newTab,
  removeDefaultFormatting,
}: LinkProps) => {
  const additionalProps = newTab && {
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <a
      className={`${className}${
        removeDefaultFormatting ? ' remove-formatting' : ''
      }`}
      href={to}
      onClick={() => onClick?.()}
      {...additionalProps}
    >
      {children}
    </a>
  );
};

export { Link };
