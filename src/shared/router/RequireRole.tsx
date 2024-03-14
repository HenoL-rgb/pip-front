import { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequireRole({ children, role }: PropsWithChildren<{ role: string }>) {
  const user = localStorage.getItem('user');
  const roles = user && JSON.parse(user)?.roles;
  const location = useLocation();
  
  if (!roles.includes(role)) {
    return <Navigate to={'/'} state={{ from: location }} replace />;
  }

  return children;
}
