import React from 'react';
import MenuAdmin from "../../container/Menu/MenuAdmin";

import './Admin.css'; // Assuming you have some styles for the Admin component
import TablaEstudiantes from '../../pure/TablaEstudiantes/TablaEstudiantes'

 const Admin = () => {
  const [view, setView] = React.useState('estudiantes')

  
  return (

     <div className="admin">
       <h1>Admin Dashboard</h1>
       <p>Welcome to the admin dashboard. Here you can manage users, settings, and more.</p>
       {/* Add more admin functionalities here */}
       <MenuAdmin setterView={setView} view={view} />
       { view === 'estudiantes'?
          <TablaEstudiantes />:
          view === 'profesores'?
          <TablaEstudiantes />: 'nada'
       }

     </div>
   );
 }
 export default Admin;
