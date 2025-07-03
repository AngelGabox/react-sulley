// src/pages/Admin.jsx
import React, { useState } from 'react';

import MenuAdmin from '../../container/Menu/MenuAdmin/MenuAdmin';

import { StudentToolbar, PersonToolBar }from '../../container/StudentToolBar/StudentToolBar';
import TablaEstudiantes from '../../container/TablaEstudiantes/TablaEstudiantes';
import CreateStudentForm from '../../forms/create/CreateStudentForm/CreateStudentForm';
import UpdateStudentForm from '../../forms/update/UpdateStudentForm/UpdateStudentForm';

import TablaPersonas from '../../container/TablaPersonas/TablaPersonas';
import CreatePerson from '../../forms/create/CreatePerson/CreatePersonForm'

import Modal from '../../container/Modal/Modal';
import "./Admin.css"

const Admin = () => {
  // Ventana Modal reutilizanle
  const [showModalToCreate, setShowModalToCreate] = useState(false);
  const [showModalToEdit, setShowModalToEdit] = useState(false);

  // Setear estudiante en el estado para obtenerlo en form de actualizar
  const [studentToEdit, setStudentToEdit] = useState(null);
  // Setear persona en el estado para obtenerlo en form de actualizar
  const [personToEdit, setPersonToEdit] = useState(null);
  
  const handleEditStudent = (student) => {
    setStudentToEdit(student);
    setShowModalToEdit(true);
  };
  const handleAddStudent = () => {
    setShowModalToCreate(true); // o abrir modal
  };
  

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
                      <CreateStudentForm/>;
                    </Modal>

                    {/* Formulario para Editar Estudiante */}
                    <Modal isOpen={showModalToEdit} onClose={()=> setShowModalToEdit(false)}>
                      <UpdateStudentForm student={studentToEdit}></UpdateStudentForm>
                    </Modal>

                  </>
      case 'personas':
        return <>
                    <PersonToolBar onAddClick={handleAddPerson}></PersonToolBar>
                    <TablaPersonas handleEdit={handleEditPerson}/>;
                    
                    <Modal isOpen={showModalToEdit} onClose={()=> setShowModalToEdit(false)}>
                      <CreatePerson/>
                    </Modal>
                  </>
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