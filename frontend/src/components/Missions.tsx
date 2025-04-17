// import React from 'react';
// import useMissions from '@/hooks/useMissions';

// const Missions: React.FC = () => {
//   const { missions, loading, error } = useMissions();

//   if (loading) {
//     return <div>Cargando...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h1>Misiones</h1>
//       {missions.map((mission) => (
//         <div key={mission.id}>
//           <h2>{mission.name}</h2>
//           <p>{mission.description}</p>
//           {/* Agregar aquí la lógica para mostrar el progreso de la misión y las recompensas obtenidas */}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Missions;
