import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './shared/router/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';
import { useAppDispatch, useAppSelector } from './shared/hooks/redux-hooks';
import { useEffect } from 'react';
import { userActions } from './modules/user/model/user.slice';

function App() {
  const inited = useAppSelector((state) => state.userReducer._inited);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  if (!inited) {
    return <div>Loading</div>;
  }

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
