import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const RecommendationsSection: React.FC = () => {
  const recommendationsData = [
    { id: 1, title: 'Tema 1', description: 'Descripción del tema 1' },
    { id: 2, title: 'Tema 2', description: 'Descripción del tema 2' },
    { id: 3, title: 'Tema 3', description: 'Descripción del tema 3' },
  ];

  return (
    <div>
      <h2>Recomendaciones</h2>
      {recommendationsData.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{item.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RecommendationsSection;
