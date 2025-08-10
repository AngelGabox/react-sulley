// src/pages/Profesor/CursoDetail.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useCrearClaseMutation } from '../../../features/clase/claseApi';
import { useGetAsistenciaByClaseQuery, useUpsertAsistenciaMutation } from '../../../features/asistencia/asistenciaApi';
import './css/CourseDetail.css';

const CursoDetail = () => {
  const { curso, cpm, currentClass } = useSelector((s) => ({
    curso: s.courses.selectedCourse,                 // lista de estudiantes
    cpm:   s.courses.curso_profesor_materia,         // { id, curso, materia, persona }
    currentClass: s.clase.current,                   // clase actual (del slice que hicimos)
  }));

  const [crearClase, { isLoading }] = useCrearClaseMutation();
  const [showAttendance, setShowAttendance] = useState(false);

  const claseId = currentClass?.id;
  const { data: asistenciaData, refetch } = useGetAsistenciaByClaseQuery(claseId, {
    skip: !showAttendance || !claseId,
  });
  const [upsertAsistencia] = useUpsertAsistenciaMutation();

  const claseEnCurso = currentClass?.status === 'running';

  const toggleAsistencia = () => {
    setShowAttendance(v => !v);
    if (!showAttendance && claseId) refetch();
  };

  const estadoById = new Map(
    asistenciaData?.estudiantes?.map(e => [e.estudiante_id, e.estado]) || []
  );

  const marcar = async (estudiante_id, estado) => {
    if (!claseId) return;
    await upsertAsistencia({ claseId, estudiante_id, estado });
  };

  if (!cpm) return <p>No hay curso seleccionado.</p>;

  return (
    <div className="seccion-curso">
      <h2>{cpm.curso?.nombre_curso} — {cpm.materia?.nombre}</h2>

      {/* ... tu bloque para crear clase y duración, tal como lo dejaste ... */}

      {claseEnCurso && (
        <button className="crear-clase" onClick={toggleAsistencia}>
          {showAttendance ? 'Ocultar asistencia' : 'Tomar asistencia'}
        </button>
      )}

      {showAttendance && (
        <>
          <h3>Asistencia de la clase</h3>
          {asistenciaData?.asistencia_tomada && (
            <p className="ok">Asistencia completa.</p>
          )}
        </>
      )}

      <h3>Estudiantes:</h3>
      <div className="seccion-asistencia">
        <ul className="lista-asistencia">
          {curso?.map((e) => {
            const estado = estadoById.get(e.id); // "Presente" | "Ausente" | undefined
            return (
              <li key={e.id} className="estudiante">
                <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Estudiante" className="student-img" />
                <span>{e.nombre} {e.apellido}</span>

                {showAttendance ? (
                  <div className="attendance-buttons">
                    <button
                      className={`present-btn ${estado === 'Presente' ? 'active' : ''}`}
                      onClick={() => marcar(e.id, 'Presente')}
                      disabled={!claseEnCurso}
                    >
                      ✅
                    </button>
                    <button
                      className={`absent-btn ${estado === 'Ausente' ? 'active' : ''}`}
                      onClick={() => marcar(e.id, 'Ausente')}
                      disabled={!claseEnCurso}
                    >
                      ❌
                    </button>
                  </div>
                ) : (
                  <div className="attendance-status">
                    {estado ? <span>{estado}</span> : <span>—</span>}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CursoDetail;
