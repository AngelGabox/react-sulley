import React from 'react';
import './StudentToolbar.css';

const StudentToolbar = ({ onSearchChange, onAddClick }) => {
  return (
    <div className="toolbar-row">
      <div className="search-section">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar estudiante..."
          onChange={onSearchChange}
        />
        <button className="search-button" type="button">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <button type="button" className="add-button" onClick={onAddClick}>
        <i className="fas fa-plus-circle"></i> Agregar Estudiante
      </button>
    </div>
  );
};

export default StudentToolbar;
