import { createBrowserRouter } from 'react-router-dom';
import Home from '../../modules/home/Home.component';
import Offices from '../../modules/offices/Offices.component';
import Office from '../../modules/offices/components/office/Office.component';
import ErrorPage from '../components/errorPage/ErrorPage.component';
import Users from '../../modules/users/Users.component';
import User from '../../modules/user/User.component';
import RequireAuth from './RequireAuth';
import Login from '../../modules/login/Login.component';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RequireAuth>
        <Home />
      </RequireAuth>
    ),
    children: [
      {
        path: '/offices',
        element: <Offices />,
        index: true,
      },
      {
        path: '/offices/:id',
        element: <Office />,
        errorElement: <ErrorPage error="Office is not found" />,
      },
      {
        path: '/users',
        element: <Users />,
      },
      {
        path: '/users/:id',
        element: <User />,
        errorElement: <ErrorPage error="User is not found" />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);
