import { CSSProperties, FC, MouseEvent } from 'react';
import './Button.styles.scss';

type ButtonTypes = 'submit' | 'info' | 'button' | 'add';

interface ButtonProps {
  type?: ButtonTypes;
  className?: string;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
  children: string | string[];
  style?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
  type = 'info',
  className = '',
  onClick,
  style,
  children,
}) => {
  return (
    <input
      type={type === 'submit' ? 'submit' : 'button'}
      className={`${className} button ${type}`}
      value={children}
      onClick={onClick}
      style={style}
    />
  );
};
