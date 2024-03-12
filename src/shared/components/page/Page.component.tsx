import { PropsWithChildren } from 'react';
import styles from './Page.module.scss';

export default function Page({ children }: PropsWithChildren) {
  return <div className={styles.wrapper}>{children}</div>;
}
