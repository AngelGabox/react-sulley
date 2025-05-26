import React from 'react';
import Menu from "../../container/Menu/Menu";

import './Admin.css'; // Assuming you have some styles for the Admin component

 const Admin = () => {
   return (
     <div className="admin">
       <h1>Admin Dashboard</h1>
       <p>Welcome to the admin dashboard. Here you can manage users, settings, and more.</p>
       {/* Add more admin functionalities here */}
       <Menu />
     </div>
   );
 }
 export default Admin;
