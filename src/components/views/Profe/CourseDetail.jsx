// src/views/components/Profesor/CourseDetail.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCrearClaseMutation } from '../../../features/clase/claseApi'
import { startClass, endClass, hydrateFromStorage } from '../../../features/clase/claseSlice';
import { useGetAsistenciaByClaseQuery, useUpsertAsistenciaMutation } from '../../../features/asistencia/asistenciaApi';
import "./css/CourseDetail.css"

const parseHHMMToHHMMSS = (v) => {
  // admite "1:30" o "01:30" o "01:30:00"
  const parts = v.split(':').map(Number);
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String((s||0)).padStart(2,'0')}`;
  }
  const [h=0, m=0] = parts;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:00`;
};
const toSeconds = (hhmmss) => {
  const [h, m, s] = hhmmss.split(':').map(Number);
  return (h*3600) + (m*60) + (s||0);
};
const fmt = (sec) => {
  const h = Math.floor(sec/3600);
  const m = Math.floor((sec%3600)/60);
  const s = sec%60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};



const CourseDetail = () => {
  const dispatch = useDispatch();

  const {curso, cpm, currentClass } = useSelector((state) => ({
    curso: state.courses.selectedCourse, 
    cpm : state.courses.curso_profesor_materia,
    currentClass: state.clase.current,
  }));  
  
  // en slice de cursos guarda el objeto seleccionado,
  // que en este caso es un registro de CursoProfesorMateria:
  // { id:6, curso:{…}, materia:{…}, persona:{…} }
  const [crearClase, { isLoading, error }] = useCrearClaseMutation()

  const [duration, setDuration] = useState('01:30');     // HH:MM
  const [remaining, setRemaining] = useState(0);
  const [showAttendance, setShowAttendance] = useState(false);


  const claseId = currentClass?.id;
  const { data: asistenciaData, refetch } = useGetAsistenciaByClaseQuery(claseId, {
    skip: !showAttendance || !claseId,
  });
  const [upsertAsistencia] = useUpsertAsistenciaMutation();
  // const claseEnCurso = currentClass?.status === 'running';

  const toggleAsistencia = () => {
    setShowAttendance(v => !v);
    if (!showAttendance && claseId) refetch();
  };

//   // Toggle asistencia: usa el valor "next"
// const toggleAsistencia = () => {
//   setShowAttendance(prev => {
//     const next = !prev;
//     if (next && claseId) refetch();
//     return next;
//   });
// };

  const estadoById = new Map(
    asistenciaData?.estudiantes?.map(e => [e.estudiante_id, e.estado]) || []
  );

  const marcar = async (estudiante_id, estado) => {
    if (!claseId) return;
    await upsertAsistencia({ claseId, estudiante_id, estado });
  };

  // Hidratar desde localStorage si recarga
  useEffect(() => {
    if (!currentClass) {
      const saved = localStorage.getItem('currentClass');
      if (saved) dispatch(hydrateFromStorage(JSON.parse(saved)));
    }
  }, [currentClass, dispatch]);

  // Persistir en localStorage
  useEffect(() => {
    if (currentClass) localStorage.setItem('currentClass', JSON.stringify(currentClass));
    else localStorage.removeItem('currentClass');
  }, [currentClass]);

// Timer
useEffect(() => {
  if (!currentClass || currentClass.status !== 'running') {
    setRemaining(0);
    return;
  }

  let timerId; // <- declarada antes para que exista en la clausura

  const tick = () => {
    const ms  = currentClass.endsAt - Date.now();
    const sec = Math.max(0, Math.floor(ms / 1000));
    setRemaining(sec);

    if (ms <= 0) {
      dispatch(endClass());
      if (timerId) clearInterval(timerId); // <- ya existe
    }
  };

  // primero creo el intervalo, luego llamo a tick()
  timerId = setInterval(tick, 1000);
  tick();

  return () => {
    if (timerId) clearInterval(timerId);
  };
}, [currentClass, dispatch]);

  
  const handleEmpezarClase = async () => {
    try {
      const hhmmss = parseHHMMToHHMMSS(duration);
      const durSec = toSeconds(hhmmss);
      if (durSec <= 0) {
        alert('Duración inválida');
        return;
      }
      
      const hoy = new Date().toISOString().slice(0,10) // "YYYY-MM-DD"
      
      const nueva = await crearClase({
        dictada_por: cpm.id, // FK a CursoProfesorMateria
        fecha: hoy, 
        duracion: hhmmss  // Django DurationField acepta "HH:MM:SS
      }).unwrap()
      
      const startedAt = Date.now();
      const endsAt = startedAt + durSec * 1000;
      
      dispatch(startClass({
        ...nueva,                // lo que devuelva tu API (id, fecha, dictada_por, duracion, …)
        duracionSec: durSec,
        startedAt,
        endsAt,
        status: 'running',
      }));
    } catch (err) {
      console.error(err)
      alert('No se pudo iniciar la clase')
    }
  }
  
  const claseEnCurso = useMemo(() => currentClass?.status === 'running', [currentClass]);
  
  if (!cpm) return <p>No hay curso seleccionado.</p>;
  return (
    <div className="seccion-curso">
     <h2>
        {cpm.curso?.nombre_curso} — {cpm.materia?.nombre}
      </h2>

      <div className="crear-clase-row">
        <label className="duracion-label">
          Duración:
          <input
            type="text"
            className="duracion-input"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="HH:MM"
            pattern="^\d{1,2}:\d{2}(:\d{2})?$"
            title="Formato HH:MM o HH:MM:SS"
            disabled={claseEnCurso}
          />
        </label>

        <button
          className="crear-clase"
          onClick={handleEmpezarClase}
          disabled={isLoading || claseEnCurso}
        >
          {isLoading ? 'Iniciando…' : (claseEnCurso ? 'Clase en curso' : 'Empezar Clase')}
        </button>
      </div>

      {claseEnCurso && (
        <div className="barra-clase" style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
          <div className="contador">
            Termina en: <strong>{fmt(remaining)}</strong>
          </div>

          <button
            className="crear-clase"
            onClick={toggleAsistencia}   // misma función que te pasé
            disabled={!claseEnCurso}
          >
            {showAttendance ? 'Ocultar asistencia' : 'Tomar asistencia'}
          </button>
        </div>
      )}
      
      {showAttendance && (
        <>
          <h3>Asistencia de la clase</h3>
          {asistenciaData?.asistencia_tomada && (
            <p className="ok">Asistencia completa.</p>
          )}
        </>
      )}

      {error && (
        <p className="error">
          Ocurrió un error al iniciar la clase.
        </p>
      )}
      
      <h3>Estudiantes:</h3>
      <div className='seccion-asistencia'>
            <ul className="lista-asistencia">
              {curso?.map((e) => {
                const estado = estadoById.get(e.id); // "Presente" | "Ausente" | undefined
               return(
                <li key={e.id} className="estudiante">

                  <img src="https://randomuser.me/api/portraits/men/2.jpg" alt="Estudiante" className="student-img"/>
                  
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
              )})}
            </ul>
      </div>
    </div>
  );
};

export default CourseDetail;
