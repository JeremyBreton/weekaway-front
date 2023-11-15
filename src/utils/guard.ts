import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NotificationType,
  showNotification,
} from '../store/reducers/notification';
import { getCookie } from './cookieUtils';
import { useAppDispatch } from '../hooks/redux';

function PrivateRoute() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthenticated = useState(!!getCookie('token'));
  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(
        showNotification({
          message: 'Vous devez être connecté !',
          type: NotificationType.Error,
        })
      );
      navigate('/signin');
    }
  }, [dispatch, isAuthenticated, navigate]);
}

export default PrivateRoute;
