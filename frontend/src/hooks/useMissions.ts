// import { useState, useEffect } from 'react';
// import api from '@/lib/api';

// interface Mission {
//   id: number;
//   name: string;
//   description: string;
// }

// export const useMissions = () => {
//   const [missions, setMissions] = useState<Mission[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMissions = async () => {
//       try {
//         const response = await api.get<Mission[]>('/gamification/missions');
//         setMissions(response.data);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMissions();
//   }, []);

//   return { missions, loading, error };
// }
