import React from 'react';
import styles from './Drawer.module.scss';
import CustomLink from '../../../../shared/components/drawer/components/link/Link.component';

export default function Drawer() {
  const user = localStorage.getItem('user');
  

  return (
    <div className={styles.wrapper}>
      <CustomLink name="Offices" route="/admin/offices" />
      <CustomLink name="Users" route="/admin/users" />
      <CustomLink name="Sales" route="/admin/sales" />
      <CustomLink name="Positions" route="/admin/positions" />
      <CustomLink name="Cities" route="/admin/cities" />
      <CustomLink name="Products" route="/admin/products" />
    </div>
  );
}
