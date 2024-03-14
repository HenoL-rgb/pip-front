import React from 'react';
import Drawer from './components/Drawer/Drawer.component';
import { Outlet } from 'react-router-dom';
import styles from './AdminPage.module.scss';
import Header from './components/Header/Header.component';

export default function AdminPage() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>
        <Drawer />
        <Outlet />
      </div>
    </div>
  );
}
