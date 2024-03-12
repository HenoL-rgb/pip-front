import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux-hooks';

export default function RequireAuth({ children }: PropsWithChildren) {
  const auth = useAppSelector((state) => state.userReducer?.isAuth);
  console.log(auth)
  const location = useLocation();

  if (!auth) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return children;
}
