// src/pages/Admin.jsx
import React, { useState } from 'react';

import MenuAdmin from '../../container/Menu/MenuAdmin/MenuAdmin';

import { StudentToolbar, PersonToolBar }from '../../container/StudentToolBar/StudentToolBar';
import TablaEstudiantes from '../../container/TablaEstudiantes/TablaEstudiantes';
import CreateStudentForm from '../../forms/create/CreateStudentForm/CreateStudentForm';
import UpdateStudentForm from '../../forms/update/UpdateStudentForm/UpdateStudentForm';

import TablaPersonas from '../../container/TablaPersonas/TablaPersonas';
import CreatePerson from '../../forms/create/CreatePerson/CreatePersonForm'
import UpdatePersonForm from '../../forms/update/UpdatePersonForm/UpdatePersonForm';

import Modal from '../../container/Modal/Modal';
import "./Admin.css"
import MateriasManager from '../../container/MateriasManager/MateriasManager';
import AsignacionesForm from '../../container/AsignacionesForm/AsignacionesForm';

const Admin = () => {
  // Ventana Modal reutilizanle
  const [showModalToCreate, setShowModalToCreate] = useState(false);
  const [showModalToEdit, setShowModalToEdit] = useState(false);

  // Setear estudiante en el estado para obtenerlo en form de actualizar
  const [studentToEdit, setStudentToEdit] = useState(null);
  // Setear persona en el estado para obtenerlo en form de actualizar
  const [personToEdit, setPersonToEdit] = useState(null);
  

  //Editar Persona
  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setShowModalToEdit(true);
  };


  // Mostrar formulario para crear estudiante
  const handleAddStudent = () => {
    setShowModalToCreate(true); // o abrir modal
  };
  

  //Editar Persona
  const handleEditPerson = (person) => {
    setPersonToEdit(person);
    setShowModalToEdit(true);
  };

  
  const handleAddPerson = () => {
    setShowModalToCreate(true); // o abrir modal
  };

  const [view, setView] = useState('estudiantes');

  const renderView = () => {
    switch (view) {
      case 'estudiantes':
        return <>
                     {/* Barra de búsqueda y botón de agregar */}
                    <StudentToolbar onAddClick={handleAddStudent}></StudentToolbar>
                    <TablaEstudiantes handleEdit={handleEditStudent} />
                    
                    {/* Formulario para crear Estudiante */}
                    <Modal isOpen={showModalToCreate} onClose={() => setShowModalToCreate(false)}>
                      <CreateStudentForm onClose={setShowModalToCreate}/>;
                    </Modal>

                    {/* Formulario para Editar Estudiante */}
                    <Modal isOpen={showModalToEdit} onClose={()=> setShowModalToEdit(false)}>
                      <UpdateStudentForm student={studentToEdit} onClose={setShowModalToEdit}></UpdateStudentForm>
                    </Modal>

                  </>


      case 'personas':
        return (
        <>
          <PersonToolBar onAddClick={handleAddPerson}></PersonToolBar>
          <TablaPersonas handleEdit={handleEditPerson}/>;
          
          <Modal isOpen={showModalToCreate} onClose={() => setShowModalToCreate(false)}>
            <CreatePerson onClose={setShowModalToCreate}/>
          </Modal>

          <Modal isOpen={showModalToEdit} onClose={()=> setShowModalToEdit(false)}>
            <UpdatePersonForm person={personToEdit} onClose={setShowModalToEdit }></UpdatePersonForm>
          </Modal>
        </>)


      case 'materias':
        return (
          <>
            <MateriasManager teriasManager></MateriasManager>
          </>)
      case 'asignaciones':
          return(
            <>
              <AsignacionesForm></AsignacionesForm>
            </>
          )
      default:
        return <p>Seleccione una opción del menú</p>
    }
  
  };


  return (
    <div className="admin-layout">
      <MenuAdmin setView={setView} currentView={view} />
      <div className="admin-content">{renderView()}</div>
    </div>
  );
};

export default Admin;