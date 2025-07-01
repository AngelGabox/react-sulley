// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../../features/user/userApi';
import { setUser } from '../../../features/user/userSlice';
import './login.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = form;
    if (!username || !password) {
      return alert('Completa usuario y contraseña');
    }
    try {
      const response = await login({ username, password }).unwrap();
      const { access, refresh, usuario } = response;

      // Guardar tokens
      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);

      // Guardar datos de usuario
      sessionStorage.setItem('user', JSON.stringify(usuario));
      dispatch(setUser(usuario));

      // Redirigir según rol
      switch (usuario.rol) {
        case 'Administrador': navigate('/admin/'); break;
        case 'Profesor':      navigate('/profesor/'); break;
        case 'Acudiente':     navigate('/acudiente/'); break;
        default:              navigate('/');
      }
    } catch (err) {
      alert('Credenciales incorrectas');
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <button className="inicio" onClick={() => navigate('/')}>Inicio</button>
      <div className="logo">
        <img src="/imagenes/logo-jardin.png" alt="logo-jardin" />
      </div>
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            autoComplete="username"
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="current-password"
          />

          <button type="submit" className="boton-login" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
        <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
      </div>
    </div>
  );
};

export default Login;
