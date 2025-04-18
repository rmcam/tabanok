import React from 'react';
import { Progress } from './ui/progress';

const ProgressSection: React.FC = () => {
  return (
    <div>
      <h2>Progreso</h2>
      <Progress value={50} />
    </div>
  );
};

export default ProgressSection;
