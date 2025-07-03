import React, { useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEstudiantes } from '../../../features/students/studentSlice';
import { useDeleteStudentMutation, useGetStudentsQuery } from '../../../features/students/studentApi';
import "./TablaEstudiantes.css"

const TablaEstudiantes = ({handleEdit}) => {
  const dispatch = useDispatch()
  // console.log(useGetStudentsQuery());
  const estudiantes = useSelector(s=>s.student.estudiantes)
  const estudiantesFiltrados = useSelector(s=>s.student.estudiantesFiltrados)
  const { data, isSuccess, isLoading, isError } = useGetStudentsQuery();
  // const useStudents = useGetStudentsQuery();
  const [ deleteStudent ] = useDeleteStudentMutation()


useEffect(() => {
  if (isSuccess && estudiantes.length === 0) {
    dispatch(setEstudiantes(data));
  }
}, [isSuccess, data, dispatch, estudiantes.length, estudiantesFiltrados.length]);

if (isLoading) return <p>Cargando estudiantes...</p>;
if (isError) return <p>Error al cargar estudiantes</p>;

const handleDelete = (id) => {
    deleteStudent(id)
}

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
        {(estudiantesFiltrados.length>0?estudiantesFiltrados:estudiantes).map(est => (
          <tr key={est.id}>
            <td>{est.id}</td>
            <td>{est.nombre}</td>
            <td>{est.apellido}</td>
            <td>{est.correo_electronico}</td>
            <td>{est.direccion}</td>
            <td>{est.fecha_nacimiento}</td>
            <td>{est.curso}</td>
            <td>
              <div className="btn-group">
                  <a href="#" className="btn" onClick={()=>handleEdit(est)}><i className="fas fa-edit"></i></a>
                  <a href="#" className="btn" onClick={()=>handleDelete(est.id)} ><i className="fas fa-trash"></i></a>
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
