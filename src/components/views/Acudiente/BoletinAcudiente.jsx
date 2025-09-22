import React, { useState } from 'react';
import { useMisEstudiantesQuery } from '../../../features/students/studentApi';
import { useGetContextoAcademicoQuery } from '../../../features/academico/academicoApi';
import { downloadWithAuth } from '../../../utils/download';

const API_BASE = 'http://127.0.0.1:8000/';

const BoletinAcudiente = () => {
  const { data: hijos = [], isLoading: cargandoHijos } = useMisEstudiantesQuery();
  const { data: ctx, isLoading: cargandoCtx, isError } = useGetContextoAcademicoQuery();

  const [seleccion, setSeleccion] = useState({}); // { [estId]: periodoElegido }

  if (cargandoHijos || cargandoCtx) return <p>Cargando…</p>;
  if (isError || !ctx) return <p>No se pudo obtener contexto académico.</p>;

  const { anio_actual, periodos_disponibles, periodo_actual } = ctx;

  const onDescargar = async (h) => {
    const periodo = seleccion[h.id];
    if (!periodo) return alert('Elige un período disponible');
    if (!h.curso?.id) return alert('No se encontró el curso del estudiante');

    const url = `${API_BASE}academico/boletin/curso/${h.curso.id}/periodo/${periodo}/pdf/?estudiante_id=${h.id}&anio=${anio_actual}`;
    const nombre = `${h.nombre}_${h.apellido}_P${periodo}_${anio_actual}.pdf`.replace(/\s+/g, '_');

    try {
      await downloadWithAuth(url, nombre);
    } catch (e) {
      console.error(e);
      alert('No se pudo descargar el boletín');
    }
  };

  return (
    <section className="acu-panel">
      <div className="acu-card">
        <h2 style={{marginTop:0}}>Boletines</h2>
        <p className="muted">
          Año: <strong>{anio_actual}</strong> · Período actual: <strong>{periodo_actual}</strong>
        </p>
        {periodos_disponibles.length === 0 ? (
          <p>Aún no hay períodos cerrados para descargar.</p>
        ) : null}
      </div>

      {hijos.length === 0 ? (
        <div className="acu-card">No tienes estudiantes vinculados.</div>
      ) : hijos.map(h => (
        <div className="acu-card" key={h.id} style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12}}>
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <img src={h.foto_url || '/Imagen/user-placeholder.png'} alt="" style={{width:48, height:48, borderRadius:8, objectFit:'cover'}} />
            <div>
              <div><strong>{h.nombre} {h.apellido}</strong></div>
              <div className="muted">Curso: {h.curso?.nombre_curso || '—'}</div>
            </div>
          </div>

          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <label>
              Período:
              <select
                value={seleccion[h.id] ?? ''}
                onChange={e => setSeleccion(s => ({...s, [h.id]: Number(e.target.value)}))}
                style={{marginLeft:8}}
              >
                <option value="" disabled>Elegir…</option>
                {periodos_disponibles.map(p => (
                  <option key={p} value={p}>P{p}</option>
                ))}
              </select>
            </label>

            <button
              className="btn-primary"
              onClick={() => onDescargar(h)}
              disabled={!seleccion[h.id]}
            >
              Descargar PDF
            </button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default BoletinAcudiente;
