// src/views/components/Profesor/Attendance.jsx
import { useSelector } from 'react-redux';
import { useGetResumenAsistenciaQuery } from '../../../features/asistencia/asistenciaApi';
import './css/Attendance.css';

const Attendance = () => {
  // CPM viene del curso+materia seleccionado
  const cpm = useSelector(s => s.courses?.curso_profesor_materia);
  const cpmId = cpm?.id;

  const { data, isLoading, isError } = useGetResumenAsistenciaQuery(cpmId, {
    skip: !cpmId,
  });

  if (!cpmId)   return <p>Selecciona un curso/materia para ver la asistencia.</p>;
  if (isLoading) return <p>Cargando asistencia…</p>;
  if (isError)   return <p>Error cargando asistencia.</p>;
  if (!data)     return null;

  const { curso, materia, fechas = [], estudiantes = [] } = data;

  const cell = (estado) => {
    if (estado === 'Presente') return '✅';
    if (estado === 'Ausente')  return '❌';
    return '—';
  };

  return (
    <div className="attendance-wrapper">
      <h2>Asistencia — {curso?.nombre_curso} / {materia?.nombre}</h2>

      {fechas.length === 0 ? (
        <p>No hay registros de asistencia para este curso.</p>
      ) : (
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Nombre</th>
                {fechas.map(f => (
                  <th key={f}>{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e, idx) => (
                <tr key={e.id}>
                  <td>{idx + 1}</td>
                  <td>{e.nombre} {e.apellido}</td>
                  {fechas.map(f => {
                    const estado = e.asistencias?.[f]; // mapa { 'YYYY-MM-DD': 'Presente'|'Ausente' }
                    return <td key={f} className="estado">{cell(estado)}</td>;
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
