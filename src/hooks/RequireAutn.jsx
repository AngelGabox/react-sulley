// src/components/RequireAuth.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setUser } from '../features/user/userSlice';

const RequireAuth = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    // Si el usuario no está en Redux pero sí en sessionStorage, lo restauramos
    if (!user && sessionStorage.getItem('user')) {
      const savedUser = JSON.parse(sessionStorage.getItem('user'));
      dispatch(setUser(savedUser));
    }
  }, [user, dispatch]);

  // Si el usuario no existe ni en Redux ni en sessionStorage, redirigir al login
  if (!user && !sessionStorage.getItem('user')) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, se muestra el contenido protegido
  return children;
};

export default RequireAuth;
