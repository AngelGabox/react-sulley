// src/views/components/Profesor/Attendance.jsx
import { useSelector } from 'react-redux';
import { useGetResumenAsistenciaQuery } from '../../../features/asistencia/asistenciaApi';
import './css/Attendance.css';

const Attendance = () => {
  // 1) Origen del CPM: si hay clase activa, usamos el snapshot; si no, el seleccionado
  const cpmFromClase = useSelector(s => s.clase?.current?.cpmSnapshot);
  const cpmFromCursos = useSelector(s => s.courses?.curso_profesor_materia);
  const cpm = cpmFromClase || cpmFromCursos;

  const cpmId = cpm?.id;
  const { data, isLoading, isError } = useGetResumenAsistenciaQuery(cpmId, {
    skip: !cpmId
  });

  if (!cpm) return <p>Selecciona un curso/materia para ver la asistencia.</p>;
  if (isLoading) return <p>Cargando asistencia…</p>;
  if (isError)   return <p>Error cargando asistencia.</p>;
  if (!data)     return null;

  const { curso, materia, clases = [], estudiantes = [] } = data;

  // helper para mostrar el estado con icono
  const cell = (estado) => {
    if (estado === 'Presente') return '✅';
    if (estado === 'Ausente')  return '❌';
    return '—';
  };

  return (
    <div className="attendance-wrapper">
      <h2>Asistencia — {curso?.nombre_curso} / {materia?.nombre}</h2>

      {clases.length === 0 ? (
        <p>No hay clases registradas para este curso.</p>
      ) : (
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th style={{width:60}}>No</th>
                <th>Nombre</th>
                {clases.map(c => (
                  <th key={c.id} title={`Clase #${c.id}`}>{c.fecha}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e, idx) => (
                <tr key={e.id}>
                  <td>{idx + 1}</td>
                  <td>{e.nombre} {e.apellido}</td>
                  {clases.map(c => {
                    const estado = e.asistencias?.[String(c.id)];
                    return <td key={c.id} className="estado">{cell(estado)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
