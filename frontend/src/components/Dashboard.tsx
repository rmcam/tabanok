import React from 'react';
import Sidebar from './Sidebar'; // Importa el componente Sidebar

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> {/* Agrega el componente Sidebar */}
      <div className="flex-1 p-4">
        <h1>Dashboard</h1>
        <p>Bienvenido al dashboard!</p>
        {/* Aquí irá el contenido principal del dashboard */}
      </div>
    </div>
  );
}

export default Dashboard;
