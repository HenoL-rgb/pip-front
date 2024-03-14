import { createBrowserRouter } from 'react-router-dom';
import Home from '../../modules/home/Home.component';
import Offices from '../../modules/offices/Offices.component';
import Office from '../../modules/offices/components/office/Office.component';
import ErrorPage from '../components/errorPage/ErrorPage.component';
import Users from '../../modules/users/Users.component';
import User from '../../modules/user/User.component';
import RequireAuth from './RequireAuth';
import Login from '../../modules/login/Login.component';
import AdminPage from '../../modules/admin/AdminPage.component';
import RequireRole from './RequireRole';
import AdminUsers from '../../modules/admin/screens/Users/Users.component';
import AdminOffices from '../../modules/admin/screens/Apartments/Apartments.component';
import AdminSales from '../../modules/admin/screens/Sales/Sales.component';
import Products from '../../modules/admin/screens/Products/Products.component';
import Sales from '../../modules/sales/Sales.component';
import Positions from '../../modules/admin/screens/Positions/Positions.component';
import Cities from '../../modules/admin/screens/Cities/Cities.component';

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
  {
    path: '/admin',
    element: (
      <RequireRole role="ADMIN">
        <AdminPage />
      </RequireRole>
    ),
    children: [
      {
        path: '/admin/users',
        element: <AdminUsers />,
      },
      {
        path: '/admin/sales',
        element: <AdminSales />,
      },
      {
        path: '/admin/offices',
        element: <AdminOffices />,
      },
      {
        path: '/admin/products',
        element: <Products />,
      },
      {
        path: '/admin/sales',
        element: <Sales />,
      },
      {
        path: '/admin/positions',
        element: <Positions />,
      },
      {
        path: '/admin/cities',
        element: <Cities />,
      },
    ],
  },
]);
