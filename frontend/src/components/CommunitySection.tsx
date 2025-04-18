import React from 'react';
import { Card, CardContent } from "./ui/card"

const CommunitySection: React.FC = () => {
  const communityFeedData = [
    { id: 1, user: 'Usuario 1', message: 'Mensaje 1' },
    { id: 2, user: 'Usuario 2', message: 'Mensaje 2' },
    { id: 3, user: 'Usuario 3', message: 'Mensaje 3' },
  ];

  return (
    <div>
      <h2>Comunidad</h2>
      {communityFeedData.map((item) => (
        <Card key={item.id}>
          <CardContent>
            <strong>{item.user}:</strong> {item.message}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CommunitySection;
