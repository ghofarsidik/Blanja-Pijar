import MainRouter from './configs/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthenticated,getUser } from './configs/redux/action/authSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Jika ada token di local storage, set isAuthenticated menjadi true dan dapatkan data pengguna
      dispatch(setAuthenticated(true));
      dispatch(getUser());
    }
  }, [dispatch]);
  return (
    <MainRouter />
  );
}

export default App;
