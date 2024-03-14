import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.back} onClick={() => navigate('/')}>Back to app</div>
    </div>
  );
}
