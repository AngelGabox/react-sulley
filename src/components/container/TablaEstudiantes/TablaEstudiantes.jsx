import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEstudiantes } from '../../../features/students/studentSlice';
import { useGetStudentsQuery } from '../../../features/students/studentApi';
import "./TablaEstudiantes.css"

const TablaEstudiantes = () => {
  const dispatch = useDispatch()
  // console.log(useGetStudentsQuery());
  const estudiantes = useSelector(s=>s.student.estudiantes)
  const { data, isSuccess, isLoading, isError } = useGetStudentsQuery();
  
 useEffect(() => {
    if (isSuccess && estudiantes.length === 0) {
      dispatch(setEstudiantes(data));
    }
  }, [isSuccess, data, dispatch, estudiantes.length]);

  if (isLoading) return <p>Cargando estudiantes...</p>;
  if (isError) return <p>Error al cargar estudiantes</p>;

  return (
  <div className="student">
  <h2>Listado de Estudiantes</h2>
    <table className='content-table'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Correo</th>
          <th>Direccion</th>
          <th>Fecha Nacimiento</th>
          <th>Curso</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {console.log(estudiantes)}
        {estudiantes.map(est => (
          <tr key={est.id_estudiante}>
            <td>{est.id_estudiante}</td>
            <td>{est.nombre}</td>
            <td>{est.apellido}</td>
            <td>{est.correo_electronico}</td>
            <td>{est.direccion}</td>
            <td>{est.fecha_nacimiento}</td>
            <td>{est.curso}</td>
            <td>
              <div class="btn-group">
                  <a href="#" class="btn"><i class="fas fa-edit"></i></a>
                  <a href="#" class="btn"><i class="fas fa-trash"></i></a>
               </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default TablaEstudiantes;
