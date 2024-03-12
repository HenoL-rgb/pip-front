import { createBrowserRouter } from 'react-router-dom';
import Login from '../../modules/login/Login.component';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
]);
