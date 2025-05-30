// src/pages/Admin.jsx
import React, { useState } from 'react';
import MenuAdmin from '../../container/Menu/MenuAdmin';
import TablaEstudiantes from '../../container/TablaEstudiantes/TablaEstudiantes';
import TablaPersonas from '../../container/TablaPersonas/TablaPersonas';
import "./Admin.css"
import CreateStudentForm from '../../forms/CreateStudentForm/CreateStudentForm';

const Admin = () => {
  const [view, setView] = useState('estudiantes');

  const renderView = () => {
    switch (view) {
      case 'estudiantes':
        return <>
                    <TablaEstudiantes />
                    <CreateStudentForm/>;
                  </>
      case 'personas':
        return <>
                    <TablaPersonas />;
                    <CreatePerson/>
                  </>
      default:
        return <p>Seleccione una opción del menú</p>;
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