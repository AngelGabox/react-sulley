// src/components/views/Acudiente/InfoEstudiante.jsx
import React, { useState } from 'react';
import { useGetMisEstudiantesQuery } from '../../../features/acudiente/acudienteApi';
import EstudianteCard from './EstudianteCard';

const InfoEstudiante = () => {
  const [tab, setTab] = useState('estudiante');

  // Asumimos endpoint: GET /acudientes/mis-estudiantes/
  const { data: estudiantes = [], isLoading, isError } = useGetMisEstudiantesQuery();

  return (
    <section>
      <div className="acu-tabs">
        <button
          type="button"
          className={`acu-tab ${tab === 'estudiante' ? 'active' : ''}`}
          onClick={() => setTab('estudiante')}
        >
          Estudiante
        </button>
        <button
          type="button"
          className={`acu-tab ${tab === 'boletin' ? 'active' : ''}`}
          onClick={() => setTab('boletin')}
        >
          Boletín
        </button>
      </div>

      {tab === 'estudiante' && (
        <>
          {isLoading && <p>Cargando estudiantes…</p>}
          {isError && <p>Error cargando estudiantes.</p>}
          {!isLoading && !isError && (estudiantes?.length === 0 ? (
            <p>No tienes estudiantes asociados.</p>
          ) : (
            estudiantes.map((e) => <EstudianteCard key={e.id} estudiante={e} />)
          ))}
        </>
      )}

      {tab === 'boletin' && (
        <div className="acu-card">
          <h3>Boletín</h3>
          <p>Pantalla de boletines por estudiante (pendiente de implementar).</p>
        </div>
      )}
    </section>
  );
};

export default InfoEstudiante;
