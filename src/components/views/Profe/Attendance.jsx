// src/components/views/Profesor/Attendance.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useGetResumenAsistenciaQuery,
  useUpsertAsistenciaMutation,
  asistenciaApi,
} from '../../../features/asistencia/asistenciaApi';
import './css/Attendance.css';

const ESTADOS = ['Presente', 'Tarde', 'Ausente'];

function todayISO() {
  const d = new Date();
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

const Attendance = () => {
  // CPM viene del curso+materia seleccionado
  const cpm = useSelector((s) => s.courses?.curso_profesor_materia);
  const cpmId = cpm?.id;

  const { data, isLoading, isError } = useGetResumenAsistenciaQuery(cpmId, {
    skip: !cpmId,
  });

  const dispatch = useDispatch();
  const [upsertAsistencia, { isLoading: isSaving }] = useUpsertAsistenciaMutation();

  // Fecha seleccionada para crear/activar columna
  const [fechaSeleccionada, setFechaSeleccionada] = useState(todayISO());

  // Modo edición por celda (flujo antiguo)
  const [editing, setEditing] = useState(null); // { estudianteId, fecha } | null
  const [selectedEstado, setSelectedEstado] = useState(null);

  // Fecha de columna "activa" recién creada (todas las celdas sin estado se muestran con <select>)
  const [editingColumnDate, setEditingColumnDate] = useState(null);

  // Control de guardados por celda en modo rápido
  // clave = `${estudianteId}:${fecha}`
  const [savingMap, setSavingMap] = useState({});

  useEffect(() => {
    if (!editing) setSelectedEstado(null);
  }, [editing]);

  if (!cpmId) return <p>Selecciona un curso/materia para ver la asistencia.</p>;
  if (isLoading) return <p>Cargando asistencia…</p>;
  if (isError) return <p>Error cargando asistencia.</p>;
  if (!data) return null;

  const { curso, materia, fechas = [], estudiantes = [] } = data;
  const allFechas = data.fechas || fechas;

  const cellIcon = (estado) => {
    if (estado === 'Presente') return '✅';
    if (estado === 'Tarde') return '⏰';
    if (estado === 'Ausente') return '❌';
    return '—';
  };

  const isEditingCell = (estudianteId, fecha) =>
    editing && editing.estudianteId === estudianteId && editing.fecha === fecha;

  const startEdit = (estudianteId, fecha, estadoActual) => {
    setEditing({ estudianteId, fecha });
    setSelectedEstado(estadoActual ?? 'Presente');
  };

  const cancelEdit = () => {
    setEditing(null);
    setSelectedEstado(null);
  };

  const saveEstado = async (estudianteId, fecha, estado) => {
    await upsertAsistencia({
      cpmId,
      fecha,
      estudiante_id: estudianteId,
      estado,
    }).unwrap();

    // Optimistic update del cache del resumen
    dispatch(
      asistenciaApi.util.updateQueryData('getResumenAsistencia', cpmId, (draft) => {
        const st = draft.estudiantes.find((x) => x.id === estudianteId);
        if (st) {
          if (!st.asistencias) st.asistencias = {};
          st.asistencias[fecha] = estado;
        }
        if (!draft.fechas.includes(fecha)) {
          draft.fechas.push(fecha);
        }
      }),
    );
  };

  // Guardado rápido para la columna recién creada (auto-save en onChange)
  const quickSave = async (estudianteId, fecha, estado) => {
    const key = `${estudianteId}:${fecha}`;
    try {
      setSavingMap((prev) => ({ ...prev, [key]: true }));
      await saveEstado(estudianteId, fecha, estado);
    } catch (err) {
      console.error('Error al guardar asistencia', err);
    } finally {
      setSavingMap((prev) => {
        const { [key]: _omit, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleTomarAsistencia = () => {
    const f = fechaSeleccionada || todayISO();

    // Asegura la columna (fecha) en cache para poder editar inmediatamente
    dispatch(
      asistenciaApi.util.updateQueryData('getResumenAsistencia', cpmId, (draft) => {
        if (!draft.fechas.includes(f)) {
          draft.fechas.push(f);
        }
        // Garantiza mapa 'asistencias' por estudiante
        for (const st of draft.estudiantes) {
          if (!st.asistencias) st.asistencias = {};
          // No asignar estado por defecto; quedará vacío y el <select> tendrá placeholder
        }
      }),
    );

    // Activa el modo "edición rápida" para esa nueva fecha
    setEditingColumnDate(f);
  };

  return (
    <div className="attendance-wrapper">
      <div className="attendance-toolbar">
        <div className="left">
          <h2>
            Asistencia — {curso?.nombre_curso} / {materia?.nombre}
          </h2>
        </div>
        <div className="right">
          <label className="fecha-label">
            Fecha:
            <input
              type="date"
              className="fecha-input"
              value={fechaSeleccionada}
              onChange={(e) => setFechaSeleccionada(e.target.value)}
            />
          </label>
          <button className="btn-primary" onClick={handleTomarAsistencia}>
            Tomar asistencia
          </button>
        </div>
      </div>

      {allFechas.length === 0 ? (
        <p>No hay registros de asistencia para este curso.</p>
      ) : (
        <div className="attendance-table-container">
          <table className="attendance-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>No</th>
                <th>Nombre</th>
                {allFechas.map((f) => (
                  <th key={f}>{f}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estudiantes.map((e, idx) => (
                <tr key={e.id}>
                  <td>{idx + 1}</td>
                  <td>
                    {e.nombre} {e.apellido}
                  </td>
                  {allFechas.map((f) => {
                    const estado = e.asistencias?.[f];
                    const quickEditActive =
                      editingColumnDate === f && (estado === undefined || estado === null);
                    const savingKey = `${e.id}:${f}`;
                    const savingThis = !!savingMap[savingKey];

                    return (
                      <td key={f} className="estado">
                        <div className={`cell ${isSaving || savingThis ? 'saving' : ''}`}>
                          {/* Modo edición por celda tradicional */}
                          {isEditingCell(e.id, f) && !quickEditActive ? (
                            <div className="cell-editor">
                              <select
                                className="cell-select"
                                value={selectedEstado ?? 'Presente'}
                                onChange={(ev) => setSelectedEstado(ev.target.value)}
                                disabled={isSaving}
                                autoFocus
                                onKeyDown={(ev) => {
                                  if (ev.key === 'Escape') cancelEdit();
                                  if (ev.key === 'Enter') {
                                    ev.preventDefault();
                                    saveEstado(e.id, f, selectedEstado ?? 'Presente')
                                      .catch(() => {})
                                      .finally(() => cancelEdit());
                                  }
                                }}
                              >
                                {ESTADOS.map((op) => (
                                  <option key={op} value={op}>
                                    {op}
                                  </option>
                                ))}
                              </select>
                              <div className="cell-actions">
                                <button
                                  type="button"
                                  className="btn-save"
                                  onClick={() =>
                                    saveEstado(e.id, f, selectedEstado ?? 'Presente')
                                      .catch(() => {})
                                      .finally(() => cancelEdit())
                                  }
                                  disabled={isSaving}
                                  title="Guardar"
                                >
                                  Guardar
                                </button>
                                <button
                                  type="button"
                                  className="btn-cancel"
                                  onClick={cancelEdit}
                                  disabled={isSaving}
                                  title="Cancelar"
                                >
                                  Cancelar
                                </button>
                              </div>
                            </div>
                          ) : quickEditActive ? (
                            // Edición rápida: valor inicial = '' (placeholder).
                            // Así, al seleccionar "Presente" por primera vez, se dispara onChange y se crea la asistencia.
                            <select
                              className="cell-select"
                              value={estado ?? ''}            /* <-- clave: placeholder vacío */
                              disabled={savingThis}
                              onChange={(ev) => {
                                const val = ev.target.value;
                                if (val) quickSave(e.id, f, val);
                              }}
                            >
                              <option value="" disabled>
                                Seleccionar…
                              </option>
                              {ESTADOS.map((op) => (
                                <option key={op} value={op}>
                                  {op}
                                </option>
                              ))}
                            </select>
                          ) : (
                            // Vista normal con botón Editar/Marcar
                            <>
                              <span className="cell-estado">{cellIcon(estado)}</span>
                              <button
                                className="cell-edit-btn"
                                onClick={() => startEdit(e.id, f, estado)}
                                title={estado ? 'Editar asistencia' : 'Marcar asistencia'}
                              >
                                {estado ? 'Editar' : 'Marcar'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    );
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
