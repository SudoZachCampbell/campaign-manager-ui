import { FC, MouseEvent } from 'react';
import './Button.styles.scss';

type ButtonTypes = 'submit' | 'info';

interface ButtonProps {
  text: string;
  type?: ButtonTypes;
  submit?: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLInputElement>) => void;
}

export const Button: FC<ButtonProps> = ({
  text,
  type = 'info',
  submit,
  className = '',
  onClick,
}) => {
  return (
    <input
      type={submit ? 'submit' : 'button'}
      className={`${className} button ${type}`}
      value={text}
      onClick={onClick}
    />
  );
};
