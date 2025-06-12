// src/pages/Admin.jsx
import React, { useState } from 'react';

import StudentToolbar from '../../container/StudentToolBar/StudentToolBar';
import MenuAdmin from '../../container/Menu/MenuAdmin';
import TablaEstudiantes from '../../container/TablaEstudiantes/TablaEstudiantes';
import TablaPersonas from '../../container/TablaPersonas/TablaPersonas';
import CreateStudentForm from '../../forms/create/CreateStudentForm/CreateStudentForm';
import CreatePerson from '../../forms/create/CreatePerson/CreatePersonForm'
import "./Admin.css"
import Modal from '../../container/Modal/Modal';
import UpdateStudentForm from '../../forms/update/UpdateStudentForm/UpdateStudentForm';

const Admin = () => {
  // Ventana Modal reutilizanle
  const [showModalToCreate, setShowModalToCreate] = useState(false);
  const [showModalToEdit, setShowModalToEdit] = useState(false);

  // Setear estudiante en el estado para obtenerlo en form de actualizar
  const [studentToEdit, setStudentToEdit] = useState(null);

  
  const handleEdit = (student) => {
    setStudentToEdit(student);
    setShowModalToEdit(true);
  };

  const handleAddStudent = () => {
  setShowModalToCreate(true); // o abrir modal
};

  const [view, setView] = useState('estudiantes');

  const renderView = () => {
    switch (view) {
      case 'estudiantes':
        return <>
                     {/* Barra de búsqueda y botón de agregar */}
                    <StudentToolbar onAddClick={handleAddStudent}></StudentToolbar>
                    <TablaEstudiantes handleEdit={handleEdit} />
                    
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
                    <TablaPersonas />;
                    <CreatePerson/>
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