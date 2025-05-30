// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [form, setForm] = useState({
    nombre_usuario: '',
    contrasena: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí podrías hacer la petición a la API (ej: axios.post(...))
    if (form.nombre_usuario && form.contrasena) {
      console.log('Usuario:', form.nombre_usuario);
      navigate('/admin/estudiantes'); // Redirige a Estudiantes
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
          <label htmlFor="nombre_usuario">Nombre de Usuario:</label>
          <input
            type="text"
            name="nombre_usuario"
            id="nombre_usuario"
            value={form.nombre_usuario}
            onChange={handleChange}
          />

          <label htmlFor="contrasena">Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            id="contrasena"
            value={form.contrasena}
            onChange={handleChange}
          />

          <button type="submit" className="boton-login">Iniciar Sesión</button>
        </form>

        <p>¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
      </div>
    </div>
  );
};

export default Login;
