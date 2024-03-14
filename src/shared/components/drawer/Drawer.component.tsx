import React from 'react';
import styles from './Drawer.module.scss';
import CustomLink from './components/link/Link.component';

export default function Drawer() {
  const user = localStorage.getItem('user');
  const roles = user && JSON.parse(user)?.roles;
  

  return (
    <div className={styles.wrapper}>
      <CustomLink name="Offices" route="/offices" />
      <CustomLink name="Users" route="/users" />
      {roles.includes('ADMIN') && <CustomLink name="Admin" route="/admin" />}
    </div>
  );
}
