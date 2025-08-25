// src/components/views/Profesor/ClassStatusMini.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

const fmt = (sec) => {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};

const ClassStatusMini = ({ onGo }) => {
  const cpm = useSelector((s) => s.courses?.curso_profesor_materia);
  const currentFromStore = useSelector((s) => s.clase?.current);

  // si recargaste la página
  const saved = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('currentClass') || 'null'); }
    catch { return null; }
  }, []);
  const currentClass = currentFromStore || saved;

  const activa = currentClass?.status === 'running';

  // ⬇️ si hay clase activa uso SIEMPRE el snapshot
  const origin = (activa && currentClass?.cpmSnapshot) ? currentClass.cpmSnapshot : cpm;

  
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (!activa) { setRemaining(0); return; }
    const tick = () => {
      const ms = (currentClass?.endsAt ?? 0) - Date.now();
      setRemaining(Math.max(0, Math.floor(ms / 1000)));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [activa, currentClass?.endsAt]);

  if (!origin) return null;

   //el botón lleva al curso de la clase activa:
  const handleGo = () => {
    // puedes pasar el id del cpm activo si tu padre lo necesita
    onGo?.(origin.id);
  };
  // si no hay contexto de curso/materia, no molestamos
  if (!cpm) return null;

  return (
    <div className="menu-class-chip">
      <div className="menu-class-chip__title">Clase actual</div>

      <div className="menu-class-chip__row">
        <small>Curso</small>
        <span>{cpm.curso?.nombre_curso ?? '—'}</span>
      </div>

      <div className="menu-class-chip__row">
        <small>Materia</small>
        <span>{cpm.materia?.nombre ?? '—'}</span>
      </div>

      <div className="menu-class-chip__timer">
        {activa ? (
          <>Termina en <b>{fmt(remaining)}</b></>
        ) : (
          <span>Sin clase activa</span>
        )}
      </div>

      <button className="menu-class-chip__btn" onClick={handleGo}>
        Ir al curso
      </button>
    </div>
  );
};

export default ClassStatusMini;
