import React from 'react';
import styles from './Login.module.scss';
import LoginForm from './components/LoginForm.component';

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
}
