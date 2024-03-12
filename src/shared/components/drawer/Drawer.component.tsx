import React from 'react';
import styles from './Drawer.module.scss';
import CustomLink from './components/link/Link.component';

export default function Drawer() {
  return (
    <div className={styles.wrapper}>
      <CustomLink name="Offices" route="/offices" />
      <CustomLink name="Users" route="/users" />
    </div>
  );
}
