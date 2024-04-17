import { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Is this the principal call to action on the page?
   */
  styling?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'plain'
    | 'clear'
    | 'info'
    | 'warning';
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  className?: string;
  /**
   * Button contents
   */
  children: ReactNode;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  styling = 'plain',
  size = 'medium',
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      type='button'
      className={['button', size, styling, className].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};
