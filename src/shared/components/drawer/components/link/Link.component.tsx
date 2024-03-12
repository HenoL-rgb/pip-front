import { Link, useLocation } from 'react-router-dom';
import styles from './Link.module.scss';

interface LinkProps {
  name: string;
  icon?: any;
  route: string;
}

export default function CustomLink({ name, icon, route }: LinkProps) {
  const location = useLocation();
  const className =
    location.pathname === route ? [styles.wrapper, styles.active].join(' ') : styles.wrapper;
  return (
    <Link to={route} className={className}>
      {name}
    </Link>
  );
}
