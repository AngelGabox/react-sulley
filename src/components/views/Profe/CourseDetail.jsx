// src/components/views/Profesor/CourseDetail.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './css/CourseDetail.css';
import Attendance from './Attendance';
import Activities from './Activities';

const CourseDetail = () => {
  // Curso/Materia seleccionados desde Redux
  const cpm = useSelector((s) => s.courses.curso_profesor_materia);
  
  // Tabs: resumen | asistencia | notas | actividades | estudiantes | archivos
  const [tab, setTab] = useState('resumen');
  
  const TabBtn = ({ id, children }) => (
    <button
    className={`cd-tab ${tab === id ? 'active' : ''}`}
    onClick={() => setTab(id)}
    type="button"
    >
      {children}
    </button>
  );
  
  const renderTabContent = () => {
    switch (tab) {
      case 'resumen':
        return (
          <div className="cd-panel">
            <h3>Resumen</h3>
            <p>Próximamente: tarjetas con estudiantes, % asistencia, promedio, etc.</p>
          </div>
        );
        case 'asistencia':
          return (
            <>
              <Attendance></Attendance>
            </>
        );
        case 'notas':
          return (
            <div className="cd-panel">
            <h3>Notas</h3>
            <p>Tabla de calificaciones y promedios (pendiente de implementar).</p>
          </div>
        );
        case 'actividades':
          return (
            <div className="cd-panel">
            <h3>Actividades</h3>
            <Activities></Activities>
          </div>
        );
        case 'estudiantes':
          return (
            <div className="cd-panel">
            <h3>Estudiantes</h3>
            <p>Listado de estudiantes del curso (pendiente de implementar).</p>
          </div>
        );
        case 'archivos':
          return (
            <div className="cd-panel">
            <h3>Archivos</h3>
            <p>Material del curso (pendiente de implementar).</p>
          </div>
        );
        default:
          return null;
        }
      };
      // if (!cpm) return <p>Selecciona un curso para ver el detalle.</p>;
        
      return (
        <section className="course-detail">
      {/* Encabezado */}
      <header className="cd-header">
        <div className="cd-breadcrumb">
          <span className="cd-crumb">Mis cursos</span>
          <span className="cd-sep">›</span>
          <span className="cd-curso">{cpm.curso?.nombre_curso}</span>
        </div>

        <div className="cd-actions">
          <button
            className="cd-primary"
            type="button"
            onClick={() => setTab('asistencia')}
            title="Ir a asistencia de hoy"
          >
            Tomar asistencia hoy
          </button>
          {/* Iconos/acciones extra podrían ir aquí */}
        </div>
      </header>

      {/* Subtítulo con materia */}
      <div className="cd-subtitle">
        <strong>Materia:</strong>&nbsp;{cpm.materia?.nombre}
      </div>

      {/* Mini Navbar (tabs) */}
      <nav className="cd-tabs">
        <TabBtn id="resumen">Resumen</TabBtn>
        <TabBtn id="asistencia">Asistencia</TabBtn>
        <TabBtn id="notas">Notas</TabBtn>
        <TabBtn id="actividades">Actividades</TabBtn>
        <TabBtn id="estudiantes">Estudiantes</TabBtn>
        <TabBtn id="archivos">Archivos</TabBtn>
      </nav>

      {/* Contenido de cada tab */}
      <div className="cd-content">{renderTabContent()}</div>
    </section>
  );
};

export default CourseDetail;
