import React, { useState, useEffect } from 'react';

const StudentDashboard: React.FC = () => {
  const [badges, setBadges] = useState([]);
  const [ranking, setRanking] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchBadges = async () => {
      // TODO: Replace with actual user ID
      const userId = '123';
      const response = await fetch(`/api/v1/badges/users/${userId}`);
      const data = await response.json();
      setBadges(data);
    };

    const fetchRanking = async () => {
      // TODO: Replace with actual user ID
      const userId = '123';
      const response = await fetch(`/api/v1/leaderboard/${userId}`);
      const data = await response.json();
      setRanking(data);
    };

    const fetchRecommendations = async () => {
      // TODO: Replace with actual user ID
      const userId = '123';
      const response = await fetch(`/api/v1/recommendations/users/${userId}`);
      const data = await response.json();
      setRecommendations(data);
    };

    fetchBadges();
    fetchRanking();
    fetchRecommendations();
  }, []);

  return (
    <div>
      <h1>Panel Estudiante</h1>
      <h2>Insignias</h2>
      <ul>
        {badges.map((badge) => (
          <li key={badge.id}>
            {badge.name}
          </li>
        ))}
      </ul>
      <h2>Ranking</h2>
      <p>Tu ranking es: {ranking}</p>
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
