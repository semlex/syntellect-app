import { InputHTMLAttributes } from 'react';

import styles from './input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ className, ...props }: InputProps) => {
  return <input className={`${styles.input} ${className}`} {...props} />;
};

export default Input;
