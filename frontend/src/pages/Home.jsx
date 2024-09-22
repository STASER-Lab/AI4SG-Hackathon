import React from 'react';
import './Buttons.css';

function Home() {
  return (
    <div className="Buttons">
      <div className="button-container">
        <button className="custom-button">Clients</button>
        <button className="custom-button">Employees</button>
      </div>
    </div>
  );
}

export default Buttons;
