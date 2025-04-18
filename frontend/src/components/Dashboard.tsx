import React from 'react';
import useUnits from '../hooks/useUnits';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import ProgressSection from './ProgressSection';
import RewardsSection from './RewardsSection';
import FeaturedContent from './FeaturedContent';
import RecommendationsSection from './RecommendationsSection';
import CommunitySection from './CommunitySection';

const Dashboard: React.FC = () => {
  const { units, loading, error } = useUnits();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <ProgressSection />
      <RewardsSection />
      <FeaturedContent />
      <RecommendationsSection />
      <CommunitySection />
      {units.map((unit) => (
        <Card key={unit.id}>
          <CardHeader>
            <CardTitle>{unit.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{unit.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Dashboard;
