// src/components/views/Acudiente/EstudianteDetalle.jsx
import React, { useState } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { useGetEntregasPorEstudianteQuery, useSubirEntregableMutation } from '../../../features/actividades/actividadesApi';
import './css/Acudiente.css';

const EstudianteDetalle = () => {
  const { id } = useParams();             // estudianteId
  const { state } = useLocation();        // { estudiante } si vino desde la tarjeta
  const estudiante = state?.estudiante;

  const [filtro, setFiltro] = useState('todas');

  const { data: filas = [], isLoading, isError, refetch } =
    useGetEntregasPorEstudianteQuery({ estudianteId: id, estado: filtro }, { skip: !id });

  const [subirEntregable, { isLoading: uploading }] = useSubirEntregableMutation();

  const onUpload = async (aeId, file) => {
    if (!file) return;
    const form = new FormData();
    form.append('entregable', file);
    try {
      await subirEntregable({ actividadEstudianteId: aeId, formData: form, actividadId: 0 }).unwrap();
      refetch();
    } catch (e) {
      console.error(e);
      alert('No se pudo subir el archivo');
    }
  };

  return (
    <section className="acu-panel">
      <div className="acu-breadcrumb" style={{ marginBottom: 12 }}>
        <Link to="/acudiente" style={{ textDecoration: 'none' }}>Acudiente</Link>
        <span className="sep">›</span>
        <span>Estudiante</span>
      </div>

      <div className="acu-card" style={{ marginBottom: 12 }}>
        <h2 style={{ marginTop: 0 }}>
          Actividades de {estudiante ? `${estudiante.nombre} ${estudiante.apellido}` : `Estudiante #${id}`}
        </h2>
        <div className="acu-tabs">
          <button className={`acu-tab ${filtro==='todas'?'active':''}`} onClick={() => setFiltro('todas')}>Todas</button>
          <button className={`acu-tab ${filtro==='pendientes'?'active':''}`} onClick={() => setFiltro('pendientes')}>Pendientes</button>
          <button className={`acu-tab ${filtro==='entregadas'?'active':''}`} onClick={() => setFiltro('entregadas')}>Entregadas</button>
        </div>
      </div>

      <div className="acu-card">
        {isLoading && <p>Cargando…</p>}
        {isError && <p>Error cargando actividades.</p>}
        {!isLoading && !isError && (
          filas.length === 0 ? <p>No hay actividades para este filtro.</p> : (
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Fecha</th>
                    <th>Entrega</th>
                    <th>Nota</th>
                    <th>Archivo</th>
                  </tr>
                </thead>
                <tbody>
                  {filas.map((row) => (
                    <tr key={row.actividad_estudiante_id}>
                      <td>
                        <strong>{row.titulo}</strong>
                        <div className="muted">{row.descripcion}</div>
                      </td>
                      <td>
                        {row.fecha || '—'}
                        {row.fecha_entrega ? <div className="muted">Límite: {row.fecha_entrega}</div> : null}
                      </td>
                      <td>{row.entregado_en ? new Date(row.entregado_en).toLocaleString() : 'Pendiente'}</td>
                      <td>{row.calificacion ?? '—'}</td>
                      <td>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          {row.entregable_url ? (
                            <a className="btn-secondary" href={row.entregable_url} target="_blank" rel="noreferrer">Ver</a>
                          ) : (
                            <span className="muted">Sin archivo</span>
                          )}
                          <label className="btn-primary" style={{ cursor: 'pointer' }}>
                            {row.entregable_url ? 'Reemplazar' : 'Subir'}
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                              style={{ display: 'none' }}
                              onChange={(e) => onUpload(row.actividad_estudiante_id, e.target.files?.[0])}
                              disabled={uploading}
                            />
                          </label>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default EstudianteDetalle;
