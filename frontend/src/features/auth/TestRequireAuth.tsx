import React from 'react';
import { useRequireAuth } from './useRequireAuth';

interface TestRequireAuthProps {
  requiredRoles?: string[];
}

const TestRequireAuth: React.FC<TestRequireAuthProps> = ({ requiredRoles }) => {
  useRequireAuth(requiredRoles);
  return <div>Component rendered</div>;
};

export default TestRequireAuth;
