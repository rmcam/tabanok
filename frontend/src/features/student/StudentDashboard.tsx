import React, { useState, useEffect } from 'react';

import Leaderboard from './components/Leaderboard';
import api from '@/lib/api';
import { useAuth } from '../auth/useAuth';

const StudentDashboard: React.FC = () => {
  console.log("StudentDashboard rendered");
  const [recommendations, setRecommendations] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await api.get(`/recommendations/${user?.id}`);
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    fetchRecommendations();
  }, [user]);

  return (
    <div>
      <h1>Panel Estudiante</h1>
      <h2>Ranking</h2>
      <Leaderboard />
      <h2>Recomendaciones</h2>
      <ul>
        {recommendations.map((recommendation) => (
          <li key={recommendation.id}>
            {recommendation.name}
          </li>
        ))}
      </ul>
      {/* Agregar aquí la lógica para mostrar el progreso, los logros, las actividades sugeridas y la biblioteca multimedia del estudiante */}
    </div>
  );
};

export default StudentDashboard;
