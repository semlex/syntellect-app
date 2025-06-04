import { ButtonHTMLAttributes } from 'react';

import styles from './button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={`${className} ${styles.button}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
