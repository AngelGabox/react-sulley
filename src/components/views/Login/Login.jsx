// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from '../../../features/user/userApi';
import { setUser } from '../../../features/user/userSlice';
import './login.css';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (form.email && form.password) {
    try {
      const response = await login(form).unwrap();
      const userData = response.usuario;

      // Guarda los datos del usuario en Redux
      dispatch(setUser(userData));

      // Guarda en sessionStorage y localStorage para persistencia
      sessionStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('user', userData.ID_Usuario); // o el campo que represente el ID único

      navigate('/admin/');
    } catch (error) {
      alert('Credenciales incorrectas o usuario no encontrado');
      console.error(error);
    }
  } else {
    alert('Por favor completa todos los campos');
  }
};


  return (
    <div className="login-wrapper">
      <button type="button" className="inicio" onClick={() => navigate('/')}>Inicio</button>

      <div className="logo">
        <img src="/imagenes/logo-jardin.png" alt="logo-jardin" />
      </div>

      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            autoComplete='true'
                     />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            onChange={handleChange}
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

