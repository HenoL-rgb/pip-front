import React from 'react';
import Header from '../../shared/components/header/Header.component';
import { Outlet } from 'react-router-dom';
import Drawer from '../../shared/components/drawer/Drawer.component';
import styles from './Home.module.scss';

export default function Home() {
  return (
    <div>
      <Header />
      <div className={styles.main}>
        <Drawer />
        <Outlet />
      </div>
    </div>
  );
}
