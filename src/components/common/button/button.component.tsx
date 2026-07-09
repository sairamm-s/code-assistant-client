import { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.component.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
}

const ButtonComponent = ({ variant = 'primary', children, className, ...rest }: ButtonProps) => {
  const classes = ['button', `button--${variant}`, className].filter(Boolean).join(' ');
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
};

export default ButtonComponent;
