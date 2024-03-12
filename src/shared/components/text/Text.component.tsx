import React from 'react';
import styles from './Text.module.scss';

type TextVariants = 'header' | 'common';
type TextSize = 'small' | 'medium' | 'big';

interface TextProps {
  variant?: TextVariants;
  color?: string;
  size?: TextSize;
  text: string;
}

export default function Text({ variant = 'common', size, text }: TextProps) {
  const style = [styles[variant]].join(' ');

  return <div className={style}>{text}</div>;
}
