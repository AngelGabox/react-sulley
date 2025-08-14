// src/views/componentes/Profesor/Activities.jsx
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import {
  useGetActividadesPorCursoQuery,
  useCrearActividadEnCursoMutation,
  useGetDetalleActividadQuery,
  useActualizarEntregaMutation,
  useActualizarActividadMutation,
  useEliminarActividadMutation,
} from '../../../features/actividades/actividadesApi';

import {
  setActividadSeleccionada,
  toggleFormulario,
  setFiltroTodas,
} from '../../../features/actividades/actividadesSlice';

const schemaActividad = Yup.object({
  titulo: Yup.string().required('Requerido'),
  descripcion: Yup.string().required('Requerido'),
  fecha: Yup.date().required('Requerido'),
  fecha_entrega: Yup.date().nullable(true),
});

const Activities = () => {
  const dispatch = useDispatch();

  const cpm = useSelector(s =>
    s.clase?.claseEnCurso?.dictada_por ?? s.courses?.curso_profesor_materia
  );

  const cursoId = cpm?.curso?.id;
  const cpmId = cpm?.id;

  const filtroTodas = useSelector((s) => s.actividades.filtroTodas);
  const mostrarFormulario = useSelector((s) => s.actividades.mostrarFormulario);
  const actividadSeleccionada = useSelector((s) => s.actividades.actividadSeleccionada);

  // Lista de actividades del curso
  const { data: actividades, isLoading, refetch } = useGetActividadesPorCursoQuery(
    { cursoId, todas: filtroTodas ? 1 : 0 },
    { skip: !cursoId }
  );

  // Detalle de una actividad seleccionada
  const actividadId = actividadSeleccionada?.id || null;
  const {
    data: detalle,
    isLoading: loadingDetalle,
  } = useGetDetalleActividadQuery(actividadId, { skip: !actividadId });

  const [crearActividad] = useCrearActividadEnCursoMutation();
  const [actualizarEntrega] = useActualizarEntregaMutation();
  const [actualizarActividad] = useActualizarActividadMutation();
  const [eliminarActividad] = useEliminarActividadMutation();

  const hoyISO = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const handleCrearActividad = async (values, { resetForm }) => {
    if (!cursoId || !cpmId) {
      alert('No hay clase activa / CPM disponible.');
      return;
    }
    try {
      await crearActividad({
        cursoId,
        payload: {
          ...values,
          cpm_id: cpmId,
        },
      }).unwrap();
      resetForm();
      dispatch(toggleFormulario(false));
      refetch();
    } catch (e) {
      console.error(e);
      alert('No se pudo crear la actividad');
    }
  };

  const handleVerDetalle = (actividad) => {
    dispatch(setActividadSeleccionada(actividad));
  };

  const handleActualizarFechaEntrega = async () => {
    if (!actividadId) return;
    const nueva = prompt('Nueva fecha de entrega (YYYY-MM-DD):');
    if (!nueva) return;
    try {
      await actualizarActividad({ actividadId, data: { fecha_entrega: nueva } }).unwrap();
    } catch (e) {
      console.error(e);
      alert('No se pudo actualizar la fecha de entrega');
    }
  };

  const handleEliminar = async () => {
    if (!actividadId) return;
    if (!confirm('¿Eliminar esta actividad?')) return;
    try {
      await eliminarActividad(actividadId).unwrap();
      dispatch(setActividadSeleccionada(null));
      refetch();
    } catch (e) {
      console.error(e);
      alert('No se pudo eliminar la actividad');
    }
  };

  const marcarEntregada = async (ae) => {
    try {
      await actualizarEntrega({
        actividadEstudianteId: ae.id,
        actividadId,
        data: { entregado_en: new Date().toISOString() },
      }).unwrap();
    } catch (e) {
      console.error(e);
      alert('No se pudo marcar como entregada');
    }
  };

  const calificar = async (ae) => {
    const nota = prompt('Nota (0-5):', ae.calificacion ?? '');
    if (nota === null) return;
    try {
      await actualizarEntrega({
        actividadEstudianteId: ae.id,
        actividadId,
        data: { calificacion: Number(nota) },
      }).unwrap();
    } catch (e) {
      console.error(e);
      alert('No se pudo calificar');
    }
  };

  if (!cpm) return <p>Seleccione un curso o inicie una clase para ver actividades.</p>;


  return (
    <div className="view-actividades">
      <div className="cabecera">
        <h2>Actividades</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <label>
            <input
              type="checkbox"
              checked={filtroTodas}
              onChange={(e) => dispatch(setFiltroTodas(e.target.checked))}
            />
            Ver de todos los profesores
          </label>
          <button onClick={() => dispatch(toggleFormulario())}>
            {mostrarFormulario ? 'Cerrar Formulario' : 'Nueva Actividad'}
          </button>
        </div>
      </div>

      {mostrarFormulario && (
        <Formik
          initialValues={{
            titulo: '',
            descripcion: '',
            fecha: hoyISO,
            fecha_entrega: '',
          }}
          validationSchema={schemaActividad}
          onSubmit={handleCrearActividad}
        >
          {({ isSubmitting }) => (
            <Form className="form-actividad">
              <div>
                <label>Título*</label>
                <Field name="titulo" />
                <ErrorMessage name="titulo" component="div" className="error" />
              </div>
              <div>
                <label>Descripción*</label>
                <Field as="textarea" name="descripcion" rows={3} />
                <ErrorMessage name="descripcion" component="div" className="error" />
              </div>
              <div>
                <label>Fecha*</label>
                <Field type="date" name="fecha" />
                <ErrorMessage name="fecha" component="div" className="error" />
              </div>
              <div>
                <label>Fecha de entrega</label>
                <Field type="date" name="fecha_entrega" />
                <ErrorMessage name="fecha_entrega" component="div" className="error" />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Creando...' : 'Crear'}
              </button>
            </Form>
          )}
        </Formik>
      )}

      <hr />

      {!cursoId ? (
        <p>Activa una clase para ver/crear actividades de este curso.</p>
      ) : isLoading ? (
        <p>Cargando actividades…</p>
      ) : (
        <div className="lista-actividades">
          {(actividades || []).map((a) => (
            <div className="item-actividad" key={a.id}>
              <div>
                <strong>{a.titulo}</strong>
                <div>{a.descripcion}</div>
                <small>
                  Fecha: {a.fecha} {a.fecha_entrega ? ` | Entrega: ${a.fecha_entrega}` : ''}
                </small>
              </div>
              <button onClick={() => handleVerDetalle(a)}>Ver detalle</button>
            </div>
          ))}
          {(actividades || []).length === 0 && <p>No hay actividades.</p>}
        </div>
      )}

      {actividadId && (
        <div className="detalle-actividad" style={{ marginTop: 24 }}>
          <h3>Detalle actividad</h3>
          {loadingDetalle ? (
            <p>Cargando detalle…</p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                <button onClick={handleActualizarFechaEntrega}>Actualizar fecha de entrega</button>
                <button onClick={handleEliminar}>Eliminar actividad</button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Estudiante</th>
                    <th>Entregado</th>
                    <th>Nota</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {(detalle?.entregas || []).map((ae) => (
                    <tr key={ae.id}>
                      <td>{ae.estudiante_nombre}</td>
                      <td>{ae.entregado_en ? new Date(ae.entregado_en).toLocaleString() : '—'}</td>
                      <td>{ae.calificacion ?? '—'}</td>
                      <td style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => marcarEntregada(ae)}>Marcar entregada</button>
                        <button onClick={() => calificar(ae)}>Calificar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Activities;
