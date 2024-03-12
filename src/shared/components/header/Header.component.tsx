import styles from './Header.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { FaRegUser } from 'react-icons/fa';
import CustomLink from '../drawer/components/link/Link.component';
import { useNavigate } from 'react-router-dom';
import { userActions } from '../../../modules/user/model/user.slice';

export default function Header() {
  const user = useAppSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <div>Header</div>
      <div>
        {user.isAuth ? (
          <div className={styles.avatar} onClick={() => dispatch(userActions.logout())}>
            <FaRegUser size={24} />
          </div>
        ) : (
          <CustomLink name="Login" route="login" />
        )}
      </div>
    </div>
  );
}
