// src/pages/Profesor/CourseDetail.jsx
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useGetAsistenciaByCPMQuery,
  useUpsertAsistenciaMutation,
} from '../../../features/asistencia/asistenciaApi';
import './css/CourseDetail.css';

const today = () => new Date().toISOString().slice(0, 10);

const CourseDetail = () => {
  // Del store: curso seleccionado (lista de estudiantes) y CPM seleccionado
  const { estudiantes, cpm } = useSelector((s) => ({
    estudiantes: s.courses.selectedCourse || [],             // array de estudiantes del curso
    cpm: s.courses.curso_profesor_materia,                   // { id, curso, materia, persona }
  }));

  const [fecha, setFecha] = useState(today());

  const cpmId = cpm?.id;
  const { data, isFetching } = useGetAsistenciaByCPMQuery(
    { cpmId, fecha },
    { skip: !cpmId }
  );
  const [upsertAsistencia, { isLoading: saving }] = useUpsertAsistenciaMutation();

  const estadoPorEstudiante = useMemo(() => {
    const map = new Map();
    data?.estudiantes?.forEach((e) => map.set(e.estudiante_id, e.estado));
    return map;
  }, [data]);

  if (!cpm) return <p>No hay curso seleccionado.</p>;

  const marcar = async (estudiante_id, estado) => {
    await upsertAsistencia({ cpmId, fecha, estudiante_id, estado });
  };

  return (
    <div className="seccion-curso">
      <h2>{cpm.curso?.nombre_curso} — {cpm.materia?.nombre}</h2>

      <div className="filtros-asistencia">
        <label>Fecha:&nbsp;
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        </label>
      </div>

      <h3>Asistencia</h3>
      {isFetching ? <p>Cargando…</p> : null}

      <ul className="lista-asistencia">
        {estudiantes.map((e) => {
          const estado = estadoPorEstudiante.get(e.id);
          return (
            <li key={e.id} className="estudiante">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Est."
                className="student-img"
              />
              <span>{e.nombre} {e.apellido}</span>
              <div className="attendance-buttons">
                <button
                  className={`present-btn ${estado === 'Presente' ? 'active' : ''}`}
                  onClick={() => marcar(e.id, 'Presente')}
                  disabled={saving}
                >✅</button>
                <button
                  className={`absent-btn ${estado === 'Ausente' ? 'active' : ''}`}
                  onClick={() => marcar(e.id, 'Ausente')}
                  disabled={saving}
                >❌</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CourseDetail;
