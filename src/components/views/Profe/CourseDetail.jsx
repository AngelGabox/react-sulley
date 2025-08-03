// src/pages/Profesor/CourseDetail.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useCrearClaseMutation } from '../../../features/classes/claseApi'
const CourseDetail = () => {
  const {curso, cpm} = useSelector((state) => ({
    curso: state.courses.selectedCourse, 
    cpm : state.courses.curso_profesor_materia
  }));
  console.log("CourseDetail - curso", curso);
  
  
  
  // en slice de cursos guarda el objeto seleccionado,
  // que en este caso es un registro de CursoProfesorMateria:
  // { id:6, curso:{…}, materia:{…}, persona:{…} }
  const [crearClase, { isLoading, error }] = useCrearClaseMutation()
  
  if (!curso) return <p>No hay curso seleccionado.</p>;
  
  const handleEmpezarClase = async () => {
    try {
      const hoy = new Date().toISOString().slice(0,10) // "YYYY-MM-DD"
      
      const nueva = await crearClase({
        dictada_por: cpm.id,
        fecha: hoy, 
        duracion: "01:30:00"
      }).unwrap()
      console.log('Clase creada:', nueva)
      alert('Clase iniciada con éxito')
    } catch (err) {
      console.error(err)
      alert('No se pudo iniciar la clase')
    }
  }

  return (
    <div className="courses-section">
     <h2>
        {cpm.curso?.nombre_curso} — {cpm.materia.nombre}
      </h2>

      <button
        className="btn"
        onClick={handleEmpezarClase}
        disabled={isLoading}
      >
        {isLoading ? 'Iniciando...' : 'Empezar Clase'}
      </button>

      {error && (
        <p className="error">
          Ocurrió un error al iniciar la clase.
        </p>
      )}
      
      <h3>Estudiantes:</h3>
      <div className='attendance-section'>
        <div className="attendance-list">

              <div className="student">
                  <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Estudiante" className="student-img"/>
                  <span>Juan Pérez</span>
                  <div className="attendance-buttons">
                      <button className="present-btn">✅</button>
                      <button className="absent-btn">❌</button>
                  </div>
              </div>
            <ul>
              {curso?.map((e) => (
                // <li key={e.id}>
                //   {e.nombre} {e.apellido}
                // </li>
                <div className="student">
                  <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Estudiante" className="student-img"/>
                  <span>{e.nombre} {e.apellido}</span>
                  <div className="attendance-buttons">
                      <button className="present-btn">✅</button>
                      <button className="absent-btn">❌</button>
                  </div>
              </div>
              ))}
            </ul>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
